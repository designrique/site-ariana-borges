import { test, expect } from '@playwright/test';

test.describe('Home — Página Principal', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Hero: exibe título principal e subtítulo', async ({ page }) => {
        // h1 com o texto principal do hero (múltiplos serviços no título)
        await expect(page.locator('h1').filter({ hasText: /Terapia Individual/ })).toBeVisible();
        await expect(page.getByText(/Liberte-se|Desperte, Cure|jornada de expansão/i).first()).toBeVisible();
    });

    test('Hero: botão "Marque um Atendimento" abre o SchedulingChat', async ({ page }) => {
        const heroBtn = page.getByRole('button', { name: /marque um atendimento/i }).first();
        await expect(heroBtn).toBeVisible();
        await heroBtn.click();

        await expect(page.getByRole('heading', { name: /agendar atendimento/i })).toBeVisible();
        await expect(page.getByText(/Instituto Ariana Borges/i).first()).toBeVisible();
    });

    test('Hero: link "Saiba mais sobre a jornada" aponta para #estrutura', async ({ page }) => {
        const link = page.getByRole('link', { name: /saiba mais sobre a jornada/i });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', '#estrutura');
    });

    test('Pilares: exibe seção "Nossas Frentes de Atuação" com links de serviços', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /nossas frentes de atuação/i })).toBeVisible();

        await expect(page.getByRole('link', { name: /terapia individual/i }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: /formação de terapeutas/i }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: /autoconhecimento em grupo/i }).first()).toBeVisible();
    });

    test('AboutIntro: exibe seção "Olá! Sou Ariana Borges" com link para /sobre', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /olá! sou ariana borges/i })).toBeVisible();

        const conhecaLink = page.getByRole('link', { name: /conheça minha história/i });
        await expect(conhecaLink).toBeVisible();
        await expect(conhecaLink).toHaveAttribute('href', '/sobre');
    });

    test('FAQ: exibe seção de perguntas frequentes com acordeão funcional', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /perguntas frequentes/i })).toBeVisible();

        const question = page.getByRole('button', { name: /como funcionam os atendimentos/i });
        await expect(question).toBeVisible();

        await question.click();
        await expect(page.getByRole('button', { name: /como funcionam os atendimentos/i })).toBeVisible();
    });

    test('CTA Final: exibe "Olá, Ser de Luz" com botão de agendar', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /olá, ser de luz/i })).toBeVisible();

        const ctaBtn = page.getByRole('button', { name: /agendar atendimento/i });
        await expect(ctaBtn).toBeVisible();
    });
});
