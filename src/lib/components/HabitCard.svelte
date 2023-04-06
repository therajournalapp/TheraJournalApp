<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { map } from 'lodash';
	import ShareSelector from './ShareSelector.svelte';

	// The entries id. Used for linking to habit dialog
	export let id: number;

	// The entries title
	export let name: string;

	// The habit entires for this month from load function
	export let entries: any[];

	// The entry's shared users. Used for the share selector.
	export let shared_to: any | undefined = [];

	// This is the email of the user who shared the entry with you.
	// Only used on the shared page.
	export let shared_by: string = '';

	// Date entry was created at.
	// Used for the date footer.
	export let date: Date;

	export let type: String;

	// The path to link to the journal editor.
	// Ex: if link_to is 'dashboard' and id is '1',
	// then the link will be '/dashboard/h/1'
	export let link_to: string = 'dashboard';

	// Formatted date used for /shared
	function getFormattedDate(date: Date) {
		console.log(date);
		let year = date.getFullYear().toString().substring(2);
		let month = (1 + date.getMonth()).toString().padStart(2, '0');
		let day = date.getDate().toString().padStart(2, '0');

		return month + '/' + day + '/' + year;
	}
	let formatted_date = getFormattedDate(date);

	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const todayNum = new Date().getDay();

	function getCurrentDay() {
		return days[todayNum];
	}

	let currentDay = getCurrentDay();
	let previewEntries = new Map();

	$: {
		previewEntries.clear();
		entries.forEach(function (entry: any) {
			previewEntries.set(days[entry.date.getDay()], entry.value);
		});
		// array method above does not trigger an update
		// so we assign to trigger update
		previewEntries = previewEntries;
	}

	let onShare: Function = async (email: string): Promise<string | Error> => {
		const response = await fetch('/api/shareHabit', {
			method: 'POST',
			body: JSON.stringify({ email: email, habit_id: id }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const json = await response.json();
		const { message } = json;
		if (response.ok) {
			invalidateAll();
			return message as string;
		} else {
			if (response.status == 409) {
				return Error('Habit is already shared with this user.');
			}
			return Error("Habit couldn't be found.");
		}
	};

	let onUnshare: Function = async (email: string): Promise<string | Error> => {
		const response = await fetch('/api/shareHabit', {
			method: 'DELETE',
			body: JSON.stringify({ email: email, habit_id: id }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const json = await response.json();
		const { message } = json;
		if (response.ok) {
			invalidateAll();
			return message as string;
		} else {
			return Error('Error deleting share.');
		}
	};
</script>

<div
	class="relative flex w-72 min-w-[18rem] flex-col gap-1.5 rounded-lg bg-white p-4 shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700
	{shared_by == '' ? 'h-28' : 'h-[124px]'}"
>
	<div class="flex justify-between">
		<div class="flex">
			<div
				class="relative max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap dark:text-neutral-200"
			>
				<a
					href="/{link_to}/h/{id}"
					class="text-xl font-medium hover:underline"
					class:text-neutral-400={name == ''}
				>
					{name == '' ? 'Untitled Habit Tracker' : name}
				</a>
			</div>
		</div>
		{#if shared_by == ''}
			<ShareSelector title={name} {shared_to} shareCallback={onShare} unshareCallback={onUnshare} />
		{/if}
	</div>

	<div class="mx-[-5px]">
		<div class="flex w-full justify-around font-mono dark:text-neutral-200">
			{#each days as day}
				<span class="day-label {currentDay == day ? 'current-day' : ''}">{day}</span>
			{/each}
		</div>

		<div class="flex justify-around">
			{#each days as day, dayNum}
				{#if type == 'Custom'}
					<div
						class="circle"
						class:bg-primary={previewEntries.has(day)}
						class:circle-untracked={dayNum <= todayNum && !previewEntries.has(day)}
						class:circle-future={dayNum > todayNum}
					/>
				{:else if type == 'Mood'}
					<div
						class="circle"
						class:bg-very-sad={previewEntries.has(day) && previewEntries.get(day) == 1}
						class:bg-sad={previewEntries.has(day) && previewEntries.get(day) == 2}
						class:bg-neutral={previewEntries.has(day) && previewEntries.get(day) == 3}
						class:bg-happy={previewEntries.has(day) && previewEntries.get(day) == 4}
						class:bg-very-happy={previewEntries.has(day) && previewEntries.get(day) == 5}
						class:circle-untracked={dayNum <= todayNum && !previewEntries.has(day)}
						class:circle-future={dayNum > todayNum}
					/>
				{/if}
			{/each}
		</div>
	</div>

	{#if shared_by !== ''}
		<div
			class="absolute left-0 bottom-0 flex h-1/3 w-full items-end justify-between px-4 pb-1.5 text-xs font-bold"
		>
			<span
				class="w-[170px] overflow-hidden text-ellipsis tracking-tight text-primary-dark"
				title="Shared by: {shared_by}"
			>
				{shared_by}
			</span>

			<span class="font-semibold tabular-nums tracking-tighter text-neutral-500 text-opacity-90">
				{formatted_date}
			</span>
		</div>
	{/if}
</div>

<style lang="postcss">
	.bg-very-sad {
		@apply bg-accent-purple;
	}
	.bg-sad {
		@apply bg-accent-blue;
	}
	.bg-neutral {
		@apply bg-neutral-400;
	}
	.bg-happy {
		@apply bg-accent-green;
	}
	.bg-very-happy {
		@apply bg-accent-yellow;
	}
	.circle {
		@apply h-5 w-5 rounded-full;
	}

	.circle-future {
		@apply border-[1px] border-dashed border-black bg-transparent dark:border-white;
	}

	.circle-untracked {
		@apply border-[1px] border-solid border-black bg-transparent dark:border-white;
	}

	.current-day {
		@apply font-bold;
	}
</style>
