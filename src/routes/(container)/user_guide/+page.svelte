<script lang="ts">
	import PhCaretLeftThin from '~icons/ph/caret-left-thin';
</script>

<div class="mx-auto flex w-full max-w-[560px] flex-col">
	<div class="mb-6">
		<a href="/#guide" class="arrow-link dark:text-neutral-200">
			<div class="arrow">
				<PhCaretLeftThin class="inline text-[22px]" />
			</div>
			<span class="pl-2">Back</span>
		</a>
	</div>

	<h1 class="my-10 text-4xl font-medium dark:text-neutral-200">User Guide</h1>

	<iframe
		class="aspect-video w-full max-w-[560px]"
		src="https://www.youtube.com/embed/hbMoKeVgpSQ"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
	/>
</div>

<style lang="postcss">
	.arrow {
		@apply translate-y-[-1.5px] translate-x-1 duration-150 ease-in-out;
	}

	.arrow-link {
		@apply flex -translate-x-[11px] items-baseline text-lg font-normal transition duration-150 hover:underline;
	}

	a:hover .arrow {
		transform: translate(0, -1.5px);
	}
</style>
