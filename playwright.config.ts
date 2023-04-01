import { defineConfig, devices } from '@playwright/test';

// Any file inside src/tests that contains '[auth]' will be run in an authenticated browser state.
const authTestPattern = /.*\[auth\].*\.spec\.ts/;

// Any file inside src/tests that contains '[noauth]' will be run in an unauthenticated browser state.
const noAuthTestPattern = /.*\[noauth\].*\.spec\.ts/;

export default defineConfig({
	retries: 3, // failed tests get 3 additional tries to pass. Flaky tests are reported separately from passed tests.
	webServer: {
		command: 'npm run build && npm run preview',
		port: 5173,
		reuseExistingServer: true
	},
	testDir: 'src/tests',
	use: {
		baseURL: 'http://127.0.0.1:5173'
	},
	projects: [
		// Setup project
		{
			name: 'setup',
			testMatch: /.*\.setup\.ts/
		},
		{
			name: 'chromium unauthenticated',
			use: {
				...devices['Desktop Chrome']
			},
			testMatch: noAuthTestPattern
		},
		{
			name: 'firefox unauthenticated',
			use: {
				...devices['Desktop Firefox']
			},
			testMatch: noAuthTestPattern
		},
		{
			name: 'chromium authenticated',
			use: {
				...devices['Desktop Chrome'],
				// Use prepared auth state.
				storageState: 'playwright/.auth/user.json'
			},
			dependencies: ['setup'],
			testMatch: authTestPattern
		},

		{
			name: 'firefox authenticated',
			use: {
				...devices['Desktop Firefox'],
				// Use prepared auth state.
				storageState: 'playwright/.auth/user.json'
			},
			dependencies: ['setup'],
			testMatch: authTestPattern
		}
	]
});
