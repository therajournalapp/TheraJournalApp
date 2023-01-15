<script lang="ts">
	export let big: boolean = false;
	export let shared: boolean = false;
</script>

<div class:big class="share-item-toggle">
	<input type="checkbox" checked={shared} class:big />
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label />
</div>

<style>
	/* modified from https://csstoggles.github.io/ */
	.share-item-toggle {
		position: relative;
		box-sizing: border-box;
	}

	.share-item-toggle input[type='checkbox'] {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		width: 100%;
		height: 100%;
		cursor: pointer;
		opacity: 0;
	}

	.share-item-toggle label {
		position: relative;
		display: flex;
		align-items: center;
		height: 30px;
		box-sizing: border-box;
	}

	.share-item-toggle label:before {
		content: ' ';
		width: 35px;
		height: 35px;
		background-color: rgba(0, 0, 0, 0);
		background-image: url('$lib/images/lock-key.svg');
		background-size: 22px 22px;
		background-repeat: no-repeat;
		background-position: center;
		margin: -5px -7px 0 0;
		border-radius: 50%;
		box-sizing: border-box;
		display: inline-block;
	}

	.share-item-toggle input[type='checkbox']:hover + label:before {
		background-color: rgba(115, 146, 68, 0.25);
		background-image: url('$lib/images/lock-key-open.svg');
	}

	.share-item-toggle input[type='checkbox']:checked:hover + label:before {
		background-image: url('$lib/images/users.svg');
	}

	.share-item-toggle input[type='checkbox']:checked + label:before {
		background-image: url('$lib/images/users.svg');
		animation: 0.3s splash ease-in;
	}

	@keyframes splash {
		0% {
			box-shadow: 0 0 0 0 rgba(115, 146, 68, 1);
		}

		50% {
			box-shadow: 0 0 0 10px rgba(115, 146, 68, 0.5);
		}

		100% {
			box-shadow: 0 0 0 20px rgba(115, 146, 68, 0);
		}
	}

	.share-item-toggle.big label:before {
		width: 50px;
		height: 50px;
		background-size: 30px 30px;
	}
</style>
