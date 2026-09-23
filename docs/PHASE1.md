# Phase 1 — Live market data

## Goal

Discover and Token pages run on **live Solana data only**. No illustrative prices in production builds.

## Provider (first)

**DexScreener** public REST API — no API key required for core pair/search endpoints.

Client: `src/lib/dexscreener.ts`

| Function | Use |
|----------|-----|
| `searchSolanaTokens(q)` | Search + discover lists |
| `getTokenByPair(pair)` | Token detail |
| `getSolanaBoosts()` | Optional trending seed |

## Rules

- On HTTP/network failure → `source.status: 'unavailable'` + empty list  
- Never fill gaps with random or cached fake numbers  
- Show source chip in UI: `live · dexscreener` or `unavailable`  
- Demo mode remains available behind explicit `?demo=1` or build flag  

## Next providers

1. Birdeye (richer flow / OHLCV) — requires API key  
2. Helius (holders, DAS) — requires API key  
3. Jupiter (quotes only — Phase 2)

## Integration checklist

- [ ] Wire Discover to `searchSolanaTokens` / boosts  
- [ ] Wire Token page price + flow from live pair  
- [ ] Price history from real OHLCV or honest “collecting”  
- [ ] Rate-limit client requests (debounce search)  
- [ ] Cache short TTL in memory (15–30s)  
- [ ] Remove default demo fixtures from production entry  
