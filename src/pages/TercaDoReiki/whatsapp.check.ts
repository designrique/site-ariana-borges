// Check sem framework — roda direto no Node: `node src/pages/TercaDoReiki/whatsapp.check.ts`
import assert from 'node:assert';
import {
    HORARIOS,
    PRECO_BRL,
    buildAgendarWhatsAppUrl,
    buildDuvidasWhatsAppUrl,
} from './whatsapp.ts';

// Link de agendamento com horário: bem-formado, aponta pro wa.me e injeta o horário escolhido.
for (const h of HORARIOS) {
    const url = buildAgendarWhatsAppUrl(h);
    assert.ok(url.startsWith('https://wa.me/'), `deve apontar pro wa.me: ${url}`);
    assert.ok(
        url.includes(encodeURIComponent(`às ${h}`)),
        `deve codificar o horário "${h}" na mensagem`,
    );
    assert.ok(url.includes(encodeURIComponent(`R$ ${PRECO_BRL}`)), 'deve conter o preço');
    assert.ok(!/\s/.test(url), 'URL não pode ter espaço literal (precisa estar encodado)');
}

// Sem horário: ainda válido, sem o trecho "às".
const semHorario = buildAgendarWhatsAppUrl();
assert.ok(semHorario.startsWith('https://wa.me/'), 'sem horário: deve apontar pro wa.me');
assert.ok(!semHorario.includes(encodeURIComponent('às ')), 'sem horário não deve conter "às"');

// Dúvidas: válido.
assert.ok(buildDuvidasWhatsAppUrl().startsWith('https://wa.me/'), 'dúvidas: deve apontar pro wa.me');

console.log('whatsapp.check.ts OK —', HORARIOS.length, 'horários validados');
