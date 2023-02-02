<script lang="ts">
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	const id = $page.params.index;

	onMount(async () => {
		const response = await fetch('/api/journalEntry', {
			method: 'DELETE',
			body: JSON.stringify({ id: id }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const ok = response.ok;
		invalidateAll();
		window.location.href = '/dashboard/';
	});
</script>

<div class="flex h-screen w-full items-center ">
	<div class="mx-auto">
		<label class="loading white">
			<progress class="loading white" />
			Deleting {id}...
		</label>
	</div>
</div>

<style>
</style>
