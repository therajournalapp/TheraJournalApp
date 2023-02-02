<script lang="ts">
	import type internal from 'stream';
	import ShareToggle from '$lib/components/ShareToggle.svelte';
	import ShareSelector from './ShareSelector.svelte';

	export let id: number;
	export let title: string;
	export let body: string;
	export let shared: any; //TODO interface
	export let shadowclr: string = 'shadow-offwhite-light';

	let onShare: Function = (email: string): string | Error => {
		console.log('from share callback! + email: ' + email);
		return Error('from share callback! + email: ' + email);
	};

	let onUnshare: Function = (email: string): string | Error => {
		console.log('from unshare callback! + email: ' + email);
		return Error('from unshare callback! + email: ' + email);
	};

	// let onShare = async () => {
	// 	console.log(shared.toString() + ' from JournalCard ' + id.toString());
	// 	if (shared) {
	// 		console.log('Delete');
	// 		const response = await fetch('/api/shareEntry', {
	// 			method: 'DELETE',
	// 			body: JSON.stringify({ id: id }),
	// 			headers: {
	// 				'content-type': 'application/json'
	// 			}
	// 		})
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				console.log('Heller?');
	// 				console.log(data.message);
	// 			});
	// 	} else {
	// 		console.log('Create');

	// 		const response = await fetch('/api/shareEntry', {
	// 			method: 'POST',
	// 			body: JSON.stringify({ id: id }),
	// 			headers: {
	// 				'content-type': 'application/json'
	// 			}
	// 		})
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				console.log('Heller?');
	// 				console.log(data.message);
	// 			});
	// 	}
	// };
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
		<!-- <ShareToggle shareCallback={onShare} {shared} /> -->
		<ShareSelector {title} shareCallback={onShare} unshareCallback={onUnshare} shared_to={shared} />
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
