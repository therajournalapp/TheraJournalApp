<script lang="ts">
	import { clickOutside } from './click_outside.js';
	import { goto } from '$app/navigation';

	function handleClickOutside(event: any) {
		goto('/dashboard');
	}
</script>

<div
	class="overflow-x-hidde fixed top-0 left-0 z-10 h-screen w-screen overflow-y-auto bg-gray-500 bg-opacity-75"
>
	<div
		class="pointer-events-auto mx-auto my-32 w-full max-w-screen-lg"
		use:clickOutside
		on:click_outside={handleClickOutside}
	>
		<slot />
	</div>
</div>
