import { test, expect } from '@playwright/test';

test.describe('Página Sobre — /sobre', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/sobre');
    });

    test('exibe título principal da Ariana Borges', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /olá, sou ariana borges/i })).toBeVisible();
    });

    test('exibe foto de perfil da Ariana Borges', async ({ page }) => {
        // Alt exato para não confundir com o logo "Instituto Ariana Borges"
        const foto = page.getByRole('img', { name: 'Ariana Borges', exact: true });
        await expect(foto).toBeVisible();
    });

    test('exibe estatísticas de atendimentos e alunos', async ({ page }) => {
        await expect(page.getByText('12.000+').first()).toBeVisible();
        await expect(page.getByText('1.500+').first()).toBeVisible();
        await expect(page.getByText('10+').first()).toBeVisible();
    });

    test('seção Minha Jornada é visível', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /minha jornada/i })).toBeVisible();
    });

    test('seção "Formação e Certificações" exibe as 4 credenciais', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /formação e certificações/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /psicanálise integrativa/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /thetahealing/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /neurociência/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /mindfulness/i })).toBeVisible();
    });

    test('seção "O Instituto Ariana Borges" com links para serviços', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /o instituto ariana borges/i })).toBeVisible();

        // Usa exact: true e first() para pegar o card de conteúdo (não o link do navbar)
        await expect(page.getByRole('link', { name: 'Terapia Individual', exact: true }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: 'Formação de Terapeutas', exact: true }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: 'Autoconhecimento em Grupo', exact: true }).first()).toBeVisible();
    });

    test('botão "Agendar Atendimento" na CTA abre SchedulingChat', async ({ page }) => {
        const btn = page.getByRole('button', { name: /agendar atendimento/i });
        await expect(btn).toBeVisible();
        await btn.click();

        await expect(page.getByRole('heading', { name: /agendar atendimento/i })).toBeVisible();
    });
});

test.describe('Página Terapia Individual — /terapia-individual', () => {

    test('carrega corretamente com título e navbar', async ({ page }) => {
        await page.goto('/terapia-individual');
        // .last() pula o h1 SEO oculto do react-helmet-async
        await expect(page.getByRole('heading', { level: 1 }).last()).toBeVisible();
        await expect(page.locator('nav')).toBeVisible();
    });
});

test.describe('Página ThetaHealing — /thetahealing', () => {

    test('carrega corretamente com título e navbar', async ({ page }) => {
        await page.goto('/thetahealing');
        await expect(page.getByRole('heading', { level: 1 }).last()).toBeVisible();
        await expect(page.locator('nav')).toBeVisible();
    });
});

test.describe('Página Blog — /blog', () => {

    test('carrega corretamente com heading do blog', async ({ page }) => {
        await page.goto('/blog');
        await expect(page.locator('body')).toBeVisible();
        await expect(page.getByRole('heading', { name: /blog|artigos/i }).first()).toBeVisible();
    });

    test('navbar está visível na página de blog', async ({ page }) => {
        await page.goto('/blog');
        await expect(page.locator('nav')).toBeVisible();
    });
});

test.describe('Página DNA Básico — /dna-basico', () => {

    test('carrega a landing page com conteúdo DNA Básico', async ({ page }) => {
        await page.goto('/dna-basico');
        await expect(page.locator('body')).toBeVisible();
        // Heading específico da página DNA Básico
        await expect(page.getByRole('heading', { name: /dna básico|dna basico/i })).toBeVisible();
        // Nota: navbar é ocultada apenas via subdomínio (dnabasico.arianaborges.com),
        // no acesso pela rota /dna-basico a navbar permanece visível
    });
});
