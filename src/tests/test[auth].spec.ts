import { expect, test } from '@playwright/test';

test('Accessing dashboard authenticated works', async ({ page }) => {
	await page.goto('/dashboard');
	await expect(page).toHaveURL('/dashboard');
});
