<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	import Tags from 'svelte-tags-input'; // no types for package unfortunately :(
	import { onMount } from 'svelte';
	import PhTag from '~icons/ph/tag';

	// Used to track if the dialog is open or not
	export let id: number;
	export let isOpen = false;
	export let body: string;
	export let existingTags: string[] = [];

	// handle bug with tiny zero space tag in input
	if (existingTags[0] == '') existingTags = [];

	let suggestedTags = new Set<string>();
	// set with initial values like this: new set<string>(['tag1', 'tag2', 'tag3'])

	let TagsInput: any;

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
			if (!existingTags.includes(element)) suggestedTags.add(element);
		});
		// filter out cardinal(?) tags, should probably do this on server but whatever
		data.tags.forEach((element: any) => {
			if (!existingTags.includes(element[0]) && element[1] !== 'CARDINAL') {
				suggestedTags.add(element[0]);
			}
		});
		console.log(suggestedTags);
	});

	async function saveTags() {
		console.log(existingTags);
		const saveTags = await fetch('/api/tags', {
			method: 'POST',
			body: JSON.stringify({ tags: existingTags.join(), id: id }),
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	function addTag(tag: string) {
		if (!existingTags.includes(tag)) {
			// in order for this to be reactive, there needs to be an assignment
			let newTags = [...existingTags, tag];
			existingTags = newTags;

			let copiedTags = new Set<string>(suggestedTags);
			copiedTags.delete(tag);
			suggestedTags = copiedTags;
		}
	}
</script>

<div>
	<button
		class="btn-alt !bg-neutral-50 !px-3 hover:!bg-neutral-200 active:!bg-neutral-400"
		on:click={() => {
			isOpen = true;
		}}
	>
		<PhTag class="mr-1 inline text-[17px]" />
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
							<Tags
								bind:tags={existingTags}
								onlyUnique={true}
								maxTags={10}
								minChars={3}
								labelText={'Saved Tags: '}
								placeholder={'Type a new tag'}
							/>
							<h5>Suggested Tags:</h5>
							<!-- TODO: I can't get it to remove things when deleting this suggestion from suggestedTags list. Maybe because it is a set? -->
							{#each [...suggestedTags] as tag (tag)}
								<a
									href="#"
									class="text-neutral-700 underline hover:text-neutral-900"
									on:click={() => {
										console.log(tag);
										addTag(tag);
									}}
								>
									{tag}
								</a>
							{/each}
						</div>

						<div class="mt-5 flex justify-end">
							<button
								class="btn-alt"
								on:click={() => {
									isOpen = false;
									saveTags();
								}}
							>
								Save
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
