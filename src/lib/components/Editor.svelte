<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor, getText } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import 'iconify-icon';
	import ShareSelector from './ShareSelector.svelte';
	import debounce from 'lodash/debounce';
	import { goto, invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	import EditorOptionMenu from './EditorOptionMenu.svelte';
	import TagViewer from './TagViewer.svelte';

	// id of the journal entry, used for saving api call
	export let id: number;
	// title of the journal entry
	export let title: string;
	// date of the journal entry
	export let date: Date;
	// the entry's contents
	export let body: string;
	// editor text used for passing to the tag viewer
	let text: string;
	// list of emails that the entry is shared with
	export let shared_to: any | undefined = undefined;

	// back link, used for the back button
	export let back_link: string = '/dashboard';

	// view only mode, used for viewing shared entries
	export let view_only: boolean = false;

	let content: string = '';
	if (body && body.length > 0) {
		if (body.charAt(0) == '<') {
			content = body;
		} else {
			content = JSON.parse(body);
		}
	}

	let loaded = false;

	let save: String = 'Saved';

	let element: HTMLElement;
	let editor: Editor;

	let deleting = false;

	const saveNow = async () => {
		if (editor != null) {
			save = 'Saving...';
			const response = await fetch('/api/journalEntry', {
				method: 'PATCH',
				body: JSON.stringify({ id: id, title: title, body: editor.getHTML() }),
				headers: {
					'content-type': 'application/json'
				}
			});
			text = editor.getText();
			console.log('text: ' + text); // TODO: remove
			//TODO: read response to see if post succeded or not

			save = 'Saved';
		}
	};

	// debounce so every keystroke doesn't send request
	// only save once every 2 seconds
	const saveContent = debounce(saveNow, 2000);

	onMount(() => {
		if (view_only) {
			return;
		}

		editor = new Editor({
			element: element,
			extensions: [StarterKit, Placeholder.configure({ placeholder: 'Start writing here...' })],
			autofocus: 'start',
			content: content,
			editorProps: {
				attributes: {
					class:
						'prose mt-[150px] min-h-[calc(100vh-150px)] prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none bg-white p-8 rounded-t-lg w-full max-w-full sm:max-w-full'
				}
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				// autosave on edit
				if (browser) {
					saveContent();
				}
			},
			onBeforeCreate: () => {
				// Switch ssr html to live editor
				loaded = true;
			}
		});
		text = editor.getText();
	});

	onDestroy(async () => {
		if (view_only) {
			return;
		}

		if (!deleting) {
			if (browser) {
				// immediately save before unmounting
				await saveContent.flush();
				// update dashboard preview by invalidating it's load function
				invalidateAll();
			}
		}

		if (editor) {
			editor.destroy();
		}
	});

	let onShare: Function = async (email: string): Promise<string | Error> => {
		const response = await fetch('/api/shareEntry', {
			method: 'POST',
			body: JSON.stringify({ email: email, entry_id: id }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const json = await response.json();
		const { message } = json;
		if (response.ok) {
			invalidateAll();
			return message as string;
		} else {
			if (response.status == 409) {
				return Error('Entry is already shared with this user.');
			}
			return Error("User couldn't be found.");
		}
	};

	let onUnshare: Function = async (email: string): Promise<string | Error> => {
		const response = await fetch('/api/shareEntry', {
			method: 'DELETE',
			body: JSON.stringify({ email: email, entry_id: id }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const json = await response.json();
		const { message } = json;
		if (response.ok) {
			invalidateAll();
			return message as string;
		} else {
			return Error('Error deleting share.');
		}
	};
</script>

<svelte:head>
	<noscript>
		<style>
			.jsonly {
				display: none;
			}
		</style>
	</noscript>
</svelte:head>

<div class="max-h-[20vh]">
	<div class="title-bar overflow-clip [scroll-gutter:stable]">
		<div class="mx-auto max-w-screen-lg">
			<div class="h-18 flex content-baseline justify-between py-5">
				<div class="mr-5 flex items-center">
					<a
						href={back_link}
						class="arrow-link text-white hover:text-neutral-300 active:text-neutral-700"
					>
						<div class="block h-[25px] w-[25px]">
							<iconify-icon inline icon="ph:caret-left-thin" width="25" class="arrow" />
						</div>
						<span class="pl-2">Back</span>
					</a>
				</div>
				{#if !view_only}
					<input
						type="text"
						id="entry-title"
						placeholder={'Untitled Entry (click to edit title)'}
						on:change={saveContent}
						bind:value={title}
						class="title"
					/>
					<div class="flex gap-3">
						{#if text}
							<TagViewer body={text} />
						{/if}

						<ShareSelector
							{title}
							shared_to={shared_to ?? []}
							big
							shareCallback={onShare}
							unshareCallback={onUnshare}
						/>
						<EditorOptionMenu
							deleteCallBack={() => {
								deleting = true;
								window.location.href = '/dashboard/delete/' + id;
							}}
						/>
					</div>
				{:else}
					<h1 class="title hover:!no-underline">{title == '' ? 'Untitled Entry' : title}</h1>
				{/if}
			</div>

			{#if !view_only}
				<noscript>
					<p class="mb-3 text-white">Enable javascript to edit journal entries.</p>
				</noscript>
				<div class="jsonly flex flex-wrap items-baseline justify-between">
					<div class="editor-row mx-[-15px] flex gap-1">
						<button
							on:click={() => {
								if (editor) {
									editor.chain().focus().toggleBold().run();
								}
							}}
							class:active={editor && editor.isActive('bold')}
						>
							<iconify-icon icon="ph:text-bolder-bold" width="20" />
						</button>
						<button
							on:click={() => {
								if (editor) {
									editor.chain().focus().toggleItalic().run();
								}
							}}
							class:active={editor && editor.isActive('italic')}
						>
							<iconify-icon icon="ph:text-italic" width="20" />
						</button>
						<button
							on:click={() => {
								if (editor) {
									editor.chain().focus().toggleStrike().run();
								}
							}}
							class:active={editor && editor.isActive('strike')}
						>
							<iconify-icon icon="ph:text-strikethrough" width="20" />
						</button>

						<!-- TODO: add color extension -->
						<!-- <button> <iconify-icon icon="ph:palette" width="20" /> </button> -->

						<div class="divider" />

						<!-- <button
							on:click={() => {if (editor) {editor.chain().focus().toggleHeading({ level: 1 }).run()}}}
							class:active={editor && editor.isActive('heading', { level: 1 })}
						>
							<iconify-icon icon="ph:text-h-one" width="20" />
						</button>
						<button
							on:click={() => {if (editor) {editor.chain().focus().toggleHeading({ level: 2 }).run()}}}
							class:active={editor && editor.isActive('heading', { level: 2 })}
						>
							<iconify-icon icon="ph:text-h-two" width="20" />
						</button>
						<button
							on:click={() => {if (editor) {editor.chain().focus().setParagraph().run()}}}
							class:active={editor && editor.isActive('paragraph')}
						>
							<iconify-icon icon="ph:text-aa" width="20" />
						</button> -->

						<button
							on:click={() => {
								if (editor) {
									editor.chain().focus().toggleBulletList().run();
								}
							}}
							class:active={editor && editor.isActive('bulletList')}
						>
							<iconify-icon icon="ph:list-bullets" width="20" />
						</button>
						<button
							on:click={() => {
								if (editor) {
									editor.chain().focus().toggleOrderedList().run();
								}
							}}
							class:active={editor && editor.isActive('orderedList')}
						>
							<iconify-icon icon="ph:list-numbers" width="20" />
						</button>

						<div class="divider hidden sm:block" />

						<button
							on:click={() => {
								if (editor) {
									editor.chain().focus().toggleBlockquote().run();
								}
							}}
							class:active={editor && editor.isActive('blockquote')}
							class="hidden sm:block"
						>
							<iconify-icon icon="ph:quotes" width="20" />
						</button>
						<button
							on:click={() => {
								if (editor) {
									editor.chain().focus().setHorizontalRule().run();
								}
							}}
							class="hidden sm:block"
						>
							<iconify-icon icon="ph:dots-three-outline" width="20" />
						</button>

						<div class="divider" />

						<!-- TODO: add emoji picker -->

						<button
							on:click={() => {
								if (editor) {
									editor.commands.undo();
								}
							}}
						>
							<iconify-icon icon="ph:arrow-u-up-left" width="20" />
						</button>
						<button
							on:click={() => {
								if (editor) {
									editor.commands.redo();
								}
							}}
						>
							<iconify-icon icon="ph:arrow-u-up-right" width="20" />
						</button>
					</div>

					<!-- <button on:click={saveContent} class="btn block">Save</button> -->

					<button
						on:click={saveNow}
						class="mr-3.5 inline h-fit -translate-y-1 text-xs text-white hover:text-neutral-300 active:text-neutral-700 sm:text-sm"
					>
						{save}
					</button>
				</div>
			{/if}
		</div>
	</div>

	{#if !loaded || view_only}
		<div
			class="prose prose-sm mx-auto w-full max-w-full break-words rounded-t-lg
			bg-gray-50 p-8 focus:outline-none sm:max-w-full sm:prose lg:prose-lg xl:prose-xl
			{view_only ? 'mt-[100px] min-h-[calc(100vh-100px)]' : 'mt-[150px] min-h-[calc(100vh-150px)]'}"
		>
			{@html body.substring(1, body.length - 1)}
		</div>
	{/if}

	{#if !view_only}
		<div bind:this={element} class:hidden={!loaded} />
	{/if}
</div>

<style lang="postcss">
	.title-bar {
		@apply fixed top-0 left-0 z-30 w-full overflow-clip bg-black bg-opacity-60 px-4 backdrop-blur-sm sm:bg-opacity-40;
	}

	.title {
		@apply h-10 w-full bg-transparent text-3xl text-white placeholder-neutral-200 ring-0 hover:underline focus:!no-underline focus-visible:outline-none;
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

	.arrow {
		@apply translate-y-1 translate-x-1 duration-150 ease-in-out;
	}

	.arrow-link {
		@apply flex -translate-x-[11px] items-baseline text-lg font-normal transition duration-150 hover:underline;
	}

	a:hover .arrow {
		transform: translate(0, 0.25rem);
	}
</style>
