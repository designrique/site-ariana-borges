import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:5173/clube-livro-mulher-maravilha';
const OBRIGADO = 'http://localhost:5173/obrigado';

test.describe('Clube do Livro Mulher Maravilha — Landing Page', () => {

    test('Hero: exibe título, capa do livro e botão de compra do livro', async ({ page }) => {
        await page.goto(BASE);

        await expect(page.getByRole('heading', { name: /desperte a heroína/i })).toBeVisible();

        const bookCover = page.locator('img[alt="Capa do livro A Psicologia da Mulher-Maravilha"]');
        await expect(bookCover).toBeVisible();

        const buyBookBtn = page.getByRole('link', { name: /comprar o livro/i });
        await expect(buyBookBtn).toBeVisible();
        await expect(buyBookBtn).toHaveAttribute('href', 'https://amzn.to/4dho7Xd');
        await expect(buyBookBtn).toHaveAttribute('target', '_blank');
    });

    test('Hero: botão principal redireciona para seção de investimento', async ({ page }) => {
        await page.goto(BASE);

        const cta = page.locator('#hero_section').getByRole('link', { name: /quero participar do grupo/i });
        await expect(cta).toBeVisible();
        await expect(cta).toHaveAttribute('href', '#investimento');
    });

    test('Sobre o grupo: exibe os 4 pilares', async ({ page }) => {
        await page.goto(BASE);

        const section = page.locator('#sobre_grupo');
        await expect(section.getByText('reflexão profunda')).toBeVisible();
        await expect(section.getByText('autoconhecimento', { exact: true })).toBeVisible();
        await expect(section.getByText('exercícios sistêmicos')).toBeVisible();
        await expect(section.getByText('fortalecimento emocional')).toBeVisible();
    });

    test('Temas: exibe todos os 8 temas incluindo Prosperidade Magnética', async ({ page }) => {
        await page.goto(BASE);

        const section = page.locator('#temas');
        const temas = [
            'O arquétipo da heroína feminina',
            'Verdade interior e autenticidade',
            'Amor sem dependência emocional',
            'Liderança feminina consciente',
            'A integração da sombra emocional',
            'Autonomia e soberania feminina',
            'Coragem para ocupar seu lugar no mundo',
            'Prosperidade Magnética',
        ];

        for (const tema of temas) {
            await expect(section.getByText(tema)).toBeVisible();
        }
    });

    test('Estrutura: exibe os 4 cards de estrutura do grupo', async ({ page }) => {
        await page.goto(BASE);

        const section = page.locator('#estrutura');
        await expect(section.getByText('8 encontros online ao vivo')).toBeVisible();
        await expect(section.getByText(/1h30 a 2h por encontro/)).toBeVisible();
        await expect(section.getByText('Grupo fechado para aprofundamento')).toBeVisible();
        await expect(section.getByText('Leitura guiada do livro')).toBeVisible();
    });

    test('Terapeuta: exibe foto com src correto e nome da Ariana Borges', async ({ page }) => {
        await page.goto(BASE);

        const section = page.locator('#terapeuta');
        const foto = section.locator('img[alt="Ariana Borges – Terapeuta"]');
        await expect(foto).toBeVisible();
        await expect(foto).toHaveAttribute('src', '/perfil-ariana-borges.jpeg');

        await expect(section.getByRole('heading', { name: 'Ariana Borges', exact: true })).toBeVisible();
    });

    test('Preço: exibe R$298 e feature Grupo Exclusivo Feminino', async ({ page }) => {
        await page.goto(BASE);

        const section = page.locator('#investimento');
        await expect(section.getByText('298')).toBeVisible();
        await expect(section.getByText('Grupo Exclusivo Feminino')).toBeVisible();
    });

    test('Preço: botão de compra aponta para checkout da InfinitePay', async ({ page }) => {
        await page.goto(BASE);

        const section = page.locator('#investimento');
        const checkoutBtn = section.getByRole('link', { name: /quero participar do grupo/i });
        await expect(checkoutBtn).toHaveAttribute(
            'href',
            'https://checkout.infinitepay.io/institutoarianaborges/3igXd4O5Sh'
        );
        await expect(checkoutBtn).toHaveAttribute('target', '_blank');
    });

    test('FAQ: resposta de inscrição não menciona WhatsApp do Instituto', async ({ page }) => {
        await page.goto(BASE);

        const faqBtn = page.getByRole('button', { name: /como faço a inscrição/i });
        await expect(faqBtn).toBeVisible();
        await faqBtn.click();

        await expect(page.getByText('Clique no botão da página.')).toBeVisible();
        await expect(page.getByText(/WhatsApp do Instituto/)).not.toBeVisible();
    });
});

test.describe('Página de Agradecimento — /obrigado', () => {

    test('Carrega a página sem erros', async ({ page }) => {
        await page.goto(OBRIGADO);
        await expect(page).toHaveURL(OBRIGADO);
        await expect(page.locator('body')).toBeVisible();
    });
});
