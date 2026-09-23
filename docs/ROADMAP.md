# Roadmap

## Phase 0 — Reference prototype ✅

- Full product flow UI  
- Discover → Token → Watch → Trade → Position → Autopilot  
- Evidence separation patterns  
- Local watchlist  
- Documented product rules  

**Status:** Complete (this repository’s `index.html` demo)

---

## Phase 1 — Live market data

- [ ] Token list from DexScreener / Birdeye  
- [ ] Real-time price, volume, liquidity, tx counts  
- [ ] Buy/sell flow windows (5M, 1H, 24H)  
- [ ] Historical snapshots for price history  
- [ ] Honest empty states when indexer lags  

**Exit criteria:** Discover and Token pages run on live Solana market data only.

---

## Phase 2 — Wallet & trade

- [ ] Solana Wallet Adapter (Phantom, Solflare, Backpack)  
- [ ] Jupiter quote + swap  
- [ ] Review → sign → confirm with real tx signatures  
- [ ] Position tracking from confirmed fills  
- [ ] No simulated “success” without chain confirmation  

**Exit criteria:** User can buy/sell with a real wallet; history shows verified txs.

---

## Phase 3 — Social intelligence

- [ ] Configurable X search window  
- [ ] Mention / contract-detected / engagement signals  
- [ ] Strict separation from on-chain panels  
- [ ] Timeline alignment without causation copy  

**Exit criteria:** Social panel shows real posts or explicit “no match / not connected.”

---

## Phase 4 — On-chain depth

- [ ] Holder distribution  
- [ ] Mint / freeze / LP status from chain  
- [ ] Public wallet activity views  
- [ ] Optional smart-money labels only with transparent methodology  

**Exit criteria:** Contract and holders panels never invent fields.

---

## Phase 5 — Autopilot (beta)

- [ ] Spot strategy engine with user TP/SL/trailing  
- [ ] Risk caps (per hour / day / loss)  
- [ ] Monitor UI bound to real scanner state  
- [ ] Clear “no guarantee” disclosures  

**Exit criteria:** Autopilot counts and PnL come from real execution state.

---

## Phase 6 — Production hardening

- [ ] Rate limits, caching, failover across data providers  
- [ ] Security review of swap paths  
- [ ] Analytics that respect privacy  
- [ ] Mobile performance pass  
- [ ] Public beta launch  

---

## Non-goals (near term)

- Leveraged trading UI beyond placeholder  
- Social “leaderboards” that imply tipster performance  
- Auto-claiming influencer responsibility for price moves  
