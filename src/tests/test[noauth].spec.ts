import { expect, test } from '@playwright/test';

test('Accessing dashboard unauthenticated kicks to landing page', async ({ page }) => {
	await page.goto('/dashboard');
	await expect(page).toHaveURL('/');
});

test('Accessing settings unauthenticated kicks to landing page', async ({ page }) => {
	await page.goto('/settings');
	await expect(page).toHaveURL('/');
});

test('Accessing sharing page unauthenticated kicks to landing page', async ({ page }) => {
	await page.goto('/shared');
	await expect(page).toHaveURL('/');
});
