<script lang="ts">
	import { goto, invalidateAll, invalidate } from '$app/navigation';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	import { onDestroy, onMount } from 'svelte';
	// import 'fluent-svelte/theme.css';
	import '$lib/components/fluent-svelte/theme.css';
	// import { CalendarView } from 'fluent-svelte';
	import CalendarView from '$lib/components/fluent-svelte/CalendarMoodView/CalendarView.svelte';
	import ShareSelector from './ShareSelector.svelte';
	import HabitOptionMenu from './HabitOptionMenu.svelte';
	import debounce from 'lodash/debounce';
	import PhPlusCircle from '~icons/ph/plus-circle';
	import PhMinusCircle from '~icons/ph/minus-circle';

	// ID of the habit, used to load entries
	export let id: number;

	// Title of the habit, used to set the title of the dialog
	export let name: string;

	// list of emails that the entry is shared with
	export let shared_to: any | undefined = [];

	// list of entries for the habit from load function
	export let entries: Date[];

	// Map of entry dates to entry values from load function
	export let load_entry_values: Map<string, number>;

	// view only mode, used for viewing shared entries
	export let view_only: boolean = false;

	// back link, used for exiting the dialog
	export let back_link: string = '/dashboard';

	// Date of today, used for Add/Remove Today button
	let today = new Date();
	today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

	// Date of tomorrow, used to set the max date of the calendar
	let tomorrow: Date = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	// Array of dates that are selected
	let value: Date[] = entries;

	// Working map of entry dates to entry values
	let entry_values: Map<string, number> = load_entry_values;

	// Used to track if the dialog is open or not
	let isOpen = false;

	// Whether the mood selector is open or not
	let mood_select = false;

	// Tracks if the share selector is open or not,
	// to hide popup while it is open
	let shareOpen = false;

	// Bound to the title input, used to update the name of the habit
	let title = name;

	// Debounce the updateTitle function, so it is only called once every second
	const saveTitle = debounce(updateTitle, 1000);

	// Used to track the currently shown month of the calendar
	let month: Date;

	// Stops user input while the calendar is loading/saving a month's entries
	let loading = false;

	let mood_select_day: number;

	// Updates the title of the habit
	async function updateTitle() {
		if (view_only) {
			return;
		}
		console.log('updating title to: ' + title);
		const result = await fetch('/api/habit', {
			method: 'PATCH',
			body: JSON.stringify({ id: id, name: title }),
			headers: {
				'content-type': 'application/json'
			}
		});
		// Invalidate the load function to display on the dashboard
		invalidateAll();
	}

	// Gets the entries for a month, replaces the value array
	async function getEntriesForMonth(month: Date) {
		await saveEntries.flush();
		loading = true;

		const params = [
			['id', id.toString()],
			['month', month.toDateString()]
		];
		const search = new URLSearchParams(params);

		const result = await fetch('/api/habitEntry?' + search.toString(), {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		const ok = result.ok;

		if (!ok) {
			loading = false;
			return;
		}

		const json = await result.json();
		const entries = json.entries;
		const dates: Date[] = entries.map((d: string) => new Date(d));
		value = dates;

		const values = json.values;
		// entry_values = values;

		const new_entry_values = new Map();
		for (let i = 0; i < entries.length; i++) {
			new_entry_values.set(entries[i].toString(), values[i]);
		}

		entry_values = new_entry_values;

		loading = false;
	}

	// When the currently shown month changes, get the entries for that month
	$: {
		if (month) {
			getEntriesForMonth(month);
		}
	}

	// Used to see if two date objects are the same day
	function sameDayMonthYear(date1: Date, date2: Date) {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	}

	// Only send the entries for the currently shown month to the server
	let first_day_of_month: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
	let last_day_of_month: Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
	$: {
		if (month) {
			first_day_of_month = month;
			last_day_of_month = new Date(month.getFullYear(), month.getMonth() + 1, 0);
		}
	}
	function getDaysInMonth(days: Date[]) {
		let days_in_month = [];
		for (let i = 0; i < days.length; i++) {
			if (
				days[i].getTime() >= first_day_of_month.getTime() &&
				days[i].getTime() <= last_day_of_month.getTime()
			) {
				days_in_month.push(days[i]);
			}
		}
		return days_in_month;
	}

	// Updates the entries for the currently shown month
	async function updateEntries() {
		if (loading || view_only) {
			return;
		}

		let days_in_month = getDaysInMonth(value);

		let entryValueArr = Array.from(entry_values.values());

		const result = await fetch('/api/habitEntry', {
			method: 'PATCH',
			body: JSON.stringify({ id: id, month: month, entries: days_in_month, values: entryValueArr }),
			headers: {
				'content-type': 'application/json'
			}
		});

		invalidateAll();
	}

	// Debounce the updateEntries function, so it is only called once every second
	const saveEntries = debounce(updateEntries, 1000);

	async function deleteHabit() {
		if (view_only) {
			return;
		}

		const response = await fetch('/api/habit', {
			method: 'DELETE',
			body: JSON.stringify({ id: id }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const ok = response.ok;
		isOpen = false;
		setTimeout(() => {
			invalidateAll();
			// This stops invalidateAll from keeping the user on the same page
			setTimeout(() => {
				goto(back_link);
			}, 1);
		}, 300);
	}

	// Shares the habit with the given email
	let onShare: Function = async (email: string): Promise<string | Error> => {
		if (view_only) {
			return Error('');
		}

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

	// Unshares the habit with the given email
	let onUnshare: Function = async (email: string): Promise<string | Error> => {
		if (view_only) {
			return Error('');
		}

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

	function select_day(day: any) {
		// If the day has a habit entry, delete it
		if (entry_values.has(day.toString())) {
			entry_values.delete(day.toString());
			updateEntries();
		}
		// If the day doesn't have a habit entry, create one
		else {
			mood_select_day = day;
			mood_select = !mood_select;
		}
	}

	const selectDay = debounce(select_day, 1000);

	function setMood(value: number) {
		entry_values.set(mood_select_day.toString(), value);
		mood_select = false;
		saveEntries();
	}

	// Open the dialog when the component is mounted (page is loaded)
	onMount(() => {
		isOpen = true;
	});

	onDestroy(async () => {
		isOpen = false;
		await saveTitle.flush();
		await saveEntries.flush();
	});
</script>

<Transition show={isOpen}>
	<Dialog
		on:close={() => {
			isOpen = false;
			setTimeout(() => {
				goto(back_link);
			}, 300);
		}}
	>
		<TransitionChild
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<DialogOverlay
				class="fixed inset-0 z-30 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-20 duration-300
				{shareOpen ? 'opacity-0' : ''}"
			/>
		</TransitionChild>
		<div
			class="pointer-events-none fixed inset-0 z-40 flex h-screen w-screen items-center justify-center"
			class:hidden={shareOpen}
		>
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<div
					class="pointer-events-auto h-fit min-h-[562.5px] w-fit rounded-lg bg-white p-5 shadow-xl transition-all dark:bg-neutral-700 dark:shadow-neutral-900"
				>
					<div class="flex h-full w-[350px] flex-col justify-between">
						<div class="flex justify-between align-middle">
							{#if !view_only}
								<input
									type="text"
									id="entry-title"
									placeholder="Untitled Mood Tracker"
									on:input={saveTitle}
									bind:value={title}
									class="rounded-md bg-transparent text-2xl outline-none hover:underline focus:!no-underline dark:text-neutral-200"
									tabindex="-1"
								/>
							{:else}
								<DialogTitle class="text-2xl dark:text-neutral-200">{name}</DialogTitle>
							{/if}

							<div class="mt-1 mr-1 mb-2 flex items-center gap-3">
								{#if !view_only}
									<ShareSelector
										title={name == '' ? 'Untitled Habit Tracker' : name}
										{shared_to}
										bind:isOpen={shareOpen}
										shareCallback={onShare}
										unshareCallback={onUnshare}
									/>
									<HabitOptionMenu deleteCallBack={deleteHabit} />
								{/if}
							</div>
						</div>

						{#if !mood_select}
							{#if !view_only}
								<div class="my-2 ">
									<button
										class="font-medium text-neutral-700 underline hover:text-neutral-400 active:text-primary-dark dark:text-neutral-200"
										on:click={() => {
											if (value.some((date) => sameDayMonthYear(date, today) == true)) {
												console.log('remove');
												value = value.filter((date) => sameDayMonthYear(date, today) == false);
											} else {
												console.log('add');
												value.push(today);
											}
											value = value;
											select_day(today);
										}}
									>
										{#if !value.some((date) => sameDayMonthYear(date, today))}
											Add Today
											<PhPlusCircle class="inline translate-y-[-1px] text-[13px]" />
										{:else}
											Remove Today
											<PhMinusCircle class="inline translate-y-[-1px] text-[13px]" />
										{/if}
									</button>
									<span class="dark:text-neutral-300"> or click to toggle a date below.</span>
								</div>
							{/if}

							{#if !view_only}
								<div class:cursor-wait={loading}>
									<div class:pointer-events-none={loading}>
										<CalendarView
											multiple
											bind:value
											bind:month
											on:change={async () => {
												//saveEntries();
											}}
											pick_day_callback={select_day}
											max={new Date()}
											bind:entry_values
										/>
									</div>
								</div>
							{:else}
								<div class:cursor-wait={loading}>
									<div class:pointer-events-none={loading}>
										<CalendarView
											view_only
											multiple
											bind:value
											bind:month
											max={new Date()}
											bind:entry_values
										/>
									</div>
								</div>
							{/if}
						{:else}
							<div class="flex min-h-[500px] items-center justify-center">
								<div class="flex gap-2.5 text-white">
									<button
										class="flex h-16 w-16 items-center justify-center rounded-full bg-accent-purple"
										on:click={() => {
											setMood(1);
										}}
									>
										<span> awful </span>
									</button>
									<button
										class="flex h-16 w-16 items-center justify-center rounded-full bg-accent-blue"
										on:click={() => {
											setMood(2);
										}}
									>
										<span>bad</span>
									</button>
									<button
										class="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-400"
										on:click={() => {
											setMood(3);
										}}
									>
										<span>meh</span>
									</button>
									<button
										class="flex h-16 w-16 items-center justify-center rounded-full bg-accent-green"
										on:click={() => {
											setMood(4);
										}}
									>
										<span>good</span>
									</button>
									<button
										class="flex h-16 w-16 items-center justify-center rounded-full bg-accent-yellow"
										on:click={() => {
											setMood(5);
										}}
									>
										<span>great</span>
									</button>
								</div>
							</div>
						{/if}

						<div class="mt-0.5 flex justify-end">
							{#if mood_select}
								<button
									class="btn-alt"
									on:click={() => {
										mood_select = false;
									}}
								>
									Cancel
								</button>
							{:else}
								<button
									class="btn-alt"
									on:click={() => {
										isOpen = false;
										setTimeout(() => {
											goto(back_link);
										}, 300);
									}}
								>
									Done
								</button>
							{/if}
						</div>
					</div>
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>
