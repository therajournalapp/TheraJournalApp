<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import ShareSelector from './ShareSelector.svelte';

	export let habitID: number;
	export let entries: any[];
	export let name: string;
	export let shadowclr: String = 'shadow-offwhite-light';

	export let shared_to: any | undefined = [];

	// This is the email of the user who shared the entry with you.
	// Only used on the shared page.
	export let shared_by: string = '';

	// Date entry was created at.
	// Used for the date footer.
	export let date: Date;

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
	let previewEntries = new Set();

	$: {
		previewEntries.clear();
		entries.forEach(function (entry: any) {
			previewEntries.add(days[entry.date.getDay()]);
		});
		// array method above does not trigger an update
		// so we assign to trigger update
		previewEntries = previewEntries;
	}

	let onShare: Function = async (email: string): Promise<string | Error> => {
		const response = await fetch('/api/shareHabit', {
			method: 'POST',
			body: JSON.stringify({ email: email, habit_id: habitID }),
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
			body: JSON.stringify({ email: email, habit_id: habitID }),
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
	class=" relative flex h-28 w-72 min-w-[18rem] flex-col justify-between rounded-lg bg-white p-4 shadow-md {shadowclr} ring-1 ring-black ring-opacity-10"
>
	<div class="flex justify-between">
		<div class="flex">
			<a href="/dashboard/h/{habitID}" class="text-xl font-medium hover:underline">{name}</a>
		</div>
		<!-- TODO: add share and unshare callback functions -->
		<ShareSelector title={name} {shared_to} shareCallback={onShare} unshareCallback={onUnshare} />
	</div>

	<div class="mx-[-5px]">
		<div class="flex w-full justify-around font-mono">
			{#each days as day}
				<span class="day-label {currentDay == day ? 'current-day' : ''}">{day}</span>
			{/each}
		</div>

		<div class="flex justify-around">
			{#each days as day, dayNum}
				<div
					class="circle"
					class:bg-primary={previewEntries.has(day)}
					class:circle-untracked={dayNum <= todayNum && !previewEntries.has(day)}
					class:circle-future={dayNum > todayNum}
				/>
			{/each}
		</div>
	</div>

	<div
		class="fade-out absolute left-0 bottom-0 flex h-1/3 w-64 items-end justify-between px-4 pb-1.5 text-xs font-bold"
	>
		{#if shared_by !== ''}
			<span
				class="w-[170px] overflow-hidden text-ellipsis tracking-tight text-primary-dark"
				title="Shared by: {shared_by}"
			>
				{shared_by}
			</span>
		{:else}
			<span />
		{/if}

		<span class="font-semibold tabular-nums tracking-tighter text-neutral-500 text-opacity-90">
			{formatted_date}
		</span>
	</div>
</div>

<style lang="postcss">
	.circle {
		@apply h-5 w-5 rounded-full;
	}

	.circle-future {
		@apply border-[1px] border-dashed border-black bg-transparent;
	}

	.circle-untracked {
		@apply border-[1px] border-solid border-black bg-transparent;
	}

	.current-day {
		@apply font-bold;
	}
</style>
