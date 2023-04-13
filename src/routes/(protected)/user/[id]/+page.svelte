<script lang="ts">
	import { Line } from 'svelte-chartjs';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	export let data: any;

  let chartData = {};
    
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
		const res = await fetch('http://127.0.0.1:5173/api/analysis/mood?' + search_params.toString(), {
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
					fill: true,
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
	}
</script>

<h1>Hello from user</h1>

/>

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
	}
	populateChartData();
</script>

<div class="app-container mb-5">
	<h1 class="text-3xl font-medium dark:text-neutral-200">
		{data.user_email['email']}
	</h1>
</div>

<div class="app-container">
	<h2 class="text-2xl font-medium dark:text-neutral-200">Mood</h2>
	<Line
		data={chartData}
		options={{
			responsive: false,
			plugins: {
				legend: {
					display: false
				}
			},
			scales: {
				y: {
					ticks: {
						// Include a dollar sign in the ticks
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
						}
					}
				}
			}
		}}
		width={600}
		height={300}
	/>
</div>

<!-- <Line
	data={{
		labels: [1, 2, 3],
		datasets: [
			{
				label: 'Acquisitions by year',
				data: [2, 3, 2]
			}
		]
	}}
	width={100}
	height={50}
	options={{ maintainAspectRatio: false }}
/> -->

<!-- <div class="app-container mt-10 mb-2 flex items-baseline">
	<a href="/shared#" class="mr-3 text-3xl font-medium hover:underline">Shared Entries</a>
</div>
<div class="card-scroll" bind:this={journal}>
	<div class="left-pad" />
	{#if data.entries && data.entries.length === 0}
		<div
			class="relative flex h-56 w-[400px] min-w-[16rem] flex-col overflow-hidden rounded-lg border-2 border-dashed border-black border-opacity-60 p-4 shadow-md shadow-offwhite-light"
		>
			<div class="flex h-full w-full items-center justify-center">
				<PhXCircle class="mr-2 text-[160px] opacity-60" />
				<div class="w-fit max-w-[250px]">
					<p class="text-xl font-medium">No Shared Entries</p>

					<p>If anyone shares entries with you in the future they will show up here.</p>
				</div>
			</div>
		</div>
	{/if}

	{#each data.entries as entry (entry.id)}
		<div animate:flip={{ duration: 500 }} in:fly|local={{ y: 150 }} out:fade|local>
			<JournalCard
				id={entry.id}
				title={entry.title}
				body={entry.body}
				date={entry.createdAt}
				shared_by={entry.user.email}
				link_to="shared"
			/>
		</div>
	{/each}
	<div class="right-pad" />
</div>

<HabitCard
id={event.id}
name={event.name}
date={event.createdAt}
entries={event.HabitEntry}
shared_by={event.user.email}
type={event.type}
link_to="shared" -->
<!-- /> -->

