<script lang="ts">
	export let data;
</script>

<h1>Hello from user</h1>

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
/>