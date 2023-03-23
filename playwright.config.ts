import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 5173,
		reuseExistingServer: true
	},
	testDir: 'src/tests'
};

export default config;
