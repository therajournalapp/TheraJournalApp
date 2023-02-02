<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="pointer-events-none fixed inset-0 flex h-screen w-screen justify-center ">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="scroll pointer-events-auto z-[1] mx-auto w-full cursor-pointer overflow-y-scroll bg-black bg-opacity-20"
		on:click={(e) => {
			if (e.target !== e.currentTarget) {
				return;
			}
			goto('/dashboard');
		}}
	>
		<div class="z-[3] mx-auto max-w-screen-lg cursor-auto">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	.scroll::-webkit-scrollbar {
		height: 20px;
	}

	.scroll::-webkit-scrollbar-track {
		background-color: transparent;
		margin-left: 9vw;
		margin-right: 9.5vw;
		margin-left: 2rem;
		margin-right: 2rem;
		margin-top: 130px;
	}

	.scroll::-webkit-scrollbar-thumb {
		border-radius: 20px;
		border: 5px solid transparent;
		background-clip: content-box;
		background-color: rgba(0, 0, 0, 0);
		background-color: white;
		transition: 2s;
	}
</style>
