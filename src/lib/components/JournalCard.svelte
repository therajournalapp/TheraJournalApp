<script lang="ts">
	import ShareSelector from './ShareSelector.svelte';
	import { invalidateAll } from '$app/navigation';

	// The entries id. Used for linking to editor
	export let id: number;

	// The entries title
	export let title: string;

	// The entries body. Used for preview.
	export let body: string;

	// Date entry was created at.
	// Used for the date footer.
	export let date: Date;

	// The entry's shared users. Used for the share selector.
	export let shared_to: any | undefined = [];

	// The path to link to the journal editor.
	// Ex: if link_to is 'dashboard' and id is '1',
	// then the link will be '/dashboard/1'
	export let link_to: string = 'dashboard';

	// This is the email of the user who shared the entry with you.
	// Only used on the shared page.
	export let shared_by: string = '';

	// Sets the shadow color of the card,
	// change if not putting card over default background.
	export let shadowclr: string = 'shadow-offwhite-light';

	// Formatted date used for /shared
	function getFormattedDate(date: Date) {
		let year = date.getFullYear().toString().substring(2);
		let month = (1 + date.getMonth()).toString().padStart(2, '0');
		let day = date.getDate().toString().padStart(2, '0');

		return month + '/' + day + '/' + year;
	}
	let formatted_date = getFormattedDate(date);

	// The share selector will call this function when a entry is shared
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

	// The share selector will call this function when a entry is unshared
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
	class="relative mb-4 flex h-56 w-64 min-w-[16rem] flex-col overflow-hidden rounded-lg bg-white p-4 shadow-md {shadowclr} ring-1 ring-black ring-opacity-10"
>
	<div class="flex justify-between">
		<div class="flex">
			<div class="relative max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap">
				<a href="/{link_to}/{id}" class="text-xl font-medium hover:underline">
					{title}
				</a>
			</div>
		</div>
		{#if shared_to}
			<ShareSelector {title} shareCallback={onShare} unshareCallback={onUnshare} {shared_to} />
		{/if}
	</div>

	<div class="w-full break-words">
		<div class="prose prose-sm prose-neutral pt-3">
			{@html body.substring(1, body.length - 1)}
		</div>
	</div>

	<div
		class="fade-out absolute left-0 bottom-0 flex h-1/3 w-64 items-end justify-between px-4 pb-1.5 text-xs font-bold"
	>
		{#if shared_by !== ''}
			<span
				class="w-[170px] overflow-hidden text-ellipsis tracking-tight text-primary-dark"
				title="Shared by: {shared_by}"
			>
				{shared_by}
			</span>
		{:else}
			<span />
		{/if}

		<span class="font-semibold tabular-nums tracking-tighter text-neutral-500 text-opacity-90">
			{formatted_date}
		</span>
	</div>
</div>

<style lang="postcss">
	.fade-out {
		background-image: linear-gradient(
			0deg,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 1) 30%,
			rgba(255, 255, 255, 0.75) 50%,
			rgba(255, 255, 255, 0) 100%
		);
	}
</style>
