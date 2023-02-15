<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { Dialog, DialogOverlay, Transition, TransitionChild } from '@rgossiaux/svelte-headlessui';
	import { onMount } from 'svelte';
	// import 'fluent-svelte/theme.css';
	import '$lib/components/fluent-svelte/theme.css';
	// import { CalendarView } from 'fluent-svelte';
	import CalendarView from '$lib/components/fluent-svelte/CalendarView/CalendarView.svelte';
	import ShareSelector from './ShareSelector.svelte';
	import HabitOptionMenu from './HabitOptionMenu.svelte';
	import debounce from 'lodash/debounce';

	// ID of the habit, used to load entries
	export let id: number;

	// Title of the habit, used to set the title of the dialog
	export let name: string;

	// list of emails that the entry is shared with
	export let shared_to: any | undefined = [];

	// list of entries for the habit from load function
	export let entries: Date[];

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

	// Used to track if the dialog is open or not
	let isOpen = false;

	// Tracks if the share selector is open or not,
	// to hide popup while it is open
	let shareOpen = false;

	// Bound to the title input, used to update the name of the habit
	let title = name;

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

	// Debounce the updateTitle function, so it is only called once every second
	const saveTitle = debounce(updateTitle, 1000);

	// Used to track the currently shown month of the calendar
	let month: Date;

	// Stops user input while the calendar is loading a month's entries
	let loading = false;

	// Gets the entries for a month, replaces the value array
	async function getEntriesForMonth(month: Date) {
		loading = true;
		const url = new URL('/api/habitEntry', window.location.origin);
		const params = [
			['id', id.toString()],
			['month', month.toDateString()]
		];
		url.search = new URLSearchParams(params).toString();

		console.log('url: ' + url.toString());

		const result = await fetch(url, {
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
		const dates: Date[] = json.map((d: string) => new Date(d));
		value = dates;

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
		const result = await fetch('/api/habitEntry', {
			method: 'PATCH',
			body: JSON.stringify({ id: id, month: month, entries: days_in_month }),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('result: ' + result.ok);
	}

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

	// Open the dialog when the component is mounted (page is loaded)
	onMount(() => {
		isOpen = true;
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
					class="pointer-events-auto h-fit w-fit rounded-lg bg-white p-5 shadow-xl transition-all "
				>
					<div class="flex h-full w-[350px] flex-col justify-between">
						<div class="flex justify-between align-middle">
							{#if !view_only}
								<input
									type="text"
									id="entry-title"
									on:input={saveTitle}
									bind:value={title}
									class="rounded-md text-2xl outline-none hover:underline"
								/>
							{:else}{/if}

							<!-- <DialogTitle class="text-2xl">{name}</DialogTitle> -->
							<input
								type="text"
								id="entry-title"
								on:input={saveTitle}
								bind:value={title}
								class="rounded-md text-2xl outline-none hover:underline"
							/>
							<div class="mt-1 mr-1 mb-2 flex gap-3">
								{#if !view_only}
									<ShareSelector
										title={name}
										{shared_to}
										bind:isOpen={shareOpen}
										shareCallback={onShare}
										unshareCallback={onUnshare}
									/>
									<HabitOptionMenu deleteCallBack={deleteHabit} />
								{/if}
							</div>
						</div>

						<div class="my-2 ">
							<button
								class="font-medium text-neutral-700 underline hover:text-neutral-400 active:text-primary-dark"
								on:click={() => {
									if (value.some((date) => sameDayMonthYear(date, today) == true)) {
										console.log('remove');
										value = value.filter((date) => sameDayMonthYear(date, today) == false);
									} else {
										console.log('add');
										value.push(today);
									}
									value = value;
								}}
							>
								{#if !value.some((date) => sameDayMonthYear(date, today))}
									Add Today
									<iconify-icon inline icon="ph:plus-circle" class="text-md translate-y-[1px]" />
								{:else}
									Remove Today
									<iconify-icon inline icon="ph:minus-circle" class="text-md translate-y-[1px]" />
								{/if}
							</button>
							<span> or click to toggle a date below.</span>
						</div>

						{#if !view_only}
							<div class:cursor-wait={loading}>
								<div class:pointer-events-none={loading}>
									<CalendarView
										multiple
										bind:value
										bind:month
										on:change={async () => {
											updateEntries();
											setTimeout(() => {
												invalidateAll();
											}, 300);
										}}
										max={new Date()}
									/>
								</div>
							</div>
						{:else}
							<div class:cursor-wait={loading}>
								<div class:pointer-events-none={loading}>
									<CalendarView view_only multiple bind:value bind:month max={new Date()} />
								</div>
							</div>
						{/if}

						<div class="mt-0.5 flex justify-end">
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
						</div>
					</div>
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>
