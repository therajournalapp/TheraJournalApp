<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

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
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			class:active={editor.isActive('heading', { level: 1 })}
		>
			H1
		</button>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
		>
			H2
		</button>
		<button
			on:click={() => editor.chain().focus().setParagraph().run()}
			class:active={editor.isActive('paragraph')}
		>
			P
		</button>

		<button on:click={() => editor.commands.undo()}> undo </button>
		<button on:click={() => editor.commands.redo()}> redo </button>
	</div>
{/if}

<div bind:this={element} class="" />

<style lang="postcss">
	button {
		@apply h-10 w-10 rounded-lg bg-slate-300;
	}

	button.active,
	button:active {
		background: black;
		color: white;
	}
</style>
