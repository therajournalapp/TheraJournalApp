import { expect, test } from '@playwright/test';

test('Accessing dashboard unauthenticated kicks to landing page', async ({ page }) => {
	await page.goto('/dashboard');
	await expect(page).toHaveURL('/');
});
