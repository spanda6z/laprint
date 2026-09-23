/**
 * DexScreener public API client (no key required).
 * https://docs.dexscreener.com/api/reference
 *
 * Phase 1 — live Solana market reads.
 * Always fail closed: return unavailable, never invent numbers.
 */

import type { TokenSummary, DataSourceStatus } from '../types/market'

const BASE = 'https://api.dexscreener.com/latest/dex'

export type DexPair = {
  chainId: string
  dexId: string
  pairAddress: string
  baseToken: { address: string; name: string; symbol: string }
  quoteToken: { address: string; name: string; symbol: string }
  priceUsd?: string
  priceChange?: { m5?: number; h1?: number; h6?: number; h24?: number }
  volume?: { m5?: number; h1?: number; h6?: number; h24?: number }
  liquidity?: { usd?: number }
  txns?: {
    m5?: { buys: number; sells: number }
    h1?: { buys: number; sells: number }
    h24?: { buys: number; sells: number }
  }
  fdv?: number
  marketCap?: number
  info?: { imageUrl?: string }
}

function buyFlow(buys?: number, sells?: number): number | null {
  if (buys == null || sells == null) return null
  const t = buys + sells
  if (t === 0) return null
  return Math.round((buys / t) * 100)
}

export function pairToSummary(p: DexPair): TokenSummary {
  const buys24 = p.txns?.h24?.buys ?? 0
  const sells24 = p.txns?.h24?.sells ?? 0
  const buys5 = p.txns?.m5?.buys
  const sells5 = p.txns?.m5?.sells
  return {
    address: p.baseToken.address,
    symbol: p.baseToken.symbol,
    name: p.baseToken.name,
    priceUsd: Number(p.priceUsd) || 0,
    change1hPct: p.priceChange?.h1 ?? 0,
    change24hPct: p.priceChange?.h24 ?? 0,
    mcapUsd: p.marketCap ?? p.fdv ?? 0,
    volume24hUsd: p.volume?.h24 ?? 0,
    liquidityUsd: p.liquidity?.usd ?? 0,
    txns24h: buys24 + sells24,
    buys24h: buys24,
    sells24h: sells24,
    buyFlow5mPct: buyFlow(buys5, sells5),
    dex: p.dexId,
    pairAddress: p.pairAddress,
    imageUrl: p.info?.imageUrl,
  }
}

export async function searchSolanaTokens(query: string): Promise<{
  tokens: TokenSummary[]
  source: DataSourceStatus
}> {
  try {
    const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}`)
    if (!res.ok) {
      return {
        tokens: [],
        source: { status: 'unavailable', reason: `DexScreener HTTP ${res.status}` },
      }
    }
    const data = (await res.json()) as { pairs?: DexPair[] }
    const pairs = (data.pairs ?? []).filter((p) => p.chainId === 'solana')
    const byMint = new Map<string, DexPair>()
    for (const p of pairs) {
      const prev = byMint.get(p.baseToken.address)
      if (!prev || (p.liquidity?.usd ?? 0) > (prev.liquidity?.usd ?? 0)) {
        byMint.set(p.baseToken.address, p)
      }
    }
    const tokens = [...byMint.values()]
      .sort((a, b) => (b.volume?.h24 ?? 0) - (a.volume?.h24 ?? 0))
      .slice(0, 40)
      .map(pairToSummary)
    return {
      tokens,
      source: {
        status: 'live',
        source: 'dexscreener',
        updatedAt: new Date().toISOString(),
      },
    }
  } catch (e) {
    return {
      tokens: [],
      source: {
        status: 'unavailable',
        reason: e instanceof Error ? e.message : 'Network error',
      },
    }
  }
}

export async function getTokenByPair(pairAddress: string): Promise<{
  token: TokenSummary | null
  source: DataSourceStatus
}> {
  try {
    const res = await fetch(`${BASE}/pairs/solana/${pairAddress}`)
    if (!res.ok) {
      return {
        token: null,
        source: { status: 'unavailable', reason: `DexScreener HTTP ${res.status}` },
      }
    }
    const data = (await res.json()) as { pair?: DexPair; pairs?: DexPair[] }
    const pair = data.pair ?? data.pairs?.[0]
    if (!pair) {
      return { token: null, source: { status: 'unavailable', reason: 'Pair not found' } }
    }
    return {
      token: pairToSummary(pair),
      source: { status: 'live', source: 'dexscreener', updatedAt: new Date().toISOString() },
    }
  } catch (e) {
    return {
      token: null,
      source: {
        status: 'unavailable',
        reason: e instanceof Error ? e.message : 'Network error',
      },
    }
  }
}

export async function getSolanaBoosts(): Promise<{
  tokens: TokenSummary[]
  source: DataSourceStatus
}> {
  try {
    const res = await fetch('https://api.dexscreener.com/token-boosts/top/v1')
    if (!res.ok) {
      return {
        tokens: [],
        source: { status: 'unavailable', reason: `Boosts HTTP ${res.status}` },
      }
    }
    const rows = (await res.json()) as Array<{ chainId: string; tokenAddress: string }>
    const sol = rows.filter((r) => r.chainId === 'solana').slice(0, 12)
    const tokens: TokenSummary[] = []
    for (const row of sol) {
      const { tokens: found } = await searchSolanaTokens(row.tokenAddress)
      if (found[0]) tokens.push(found[0])
    }
    return {
      tokens,
      source: {
        status: tokens.length ? 'live' : 'unavailable',
        source: 'dexscreener-boosts',
        updatedAt: new Date().toISOString(),
      } as DataSourceStatus,
    }
  } catch (e) {
    return {
      tokens: [],
      source: {
        status: 'unavailable',
        reason: e instanceof Error ? e.message : 'Network error',
      },
    }
  }
}
