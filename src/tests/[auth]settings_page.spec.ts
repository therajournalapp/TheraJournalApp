import { expect, test } from '@playwright/test';

test('Dashboard navigation to settings page', async ({ page }) => {
	await page.goto('/dashboard');

	// Use the dropdown to navigate to the settings page
	await page.locator('#headlessui-popover-button-1').click();
	await page.getByRole('link', { name: 'Settings' }).click();
	await expect(page).toHaveURL('/settings');
});

test('Settings page contaings expected information', async ({ page }) => {
	await page.goto('/settings');

	// confirm expected info
	await expect(page.getByText('User id: clfsuv6o20000wpo0r6mj24jb')).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
	await expect(page.getByText('Email: autotest@test.com')).toBeVisible();
});

test('Settings page data download', async ({ page }) => {
	await page.goto('/settings');

	await page.getByRole('button', { name: 'Download a copy of my data' }).waitFor();
	await page.getByRole('button', { name: 'Download a copy of my data' }).click();
	await page.getByLabel('Please confirm your password.').fill('test1234567%');

	// Click some text to take focus off the password field
	await page
		.getByText('This will download a zip file containing all of the data you have on TheraJournal')
		.click();
	await page.getByRole('button', { name: 'Confirm Download' }).click();

	// This test does not confirm that the download occurs.
});

test('Settings page nav to dashboard', async ({ page }) => {
	await page.goto('/settings');

	// Use the dropdown to navigate back to the dashboard
	await page.locator('#headlessui-popover-button-1').click();
	await page.getByRole('link', { name: 'Dashboard' }).click();
	await expect(page).toHaveURL('/dashboard');
});

test('Settings page signout', async ({ page }) => {
	await page.goto('/settings');

	await page.getByRole('button', { name: 'Sign out' }).click();

	await expect(page).toHaveURL('/');
});
