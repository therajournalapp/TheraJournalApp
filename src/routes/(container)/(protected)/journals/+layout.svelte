<script lang="ts">
	import type { PageData } from './$types';
	import JournalCard from '$lib/components/JournalCard.svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import type { JournalEntry } from '@prisma/client';
	import { onDestroy } from 'svelte';
	import StandardToggle from '$lib/components/StandardToggle.svelte';

	export let data: PageData;

	// bundle entries title and tags into easy to search string
	type SearchTerms = JournalEntry & {
		terms: string;
		shared: boolean;
		startDate: string;
		endDate: string;
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
	<div class="container mx-auto mb-8 rounded-lg p-5 dark:text-neutral-200">
		<!-- <StandardToggle id="cardview" name="cardview" value="true" /> -->
		<!-- <span class="float-right">Card View</span> -->
		<h1 class="label text-lg">Search for your journals:</h1>
		<input
			type="text"
			class="input"
			bind:value={$searchStore.search}
			placeholder="Type keywords in journal titles or tags"
		/>
		<div class="mt-4 flex items-center">
			<p class="mr-3 font-medium">Filters</p>

			<button class="btn btn-alt"> Reset Filters </button>
		</div>

		<div>
			<div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
				<select
					class="w-full rounded-md border-r-4 border-transparent bg-white py-3 pl-4 text-sm shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 focus:border-gray-500 focus:ring-0 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700"
				>
					<option value="">Last Month</option>
					<option value="200">Last Year</option>
					<option value="400">All Time</option>
				</select>
				<select
					class="w-full rounded-md border-r-4 border-transparent bg-white py-3 pl-4 text-sm shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 focus:border-gray-500 focus:ring-0 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700"
				>
					<option value="">Private / Shared</option>
					<option value="200">Private Only</option>
					<option value="400">Shared Only</option>
				</select>
			</div>
		</div>
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
