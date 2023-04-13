<script lang="ts">
	import { Line } from 'svelte-chartjs';
	// import { chartData } from './data.js';

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

	async function getMoodEntries() {
		// Adds the shared user id as a parameter
		const search_params = new URLSearchParams([['sharedId', data.shared_user_id]]);

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
		const moodEntries: any = await getMoodEntries();

		console.log('Mood entries: ');
		console.log(moodEntries);

		chartData = {
			labels: moodEntries?.map((entry) => entry.date),
			datasets: [
				{
					label: 'My First dataset',
					fill: true,
					lineTension: 0.4,
					backgroundColor: 'rgba(225, 204,230, .3)',
					borderColor: 'rgb(205, 130, 158)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgb(205, 130,1 58)',
					pointBackgroundColor: 'rgb(255, 255, 255)',
					pointBorderWidth: 10,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(0, 0, 0)',
					pointHoverBorderColor: 'rgba(220, 220, 220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: moodEntries?.map((entry) => entry.value)
				}
			]
		};
	}
</script>

<h1>Hello from user</h1>

{populateChartData()}

{#key chartData}
	<Line data={chartData} options={{ responsive: false }} width={600} height={300} />
{/key}

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
