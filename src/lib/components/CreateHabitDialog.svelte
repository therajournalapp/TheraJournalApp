<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	// Used to track if the dialog is open or not
	let isOpen = false;

	// Open the dialog when the component is mounted (page is loaded)
	onMount(() => {
		isOpen = true;
		console.log($page.route.id);
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
				class="fixed inset-0 z-30 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-20 duration-300"
			/>
		</TransitionChild>
		<div
			class="pointer-events-none fixed inset-0 z-40 flex h-screen w-screen items-center justify-center"
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
					<div class="h-full w-[350px]">
						<form method="POST" use:enhance id="form" class="flex flex-col justify-between gap-7">
							<div class="flex justify-between align-middle">
								<DialogTitle class="text-2xl">Create new Habit Tracker</DialogTitle>
							</div>

							<div class="flex flex-col gap-2">
								<label class="text-sm font-medium text-neutral-500" for="name">Habit Name:</label>
								<input id="name" name="name" class="input" placeholder="Ex: Morning Meditation" />
							</div>

							<div class="mt-0.5 flex justify-end gap-2.5">
								<button
									class="btn-alt !bg-transparent !text-neutral-500 hover:!bg-neutral-100 active:!bg-neutral-200"
									on:click={() => {
										isOpen = false;
										setTimeout(() => {
											goto('/dashboard');
										}, 300);
									}}
								>
									Cancel
								</button>
								<button class="btn-alt" type="submit" form="form"> Create </button>
							</div>
						</form>
					</div>
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>
