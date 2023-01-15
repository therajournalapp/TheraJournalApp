<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import ShareToggle from '$lib/components/ShareToggle.svelte';
</script>

<div class="h-18 flex justify-between py-5">
	<input type="text" id="entry-title" value="Title" class="title" />

	<ShareToggle big={true} />
</div>

<Editor />

<style>
	.title {
		@apply bg-transparent text-4xl text-white ring-0 focus-visible:outline-none;
	}
</style>
