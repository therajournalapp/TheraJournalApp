<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<!-- backdrop-blur-sm -->
<!-- <div
	class="fixed top-0 left-0 z-10 h-screen w-screen cursor-pointer overflow-y-auto bg-neutral-500 bg-opacity-80"
>
	<div
		class="pointer-events-auto relative mx-auto w-full max-w-screen-lg cursor-auto"
		use:clickOutside
		on:click_outside={handleClickOutside}
	>
		<slot />
	</div>
</div> -->
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
