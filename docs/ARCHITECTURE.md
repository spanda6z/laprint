# Architecture

## Overview

```
┌─────────────────────────────────────────────────────────┐
│                     LA😂PRINT Client                      │
│  Discover · Token · Watch · Trade · Autopilot · History  │
└─────────────┬───────────────────────────┬───────────────┘
              │                           │
              ▼                           ▼
┌─────────────────────┐     ┌─────────────────────────────┐
│   Market Data API   │     │  Social (optional)          │
│  Birdeye / DexScreener│    │  X public search            │
│  Helius / RPC         │    │  (never merged into chain)  │
└─────────────────────┘     └─────────────────────────────┘
              │
              ▼
┌─────────────────────┐     ┌─────────────────────────────┐
│  Jupiter (quotes)   │────▶│  Wallet Adapter → Sign TX   │
└─────────────────────┘     └─────────────────────────────┘
```

## Design principles

1. **Read path is public.** Market and intelligence views work without auth or wallet.
2. **Write path is explicit.** Swaps and autopilot require connected wallet + user confirmation.
3. **Evidence isolation.** UI components for social and on-chain do not share “cause” language.
4. **Fail closed on data.** Missing provider → empty/unavailable UI, never placeholder fiction.

## Client (current)

- Single-page reference implementation (`index.html`)  
- React 18 via CDN for rapid product iteration  
- LocalStorage for watchlist  
- In-memory demo state for positions (prototype only)  

## Target client

- Vite + React + TypeScript  
- Tailwind design system aligned to current ink/mint palette  
- TanStack Query for market polling  
- Zustand or equivalent for wallet/session UI state  
- Solana Wallet Adapter  

## Data contracts (target)

### Token summary

```ts
type TokenSummary = {
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
  buyFlow5mPct: number | null  // null if unavailable
  dex?: string
  pairAddress?: string
}
```

### Social signal

```ts
type SocialSignal = {
  id: string
  type: 'MENTION' | 'CONTRACT_DETECTED' | 'REPEATED_MENTION' | 'ENGAGEMENT_SPIKE'
  author: string
  text: string
  timestamp: string
  engagement?: number
  url?: string
  contractDetected: boolean
}
```

Social payloads must never include a `causedPriceMove` boolean.

## Security notes

- Never embed private keys or seed phrases  
- Swap routes only via audited aggregator paths (Jupiter)  
- Display network fees and slippage before sign  
- Autopilot parameters are user-set risk controls, not promises  

## Demo vs production

| Concern | Demo | Production |
|---------|------|------------|
| Prices / volume | Illustrative labeled data | Live API only |
| Charts | Explicit “collecting” state | Real snapshots |
| Trade success | Labeled demo path | Confirmed signature + tx |
| Autopilot counts | Prototype scanner stub | Real job state |
