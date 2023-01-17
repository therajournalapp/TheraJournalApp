<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import 'iconify-icon';
	import ShareToggle from '$lib/components/ShareToggle.svelte';
	import debounce from 'lodash/debounce';
	import { invalidateAll } from '$app/navigation';

	export let id: number;
	export let title: String;
	export let body: string;
	export let save: String = 'Saved';

	let element: HTMLElement;
	let editor: Editor;

	const saveNow = async () => {
		if (editor != null) {
			save = 'Saving...';
			const response = await fetch('/api/journalEntry', {
				method: 'POST',
				body: JSON.stringify({ id: id, title: title, body: editor.getHTML() }),
				headers: {
					'content-type': 'application/json'
				}
			});

			//TODO: read response to see if post succeded or not

			save = 'Saved';
		}
	};

	// debounce so every keystroke doesn't send request
	// only save once every 2 seconds
	const saveContent = debounce(saveNow, 2000);

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: JSON.parse(body),
			editorProps: {
				attributes: {
					class:
						'prose min-h-[80vh] mt-[20vh] prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none bg-white p-8 rounded-t-lg w-full max-w-full sm:max-w-full'
				}
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				// autosave on edit
				saveContent();
			}
		});
	});

	onDestroy(() => {
		// update dashboard preview by invalidating it's load function
		saveNow();
		invalidateAll();
		setTimeout(() => {
			invalidateAll();
		}, 1000);

		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="max-h-[20vh]">
	<div class="title-bar">
		<div class="mx-auto max-w-screen-lg">
			<div class="h-18 flex content-baseline justify-between py-5">
				<input
					type="text"
					id="entry-title"
					on:change={saveContent}
					bind:value={title}
					class="title"
				/>

				<ShareToggle big={true} />
			</div>

			{#if editor}
				<div class="flex flex-wrap items-baseline justify-between">
					<div class="editor-row flex gap-1">
						<button
							on:click={() => editor.chain().focus().toggleBold().run()}
							class:active={editor.isActive('bold')}
						>
							<iconify-icon icon="ph:text-bolder-bold" width="20" />
						</button>
						<button
							on:click={() => editor.chain().focus().toggleItalic().run()}
							class:active={editor.isActive('italic')}
						>
							<iconify-icon icon="ph:text-italic" width="20" />
						</button>
						<button
							on:click={() => editor.chain().focus().toggleStrike().run()}
							class:active={editor.isActive('strike')}
						>
							<iconify-icon icon="ph:text-strikethrough" width="20" />
						</button>

						<!-- TODO: add color extension -->
						<button> <iconify-icon icon="ph:palette" width="20" /> </button>

						<div class="divider" />

						<!-- <button
							on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
							class:active={editor.isActive('heading', { level: 1 })}
						>
							<iconify-icon icon="ph:text-h-one" width="20" />
						</button>
						<button
							on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
							class:active={editor.isActive('heading', { level: 2 })}
						>
							<iconify-icon icon="ph:text-h-two" width="20" />
						</button>
						<button
							on:click={() => editor.chain().focus().setParagraph().run()}
							class:active={editor.isActive('paragraph')}
						>
							<iconify-icon icon="ph:text-aa" width="20" />
						</button> -->

						<button
							on:click={() => editor.chain().focus().toggleBulletList().run()}
							class:active={editor.isActive('bulletList')}
						>
							<iconify-icon icon="ph:list-bullets" width="20" />
						</button>
						<button
							on:click={() => editor.chain().focus().toggleOrderedList().run()}
							class:active={editor.isActive('orderedList')}
						>
							<iconify-icon icon="ph:list-numbers" width="20" />
						</button>

						<div class="divider" />

						<button
							on:click={() => editor.chain().focus().toggleBlockquote().run()}
							class:active={editor.isActive('blockquote')}
						>
							<iconify-icon icon="ph:quotes" width="20" />
						</button>
						<button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
							<iconify-icon icon="ph:dots-three-outline" width="20" />
						</button>

						<div class="divider" />

						<!-- TODO: add emoji picker -->

						<button on:click={() => editor.commands.undo()}>
							<iconify-icon icon="ph:arrow-u-up-left" width="20" />
						</button>
						<button on:click={() => editor.commands.redo()}>
							<iconify-icon icon="ph:arrow-u-up-right" width="20" />
						</button>
					</div>

					<!-- <button on:click={saveContent} class="btn block">Save</button> -->

					<button
						on:click={saveNow}
						class="mr-3.5 inline h-fit -translate-y-1 text-white hover:text-neutral-300 active:text-neutral-700"
						>{save}</button
					>
				</div>
			{/if}
		</div>
	</div>

	<div bind:this={element} class="" />
</div>

<style lang="postcss">
	.title-bar {
		@apply fixed top-0 left-0 z-30 w-full;
		background: rgba(0, 0, 0, 0.25);
	}

	.title {
		@apply h-10 w-full bg-transparent text-3xl text-white ring-0 hover:underline focus-visible:outline-none;
		text-shadow: 1px 1px 5px grey;
	}

	.divider {
		@apply mt-2 h-[32px];
		background-color: #ffffff1a;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		width: 1px;
	}

	/* text-neutral-700 */
	.editor-row button {
		@apply h-[48px] w-[48px] rounded-full p-[14px] text-white hover:bg-neutral-500;
	}

	.editor-row button.active,
	.editor-row button:active {
		@apply bg-neutral-700;
	}
</style>
