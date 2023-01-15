<script lang="ts">
	import ShareToggle from '../../../lib/components/ShareToggle.svelte';

	export let name: String;
	export let shadowclr: String = 'shadow-offwhite-light';
	export let sun: String = 'bg-primary';
	export let mon: String = 'bg-primary';
	export let tue: String = 'bg-primary';
	export let wed: String = 'bg-primary';
	export let thu: String = 'circle-future';
	export let fri: String = 'circle-future';
	export let sat: String = 'circle-future';
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
			<span class="day-label">Sun</span>
			<span class="day-label">Mon</span>
			<span class="day-label">Tue</span>
			<span class="day-label">Wed</span>
			<span class="day-label current-day">Thu</span>
			<span class="day-label">Fri </span>
			<span class="day-label">Sat</span>
		</div>

		<div class="flex justify-around">
			<div class="circle {sun}" />
			<div class="circle {mon}" />
			<div class="circle {tue}" />
			<div class="circle {wed}" />
			<div class="circle {thu}" />
			<div class="circle {fri}" />
			<div class="circle {sat}" />
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
