<script lang="ts">
	import { onMount } from 'svelte';
	import HabitCard from '$lib/components/HabitCard.svelte';
	import JournalCard from '$lib/components/JournalCard.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import StandardToggle from '$lib/components/StandardToggle.svelte';
	import 'iconify-icon';

	let newMedication = false;
	let habit: any;
	let journal: any;
	
	let newHabitDialog: HTMLDialogElement;
	
	// Lets desktop users scroll horizontal sections with scroll wheel
	onMount(() => {
		habit.addEventListener('wheel', (ev: any) => {
			ev.preventDefault();
			habit.scrollLeft += ev.deltaY + ev.deltaX;
		});

		journal.addEventListener('wheel', (ev: any) => {
			ev.preventDefault();
			journal.scrollLeft += ev.deltaY + ev.deltaX;
		});
	});

	// Get data from +layout.server.ts load function
	export let data: any;
</script>

<svelte:head>
	<title>TheraJournal</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="app-container mb-2 flex items-baseline">
	<a href="/dashboard#" class="mr-3 text-3xl font-medium hover:underline">Habits</a>
	<button
		class="block translate-y-[-2px] text-xl text-neutral-600 hover:text-neutral-300 hover:underline active:text-neutral-700"
		on:click={() => {
			newHabitDialog.showModal();
		}}
	>
		add new <iconify-icon inline icon="ph:plus-circle" class="translate-y-[1px]" />
	</button>
</div>

<div class="card-scroll" bind:this={habit}>
	<div class="left-pad" />
	{#each data.habits as habit}
		<HabitCard habitID={habit.id} name={habit.name} entries={habit.HabitEntry} />
	{/each}
</div>

<div class="app-container mt-10 mb-2 flex items-baseline" data-sveltekit-preload-data="off">
	<a href="/journals" class="mr-3 text-3xl font-medium hover:underline">Journal Entries</a>
	<a
		href="/dashboard/new"
		class="block translate-y-[-2px] text-xl text-neutral-600 hover:text-neutral-300 hover:underline active:text-neutral-700"
	>
		create new <iconify-icon inline icon="ph:plus-circle" class="translate-y-[1px]" />
	</a>
</div>

<div class="card-scroll" bind:this={journal}>
	<div class="left-pad" />
	{#each data.entries as entry}
		<JournalCard
			id={entry.id}
			title={entry.title}
			body={entry.body}
			date={entry.createdAt}
			shared_to={entry.shared}
			link_to="dashboard"
		/>
	{/each}
	<div class="right-pad" />
</div>

<slot />

<Dialog bind:dialog={newHabitDialog}>
	<div class=" p-2">
		<form action="?/newHabit" method="post" class="form">
			<h1 class="mb-4 text-xl text-primary-dark">Add New Habit Tracker</h1>
			<label for="name" class="label">Habit name: </label>
			<input
				class="input"
				type="text"
				placeholder="Give your habit a name"
				name="name"
				id="name"
				maxlength="255"
			/>
			<!-- Debatable if this needs a 'type', let this be 'custom' for now-->
			<!-- <div class="mt-2 flex items-center justify-center space-x-2">
				<label for="type">Is this for tracking a medication?</label>
				<StandardToggle id="type" value="Medication" name="type" />
			</div> -->

			<div class="mt-4 flex flex-row justify-end space-x-2">
				<button type="button" class="btn-gray" on:click={() => newHabitDialog.close()}>
					Cancel
				</button>
				<button type="submit" class="btn">Save</button>
			</div>
		</form>
	</div>
</Dialog>

<style lang="postcss">
	.card-scroll {
		@apply flex w-screen max-w-full shrink-0 gap-5 overflow-auto p-2;
	}

	.left-pad {
		@apply block h-28 min-w-[0.5rem] md:min-w-[7vw];
	}

	.right-pad {
		@apply block h-28 min-w-[0.8rem] md:min-w-[7.5vw];
	}

	/* Custom scroll bars for card-scroll */
	/* based on: https://dev.to/xtrp/how-to-create-a-beautiful-custom-scrollbar-for-your-site-in-plain-css-1mjg */
	.card-scroll::-webkit-scrollbar {
		height: 20px;
	}

	.card-scroll::-webkit-scrollbar-track {
		background-color: transparent;
		margin-left: 9vw;
		margin-right: 9.5vw;
		margin-left: 2rem;
		margin-right: 2rem;
	}

	.card-scroll::-webkit-scrollbar-thumb {
		border-radius: 20px;
		border: 7.5px solid transparent;
		background-clip: content-box;
		background-color: rgba(0, 0, 0, 0);
		/* background-color: #d6dee1; */
		transition: 2s;
	}

	.card-scroll:hover::-webkit-scrollbar-thumb {
		background-color: #d6dee1;
	}

	/* md */
	@media (min-width: 768px) {
		.card-scroll::-webkit-scrollbar-track {
			margin-left: 9.5vw;
			margin-right: 10vw;
		}
	}

	/* lg */
	@media (min-width: 1280px) {
		.left-pad,
		.right-pad {
			min-width: calc((100vw - 1300px) / 2);
		}

		.card-scroll::-webkit-scrollbar-track {
			margin-left: calc((100vw - 1260px) / 2);
			margin-right: calc((100vw - 1260px) / 2);
		}
	}
</style>
