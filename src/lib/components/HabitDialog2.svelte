<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	import { onMount } from 'svelte';
	// import 'fluent-svelte/theme.css';
	import '$lib/components/fluent-svelte/theme.css';
	// import { CalendarView } from 'fluent-svelte';
	import CalendarView from '$lib/components/fluent-svelte/CalendarView/CalendarView.svelte';
	import ShareSelector from './ShareSelector.svelte';
	import HabitOptionMenu from './HabitOptionMenu.svelte';

	// ID of the habit, used to load entries
	export let habitID: number;
	// Title of the habit, used to set the title of the dialog
	export let name: string;
	// TODO: load entries from backend
	// export let entries: any[];
	// list of emails that the entry is shared with
	// TODO: load from backend
	export let shared_to: any | undefined = [];

	// Date of today, used for Add/Remove Today button
	let today = new Date();
	today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

	// Date of tomorrow, used to set the max date of the calendar
	let tomorrow: Date = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	// Array of dates that are selected
	// TODO: change to be loaded from backend
	let value: Date[] = [];

	// Used to track if the dialog is open or not
	let isOpen = false;
	// Tracks if the share selector is open or not,
	// to hide popup while it is open
	let shareOpen = false;

	// Used to track the current view of the calendar
	// TODO: use this + exported month from calendar to load entries
	// as you scroll through the calendar
	// should only be loading entries while view is 'days'
	let view: 'days' | 'months' | 'years' | undefined = 'days';

	// TODO: for testing, remove later
	$: console.log('view is now: ' + view);

	// Used to see if two date objects are the same day
	function sameDayMonthYear(date1: Date, date2: Date) {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	}

	// Open the dialog when the component is mounted (page is loaded)
	onMount(() => {
		isOpen = true;
	});
</script>

<Transition show={isOpen}>
	<Dialog
		on:close={() => {
			isOpen = false;
			setTimeout(() => {
				goto('/dashboard');
			}, 300);
		}}
	>
		<TransitionChild
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<DialogOverlay
				class="fixed inset-0 z-30 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-20 duration-300
				{shareOpen ? 'opacity-0' : ''}"
			/>
		</TransitionChild>
		<div
			class="pointer-events-none fixed inset-0 z-40 flex h-screen w-screen items-center justify-center"
			class:hidden={shareOpen}
		>
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<div
					class="pointer-events-auto h-fit w-fit rounded-lg bg-white p-5 shadow-xl transition-all "
				>
					<div class="flex h-full w-[350px] flex-col justify-between">
						<div class="flex justify-between align-middle">
							<DialogTitle class="text-2xl">{name}</DialogTitle>
							<div class="mt-1 mr-1 mb-2 flex gap-3">
								<!-- TODO: write share and unshare callback functions -->
								<ShareSelector title={name} {shared_to} bind:isOpen={shareOpen} />
								<!-- TODO: implement the delete callback! -->
								<HabitOptionMenu
									deleteCallBack={() => {
										console.log('TODO: implement delete callback!');
									}}
								/>
							</div>
						</div>

						<div class="my-2 ">
							<button
								class="font-medium text-neutral-700 underline hover:text-neutral-400 active:text-primary-dark"
								on:click={() => {
									if (value.some((date) => sameDayMonthYear(date, today) == true)) {
										console.log('remove');
										value = value.filter((date) => sameDayMonthYear(date, today) == false);
									} else {
										console.log('add');
										value.push(today);
									}
									value = value;
								}}
							>
								{#if !value.some((date) => sameDayMonthYear(date, today))}
									Add Today
									<iconify-icon inline icon="ph:plus-circle" class="text-md translate-y-[1px]" />
								{:else}
									Remove Today
									<iconify-icon inline icon="ph:minus-circle" class="text-md translate-y-[1px]" />
								{/if}
							</button>
							<span> or click to toggle a date below.</span>
						</div>

						<CalendarView
							multiple
							bind:value
							bind:view
							on:change={() => {
								console.log(value);
							}}
							max={new Date()}
						/>

						<div class="mt-0.5 flex justify-end">
							<button
								class="btn-alt"
								on:click={() => {
									isOpen = false;
									setTimeout(() => {
										goto('/dashboard');
									}, 300);
								}}
							>
								Done
							</button>
						</div>
					</div>
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>
