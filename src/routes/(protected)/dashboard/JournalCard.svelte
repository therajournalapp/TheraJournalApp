<script lang="ts">
	import type internal from 'stream';
	import ShareToggle from '../../../lib/components/ShareToggle.svelte';

	export let id: number;
	export let title: String;
	export let body: String;
	export let shadowclr: String = 'shadow-offwhite-light';
</script>

<div
	class="relative flex h-56 w-64 min-w-[16rem] flex-col overflow-hidden rounded-lg bg-white p-4 shadow-md {shadowclr} ring-1 ring-black ring-opacity-10"
>
	<div class="flex justify-between">
		<div class="flex">
			<div class="relative max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap">
				<a href="/dashboard/{id}" class="text-xl font-medium hover:underline">
					{title}
				</a>
			</div>
			<!-- <div class="h-[25px] w-[25px] overflow-visible bg-red-600 opacity-50" /> -->
		</div>
		<ShareToggle />
	</div>

	<div class="w-full break-words">
		<p class="pt-3">
			{body}
		</p>
	</div>

	<div class="absolute left-0 bottom-0 h-1/4 w-64 bg-gradient-to-b from-transparent to-white" />
</div>

<style>
</style>
