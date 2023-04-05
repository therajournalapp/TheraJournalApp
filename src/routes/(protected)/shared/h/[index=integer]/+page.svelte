<script lang="ts">
	import EditorWrapper from '$lib/components/EditorWrapper.svelte';
	import HabitDialog from '$lib/components/HabitDialog.svelte';
	import MoodDialog from '$lib/components/MoodDialog.svelte';
	export let data: any;
</script>

{#if data.habit}
	{#if data.habit.type == 'Mood'}
		<MoodDialog
			view_only
			id={data.habit.id}
			name={data.habit.name}
			entries={data.habit.HabitEntry}
			load_entry_values={data.entry_values}
			back_link="/shared"
		/>
	{:else}
		<HabitDialog
			view_only
			id={data.habit.id}
			name={data.habit.name}
			entries={data.habit.HabitEntry}
			back_link="/shared"
		/>
	{/if}
{:else}
	<EditorWrapper back_link="/shared">
		<div
			class="fixed inset-0 top-1/2 left-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-10"
		>
			<p>Error: Habit not found</p>
		</div>
	</EditorWrapper>
{/if}
