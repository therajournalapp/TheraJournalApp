<script lang="ts">
	export let data: any;

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

		const mood_entries = await res.json();

		console.log('Retrieved mood entries');
		console.log(mood_entries);
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
