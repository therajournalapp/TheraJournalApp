import { expect, test } from '@playwright/test';
import { Page } from '@playwright/test';

const handleSetupError = (errorMessage: string) => {
	console.log('Error occurred during test setup. Test results may be unreliable.');
	console.log(errorMessage);
};

const loginTestUser = async (page: Page) => {
	await page.goto('/signup');
	await page.getByPlaceholder('Email').fill('autotest@test.com');
	await page.getByPlaceholder('Password').fill('test1234567%');
	await page.getByRole('button', { name: 'Sign up' }).click();

	// wait for the redirect to the login page
	// await page.waitForURL('/login');
};

test('about page has expected h1', async ({ page }) => {
	await page.goto('/about');
	expect(await page.textContent('h1')).toBe('About this app');
});

test('Accessing dashboard unauthenticated kicks to homepage', async ({ page }) => {
	await page.goto('/dashboard');
	await expect(page).toHaveURL('/');
});

test('Accessing dashboard authenticated works', async ({ page }) => {
	await page.goto('/login');
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill('autotest@test.com');
	await page.getByPlaceholder('Email').press('Tab');
	await page.getByPlaceholder('Password').click();
	await page.getByPlaceholder('Password').fill('test1234567%');
	await page.getByRole('button', { name: 'Log in' }).click();

	// Wait for the final URL to ensure auth cookies are set.
	await page.waitForURL('/dashboard');

	await page.goto('/dashboard');
	await expect(page).toHaveURL('/dashboard');
});
