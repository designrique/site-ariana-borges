// Check da virada de lote. Rodar: node src/pages/KundaliniNatal/checkout.check.ts
// ponytail: sem framework de teste no projeto — asserts puros bastam pra logica de data.
import assert from 'node:assert';
import { isLote1, currentPriceBRL, buildCheckoutUrl, LOTE_1_PRICE_BRL, LOTE_2_PRICE_BRL } from './checkout.ts';

const at = (iso: string) => new Date(iso);

assert.equal(isLote1(at('2026-07-27T18:00:00-03:00')), true, 'hoje ainda e 1o lote');
assert.equal(isLote1(at('2026-07-28T23:59:00-03:00')), true, '28/07 23h59 ainda e 1o lote');
assert.equal(isLote1(at('2026-07-29T00:00:01-03:00')), false, 'apos a virada e 2o lote');

assert.equal(currentPriceBRL(at('2026-07-28T12:00:00-03:00')), LOTE_1_PRICE_BRL);
assert.equal(currentPriceBRL(at('2026-07-29T12:00:00-03:00')), LOTE_2_PRICE_BRL);

// Preco vai pro checkout em centavos, no lote certo.
assert.match(buildCheckoutUrl(at('2026-07-28T12:00:00-03:00')), /items%5B0%5D%5Bprice%5D=19800/);
assert.match(buildCheckoutUrl(at('2026-07-29T12:00:00-03:00')), /items%5B0%5D%5Bprice%5D=24800/);

// Fuso: quem abre a pagina em UTC as 02h de 29/07 ainda esta em 28/07 no Brasil.
assert.equal(isLote1(at('2026-07-29T02:00:00Z')), true, 'UTC nao pode adiantar a virada');

console.log('OK — virada de lote e precos conferem.');
