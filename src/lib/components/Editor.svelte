<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import 'iconify-icon';

	let element: HTMLElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
  `,
			editorProps: {
				attributes: {
					class:
						'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none bg-white p-8 rounded-lg w-full max-w-full sm:max-w-full'
				}
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<div class="flex gap-1">
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
			<iconify-icon icon="ph:text-h-one" width="20"></iconify-icon>
		</button>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
		>
			<iconify-icon icon="ph:text-h-two" width="20"></iconify-icon>
		</button>
		<button
			on:click={() => editor.chain().focus().setParagraph().run()}
			class:active={editor.isActive('paragraph')}
		>
			<iconify-icon icon="ph:text-aa" width="20"></iconify-icon>
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
{/if}

<div bind:this={element} class="" />

<style lang="postcss">
	.divider {
		background-color: #0000001a;
		height: 1.25rem;
		/* margin-left: 0.5rem;
		margin-right: 0.75rem; */
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		width: 2px;
	}

	button {
		@apply h-[48px] w-[48px] rounded-lg bg-slate-300 p-[14px];
	}

	button.active,
	button:active {
		background: black;
		color: white;
	}
</style>
