import { expect, test } from '@playwright/test';

test('Accessing dashboard authenticated works', async ({ page }) => {
	await page.goto('/dashboard');
	await expect(page).toHaveURL('/dashboard');
});

// Test some journal entry editor stuff
test('Journal entry editor opens', async ({ page }) => {
	await page.locator('#headlessui-popover-button-1').click();
	await page.getByRole('link', { name: 'Dashboard' }).click();
	await page
		.locator('div')
		.filter({ hasText: 'Journal Entries create new' })
		.getByRole('link', { name: 'create new' })
		.click();
	await page.locator('.ProseMirror').fill('This is a test.');
	await page.locator('.ProseMirror').press('Enter');
	await page.locator('div').filter({ hasText: 'This is a test.' }).nth(1).press('Enter');
	await page
		.locator('div')
		.filter({ hasText: 'This is a test.' })
		.nth(1)
		.fill('This is a test.\n\n\n\n\nTwo lines later.');

	// Taggin
	// await page.getByRole('button', { name: 'Tags' }).click();
	// await page.getByPlaceholder('Type a new tag').click();
	// await page.getByPlaceholder('Type a new tag').fill('test-tag');
	// await page.getByPlaceholder('Type a new tag').press('Enter');
	// await page.getByPlaceholder('Type a new tag').fill('test-tag');
	// await page.getByPlaceholder('Type a new tag').press('Enter');
	// await page.getByPlaceholder('Type a new tag').click();
	// await page.getByPlaceholder('Type a new tag').click();
	// await page.getByText('test-tag ×').click();
	// await page.getByRole('button', { name: 'Save' }).click();
	// await page.getByRole('link', { name: 'Untitled Entry' }).click();
	// await page.locator('#headlessui-menu-button-3').click();
});
