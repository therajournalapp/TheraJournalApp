<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import ShareToggle from '$lib/components/ShareToggle.svelte';
</script>

<div class="flex justify-between p-5">
	<input type="text" id="entry-title" value="Title" />

	<ShareToggle big={true} />
</div>

<Editor />

<style>
</style>
