/**
 * Market data contracts — production shapes.
 * See docs/ARCHITECTURE.md
 */

export type TokenSummary = {
  address: string
  symbol: string
  name: string
  priceUsd: number
  change1hPct: number
  change24hPct: number
  mcapUsd: number
  volume24hUsd: number
  liquidityUsd: number
  txns24h: number
  buys24h: number
  sells24h: number
  buyFlow5mPct: number | null
  dex?: string
  pairAddress?: string
  imageUrl?: string
}

export type MarketFlowWindow = {
  period: '5M' | '1H' | '6H' | '24H'
  buys: number
  sells: number
  buyFlowPct: number
  volumeUsd?: number
}

export type DataSourceStatus =
  | { status: 'live'; source: string; updatedAt: string }
  | { status: 'unavailable'; reason: string }
  | { status: 'demo'; note: string }
