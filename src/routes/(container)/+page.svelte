<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import techstack from '$lib/images/techstack.png';
	import techstackdark from '$lib/images/techstackdark.png';
	import team from '$lib/images/team.png';
	import PhArrowRight from '~icons/ph/arrow-right';
	import { browser } from '$app/environment';

	const user = getUser();

	onMount(() => {
		if ($user) {
			goto('/dashboard');
		}
	});

	let dark = false;
	if (browser) {
		dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		// console.log('dark mode?: ' + dark);
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			dark = e.matches;
			// console.log('dark mode?: ' + dark);
		});
	}
</script>

<svelte:head>
	<title>TheraJournal</title>
</svelte:head>

<div class="my-10">
	<div class="mb-7">
		<h1 class="text-center text-5xl font-medium dark:text-neutral-200">
			The Journal that helps you
		</h1>
		<h1 class="text-center text-5xl font-medium dark:text-neutral-200">understand yourself</h1>
	</div>

	<div class="mx-auto w-full max-w-screen-sm dark:text-neutral-200">
		<p class="text-center">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec
		</p>
		<p class="text-center">
			fermentum lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lectus.
		</p>
	</div>
</div>

<div class="mx-auto flex w-full max-w-2xl items-center justify-center gap-7">
	<a href="/signup" class="btn-alt">Sign up</a>
	<a href="/login" class="link">Log in</a>
</div>

<!-- Screenshot -->
<div
	class="my-14 flex aspect-video w-full items-center justify-center bg-neutral-400 text-3xl font-bold shadow-lg dark:text-white dark:shadow-neutral-600"
>
	TODO - add screenshot here
</div>

<!-- Features -->
<div class="flex flex-col gap-5">
	<h2 class="text-center text-3xl font-medium dark:text-neutral-200">Features</h2>
	<div class="flex flex-col gap-3 dark:text-neutral-200">
		<div class="flex gap-3">
			<div class="flex gap-2">
				<div class="h-8 w-8 flex-shrink-0 rounded-full bg-neutral-400">icon</div>
				<div>
					<h3 class="text-2xl font-medium">Feature 1</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec fermentum
						lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lectus.
					</p>
				</div>
			</div>

			<div class="flex gap-2">
				<div class="h-8 w-8 flex-shrink-0 rounded-full bg-neutral-400">icon</div>
				<div>
					<h3 class="text-2xl font-medium">Feature 2</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec fermentum
						lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lectus.
					</p>
				</div>
			</div>
		</div>
		<div class="flex gap-3">
			<div class="flex gap-2">
				<div class="h-8 w-8 flex-shrink-0 rounded-full bg-neutral-400">icon</div>
				<div>
					<h3 class="text-2xl font-medium">Feature 3</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec fermentum
						lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lectus.
					</p>
				</div>
			</div>

			<div class="flex gap-2">
				<div class="h-8 w-8 flex-shrink-0 rounded-full bg-neutral-400">icon</div>
				<div>
					<h3 class="text-2xl font-medium">Feature 4</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec fermentum
						lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lectus.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Tech Stack -->
<div class="my-14 flex flex-col gap-5">
	<h2 class="text-center text-3xl font-medium dark:text-neutral-200">
		Powered by the latest in web technologies
	</h2>
	<p class="text-center dark:text-neutral-200">
		TheraJournal is built with SvelteKit, a new framework for building web applications. It is
		deployed on Vercel, a cloud platform for static sites, serverless functions, and more. (TODO:
		rewrite this)
	</p>
	{#if dark}
		<img src={techstackdark} alt="techstack" class="mx-auto" />
	{:else}
		<img src={techstack} alt="techstack" class="mx-auto" />
	{/if}
</div>

<!-- Our Team -->
<div class="flex flex-col items-center gap-5">
	<h2 class="text-center text-3xl font-medium dark:text-neutral-200">Our Team</h2>
	<div>
		<p class="text-center dark:text-neutral-200">
			TheraJournal is built by a team of students from the University of Utah. We are passionate
		</p>
		<p class="text-center dark:text-neutral-200">
			about mental health and want to help people understand themselves better.
		</p>
	</div>
	<div
		class="flex items-center gap-2 rounded-full border border-neutral-400 px-3 py-2 dark:border-white"
	>
		<a href="##" class="w-fit dark:text-neutral-200"> Learn more about our team </a>
		<PhArrowRight class="translate-y-[1px] dark:text-white" />
	</div>
	<img src={team} alt="team" class="mx-auto" />
</div>

<!-- User Guide and FAQ -->
<div class="my-14 flex flex-col items-center gap-5">
	<h2 class="text-center text-3xl font-medium dark:text-neutral-200">User Guide and FAQ</h2>
	<div>
		<p class="text-center dark:text-neutral-200">
			For help using TheraJournal or if you have any other questions
			<a href="##" class="link">look here</a>.
		</p>
	</div>
</div>
