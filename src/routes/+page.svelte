<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import dashboard from '$lib/images/dashboard.png';
	import dashboard_dark from '$lib/images/dashboard-dark.png';
	import techstack from '$lib/images/techstack.png';
	import techstackdark from '$lib/images/techstackdark.png';
	import team from '$lib/images/teamcrop.jpg';
	import PhArrowRight from '~icons/ph/arrow-right';
	import { browser } from '$app/environment';
	import PhBookBookmark from '~icons/ph/book-bookmark';
	import PhShareNetwork from '~icons/ph/share-network';
	import PhCalendarCheck from '~icons/ph/calendar-check';
	import PhChartLine from '~icons/ph/chart-line';

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

<!-- Landing Text -->
<div class="app-container my-10">
	<div class="mb-7">
		<h1 class="text-center text-5xl font-medium dark:text-neutral-200">
			The Journal That Helps You
		</h1>
		<h1 class="text-center text-5xl font-medium dark:text-neutral-200">Understand Yourself</h1>
	</div>

	<div class="mx-auto w-full max-w-screen-sm dark:text-neutral-200 ">
		<p class="mx-auto max-w-3xl text-center">
			TheraJournal is an all-in-one web application for patients and therapists, making it easy to
			share information between users and providing analysis on long term trends.
		</p>
	</div>
</div>

<!-- Buttons -->
<div class="mx-auto flex w-full max-w-2xl items-center justify-center gap-7">
	<a href="/signup" class="btn-alt">Sign up</a>
	<a href="/login" class="link">Log in <PhArrowRight class="inline translate-y-[-1px]" /> </a>
</div>

<div class="mt-10 mb-20 flex flex-col gap-28">
	<!-- Screenshot -->
	<div class="app-container">
		<img
			src={dark ? dashboard_dark : dashboard}
			alt="dashboard"
			class="mx-auto w-full max-w-5xl border shadow-lg dark:border-neutral-700 dark:shadow-neutral-600"
		/>
	</div>

	<!-- Features -->
	<div class="app-container flex flex-col gap-5">
		<h2 class="text-center text-3xl font-medium dark:text-neutral-200">Features</h2>
		<div class="flex flex-col gap-3 dark:text-neutral-200">
			<div class="flex gap-3">
				<div class="flex w-1/2 gap-2">
					<PhBookBookmark class="flex-shrink-0 translate-y-[4px] text-2xl text-primary" />
					<div>
						<h3 class="text-2xl font-medium">Journal Editor</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec
							fermentum lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lectus.
						</p>
					</div>
				</div>

				<div class="flex w-1/2 gap-2">
					<PhCalendarCheck class="flex-shrink-0 translate-y-[4px] text-2xl text-primary" />
					<div>
						<h3 class="text-2xl font-medium">Habit & Mood Tracking</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec
							fermentum lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lectus.
						</p>
					</div>
				</div>
			</div>
			<div class="flex gap-3">
				<div class="flex w-1/2 gap-2">
					<PhShareNetwork class="flex-shrink-0 translate-y-[4px] text-2xl text-primary" />
					<div>
						<h3 class="text-2xl font-medium">Sharing</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec
							fermentum lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet lectus.
						</p>
					</div>
				</div>

				<div class="flex w-1/2 gap-2">
					<PhChartLine class="flex-shrink-0 translate-y-[4px] text-2xl text-primary" />
					<div>
						<h3 class="text-2xl font-medium">Therapist Dashboard</h3>
						<p>
							See at a glance what your clients have been writing about. See if they're up to date
							on their goals and how they've been feeling over time.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Tech Stack -->
	<div class="app-container flex flex-col gap-5">
		<h2 class="text-center text-3xl font-medium dark:text-neutral-200">
			Powered by the latest in web technologies
		</h2>
		<div>
			<p class="mx-auto max-w-3xl text-center dark:text-neutral-200">
				TheraJournal is built with SvelteKit, a new framework for building high performance web
				applications. It is deployed on Vercel, a cloud platform for static sites, serverless
				functions, and more.
			</p>
		</div>
		<img src={dark ? techstackdark : techstack} alt="tech stack" class="mx-auto w-full max-w-4xl" />
	</div>

	<!-- Our Team -->
	<div class="flex flex-col items-center gap-7">
		<h2 class="text-center text-3xl font-medium dark:text-neutral-200">Our Team</h2>
		<div>
			<p class="text-center dark:text-neutral-200">
				TheraJournal is built by a team of students from the University of Utah. We are passionate
			</p>
			<p class="text-center dark:text-neutral-200">
				about mental health and want to help people understand themselves better.
			</p>
		</div>
		<a href="##" class="w-fit dark:text-neutral-200">
			<div class="flex items-center gap-2 rounded-full border border-primary px-3 py-2">
				Learn more about our team
				<PhArrowRight class="translate-y-[1px] dark:text-white" />
			</div>
		</a>
		<img src={team} alt="team" class="mx-auto w-full" />
	</div>

	<!-- User Guide -->
	<div class="app-container flex flex-col items-center gap-5">
		<h2 class="text-center text-3xl font-medium dark:text-neutral-200">User Guide</h2>
		<div>
			<p class="text-center dark:text-neutral-200">
				For help using TheraJournal or if you have any other questions
				<a href="##" class="link">look here</a>.
			</p>
		</div>
	</div>
</div>
