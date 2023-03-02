<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	import { onMount } from 'svelte';

	// Used to track if the dialog is open or not
	export let isOpen = false;
	export let body: string;

	export let tags = new Set<string>();
	// set with initial values like this: new set<string>(['tag1', 'tag2', 'tag3'])

	onMount(async () => {
		const response = await fetch('http://34.16.133.112:8080/tags', {
			method: 'POST',
			body: JSON.stringify({ text: body }),
			headers: {
				'Content-type': 'application/json'
			}
		});
		const data = await response.json();
		console.log(data);
		data.keywords.forEach((element: string) => {
			tags.add(element);
		});
		// filter out cardinal(?) tags, should probably do this on server but whatever
		data.tags.forEach((element: any) => {
			if (element[1] !== 'CARDINAL') tags.add(element[0]);
		});
		console.log(tags);
	});
</script>

<div>
	<button
		class="btn-alt !bg-neutral-50 !px-3 hover:!bg-neutral-200 active:!bg-neutral-400"
		on:click={() => {
			isOpen = true;
		}}
	>
		<div class="mr-1 h-[20px] w-[20px]">
			<iconify-icon inline icon="ph:tag" class="text-[20px]" />
		</div>
		Tags
	</button>

	<Transition show={isOpen}>
		<Dialog on:close={() => (isOpen = false)}>
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
						class="pointer-events-auto flex h-[500px] w-[375px] flex-col justify-between rounded-lg bg-white p-5 shadow-xl transition-all"
					>
						<div class="flex flex-col gap-3">
							<DialogTitle class="text-xl text-neutral-700">Tags</DialogTitle>
							<!-- <p>{body}</p> -->
							{#each [...tags] as tag}
								<div class="text-neutral-700">{tag}</div>
							{/each}
						</div>

						<div class="mt-5 flex justify-end">
							<button
								class="btn-alt"
								on:click={() => {
									isOpen = false;
								}}
							>
								Done
							</button>
						</div>
					</div>
				</TransitionChild>
			</div>
		</Dialog>
	</Transition>
</div>

<style lang="postcss">
</style>
