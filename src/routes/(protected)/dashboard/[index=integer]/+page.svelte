<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import ShareToggle from '$lib/components/ShareToggle.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';
</script>

<!-- <div class="h-18 flex justify-between bg-offwhite py-5">
	<input type="text" id="entry-title" value={data.entry?.title} class="title" />

	<ShareToggle big={true} />
</div> -->

<Editor
	id={parseInt($page.params.index)}
	title={data.entry?.title ?? ''}
	body={data.entry?.body ?? ''}
/>

<style>
</style>
