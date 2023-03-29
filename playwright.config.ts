import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

const authTestPattern = /.*\[auth\].*\.spec\.ts/;
const noAuthTestPattern = /.*\[noauth\].*\.spec\.ts/;

export default defineConfig({
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
