import { expect, test } from '@playwright/test';
import config from '../../playwright.config.js';
import FormData from 'form-data';
let baseUrl = 'http://127.0.0.1:5173';
if (config.webServer) {
	// baseUrl = `http://localhost:${config.webServer.port}`;
}

// Request context is reused by all tests in the file.
let apiContext;

let testUserFbId: string;

const handleSetupError = (errorMessage: string) => {
	console.log('Error occurred during test setup. Test results may be unreliable.');
	console.log(errorMessage);
};

const loginTestUser = async () => {
	const loginFormData = new FormData();
	loginFormData.append('email', 'abc@def.com');
	loginFormData.append('password', 'test');
	const request = new Request(`${baseUrl}/api/signIn`, {
		method: 'POST',
		body: JSON.stringify(loginFormData)
	});

	try {
		console.log(`POSTing to ${baseUrl}/api/signIn`);
		const response = await fetch(request);
		loginFormData.submit(`${baseUrl}/api/signIn`, function (err, res) {
			// res – response object (http.IncomingMessage)  //
			res.resume();
		});
	} catch (err: any) {
		console.log('Error while POSTing to /api/signIn: ', err);
	}
	const email = 'autotest@test.com';
	const password = 'test';
};

test('about page has expected h1', async ({ page }) => {
	await page.goto('/about');
	expect(await page.textContent('h1')).toBe('About this app');
});

test('Accessing dashboard unauthenticated kicks to homepage', async ({ page }) => {
	await page.goto('/dashboard');
	expect(page.url()).toBe(`${baseUrl}/`);
});

test('Accessing dashboard authenticated works', async ({ page }) => {
	await loginTestUser();
	await page.goto('/dashboard');
	expect(page.url()).toBe(`${baseUrl}/dashboard`);
});
