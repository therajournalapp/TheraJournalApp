<script>
	import '../app.pcss';
	import Header from '$lib/components/Header.svelte';

	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';

	handleSession(page);
</script>

<div class="app">
	<Header />

	<main class="flex-1">
		<slot />
	</main>

	<footer class="mx-auto py-6 dark:text-neutral-300">
		<p>© 2022 Copyright: TheraJournal</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100svh;
	}
</style>
