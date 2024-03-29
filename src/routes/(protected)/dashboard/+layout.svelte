<script lang="ts">
	import { onMount } from 'svelte';
	import HabitCard from '$lib/components/HabitCard.svelte';
	import JournalCard from '$lib/components/JournalCard.svelte';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import PhPlusCircle from '~icons/ph/plus-circle';
	import PhCaretRight from '~icons/ph/caret-right';

	let habit: any;
	let journal: any;

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

<div class="app-container mb-2 flex items-baseline gap-3">
	<span class="text-3xl font-medium dark:text-neutral-200">Habits</span>
	<a
		href="/dashboard/h/new"
		class="block translate-y-[-2px] text-xl text-neutral-600 hover:text-neutral-300 hover:underline active:text-neutral-700 dark:text-neutral-400"
	>
		create new <PhPlusCircle class="inline text-[17px]" />
	</a>
</div>

<div class="card-scroll" bind:this={habit}>
	<div class="left-pad" />
	<!-- TODO: undeletable mood tracker here? -->
	{#each data.habits as habit (habit.id)}
		<div animate:flip={{ duration: 500 }} in:fly|local={{ y: 150 }} out:fade|local>
			<HabitCard
				id={habit.id}
				name={habit.name}
				date={habit.createdAt}
				entries={habit.HabitEntry}
				shared_to={habit.shared_to}
				type={habit.type}
			/>
		</div>
	{/each}
	<div class="right-pad" />
</div>

<div class="app-container mt-10 mb-2 flex items-baseline gap-3" data-sveltekit-preload-data="off">
	<a href="/journals" class="text-3xl font-medium hover:underline dark:text-neutral-200"
		>Journal Entries
	</a>
	<a
		href="/journals"
		class="block translate-y-[-2px] text-xl text-neutral-600 hover:text-neutral-300 hover:underline active:text-neutral-700 dark:text-neutral-400"
	>
		view all <PhCaretRight class="inline translate-y-[-1px] translate-x-[-5px] text-[17px]" />
	</a>
	<a
		href="/dashboard/new"
		class="-ml-2 block translate-y-[-2px] text-xl text-neutral-600 hover:text-neutral-300 hover:underline active:text-neutral-700 dark:text-neutral-400"
	>
		create new <PhPlusCircle class="inline translate-y-[-1px] text-[17px]" />
	</a>
</div>

<div class="card-scroll" bind:this={journal}>
	<div class="left-pad" />
	{#each data.entries as entry (entry.id)}
		<div animate:flip={{ duration: 500 }} in:fly|local={{ y: 150 }} out:fade|local>
			<JournalCard
				id={entry.id}
				title={entry.title}
				body={entry.body}
				date={entry.createdAt}
				shared_to={entry.shared}
				link_to="dashboard"
				share_link={entry.LinkShare.length > 0 ? entry.LinkShare[0].link : ''}
			/>
		</div>
	{/each}
	<div class="right-pad" />
</div>

<slot />

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
