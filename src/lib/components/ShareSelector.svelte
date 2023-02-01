<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	import 'iconify-icon';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	// Used to set the title of the dialog, should be the same as the entry or habit title
	export let title: string;
	// Used to change the button size
	export let big: boolean = true; //TODO: change back to false by default

	// Used to track if the dialog is open or not
	let isOpen = false;
	// Used to show an error for the add user form
	let error = false;
	// Used for styling button
	let hover = false;
	let icon = 'ph:lock-key';
	let color = '#808080';
	$: {
		if (share) {
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
	}

	// Handles the submit of the add user form
	// takes in user email
	// TODO: hook up to backend
	function handleSubmit(e: any) {
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		e.target.reset();
		console.log(data);
		if (shared_to.filter((u) => u.email === data.user).length > 0) {
			error = true;
			return;
		}
		if (shared_to.length == 0) {
			shareAnim = true;
			setTimeout(() => {
				shareAnim = false;
			}, 350);
		}
		shared_to.push({ email: data.user as string });
		shared_to = shared_to;
	}

	// TODO: test function used to generate random emails
	// remove when hooked up to backend
	function makeid(length: number) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}
		return result;
	}

	// TODO: set to test array to test frontend, change to be loaded from backend
	export let shared_to = [
		{
			email: makeid(8) + '@test'
		},
		{
			email: makeid(8) + '@test'
		},
		{
			email: makeid(8) + '@test'
		},
		{
			email: makeid(8) + '@test'
		},
		{
			email: makeid(8) + '@test'
		},
		{
			email: makeid(8) + '@test'
		},
		{
			email: makeid(8) + '@test'
		},
		{
			email: makeid(8) + '@test'
		}
	];

	// Used to track if the entry is shared or not
	// Changes the icon of the button
	// TODO: hook up to backend
	let share = shared_to.length > 0 ? true : false;
	$: {
		share = shared_to.length > 0 ? true : false;
	}

	// Used to trigger animation when going from unshared to shared
	let shareAnim = false;

	// TODO: hook up to backend, maybe even preload on hover??
	// Used to track if the dialog has been opened for the first time
	// so you can load the shared_to list from the backend
	let opened = false;
	let hovered = false;
	$: {
		if (!opened && isOpen) {
			opened = true;
		}
		if (!hovered && hover) {
			hovered = true;
		}
	}

	// Colors used to generate the background for shared user icons
	const colors = ['e9f5db', 'dcebca', 'cfe1b9', 'c2d5aa', 'b5c99a', 'a6b98b', '97a97c', '849669'];
	// Colors used to generate the text for shared user icons
	const tx_col = ['606f49', '5D6746', '595D41', '3D5D3C', '425535', '3C4828', '2A3B1C', '1F2513'];

	// Hash function string to positive int
	// used to pick a random color for the user icon
	const hash = function (input: string) {
		var hash = 0,
			i,
			chr;
		if (input.length === 0) return hash;
		for (i = 0; i < input.length; i++) {
			chr = input.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0; // Convert to 32bit integer
		}
		if (hash < 0) {
			hash = hash * -1;
		}
		return hash;
	};
</script>

<!-- TODO: replicate share toggle styling for small button -->
<!-- TODO: hook up to back end methods to save and load SharedEntrys-->

