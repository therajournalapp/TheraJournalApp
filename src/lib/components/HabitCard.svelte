<script lang="ts">
	import { browser } from '$app/environment';
	import type internal from 'stream';
	import { onMount } from 'svelte';

	import ShareToggle from '$lib/components/ShareToggle.svelte';

	export let entries: any[];
	export let name: String;
	export let shadowclr: String = 'shadow-offwhite-light';

	const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
	function getCurrentDay() {
		const today = new Date().getDay();
		return days[today];
	}

	let currentDay = getCurrentDay();
	const dayValueMap = new Map();

	//for each entry, create a map entry of day to value
	entries.forEach(function (entry: any) {
		dayValueMap.set(days[entry.date.getDay()], entry.value);
	});
</script>

<div
	class="flex h-28 w-72 min-w-[18rem] flex-col justify-between rounded-lg bg-white p-4 shadow-md {shadowclr} ring-1 ring-black ring-opacity-10"
>
	<div class="flex justify-between">
		<div class="flex">
			<a href="/dashboard#" class="text-xl font-medium hover:underline">{name}</a>
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
