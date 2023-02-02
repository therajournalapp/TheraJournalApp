<script lang="ts">
	import { browser } from '$app/environment';
	import type internal from 'stream';
	import { onMount } from 'svelte';

	import ShareToggle from '$lib/components/ShareToggle.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import Calender from '$lib/components/Calender.svelte';
	import { getMonthName } from './date-time.js';

	export let habitID: number;
	export let entries: any[];
	export let name: String;
	export let shadowclr: String = 'shadow-offwhite-light';

	let newDatePicker: HTMLDialogElement;

	const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
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
			<!-- <a href="/dashboard#" class="text-xl font-medium hover:underline">{name}</a> -->
			<button
				class="text-xl font-medium hover:underline"
				on:click={() => {
					newDatePicker.showModal();
				}}
			>
				{name}
			</button>
			<!-- <div class="h-[25px] w-[25px] overflow-visible bg-red-600 opacity-50" /> -->
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
	<div class="h-[600px] w-[600px]">
		<h1 class="mb-4 text-xl">{name}</h1>
		<h2>{selectedDate.toDateString()}</h2>
		<form action="?/newHabitEntry" method="POST">
			<input
				class="input"
				type="hidden"
				value={selectedDate.toDateString()}
				name="date"
				id="date"
				maxlength="255"
			/>
			<input
				class="input"
				type="hidden"
				value={habitID}
				name="habitID"
				id="habitID"
				maxlength="255"
			/>
			<button type="submit" class="btn">+</button>
		</form>
		<div class="box">
			<div class="month-name">
				<div class="center">
					<button on:click={prev}>Prev</button>
				</div>
				<div class="center">{getMonthName(month)} {year}</div>
				<div class="center">
					<button on:click={next}>Next</button>
				</div>
			</div>
			<Calender {month} {year} date={selectedDate} {isAllowed} on:datechange={onDateChange} />
		</div>
	</div>
</Dialog>

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
