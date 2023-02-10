<script lang="ts">
	import ShareSelector from './ShareSelector.svelte';
	import { invalidateAll } from '$app/navigation';

	export let id: number;
	export let title: string;
	export let body: string;
	export let shared: any | undefined = undefined;
	export let shadowclr: string = 'shadow-offwhite-light';

	export let shared_by: string = '';

	let onShare: Function = async (email: string): Promise<string | Error> => {
		const response = await fetch('/api/shareEntry', {
			method: 'POST',
			body: JSON.stringify({ email: email, entry_id: id }),
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
				return Error('Entry is already shared with this user.');
			}
			return Error("User couldn't be found.");
		}
	};

	let onUnshare: Function = async (email: string): Promise<string | Error> => {
		const response = await fetch('/api/shareEntry', {
			method: 'DELETE',
			body: JSON.stringify({ email: email, entry_id: id }),
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

	// Colors used to generate the background for shared user icons
	const colors = ['e9f5db', 'dcebca', 'cfe1b9', 'c2d5aa', 'b5c99a', 'a6b98b', '97a97c', '849669'];
	// Colors used to generate the text for shared user icons
	const tx_col = ['606f49', '5D6746', '595D41', '3D5D3C', '425535', '3C4828', '2A3B1C', '1F2513'];
	// Hash function string to positive int
	// used to pick a random color for the user icon
	const hash = function (input: string) {
		var hash = 0,
			i,
			chr;
		if (input.length === 0) return hash;
		for (i = 0; i < input.length; i++) {
			chr = input.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0; // Convert to 32bit integer
		}
		if (hash < 0) {
			hash = hash * -1;
		}
		return hash;
	};
</script>

<div
	class="relative mb-4 flex h-56 w-64 min-w-[16rem] flex-col overflow-hidden rounded-lg bg-white p-4 shadow-md {shadowclr} ring-1 ring-black ring-opacity-10"
>
	<div class="flex justify-between">
		<div class="flex">
			{#if shared}
				<div class="relative max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap">
					<a href="/dashboard/{id}" class="text-xl font-medium hover:underline">
						{title}
					</a>
				</div>
			{:else}
				<div class="relative max-w-[225px] overflow-hidden text-ellipsis whitespace-nowrap">
					<a href="/shared/{id}" class="text-xl font-medium hover:underline">
						{title}
					</a>
				</div>
			{/if}
		</div>
		{#if shared}
			<ShareSelector
				{title}
				shareCallback={onShare}
				unshareCallback={onUnshare}
				shared_to={shared}
			/>
		{/if}
	</div>

	<div class="w-full break-words">
		<p class="pt-3">
			{body}
		</p>
	</div>

	<div
		class="absolute left-0 bottom-0 flex h-1/4 w-64 items-center bg-gradient-to-b from-transparent to-white pl-4 text-xs font-bold text-primary-dark"
	>
		{#if shared_by !== ''}
			<span>{shared_by}</span>
		{/if}
	</div>
</div>

<style>
</style>
