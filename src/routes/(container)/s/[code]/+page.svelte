<script lang="ts">
	//import params from '$app/stores';
	import { page } from '$app/stores';
	import Editor from '$lib/components/Editor.svelte';
	import EditorWrapper from '$lib/components/EditorWrapper.svelte';
	let code = $page.params.code;

	export let data;
</script>

{#if data.entry}
	<EditorWrapper back_link="/dashboard">
		<Editor
			id={data.entry.id}
			title={data.entry.title}
			date={data.entry.createdAt}
			body={data.entry.body}
			view_only
			back_link="/shared"
			tags={[]}
		/>
	</EditorWrapper>
{:else}
	<EditorWrapper back_link="/dashboard">
		<div
			class="fixed inset-0 top-1/2 left-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-10"
		>
			<p>Error: Journal Entry not found</p>
		</div>
	</EditorWrapper>
{/if}
