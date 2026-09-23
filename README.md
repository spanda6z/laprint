# LA😂PRINT — Solana Market Intelligence Platform

**Core promise:** See what’s moving. Understand why. Trade when you’re ready.

## Product philosophy

Discovery-first. Not a dashboard. Not a forced wallet-onboarding app.

Users explore the entire market without connecting a wallet.  
Wallet connection is required only for Trade, Fund, Open Position, or Live Autopilot.

## How to run

Open `index.html` in any modern browser (no build step required).

```bash
# Optional: serve locally
npx serve .
# or
python3 -m http.server 8080
```

## Full product flow implemented

1. **Landing** — Hero + live market cards  
2. **Discover** — Primary home (Trending / Moving / New / Volume)  
3. **Search** — Tokens, contracts, creators  
4. **Token page** — Market snapshot, price history placeholder, market flow, why it’s moving, social signals, on-chain activity, event timeline, contract intelligence, holders  
5. **Watchlist** — Local persistence, no wallet needed  
6. **Trade** — Wallet gate → form → review → position (demo only; no real chain tx)  
7. **Position** — Entry / current / PnL → Sell / Autopilot  
8. **Autopilot** — Intro → Spot config → Monitor  
9. **Wallet intelligence** — Public wallet view (no fabricated data)  
10. **Mobile bottom nav** — Discover · Watch · Auto · Trade  

## Important rules respected

- Demo data is clearly labeled as illustrative.
- No fabricated charts, trade success states, or “SAFE” badges.
- Social and on-chain evidence are kept separate.
- Language avoids unsupported claims (“influencer bought/launched”).
- Unavailable data is shown as unavailable.

## Production next steps

- Connect Birdeye / DexScreener / Helius / Jupiter for live market data
- Solana wallet adapter (Phantom, Solflare, etc.)
- Real X/Twitter search for social signals
- On-chain transaction signing for trades
- Historical price snapshots for charts
- Persistent backend for positions & autopilot state

## Navigation

**Desktop:** Discover · Watch · Auto · Trade  
**Mobile:** Bottom nav (same four)

No “Dashboard” as primary destination.
