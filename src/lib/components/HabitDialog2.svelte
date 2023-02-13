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

	export let habitID: number;
	export let name: string;
	// export let entries: any[];

	let today = new Date();
	today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

	let tomorrow: Date = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	// let value = [today, tomorrow];
	let value = [new Date(2023, 1, 10)];

	// Used to track if the dialog is open or not
	let isOpen = false;

	let shareOpen = false;

	let view: 'days' | 'months' | 'years' | undefined = 'days';

	$: console.log('view is now: ' + view);

	function sameDayMonthYear(date1: Date, date2: Date) {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	}

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
							<div class="mt-1 mr-1 mb-2">
								<ShareSelector title={name} shared_to={[]} bind:isOpen={shareOpen} />
							</div>
						</div>

						<div class="my-2 hover:text-neutral-400 active:text-primary-dark">
							<button
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
								{:else}
									Remove Today
								{/if}

								<iconify-icon inline icon="ph:plus-circle" class="text-md translate-y-[1px]" />
							</button>
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

<!-- <style lang="postcss">
	:global(.calendar-view) {
		border: none !important;
	}
	:global(.calendar-view-item.type-day.out-of-range) {
		@apply !hidden;
	}
	/* :global(.calendar-view-item.type-day) {
		@apply !border-black;
	} */
	:global(.calendar-view-item.type-day.selected) {
		@apply !border-none !bg-primary !text-white;
	}
	:global(.calendar-view-item.type-day.disabled) {
		@apply !border-dashed !border-black;
	}
</style> -->
