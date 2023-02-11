<script lang="ts">
	import type { PageData } from './$types';
	import JournalCard from '$lib/components/JournalCard.svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import type { JournalEntry } from '@prisma/client';
	import { onDestroy } from 'svelte';

	export let data: PageData;
	const searchStore = createSearchStore(data.entries || ([] as JournalEntry[]));

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if !data.entries || data.entries.length === 0}
	<div class="text-center">
		<h3 class="text-2xl font-medium">No journal entries found</h3>
		<p class="text-gray-500">You can create a new journal entry by clicking the button below</p>
	</div>
{:else}
	<div class="container mx-auto mb-8">
		<h1 class="label text-lg">Search for journal entries:</h1>
		<input
			type="text"
			class="input"
			bind:value={$searchStore.search}
			placeholder="Type keywords in journal titles or tags"
		/>
	</div>
	<div class="mb-2 flex flex-row flex-wrap justify-start gap-4 self-center ">
		{#each $searchStore.filtered as entry}
			<JournalCard
				id={entry.id}
				title={entry.title}
				body={entry.body}
				date={entry.createdAt}
				link_to="journals"
			/>
		{/each}
	</div>
{/if}

<slot></slot>
