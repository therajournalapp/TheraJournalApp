<script lang="ts">
	import type { PageData } from './$types';
	import JournalCard from '$lib/components/JournalCard.svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import type { JournalEntry } from '@prisma/client';
	import { onDestroy } from 'svelte';

	export let data: PageData;

	// bundle entries title and tags into easy to search string
	type SearchTerms = JournalEntry & {
		terms: string;
	};
	const searchTerms = data.entries?.map((entry) => {
		console.log(entry.tags);
		if (entry.tags) {
			return {
				...entry,
				terms: `${entry.title} ${entry.tags.split(',').join(' ')}`
			};
		} else {
			return {
				...entry,
				terms: `${entry.title}`
			};
		}
	});

	const searchStore = createSearchStore(searchTerms || ([] as SearchTerms[]));

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if !data.entries || data.entries.length === 0}
	<div class="text-center">
		<h3 class="text-2xl font-medium dark:text-neutral-200">No journal entries found</h3>
		<p class="text-gray-500 dark:text-neutral-300">
			You can create a new journal entry by clicking the button below
		</p>
	</div>
{:else}
	<div class="container mx-auto mb-8 dark:text-neutral-200">
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
				shared_to={entry.shared}
				share_link={entry.LinkShare.length > 0 ? entry.LinkShare[0].link : ''}
			/>
		{/each}
	</div>
{/if}

<slot />
