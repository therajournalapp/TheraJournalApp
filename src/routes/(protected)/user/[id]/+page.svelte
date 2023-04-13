<script lang="ts">
	import { onMount } from 'svelte';
	import { Line, Bar } from 'svelte-chartjs';
	import 'chart.js/auto';

	export let data: any;

	let chartData = {};
	let habitChartData = {};

	async function populateChartData() {
		const currDate = new Date();
		const moodEntries: any = await getMoodEntries(currDate.getMonth(), currDate.getFullYear());

		const therajournalGreen = '#5F7938';

		chartData = {
			labels: moodEntries?.map((entry: any) => {
				let date = new Date(entry.date);
				return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
			}),
			datasets: [
				{
					label: 'Mood',
					fill: false,
					lineTension: 0.4,
					backgroundColor: 'rgba(225, 204,230, .3)',
					borderColor: therajournalGreen,
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: therajournalGreen,
					pointBackgroundColor: therajournalGreen,
					pointBorderWidth: 10,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(0, 0, 0)',
					pointHoverBorderColor: 'rgba(220, 220, 220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: moodEntries?.map((entry: any) => entry.value)
				}
			]
		};
	}

	async function populateSentimentChartData(sentimentEntries: any) {
		const therajournalGreen = '#5F7938';

		console.log('Sentiment Entries');
		console.log(sentimentEntries);

		let sentimentChartData = {
			labels: sentimentEntries?.map((entry: any) => {
				let date = new Date(entry.createdAt);
				return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
			}),
			datasets: [
				{
					label: 'Mood',
					fill: false,
					lineTension: 0.4,
					backgroundColor: 'rgba(225, 204,230, .3)',
					borderColor: therajournalGreen,
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: therajournalGreen,
					pointBackgroundColor: therajournalGreen,
					pointBorderWidth: 10,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(0, 0, 0)',
					pointHoverBorderColor: 'rgba(220, 220, 220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: sentimentEntries?.map((entry: any) => entry.sentiment)
				}
			]
		};

		return sentimentChartData;
	}

	async function populateHabitChartData(name: String, entries: any) {
		// const currDate = new Date();
		// const moodEntries: any = await getMoodEntries(currDate.getMonth(), currDate.getFullYear());

		const therajournalGreen = '#5F7938';

		let backgroundColors = [];
		let borderColors = [];
		for (let i = 0; i < entries.length; i++) {
			backgroundColors.push('rgba(225, 204,230, .3)');
			borderColors.push(therajournalGreen);
		}

		let habitChartData = {
			labels: entries?.map((entry: any) => {
				//console.log(entry[0]);
				return entry[0];
			}),
			datasets: [
				{
					label: name,
					fill: true,
					backgroundColor: therajournalGreen,
					borderWidth: 2,
					data: entries?.map((entry: any) => {
						//console.log(entry[1]);
						return parseInt(entry[1]);
					})
				}
			]
		};

		return habitChartData;
	}

	// Gets all mood entries for the requested month and year for the shared user
	async function getSentimentEntries(month: number, year: number) {
		// Create a date string for the requested month and year
		const date = new Date(year, month, 1);

		// Adds the shared user id and requested date as query parameters
		const params = [
			['sharedId', data.shared_user_id],
			['date', date.toString()]
		];

		const search_params = new URLSearchParams(params);

		// Fetches the shared mood entries
		const res = await fetch('/api/analysis/sentiment?' + search_params.toString(), {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		const responseData = await res.json();

		if (responseData.entries) {
			return responseData.entries;
		}

		return [];
	}

	// Gets all mood entries for the requested month and year for the shared user
	async function getMoodEntries(month: number, year: number) {
		// Create a date string for the requested month and year
		const date = new Date(year, month, 1);

		// Adds the shared user id and requested date as query parameters
		const params = [
			['sharedId', data.shared_user_id],
			['date', date.toString()]
		];

		const search_params = new URLSearchParams(params);

		// Fetches the shared mood entries
		const res = await fetch('/api/analysis/mood?' + search_params.toString(), {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		const responseData = await res.json();

		if (responseData.entries) {
			return responseData.entries;
		}

		return [];
	}

	// Gets all custom habit names for the shared user
	async function getHabitNames() {
		const search_params = new URLSearchParams([['sharedId', data.shared_user_id]]);

		// Fetches the shared mood entries
		const res = await fetch('/api/analysis/habit?' + search_params.toString(), {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		const habit_names = await res.json();

		console.log('Retrieved habit names');
		console.log(habit_names);

		return habit_names;
	}

	// Gets all custom habit entries for a specific habit for the shared user
	async function getHabitEntries(habit: String) {
		const params = [
			['sharedId', data.shared_user_id],
			['habit', habit]
		];

		const search_params = new URLSearchParams(params);

		const res = await fetch('/api/analysis/habitEntry?' + search_params.toString(), {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		const habit_entries = await res.json();

		console.log('Retrieved ' + habit + ' entries');
		console.log(habit_entries);
		return habit_entries;
	}

	let habit_names: any;
	onMount(async () => {
		populateChartData();
		habit_names = await getHabitNames();
		habit_names = habit_names.habit_names;
		console.log(habit_names);

		getHabitEntries(habit_names[0]);
	});
</script>

<div class="app-container mb-5">
	<h1 class="text-3xl font-medium dark:text-neutral-200">
		{data.user_email['email']}
	</h1>
</div>

<div class="app-container">
	<h2 class="mt-4 mb-2 text-2xl font-medium dark:text-neutral-200">Mood</h2>
	<div class="chart-wrapper">
		<Line
			data={chartData}
			options={{
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {
					y: {
						ticks: {
							callback: function (value, index, ticks) {
								switch (value) {
									case 1:
										return 'Awful';
									case 2:
										return 'Bad';
									case 3:
										return 'Meh';
									case 4:
										return 'Good';
									case 5:
										return 'Great';
									default:
										return '';
								}
							},
							color: '#fff'
						}
					}
				}
			}}
		/>
	</div>
	{#if habit_names}
		{#each habit_names as habit}
			<h2 class="mt-4 mb-2 text-2xl font-medium dark:text-neutral-200">{habit}</h2>
			{#await getHabitEntries(habit)}
				loading
			{:then habit_entries}
				{#await populateHabitChartData(habit, habit_entries.month_counts) then habitChartData}
					<div class="chart-wrapper">
						<Bar
							data={habitChartData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								plugins: {
									legend: {
										display: false
									}
								}
							}}
						/>
					</div>
				{/await}
			{:catch error}
				{error}
			{/await}
		{/each}
	{/if}
	{#await getSentimentEntries(new Date().getMonth(), new Date().getFullYear())}
		loading
	{:then sentiment_entries}
		<h2 class="mt-4 mb-2 text-2xl font-medium dark:text-neutral-200">Sentiment</h2>
		{#await populateSentimentChartData(sentiment_entries) then sentimentChartData}
			<div class="chart-wrapper">
				<Line
					data={sentimentChartData}
					options={{
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							legend: {
								display: false
							}
						}
					}}
				/>
			</div>
		{/await}
	{/await}
</div>

<style lang="postcss">
	.chart-wrapper {
		@apply h-[300px] max-w-screen-md rounded-lg bg-white p-4 shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700 sm:h-[400px];
	}
</style>
