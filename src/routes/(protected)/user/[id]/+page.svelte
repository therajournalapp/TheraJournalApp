<script lang="ts">
	import { onMount } from 'svelte';

	export let data: any;

	async function getMoodEntries() {
		// Adds the shared user id as a parameter
		const search_params = new URLSearchParams([['sharedId', data.shared_user_id]]);

		// Fetches the shared mood entries
		const res = await fetch('/api/analysis/mood?' + search_params.toString(), {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		const mood_entries = await res.json();

		console.log('Retrieved mood entries');
		console.log(mood_entries);
	}

	async function getHabitNames() {
		const search_params = new URLSearchParams([['sharedId', data.shared_user_id]]);

		// Fetches the shared mood entries
		const res = await fetch('/api/analysis/habit?' + search_params.toString(), {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		const habit_names = await res.json();

		console.log('Retrieved habit names');
		console.log(habit_names);
	}

	async function getHabitEntries(habit: String) {
		const params = [
			['sharedId', data.shared_user_id],
			['habit', habit]
		];

		const search = new URLSearchParams(params);

		const res = await fetch('/api/analysis/habitEntry?' + search.toString(), {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		const habit_entries = await res.json();

		console.log('Retrieved ' + habit + ' entries');
		console.log(habit_entries);
	}
	onMount(() => {
		getMoodEntries();
		getHabitEntries('sleep');
		getHabitNames();
	});
</script>

<!-- {console.log('Data.entries: ' + data.entries)}
{console.log(data.entries)} -->
<h1>Hello from user</h1>
<button
	on:click={() => {
		getHabitEntries('sleep');
	}}
>
	test
</button>

<!-- <div class="app-container mt-10 mb-2 flex items-baseline">
	<a href="/shared#" class="mr-3 text-3xl font-medium hover:underline">Shared Entries</a>
</div>
<div class="card-scroll" bind:this={journal}>
	<div class="left-pad" />
	{#if data.entries && data.entries.length === 0}
		<div
			class="relative flex h-56 w-[400px] min-w-[16rem] flex-col overflow-hidden rounded-lg border-2 border-dashed border-black border-opacity-60 p-4 shadow-md shadow-offwhite-light"
		>
			<div class="flex h-full w-full items-center justify-center">
				<PhXCircle class="mr-2 text-[160px] opacity-60" />
				<div class="w-fit max-w-[250px]">
					<p class="text-xl font-medium">No Shared Entries</p>

					<p>If anyone shares entries with you in the future they will show up here.</p>
				</div>
			</div>
		</div>
	{/if}

	{#each data.entries as entry (entry.id)}
		<div animate:flip={{ duration: 500 }} in:fly|local={{ y: 150 }} out:fade|local>
			<JournalCard
				id={entry.id}
				title={entry.title}
				body={entry.body}
				date={entry.createdAt}
				shared_by={entry.user.email}
				link_to="shared"
			/>
		</div>
	{/each}
	<div class="right-pad" />
</div>

<HabitCard
id={event.id}
name={event.name}
date={event.createdAt}
entries={event.HabitEntry}
shared_by={event.user.email}
type={event.type}
link_to="shared" -->
/>
