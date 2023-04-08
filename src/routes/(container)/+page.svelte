<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const user = getUser();

	onMount(() => {
		if ($user) {
			goto('/dashboard');
		}
	});
</script>

<svelte:head>
	<title>TheraJournal</title>
</svelte:head>

<h1 class="mb-3 text-center text-4xl font-medium dark:text-neutral-200">Welcome to TheraJournal</h1>

<div class="mx-auto mb-4 w-full max-w-screen-sm dark:text-neutral-200">
	<p class="text-center">
		TheraJournal is a journaling app for therapists and their clients. It is designed to help
		therapists and their clients track their progress and stay on track with their therapy goals.
		<br />
		TheraJournal is currently in development. Please check back soon for updates.
	</p>
</div>

{#if !$user}
	<div class="mx-auto flex w-full max-w-2xl justify-center gap-5">
		<a href="/signup" class="btn">Sign up</a>
		<a href="/login" class="btn">Log in</a>
	</div>
{/if}
