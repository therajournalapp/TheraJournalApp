<script lang="ts">
	import UserInitial from '$lib/components/UserInitial.svelte';

	// The entries id. Used for linking to editor
	export let user_id: string;
	export let email: string;
</script>

<a href="/user/{user_id}" class="text-lg font-medium" class:text-neutral-400={email == ''}>
	<div
		class="relative mb-4 flex h-28 max-w-screen-lg flex-col overflow-hidden rounded-lg bg-white p-4 shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700"
	>
		<div class="flex h-full items-center justify-between gap-3">
			<UserInitial {email} big />
			<div
				class="relative max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap text-center hover:underline dark:text-neutral-200"
			>
				{email}
			</div>
		</div>
	</div>
</a>

<style lang="postcss">
</style>
