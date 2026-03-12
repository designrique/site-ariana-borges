import { test, expect } from '@playwright/test';

const CHECKOUT_URL = 'https://checkout.infinitepay.io/institutoarianaborges/3igXd4O5Sh';
const WHATSAPP_GROUP = 'https://chat.whatsapp.com/EAEoS3N7tCWKMO81NY9Uv8';

// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE COMPRA — Clube do Livro "A Psicologia da Mulher-Maravilha"
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Clube do Livro — Landing Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/clube-livro-mulher-maravilha');
    });

    test('Hero: título e subtítulo visíveis', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /clube do livro|mulher.maravilha|psicologia/i }).first()).toBeVisible();
    });

    test('Hero CTA: "Quero participar do grupo" aponta para #investimento', async ({ page }) => {
        const cta = page.getByRole('link', { name: /quero participar do grupo/i }).first();
        await expect(cta).toBeVisible();
        await expect(cta).toHaveAttribute('href', '#investimento');
    });

    test('Seção de preço: exibe R$298 e "Grupo Exclusivo Feminino"', async ({ page }) => {
        await page.locator('#investimento').scrollIntoViewIfNeeded();
        await expect(page.getByText(/R\$\s*298/).first()).toBeVisible();
        await expect(page.getByText(/grupo exclusivo feminino/i).first()).toBeVisible();
    });

    test('Botão de checkout: href correto para InfinitePay', async ({ page }) => {
        await page.locator('#investimento').scrollIntoViewIfNeeded();

        const checkoutLinks = page.getByRole('link', { name: /quero participar do grupo/i });
        const count = await checkoutLinks.count();
        let checkoutLink = null;
        for (let i = 0; i < count; i++) {
            const href = await checkoutLinks.nth(i).getAttribute('href');
            if (href?.includes('checkout.infinitepay.io')) {
                checkoutLink = checkoutLinks.nth(i);
                break;
            }
        }

        expect(checkoutLink, 'Botão de checkout não encontrado').not.toBeNull();
        await expect(checkoutLink!).toHaveAttribute('href', CHECKOUT_URL);
    });

    test('Botão de checkout: abre em nova aba (target="_blank")', async ({ page }) => {
        await page.locator('#investimento').scrollIntoViewIfNeeded();

        const checkoutLinks = page.getByRole('link', { name: /quero participar do grupo/i });
        const count = await checkoutLinks.count();
        for (let i = 0; i < count; i++) {
            const href = await checkoutLinks.nth(i).getAttribute('href');
            if (href?.includes('checkout.infinitepay.io')) {
                await expect(checkoutLinks.nth(i)).toHaveAttribute('target', '_blank');
                break;
            }
        }
    });

    test('FAQ: pergunta de inscrição responde com instrução de botão na página', async ({ page }) => {
        await page.locator('text=Como faço a inscrição').scrollIntoViewIfNeeded();
        await page.getByText(/como faço a inscrição/i).click();
        await expect(page.getByText(/clique no botão/i).first()).toBeVisible();
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// PÓS-COMPRA — Página de Agradecimento com link do grupo
//
// Usa query param ?_testClube=1 para forçar o componente ThankYouClubeDoLivro
// no ambiente local (em produção o subddomínio resolve automaticamente).
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Clube do Livro — Página /obrigado (pós-compra)', () => {
    test.beforeEach(async ({ page }) => {
        // O param _testClube=1 ativa isClubeSubdomain em App.tsx para testes locais
        await page.goto('/obrigado?_testClube=1');
    });

    test('exibe "Pagamento confirmado!"', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /pagamento confirmado/i })).toBeVisible();
    });

    test('exibe boas-vindas ao Clube do Livro', async ({ page }) => {
        await expect(page.getByText(/bem-vinda ao clube do livro/i)).toBeVisible();
    });

    test('exibe mensagem de e-mail de confirmação com link do grupo', async ({ page }) => {
        await expect(
            page.getByText(/e-mail de confirmação.*link.*acesso.*grupo/i)
        ).toBeVisible();
    });

    test('exibe próximo passo: verificar e-mail', async ({ page }) => {
        await expect(
            page.getByText(/verifique seu e-mail.*link.*acesso/i)
        ).toBeVisible();
    });

    test('botão "Entrar no grupo do WhatsApp" visível e com link correto', async ({ page }) => {
        const waBtn = page.getByRole('link', { name: /entrar no grupo do whatsapp/i });
        await expect(waBtn).toBeVisible();
        await expect(waBtn).toHaveAttribute('href', WHATSAPP_GROUP);
    });

    test('botão WhatsApp abre em nova aba (target="_blank")', async ({ page }) => {
        const waBtn = page.getByRole('link', { name: /entrar no grupo do whatsapp/i });
        await expect(waBtn).toHaveAttribute('target', '_blank');
    });
});
