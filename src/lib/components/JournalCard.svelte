<script lang="ts">
	import ShareSelector from './ShareSelector.svelte';
	import { invalidateAll } from '$app/navigation';

	export let id: number;
	export let title: string;
	export let body: string;
	export let shared: any | undefined = undefined;
	export let shadowclr: string = 'shadow-offwhite-light';

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
</script>

<div
	class="relative flex h-56 w-64 min-w-[16rem] flex-col overflow-hidden rounded-lg bg-white p-4 shadow-md {shadowclr} ring-1 ring-black ring-opacity-10"
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

	<div class="absolute left-0 bottom-0 h-1/4 w-64 bg-gradient-to-b from-transparent to-white" />
</div>

<style>
</style>
