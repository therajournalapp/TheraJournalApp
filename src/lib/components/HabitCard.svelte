<script lang="ts">
	import ShareSelector from './ShareSelector.svelte';

	export let habitID: number;
	export let entries: any[];
	export let name: String;
	export let shadowclr: String = 'shadow-offwhite-light';

	// TODO: load from backend
	export let shared_to: any | undefined = [];

	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	function getCurrentDay() {
		const today = new Date().getDay();
		return days[today];
	}

	let currentDay = getCurrentDay();
	let dayValueMap = new Map();

	//TODO: load this weeks entries from backend for circle display
</script>

<div
	class="flex h-28 w-72 min-w-[18rem] flex-col justify-between rounded-lg bg-white p-4 shadow-md {shadowclr} ring-1 ring-black ring-opacity-10"
>
	<div class="flex justify-between">
		<div class="flex">
			<a href="/dashboard/h/{habitID}" class="text-xl font-medium hover:underline">{name}</a>
		</div>
		<!-- TODO: add share and unshare callback functions -->
		<ShareSelector title="TODO" {shared_to} />
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
