<script>
	import '../app.pcss';
	import Header from './(container)/Header.svelte';
</script>

<div class="app">
	<Header />

	<main class="flex-1">
		<slot />
	</main>

	<footer class="mx-auto py-6">
		<p>© 2022 Copyright: TheraJournal</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
