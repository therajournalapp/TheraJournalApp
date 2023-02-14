import { expect, test } from '@playwright/test';
import config from '../playwright.config.js';

let baseUrl = 'http://localhost:5173';
if (config.webServer) {
	baseUrl = `http://localhost:${config.webServer.port}`;
}

test('about page has expected h1', async ({ page }) => {
	await page.goto('/about');
	expect(await page.textContent('h1')).toBe('About this app');
});

test('Accessing dashboard unauthenticated kicks to homepage', async ({ page }) => {
	await page.goto('/dashboard');
	expect(page.url()).toBe(`${baseUrl}/`);
});
