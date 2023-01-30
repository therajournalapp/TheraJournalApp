<script lang="ts">
	export let dialog: HTMLDialogElement;
</script>

<dialog bind:this={dialog} on:close>
	<slot />
</dialog>

<style>
	:root {
		padding: 10px;
	}
	dialog {
		border-radius: 5px;
		border-width: 1px;
		transition: all 2s;
	}
	dialog::backdrop {
		background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
		animation: fade-in 1s;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
