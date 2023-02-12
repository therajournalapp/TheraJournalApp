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

	export let habitID: number;
	export let name: String;
	// export let entries: any[];

	// Used to track if the dialog is open or not
	let isOpen = false;

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
				class="fixed inset-0 z-30 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-20"
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
					class="pointer-events-auto h-[500px] w-[375px] rounded-lg bg-white p-5 shadow-xl transition-all "
				>
					<div class="flex h-full flex-col justify-between">
						<div class="flex flex-col gap-3">
							<DialogTitle class="text-2xl">{name}</DialogTitle>
						</div>
						<div class="mt-5 flex justify-end">
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
