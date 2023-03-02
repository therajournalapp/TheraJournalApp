import { expect, test } from '@playwright/test';
import type { UserRecord } from 'firebase-admin/auth';
import { auth } from '$lib/server/lucia';
import config from '../playwright.config.js';
import { LuciaError } from 'lucia-auth';
import { fb_auth } from '$lib/server/admin';
let baseUrl = 'http://localhost:5173';
if (config.webServer) {
	baseUrl = `http://localhost:${config.webServer.port}`;
}

// Request context is reused by all tests in the file.
let apiContext;

const handleSetupError = (errorMessage: string) => {
	console.log('Error occurred during test setup. Test results may be unreliable.');
	console.log(errorMessage);
};

test.beforeAll(async () => {
	// const body = new FormData();
	// body.append('email', 'abc@def.com');
	// body.append('password', 'test');
	// try {
	// 	console.log(`POSTing to ${baseUrl}/api/signIn`)
	// 	const res = await fetch(`${baseUrl}/api/signIn`, { body: body, method: 'POST' });
	// }
	// catch (err: any) {
	// 	console.log("Error while POSTing to /api/signIn: " + err.cause.message);
	// }

	const email = 'autotest@test.com';
	const password = 'test';

	/* Create Firebase user */
	let fb_user: UserRecord | null = null;
	try {
		fb_user = await fb_auth.createUser({
			email: email,
			emailVerified: false,
			password: password
		});
	} catch (error) {
		handleSetupError('error: error creating new fb user: ' + error);
		return;
	}

	const fb_id = fb_user.uid;
	const fb_email = fb_user.email;
	const fb_email_verified = fb_user.emailVerified;

	if (fb_user && fb_email) {
		try {
			// Create Lucia Auth User
			const user = await auth.createUser('fb_id', fb_id, {
				password: fb_id,
				attributes: {
					fb_id: fb_id,
					email: fb_email,
					email_verified: fb_email_verified
				}
			});
			console.log('Created new lucia auth user: ' + user.userId);
		} catch (e) {
			// fb_id already in use
			if (e instanceof LuciaError) {
				console.log(e.message);
			} else if (e instanceof Error) {
				console.log(e.message);
			}
			handleSetupError('error: firebase id already in use');
		}
	} else {
		handleSetupError('error: fb_user is null');
	}
});

test('about page has expected h1', async ({ page }) => {
	await page.goto('/about');
	expect(await page.textContent('h1')).toBe('About this app');
});

test('Accessing dashboard unauthenticated kicks to homepage', async ({ page }) => {
	await page.goto('/dashboard');
	expect(page.url()).toBe(`${baseUrl}/`);
});
