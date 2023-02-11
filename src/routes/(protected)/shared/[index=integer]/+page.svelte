<script lang="ts">
	import EditorWrapper from '$lib/components/EditorWrapper.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.entry?.title ?? 'Entry'}</title>
</svelte:head>

{#if data.entry}
	<EditorWrapper back_link="/shared">
		<Editor
			id={data.entry.id}
			title={data.entry.title}
			body={data.entry.body}
			viewOnly
			back_link="/shared"
		/>
	</EditorWrapper>
{:else}
	<EditorWrapper back_link="/shared">
		<div
			class="fixed inset-0 top-1/2 left-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-10"
		>
			<p>Error: Journal Entry not found</p>
		</div>
	</EditorWrapper>
{/if}

<style>
</style>
