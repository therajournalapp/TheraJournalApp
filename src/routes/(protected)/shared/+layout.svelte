<script lang="ts">
	import { onMount } from 'svelte';
	import HabitCard from '$lib/components/HabitCard.svelte';
	import JournalCard from '$lib/components/JournalCard.svelte';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	import PhXCircle from '~icons/ph/x-circle';
	import UserCard from '$lib/components/UserCard.svelte';

	// Lets desktop users scroll horizontal sections with scroll wheel
	let habit: any;
	let journal: any;
	let users: any;
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

<div class="app-container mb-2">
	<a href="/shared#" class="text-3xl font-medium hover:underline">Shared Habits</a>
</div>

<div class="card-scroll" bind:this={habit}>
	<div class="left-pad" />
	{#if data.habits && data.habits.length === 0}
		<div
			class="relative flex h-[124px] w-[400px] min-w-[16rem] flex-col overflow-hidden rounded-lg border-2 border-dashed border-black border-opacity-60 p-4 shadow-md shadow-offwhite-light"
		>
			<div class="flex h-full w-full items-center justify-center">
				<PhXCircle class="mr-2 text-[160px] opacity-60" />
				<div class="w-fit max-w-[250px]">
					<p class="text-xl font-medium">No Shared Habits</p>

					<p>If anyone shares any habit trackers with you in the future they will show up here.</p>
				</div>
			</div>
		</div>
	{/if}
	<!-- TODO: undeletable mood tracker here? -->
	{#each data.habits as habit (habit.id)}
		<div animate:flip={{ duration: 500 }} in:fly|local={{ y: 150 }} out:fade|local>
			<HabitCard
				id={habit.id}
				name={habit.name}
				date={habit.createdAt}
				entries={habit.HabitEntry}
				shared_by={habit.user.email}
				type={habit.type}
				link_to="shared"
			/>
		</div>
	{/each}
	<div class="right-pad" />
</div>

{#if data.users.length > 0}
	<div class="app-container mt-10 mb-2 flex items-baseline">
		<div class="mr-3 text-3xl font-medium hover:underline">Users</div>
	</div>
	<div class="card-scroll" bind:this={users}>
		<div class="left-pad" />
		{#each data.users as user_info}
			<UserCard user_id={user_info['user_id']} email={user_info['email']} />
		{/each}
	</div>
{/if}
<div class="app-container mt-10 mb-2 flex items-baseline">
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
