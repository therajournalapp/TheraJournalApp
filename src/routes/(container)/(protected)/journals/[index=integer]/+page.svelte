<script lang="ts">
	import EditorWrapper from '$lib/components/EditorWrapper.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.entry?.title ?? 'Entry'}</title>
</svelte:head>

{#if data.entry}
	<EditorWrapper back_link="/journals">
		<Editor
			id={parseInt($page.params.index)}
			title={data.entry?.title ?? ''}
			date={data.entry.createdAt}
			body={data.entry?.body ?? ''}
			shared_to={data.entry?.shared_to ?? []}
			back_link="/journals"
		/>
	</EditorWrapper>
{:else}
	<EditorWrapper back_link="/journals">
		<div
			class="fixed inset-0 top-1/2 left-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-10"
		>
			<p>Error: Journal Entry not found</p>
		</div>
	</EditorWrapper>
{/if}
