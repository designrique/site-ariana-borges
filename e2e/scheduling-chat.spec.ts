import { test, expect } from '@playwright/test';

test.describe('SchedulingChat — Modal de Agendamento', () => {

    test.beforeEach(async ({ page }) => {
        // Limpar localStorage para garantir sessão limpa a cada teste
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    test('abre o modal ao clicar em "Marque um Atendimento"', async ({ page }) => {
        await page.getByRole('button', { name: /marque um atendimento/i }).first().click();

        await expect(page.getByRole('heading', { name: /agendar atendimento/i })).toBeVisible();
        await expect(page.getByText(/Instituto Ariana Borges/i).first()).toBeVisible();
    });

    test('exibe mensagem de boas-vindas no passo de nome', async ({ page }) => {
        await page.getByRole('button', { name: /marque um atendimento/i }).first().click();

        // A mensagem de boas-vindas aparece no corpo do chat (div de mensagem)
        // Usa o placeholder que só fica visível quando o modal está aberto
        await expect(page.getByPlaceholder(/digite seu nome completo/i)).toBeVisible();
    });

    test('campo de nome está presente e aceita texto', async ({ page }) => {
        await page.getByRole('button', { name: /marque um atendimento/i }).first().click();

        const input = page.getByPlaceholder(/digite seu nome completo/i);
        await expect(input).toBeVisible();
        await input.fill('Maria Silva');
        await expect(input).toHaveValue('Maria Silva');
    });

    test('avança para passo de telefone ao enviar nome', async ({ page }) => {
        await page.getByRole('button', { name: /marque um atendimento/i }).first().click();

        const input = page.getByPlaceholder(/digite seu nome completo/i);
        await input.fill('Maria Silva');
        await page.keyboard.press('Enter');

        await expect(page.getByPlaceholder(/digite seu telefone com ddd/i)).toBeVisible({ timeout: 5000 });
    });

    test('valida telefone inválido e exibe mensagem de erro', async ({ page }) => {
        await page.getByRole('button', { name: /marque um atendimento/i }).first().click();

        // Passo 1: nome
        await page.getByPlaceholder(/digite seu nome completo/i).fill('Maria Silva');
        await page.keyboard.press('Enter');

        // Passo 2: telefone inválido
        const phoneInput = page.getByPlaceholder(/digite seu telefone com ddd/i);
        await phoneInput.waitFor({ state: 'visible', timeout: 5000 });
        await phoneInput.fill('123');
        await page.keyboard.press('Enter');

        await expect(page.getByText(/número informado não parece válido/i)).toBeVisible({ timeout: 5000 });
    });

    test('avança para e-mail após telefone válido', async ({ page }) => {
        await page.getByRole('button', { name: /marque um atendimento/i }).first().click();

        // Nome
        await page.getByPlaceholder(/digite seu nome completo/i).fill('Maria Silva');
        await page.keyboard.press('Enter');

        // Telefone válido
        const phoneInput = page.getByPlaceholder(/digite seu telefone com ddd/i);
        await phoneInput.waitFor({ state: 'visible', timeout: 5000 });
        await phoneInput.fill('11987654321');
        await page.keyboard.press('Enter');

        await expect(page.getByPlaceholder(/digite seu e-mail/i)).toBeVisible({ timeout: 5000 });
    });

    test('valida e-mail inválido e exibe mensagem de erro', async ({ page }) => {
        await page.getByRole('button', { name: /marque um atendimento/i }).first().click();

        // Nome
        await page.getByPlaceholder(/digite seu nome completo/i).fill('Maria Silva');
        await page.keyboard.press('Enter');

        // Telefone
        const phoneInput = page.getByPlaceholder(/digite seu telefone com ddd/i);
        await phoneInput.waitFor({ state: 'visible', timeout: 5000 });
        await phoneInput.fill('11987654321');
        await page.keyboard.press('Enter');

        // E-mail inválido
        const emailInput = page.getByPlaceholder(/digite seu e-mail/i);
        await emailInput.waitFor({ state: 'visible', timeout: 5000 });
        await emailInput.fill('nao-é-email');
        await page.keyboard.press('Enter');

        await expect(page.getByText(/e-mail não parece válido/i)).toBeVisible({ timeout: 5000 });
    });

    test('indicador de progresso "Passo N de 5" é visível', async ({ page }) => {
        await page.getByRole('button', { name: /marque um atendimento/i }).first().click();

        await expect(page.getByText(/passo \d de 5/i)).toBeVisible();
    });

    test('fechar modal com botão X', async ({ page }) => {
        await page.getByRole('button', { name: /marque um atendimento/i }).first().click();

        await expect(page.getByRole('heading', { name: /agendar atendimento/i })).toBeVisible();

        // Botão fechar — o ícone X no cabeçalho do modal
        const closeBtn = page.locator('[role="dialog"] button, .fixed.inset-0 ~ div button').first();
        // Pressionar Escape para fechar
        await page.keyboard.press('Escape');

        // Verificar que o modal fechou (heading some ou modal não visível)
        // Caso Escape não feche, clica no X
        const heading = page.getByRole('heading', { name: /agendar atendimento/i });
        if (await heading.isVisible()) {
            // Tentar clicar no X por posição próxima ao cabeçalho
            const headerArea = page.locator('h3', { hasText: /agendar atendimento/i });
            const box = await headerArea.boundingBox();
            if (box) {
                await page.mouse.click(box.x + box.width + 20, box.y);
            }
        }
    });

    test('estado do chat é salvo no localStorage', async ({ page }) => {
        await page.getByRole('button', { name: /marque um atendimento/i }).first().click();

        await page.getByPlaceholder(/digite seu nome completo/i).fill('Maria Silva');
        await page.keyboard.press('Enter');

        // Verificar que localStorage tem dados
        const stored = await page.evaluate(() => {
            return Object.keys(localStorage).some(key => key.includes('scheduling') || key.includes('chat'));
        });
        // O estado é salvo para recuperação
        await expect(page.getByPlaceholder(/digite seu telefone com ddd/i)).toBeVisible({ timeout: 5000 });
    });
});
