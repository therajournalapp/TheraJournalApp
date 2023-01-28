<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import ShareToggle from '$lib/components/ShareToggle.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{data.entry?.title ?? 'Entry'}</title>
</svelte:head>

<Editor
	id={parseInt($page.params.index)}
	title={data.entry?.title ?? ''}
	body={data.entry?.body ?? ''}
/>

<style>
</style>
