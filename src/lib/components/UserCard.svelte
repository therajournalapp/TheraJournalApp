<script lang="ts">
	// The entries id. Used for linking to editor
	export let user_id: string;
	export let email: string;

	// Sets the shadow color of the card,
	// change if not putting card over default background.
	export let shadowclr: string = 'shadow-offwhite-light';
</script>

<div
	class="relative mb-4 flex h-56 w-64 min-w-[16rem] flex-col overflow-hidden rounded-lg bg-white p-4 text-center shadow-md {shadowclr} ring-1 ring-black ring-opacity-10"
>
	<div class="relative max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
		<a
			href="/user/{user_id}"
			class="text-xl font-medium hover:underline"
			class:text-neutral-400={email == ''}
		>
			{email}
		</a>
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
