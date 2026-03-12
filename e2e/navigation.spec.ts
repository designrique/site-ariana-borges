import { test, expect } from '@playwright/test';

test.describe('Navbar — Navegação Desktop', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('exibe logo com link para home', async ({ page }) => {
        const logo = page.getByRole('img', { name: /instituto ariana borges/i });
        await expect(logo).toBeVisible();

        const logoLink = page.getByRole('link').filter({ has: logo });
        await expect(logoLink).toHaveAttribute('href', '/');
    });

    test('links principais são visíveis: Sobre e Blog', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Sobre', exact: true }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: 'Blog', exact: true }).first()).toBeVisible();
    });

    test('botão "Marque um Atendimento" na navbar abre SchedulingChat', async ({ page }) => {
        const navBtn = page.locator('nav').getByRole('button', { name: /marque um atendimento/i });
        await expect(navBtn).toBeVisible();
        await navBtn.click();

        await expect(page.getByRole('heading', { name: /agendar atendimento/i })).toBeVisible();
    });

    test('navega para /sobre ao clicar em "Sobre"', async ({ page }) => {
        await page.getByRole('link', { name: 'Sobre', exact: true }).first().click();
        await expect(page).toHaveURL('/sobre');
    });

    test('navega para /blog ao clicar em "Blog"', async ({ page }) => {
        await page.getByRole('link', { name: 'Blog', exact: true }).first().click();
        await expect(page).toHaveURL('/blog');
    });

    test('dropdown Serviços exibe os 4 links ao hover', async ({ page }) => {
        const servicosContainer = page.locator('nav .relative.group').first();
        await servicosContainer.hover();

        // Restringe à nav para não pegar links do footer
        const nav = page.locator('nav');
        await expect(nav.getByRole('link', { name: 'Terapia Individual', exact: true })).toBeVisible();
        await expect(nav.getByRole('link', { name: 'Formação de Terapeutas', exact: true })).toBeVisible();
        await expect(nav.getByRole('link', { name: 'Autoconhecimento em Grupo', exact: true })).toBeVisible();
        await expect(nav.getByRole('link', { name: 'ThetaHealing®', exact: true })).toBeVisible();
    });
});

test.describe('Navbar — Navegação Mobile', () => {

    test.use({ viewport: { width: 375, height: 667 } });

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('hamburguer abre menu lateral com os links', async ({ page }) => {
        // Seleciona o botão hamburguer por atributo de classe (Tailwind usa : que precisa de escape)
        const hamburger = page.locator('nav button[class*="md:hidden"]');
        await hamburger.click();

        await expect(page.getByRole('link', { name: 'Home', exact: true }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: 'Sobre', exact: true }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: 'Blog', exact: true }).first()).toBeVisible();
    });

    test('acordeão de Serviços mobile expande ao clicar', async ({ page }) => {
        const hamburger = page.locator('nav button[class*="md:hidden"]');
        await hamburger.click();

        const sidebar = page.locator('.fixed.top-0.left-0');
        const servicosBtn = sidebar.getByRole('button', { name: /serviços/i });
        await servicosBtn.click();

        // Verifica links dentro do sidebar (não do footer)
        await expect(sidebar.getByRole('link', { name: 'Terapia Individual', exact: true })).toBeVisible();
        await expect(sidebar.getByRole('link', { name: 'Formação de Terapeutas', exact: true })).toBeVisible();
    });

    test('fechar menu ao clicar no X', async ({ page }) => {
        const hamburger = page.locator('nav button[class*="md:hidden"]');
        await hamburger.click();

        // Sidebar aberto: tem classe translate-x-0
        const sidebar = page.locator('.fixed.top-0.left-0');
        await expect(sidebar).toHaveClass(/translate-x-0/);

        const closeBtn = sidebar.locator('button.text-gray-500');
        await closeBtn.click();

        // Sidebar fechado: volta para -translate-x-full (off-screen)
        await expect(sidebar).toHaveClass(/-translate-x-full/);
    });
});
