# LA😂PRINT

**See what’s moving. Understand why. Trade when you’re ready.**

Discovery-first Solana market intelligence. Not a dashboard. Not a forced wallet app.

[![Status](https://img.shields.io/badge/status-prototype-emerald)](https://github.com/spanda6z/laprint)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

---

## Product

LA😂PRINT is a **live market you explore** — then investigate, watch, and act only when you choose.

| Principle | Meaning |
|-----------|--------|
| Discovery first | Homepage is the market, not a portfolio dashboard |
| Wallet optional | Explore everything without connecting |
| Evidence separated | Social signals ≠ on-chain activity |
| No fabricated data | Unavailable data is shown as unavailable |
| 10-second clarity | Understand a token’s move at a glance |

### Core loop

```
Discover → See a move → Open token → Read flow / social / on-chain
       → Watch or Trade → Monitor → Autopilot → Exit → Discover again
```

---

## Quick start

```bash
# Run the product demo (no build step)
python3 -m http.server 8080
# open http://localhost:8080
```

Or open `index.html` directly in a browser.

> **Note:** Current build ships a full interactive **reference demo** with illustrative market data. Production will bind live Solana + social APIs only.

---

## Repository layout

```
laprint/
├── index.html          # Runnable product demo (reference UI)
├── public/             # Static assets
├── docs/
│   ├── PRODUCT.md      # Product spec & philosophy
│   ├── ROADMAP.md      # Phased delivery plan
│   └── ARCHITECTURE.md # Technical direction
├── LICENSE
├── CONTRIBUTING.md
└── package.json
```

---

## Documentation

- [Product](./docs/PRODUCT.md) — promise, screens, rules
- [Roadmap](./docs/ROADMAP.md) — prototype → beta → production
- [Architecture](./docs/ARCHITECTURE.md) — data sources, wallet, trading

---

## Production integrations (planned)

| Layer | Providers |
|-------|-----------|
| Market data | Birdeye, DexScreener, Helius |
| Swaps | Jupiter |
| Wallet | Solana Wallet Adapter (Phantom, Solflare, …) |
| Social | Verified public X search only |
| Chain | Solana RPC / Helius enhanced APIs |

---

## Status

**Prototype / reference UI** — full product flow implemented for design and UX validation. Market numbers in the demo are labeled illustrative and must not be treated as live.

---

## License

MIT © LA😂PRINT contributors
