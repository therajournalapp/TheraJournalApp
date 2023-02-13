<script lang="ts">
	import { onMount } from 'svelte';

	import ShareToggle from '$lib/components/ShareToggle.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Calender from '$lib/components/Calender.svelte';
	import { getMonthName } from './date-time.js';
	import { Popover, PopoverButton, PopoverPanel } from '@rgossiaux/svelte-headlessui';

	export let habitID: number;
	export let entries: any[];
	export let name: String;
	export let shadowclr: String = 'shadow-offwhite-light';

	let newDatePicker: HTMLDialogElement;

	let monthlyEntries = new Set();

	async function getEntriesForSelectedMonth() {
		const response = await fetch(`/api/habitEntry/${habitID}/${selectedDate.toDateString()}`, {
			method: 'GET'
		});

		const json = await response.json();

		for (let i = 0; i < json.entries.length; i++) {
			monthlyEntries.add(new Date(json.entries[i].date).getDay());
		}
	}

	onMount(async () => {
		monthlyEntries.clear();
		getEntriesForSelectedMonth();
	});

	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	function getCurrentDay() {
		const today = new Date().getDay();
		return days[today];
	}

	let currentDay = getCurrentDay();
	let dayValueMap = new Map();

	//for each entry, create a map entry of day to value
	entries.forEach(function (entry: any) {
		dayValueMap.set(days[entry.date.getDay()], entry.value);
	});

	let selectedDate: Date = new Date();
	let date: number, month: number, year: number;
	let isAllowed = () => true;
	// These variables change with the props
	$: {
		date = selectedDate.getDate();
		month = selectedDate.getMonth();
		year = selectedDate.getFullYear();
	}

	const onDateChange = (d: any) => {
		selectedDate = d.detail;
	};

	const next = () => {
		if (month == 11) {
			month = 0;
			year = year + 1;
			return;
		}
		month = month + 1;
	};

	const prev = () => {
		if (month === 0) {
			month = 11;
			year -= 1;
			return;
		}
		month -= 1;
	};
</script>

<div
	class="flex h-28 w-72 min-w-[18rem] flex-col justify-between rounded-lg bg-white p-4 shadow-md {shadowclr} ring-1 ring-black ring-opacity-10"
>
	<div class="flex justify-between">
		<div class="flex">
			<a href="/dashboard/h/{habitID}" class="text-xl font-medium hover:underline">{name}</a>
			<!-- <button
				class="text-xl font-medium hover:underline"
				on:click={() => {
					newDatePicker.showModal();
				}}
			>
				{name}
			</button> -->
		</div>
		<ShareToggle />
	</div>

	<div class="mx-[-5px]">
		<div class="flex w-full justify-around font-mono">
			{#each days as day}
				<span class="day-label {currentDay == day ? 'current-day' : ''}">{day}</span>
			{/each}
		</div>

		<div class="flex justify-around">
			{#each days as day}
				<div class="circle {dayValueMap.has(day) ? 'bg-primary' : 'circle-future'}" />
			{/each}
		</div>
	</div>
</div>

<Dialog bind:dialog={newDatePicker}>
	<div class="w-auto p-4 text-center">
		<div class="mb-2 flex flex-row justify-between border-b-2 border-b-primary">
			<h1 class="text-left align-bottom text-2xl">{name}</h1>
			<Popover style="position: relative;">
				<PopoverButton
					type="button"
					aria-expanded="false"
					class="group inline-flex
                items-center rounded-md border-primary px-3 pb-2 pt-1 text-base font-medium text-primary text-opacity-90 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
					>Options
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						class="ml-2
                  h-5 w-5 text-primary text-opacity-70 transition duration-150 ease-in-out group-hover:text-opacity-80"
						><path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</PopoverButton>

				<PopoverPanel style="position: absolute; z-index: 10;">
					<div class="panel-contents">
						<button
							class="group flex w-full items-start rounded-md border-2 border-gray-400 p-2 text-sm text-gray-900"
						>
							Delete habit (wip)
						</button>
					</div>

					<!-- <img src="/solutions.jpg" alt="" /> -->
				</PopoverPanel>
			</Popover>
		</div>
		<form action="?/newHabitEntry" method="POST">
			<span class="text-md"
				>Mark habit completed on <strong>{selectedDate.toDateString()}</strong></span
			>
			<button type="submit" class="text-md hover:text-primary-dark "
				><iconify-icon inline icon="ph:plus-circle" class="text-md translate-y-[-1px]" /></button
			>
			<input type="hidden" value={selectedDate.toDateString()} name="date" id="date" />
			<input type="hidden" value={habitID} name="habit_id" id="habit_id" />
		</form>
		<div class="mt-4 mb-1 flex flex-row justify-center space-x-2">
			<button class="" on:click={prev}>Prev</button>
			<div class="center text-xl underline">{getMonthName(month)} {year}</div>
			<button class="" on:click={next}>Next</button>
		</div>
		<Calender
			{month}
			{year}
			date={selectedDate}
			{isAllowed}
			entryDays={monthlyEntries}
			on:datechange={onDateChange}
		/>
	</div>
</Dialog>

<style lang="postcss">
	.panel-contents {
		@apply overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5;
	}
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
