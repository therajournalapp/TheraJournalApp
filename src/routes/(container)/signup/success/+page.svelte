<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		setTimeout(async () => {
			await goto('/login/first');
		}, 1600);
	});
</script>

<h1 class="my-6 text-center text-3xl font-medium dark:text-neutral-200 sm:text-4xl">
	Succesfully Signed Up!
</h1>
<p class="mx-auto mb-6 max-w-2xl text-center text-lg dark:text-neutral-200">
	Redirecting you to the
	<a href="/login/first" class="link">login</a> page.

	<label class="loading mt-6">
		<progress class="loading" />
		Loading…
	</label>
</p>
