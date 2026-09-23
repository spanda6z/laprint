/**
 * Smoke-test DexScreener connectivity (Phase 1).
 * Usage: node scripts/test-market.mjs
 */
const q = process.argv[2] || 'SOL'
const url = `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(q)}`
console.log('GET', url)
const res = await fetch(url)
console.log('status', res.status)
if (!res.ok) {
  console.error('unavailable')
  process.exit(1)
}
const data = await res.json()
const sol = (data.pairs || []).filter((p) => p.chainId === 'solana')
console.log('solana pairs', sol.length)
for (const p of sol.slice(0, 5)) {
  console.log(
    p.baseToken.symbol.padEnd(10),
    `$${Number(p.priceUsd || 0).toPrecision(4)}`,
    `vol24 ${Math.round(p.volume?.h24 || 0)}`,
    p.dexId
  )
}
console.log('ok — live data reachable')
