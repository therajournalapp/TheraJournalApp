<script lang="ts">
	import 'iconify-icon';

	export let big: boolean = false;
	export let shared: boolean = false;
	export let light: boolean = false;

	let hover = false;
	let icon = 'ph:lock-key';
	let color = '#808080';

	$: {
		if (shared) {
			icon = 'ph:users';
			color = '#739244';
		} else {
			if (hover) {
				icon = 'ph:lock-key-open';
				color = '#5f7938';
			} else {
				icon = 'ph:lock-key';
				color = '#808080';
			}
		}
		if (light) {
			color = '#FFFFFF';
		}
	}
</script>

<!-- TODO: maybe redo using old toggle based code, but use light bool to apply additional css rules -->
<!-- <div class:big class="share-item-toggle">
	<input type="checkbox" checked={shared} class:big />
	<label />
</div> -->

<div
	class="toggle"
	class:big
	class:shared
	class:light
	on:click={() => {
		shared = !shared;
	}}
	on:keypress={() => {
		shared = !shared;
	}}
	on:mouseover={() => {
		hover = true;
	}}
	on:mouseout={() => {
		hover = false;
	}}
	on:focus={() => {
		hover = true;
	}}
	on:blur={() => {
		hover = false;
	}}
>
	<iconify-icon inline {icon} class="text-[23px]" class:big-i={big} style="color: {color}" />
</div>

<style>
	.toggle {
		@apply relative m-[-5px] flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full hover:bg-[#73924440];
	}

	.toggle.light {
		@apply hover:bg-white hover:bg-opacity-10;
	}

	.shared {
		animation: 0.3s splash ease-in;
	}

	.shared.light {
		animation: 0.3s splash-white ease-in;
	}

	.big {
		@apply h-[50px] w-[50px];
	}
	.big-i {
		@apply text-[30px];
	}

	/* modified from https://csstoggles.github.io/ */
	/* .share-item-toggle {
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
	} */

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

	@keyframes splash-white {
		0% {
			box-shadow: 0 0 0 0 rgb(255, 255, 255);
		}

		50% {
			box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.5);
		}

		100% {
			box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
		}
	}

	/* .share-item-toggle.big {
		width: 50px;
		height: 50px;
	}

	.share-item-toggle.big label {
		height: 50px;
	}

	.share-item-toggle.big label:before {
		width: 50px;
		height: 50px;
		background-size: 30px 30px;
	} */
</style>
