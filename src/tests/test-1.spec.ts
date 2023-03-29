import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.locator('body').click();
	await page.goto('about:blank');
	await page.goto('chrome-error://chromewebdata/');
	await page.goto('http://localhost:5173/signup');
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill('autotest@test.com');
	await page.getByPlaceholder('Email').press('Tab');
	await page.getByPlaceholder('Password').click();
	await page.getByPlaceholder('Password').fill('test1234567%');
	await page.getByRole('button', { name: 'Sign up' }).click();
});
