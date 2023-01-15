<script lang="ts">
	import { clickOutside } from './click_outside.js';
	import { goto } from '$app/navigation';

	function handleClickOutside(event: any) {
		goto('/dashboard');
	}
</script>

<!-- backdrop-blur-sm -->
<div
	class="fixed top-0 left-0 z-10 h-screen w-screen cursor-pointer overflow-y-auto backdrop-brightness-75"
>
	<div
		class="pointer-events-auto mx-auto my-32 w-full max-w-screen-lg cursor-auto"
		use:clickOutside
		on:click_outside={handleClickOutside}
	>
		<slot />
	</div>
</div>