{#if big}
	<button
		class="btn-alt !px-3"
		class:shared={shareAnim}
		on:click={() => {
			isOpen = true;
		}}
		on:mouseover={() => {
			hover = true;
		}}
		on:mouseleave={() => {
			hover = false;
		}}
		on:focus={() => {
			hover = true;
		}}
		on:blur={() => {
			hover = false;
		}}
	>
		<div class="mr-1 h-[20px] w-[20px]">
			<iconify-icon
				inline
				icon={share ? 'ph-users' : 'ph-lock-key'}
				class="text-[20px]"
				class:big-i={big}
			/>
		</div>
		{share ? 'Shared' : 'Share'}
	</button>
{:else}
	<button
		class="toggle"
		class:shared={shareAnim}
		on:click={() => {
			isOpen = true;
		}}
		on:mouseover={() => {
			hover = true;
		}}
		on:mouseleave={() => {
			hover = false;
		}}
		on:focus={() => {
			// hover = true;
		}}
		on:blur={() => {
			// hover = false;
		}}
	>
		<iconify-icon inline {icon} class="text-[23px]" class:big-i={big} style="color: {color}" />
	</button>
{/if}
<p>open: {isOpen}</p>
<p>opened: {opened}</p>
<p>hover: {hover}</p>
<p>hovered: {hovered}</p>

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
				class="fixed inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-20"
			/>
		</TransitionChild>
		<div
			class="pointer-events-none fixed inset-0 flex h-screen w-screen items-center justify-center"
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
					class="pointer-events-auto h-[500px] w-[350px] rounded-lg bg-white p-5 shadow-xl transition-all"
				>
					<div class="flex h-full flex-col justify-between">
						<div class="flex flex-col gap-3">
							<DialogTitle class="text-xl text-neutral-700">Share "{title}"</DialogTitle>
							<form on:submit|preventDefault={handleSubmit}>
								<div class="flex gap-2">
									<input
										class="input !h-[50px]"
										placeholder="Add by email"
										name="user"
										type="email"
									/>

									<button
										class=" flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10 active:bg-black active:bg-opacity-20"
										type="submit"
										value="Submit"
									>
										<iconify-icon icon="ph:user-plus" width="30" />
									</button>
								</div>
							</form>
							<span class:invisible={!error} class="invisible -my-3 text-sm text-red-500">
								Error: user not found, check the email is correct
							</span>
							<span class="font-medium text-neutral-600">
								People who can read this entry ({shared_to ? shared_to.length + 1 : 1})
							</span>
							<div class="ppl-scroll scrollba h-64 min-h-[75px] w-full overflow-y-scroll">
								<div class="flex h-12 w-full items-center rounded-md pl-1 hover:bg-neutral-200">
									<div class="h-[40px] w-[40px]">
										<iconify-icon icon="ph:user-circle" width="40" class="text-neutral-800" />
									</div>
									<span class="p-2 text-sm font-medium">
										{shared_to ? (shared_to.length > 0 ? 'You' : 'Only you') : 'Only you'}
									</span>
								</div>
								{#if shared_to}
									{#each shared_to as user (user.email)}
										<div
											animate:flip
											in:fade|local
											out:fly|local={{ x: 100 }}
											class="flex h-12 w-full items-center justify-between rounded-md pl-1 hover:bg-neutral-200"
										>
											<div class="flex items-center">
												<div
													class="ml-1 flex h-[33px] w-[33px] items-center justify-center rounded-full border-2 border-black border-opacity-10"
													style="background-color: #{colors[hash(user.email) % colors.length]};
                                                       color: #{tx_col[
														hash(user.email) % tx_col.length
													]};"
												>
													<span class="select-none font-medium"
														>{user.email.charAt(0).toUpperCase()}</span
													>
												</div>
												<span class="p-3 text-sm font-medium">{user.email}</span>
											</div>
											<button
												class="mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10"
												on:click={() => {
													//TODO: change to remove from backend
													shared_to = shared_to.filter((u) => u.email !== user.email);
												}}
											>
												<iconify-icon icon="ph:x" size="16" class="max-h-[16px] max-w-[16px]" />
											</button>
										</div>
									{/each}
								{/if}
							</div>
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
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>

<style lang="postcss">
	.toggle {
		@apply relative m-[-5px] flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full hover:bg-[#73924440];
	}

	.ppl-scroll::-webkit-scrollbar {
		height: 20px;
	}

	.ppl-scroll::-webkit-scrollbar-track {
		background-color: transparent;
		margin-left: 9vw;
		margin-right: 9.5vw;
		margin-left: 2rem;
		margin-right: 2rem;
	}

	.ppl-scroll::-webkit-scrollbar-thumb {
		border-radius: 20px;
		border: 7.5px solid transparent;
		background-clip: content-box;
		background-color: rgba(0, 0, 0, 0);
		background-color: #d6dee1;
		transition: 2s;
	}

	.ppl-scroll:hover::-webkit-scrollbar-thumb {
		border: 6px solid transparent;
	}

	.shared {
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
</style>
