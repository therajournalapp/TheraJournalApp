<script lang="ts">
	import { onMount } from 'svelte';
	import HabitCard from './HabitCard.svelte';
	import JournalCard from './JournalCard.svelte';

	let habit: any;
	let journal: any;

	onMount(() => {
		habit.addEventListener('wheel', (ev: any) => {
			ev.preventDefault();
			habit.scrollLeft += ev.deltaY + ev.deltaX;
		});

		journal.addEventListener('wheel', (ev: any) => {
			ev.preventDefault();
			journal.scrollLeft += ev.deltaY + ev.deltaX;
		});
	});

	const lorem =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Laoreet non curabitur gravida arcu ac. Amet tellus cras adipiscing enim eu turpis egestas pretium. Scelerisque viverra mauris in aliquam sem fringilla. Facilisis gravida neque convallis a cras semper auctor neque vitae. At auctor urna nunc id cursus metus aliquam eleifend mi. Nunc sed blandit libero volutpat sed. Magna etiam tempor orci eu lobortis elementum nibh tellus. Nam libero justo laoreet sit amet cursus sit amet. Mauris a diam maecenas sed enim. Ultricies integer quis auctor elit sed vulputate mi sit. Vulputate enim nulla aliquet porttitor lacus. Lacinia at quis risus sed vulputate. Ultrices in iaculis nunc sed. Ante metus dictum at tempor commodo ullamcorper a. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. At lectus urna duis convallis convallis tellus id. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Ac felis donec et odio pellentesque diam. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus. Ipsum a arcu cursus vitae congue mauris rhoncus. Proin fermentum leo vel orci porta non pulvinar neque. Neque volutpat ac tincidunt vitae semper quis lectus. Morbi non arcu risus quis varius quam quisque id diam. Donec enim diam vulputate ut pharetra sit amet aliquam. Varius duis at consectetur lorem donec massa. Non quam lacus suspendisse faucibus interdum. Bibendum enim facilisis gravida neque. Lobortis feugiat vivamus at augue eget arcu.';
</script>

<svelte:head>
	<title>TheraJournal</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="app-container mb-2">
	<a href="/dashboard#" class="text-3xl font-medium hover:underline">Habits</a>
</div>

<div class="card-scroll" bind:this={habit}>
	<div class="left-pad" />

	<!-- <a href="/dashboard/p/1" class="block">
		<HabitCard name="Mood" />
	</a>

	<a href="/dashboard/p/2" class="block">
		<HabitCard name="Medication 10mg" />
	</a>

	<a href="/dashboard/p/2" class="block">
		<HabitCard name="Medication 10mg" />
	</a> -->

	<HabitCard
		name="Mood"
		sun="bg-accent-yellow"
		mon="bg-accent-purple"
		tue="bg-accent-blue"
		wed="bg-accent-red"
		thu="circle-future"
		fri="circle-future"
		sat="circle-future"
	/>

	<HabitCard name="Medication 10mg" mon="circle-untracked" />

	<div class="right-pad" />
</div>

<div class="app-container mt-10 mb-2">
	<a href="/dashboard#" class="text-3xl font-medium hover:underline">Journal Entries</a>
</div>

<div class="card-scroll" bind:this={journal}>
	<div class="left-pad" />

	<JournalCard title="Really long title lorem ipsum dolar sit amet bingus bongus" preview={lorem} />

	<JournalCard title="Jan 4th" preview={lorem} />

	<JournalCard title="Jan 3rd" preview={lorem} />

	<JournalCard title="Jan 2nd" preview={lorem} />

	<JournalCard title="Jan 1st" preview={lorem} />

	<JournalCard title="Dec 31st" preview={lorem} />

	<JournalCard title="Dec 30th" preview={lorem} />

	<JournalCard title="Dec 29th" preview={lorem} />

	<JournalCard title="Dec 28th" preview={lorem} />

	<JournalCard title="Dec 27th" preview={lorem} />

	<JournalCard title="Dec 26th" preview={lorem} />
	<div class="right-pad" />
</div>

<slot />

<style>
	.card-scroll {
		@apply flex w-screen shrink-0 gap-5 overflow-auto p-2;
	}

	.left-pad {
		@apply block h-28 min-w-[0.5rem] md:min-w-[7vw];
	}

	.right-pad {
		@apply block h-28 min-w-[0.8rem] md:min-w-[7.5vw];
	}

	/* Custom scroll bars for card-scroll */
	/* based on: https://dev.to/xtrp/how-to-create-a-beautiful-custom-scrollbar-for-your-site-in-plain-css-1mjg */
	.card-scroll::-webkit-scrollbar {
		height: 20px;
	}

	.card-scroll::-webkit-scrollbar-track {
		background-color: transparent;
		margin-left: 9vw;
		margin-right: 9.5vw;
		margin-left: 2rem;
		margin-right: 2rem;
	}

	.card-scroll::-webkit-scrollbar-thumb {
		border-radius: 20px;
		border: 7.5px solid transparent;
		background-clip: content-box;
		background-color: rgba(0, 0, 0, 0);
		/* background-color: #d6dee1; */
		transition: 2s;
	}

	.card-scroll:hover::-webkit-scrollbar-thumb {
		background-color: #d6dee1;
	}

	/* md */
	@media (min-width: 768px) {
		.card-scroll::-webkit-scrollbar-track {
			margin-left: 9.5vw;
			margin-right: 10vw;
		}
	}

	/* lg */
	@media (min-width: 1280px) {
		.left-pad,
		.right-pad {
			min-width: calc((100vw - 1300px) / 2);
		}

		.card-scroll::-webkit-scrollbar-track {
			margin-left: calc((100vw - 1260px) / 2);
			margin-right: calc((100vw - 1260px) / 2);
		}
	}
</style>
