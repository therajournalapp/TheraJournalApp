// auth.setup.ts
import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
	// Perform authentication steps
	await page.goto('/login');
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill('autotest@test.com');
	await page.getByPlaceholder('Email').press('Tab');
	await page.getByPlaceholder('Password').click();
	await page.getByPlaceholder('Password').fill('test1234567%');
	await page.getByRole('button', { name: 'Log in' }).click();

	// Wait for the final URL to ensure auth cookies are set.
	await page.waitForURL('/dashboard');

	// Store the authenticated browser state in a file.
	await page.context().storageState({ path: authFile });
});
