import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3001/');
        // Wait for the main content to be visible
        await page.waitForSelector('main', { state: 'visible' });
    });

    test('should display the correct title and hero text', async ({ page }) => {
        const heroText = page.locator('h1', { hasText: 'Colabora y crea documentos en equipo' });
        await expect(heroText).toBeVisible();

        const description = page.locator('p', { hasText: 'team-doc te permite crear, editar y compartir documentos con tu equipo en tiempo real.' });
        await expect(description).toBeVisible();
    });

    test('should have visible "Comenzar gratis" and "Ver demo" buttons', async ({ page }) => {
        const startButton = page.getByRole('button', { name: 'Comenzar gratis' });
        await expect(startButton).toBeVisible();

        const demoButton = page.getByRole('button', { name: 'Ver demo' });
        await expect(demoButton).toBeVisible();
    });

    test('should display header with navigation links', async ({ page }) => {
        const header = page.locator('header');
        await expect(header).toBeVisible();

        const logo = header.getByRole('link', { name: 'team-doc' });
        await expect(logo).toBeVisible();

        const featuresLink = header.getByRole('link', { name: 'Características' });
        const pricingLink = header.getByRole('link', { name: 'Precios' });
        await expect(featuresLink).toBeVisible();
        await expect(pricingLink).toBeVisible();
    });

    test('should navigate to login page when "Iniciar sesión" is clicked', async ({ page }) => {
        const loginButton = page.locator('header').getByRole('link', { name: 'Iniciar sesión' });
        await loginButton.click();
        await page.waitForURL(/\/login/);
    });

    test('should navigate to register page when "Registrarse" is clicked', async ({ page }) => {
        const registerButton = page.locator('header').getByRole('link', { name: 'Registrarse' });
        await registerButton.click();
        await page.waitForURL(/\/register/);
    });

    test('should display features section', async ({ page }) => {
        const featuresSection = page.locator('#features');
        await expect(featuresSection).toBeVisible();

        const featuresHeading = featuresSection.getByRole('heading', { name: 'Características principales' });
        await expect(featuresHeading).toBeVisible();

        const featureTitles = [
            'Edición colaborativa',
            'Gestión de equipos',
            'Control de versiones',
            'Seguridad avanzada'
        ];

        for (const title of featureTitles) {
            const featureTitle = featuresSection.getByRole('heading', { name: title });
            await expect(featureTitle).toBeVisible();
        }
    });

    test('should display pricing section', async ({ page }) => {
        const pricingSection = page.locator('#pricing');
        await expect(pricingSection).toBeVisible();

        const pricingHeading = pricingSection.getByRole('heading', { name: 'Planes y precios' });
        await expect(pricingHeading).toBeVisible();

        const planNames = ['Básico', 'Pro', 'Empresa'];
        for (const name of planNames) {
            const planHeading = pricingSection.getByRole('heading', { name });
            await expect(planHeading).toBeVisible();
        }
    });

    test('should display CTA section', async ({ page }) => {
        const ctaHeading = page.getByRole('heading', { name: 'Comienza a colaborar hoy mismo' });
        await expect(ctaHeading).toBeVisible();

        const ctaButton = page.getByRole('button', { name: 'Prueba gratis por 14 días' });
        await expect(ctaButton).toBeVisible();
    });

    test('should display footer with links', async ({ page }) => {
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();

        const copyright = footer.getByText(/© 2024 team-doc/);
        await expect(copyright).toBeVisible();

        const footerLinks = [
            'Términos de servicio',
            'Política de privacidad',
            'Contacto'
        ];

        for (const linkText of footerLinks) {
            const link = footer.getByRole('link', { name: linkText });
            await expect(link).toBeVisible();
        }
    });

    test('should have animated background', async ({ page }) => {
        const background = page.locator('.animate-gradient-xy');
        await expect(background).toBeVisible();
    });
});