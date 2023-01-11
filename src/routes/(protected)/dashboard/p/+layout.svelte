<div class="relative">
	<a
		href="/dashboard"
		class="fixed inset-0 z-10 block h-screen w-screen bg-gray-500 bg-opacity-75 transition-opacity"
	>
		<!-- -->
	</a>
	<div class="fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
		<div class="h-[80vh] w-[80vw] rounded-lg bg-white">
			<slot />
		</div>
		<!-- <slot /> -->
	</div>
</div>
