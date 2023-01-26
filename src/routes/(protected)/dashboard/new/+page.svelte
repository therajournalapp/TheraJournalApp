<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	onMount(() => {
		goto('/dashboard/' + data.id);
	});
</script>

<div class="flex h-screen w-full items-center ">
	<div class="mx-auto">
		<label class="loading white">
			<progress class="loading white" />
			Creating...
		</label>
	</div>
</div>
