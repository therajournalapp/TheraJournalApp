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
	let summary: string = '';
	// handle bug with tiny zero space tag in input
	if (existingTags[0] == '') existingTags = [];

	let suggestedTags = new Set<string>();
	// set with initial values like this: new set<string>(['tag1', 'tag2', 'tag3'])

	let TagsInput: any;
	onMount(async () => {
		const summaryResponse = fetch('http://35.219.179.207:8080/summary', {
			method: 'POST',
			body: JSON.stringify({ text: body }),
			headers: {
				'Content-type': 'application/json'
			}
		});

		const response = await fetch('http://35.219.179.207:8080/tags', {
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
			if (
				!existingTags.includes(element[0]) &&
				element[1] !== 'CARDINAL' &&
				element[1] !== 'ORDINAL'
			) {
				suggestedTags.add(element[0]);
			}
		});
		console.log(suggestedTags);

		const summaryData = await (await summaryResponse).json();
		if (summaryData.summary != body) summary = summaryData.summary;
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
						class="pointer-events-auto flex h-[650px] w-[400px] flex-col justify-between rounded-lg bg-white p-5 shadow-xl transition-all dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700"
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
							<h5 class="dark:text-neutral-200">Suggested Tags:</h5>
							<div class="overflow-scroll whitespace-normal">
								<!-- TODO: I can't get it to remove things when deleting this suggestion from suggestedTags list. Maybe because it is a set? -->
								{#each [...suggestedTags] as tag (tag)}
									<!-- svelte-ignore a11y-invalid-attribute -->
									<a
										href="#"
										class="p-0.25 ml-1 whitespace-normal rounded-sm border-2 border-solid border-neutral-700 text-neutral-700 hover:border-primary hover:text-neutral-900 dark:border-neutral-400 dark:text-neutral-200"
										on:click={() => {
											console.log(tag);
											addTag(tag);
										}}
									>
										{tag}
									</a>
								{/each}
							</div>
							<h5 class="dark:text-neutral-200">Auto Summary</h5>
							<p class="dark:text-neutral-200">{summary}</p>
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
