# Contributing to LA😂PRINT

Thanks for helping build discovery-first market intelligence.

## Before you start

Read:

- [Product](./docs/PRODUCT.md) — especially the non-negotiable rules  
- [Architecture](./docs/ARCHITECTURE.md)  
- [Roadmap](./docs/ROADMAP.md)  

## Rules for contributors

1. **Do not invent market or social data** in UI that could be mistaken for live.
2. **Label demo/fixture data** clearly in code and UI.
3. **Keep social and on-chain UI copy separate.**
4. **No “SAFE” badges** without a documented, reproducible methodology (and even then, prefer raw facts).
5. Prefer clarity over feature count.

## Development

```bash
# Serve the reference demo
python3 -m http.server 8080
```

## Pull requests

- One concern per PR when possible  
- Describe user-visible behavior  
- Note any new external API dependencies  
- Include screenshots for UI changes  

## Commit style

```
feat: add live buy-flow window from Birdeye
fix: prevent watchlist toast firing twice
docs: clarify non-causation language on timeline
```

## Security

If you discover a vulnerability in swap or wallet flows, do not open a public issue with exploit detail. Contact the maintainers privately.
