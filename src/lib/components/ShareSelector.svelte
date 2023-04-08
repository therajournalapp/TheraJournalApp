<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { invalidateAll } from '$app/navigation';
	import UserInitial from './UserInitial.svelte';
	import PhLockKey from '~icons/ph/lock-key';
	import PhUsers from '~icons/ph/users';
	import PhShareNetwork from '~icons/ph/share-network';
	import PhUserPlus from '~icons/ph/user-plus';
	import PhUserCircle from '~icons/ph/user-circle';
	import PhX from '~icons/ph/x';
	import PhClipboard from '~icons/ph/clipboard';

	// Used to set the title of the dialog, should be the same as the entry or habit title
	export let title: string;
	// Used to change the button size
	export let big: boolean = false;

	// Used to load the shared users
	export let shared_to: { email: string }[];
	// Callback function to share an entry to a new user
	export let shareCallback: Function = (email: string): string | Error => {
		console.log('no share callback + email: ' + email);
		return Error('No share callback ' + email);
	};
	// Callback function to unshare an entry from a user
	export let unshareCallback: Function = (email: string): string | Error => {
		console.log('no unshare callback + email: ' + email);
		return Error('No unshare callback ' + email);
	};

	// Used to track if the dialog is open or not
	export let isOpen = false;

	// Used to show an error for the add user form
	let error: string = '';

	// If the entry will use the link sharing feature
	export let using_link_share = false;

	// The link the entry is shared to or empty string
	export let share_link = '';
	// If the entry is curently shared by link
	let link_share = share_link == '' ? false : true;

	async function onLinkShareChange() {
		link_share = !link_share;
		if (link_share) {
			const link = await linkshareCallback();
			if (link != '') {
				share_link = 'https://www.therajournal.app/s/' + link;
			}
		} else {
			linkunshareCallback();
			share_link = '';
		}
	}

	export let linkshareCallback: Function = (): string => {
		return 'https://www.therajournal.app/s/201';
	};
	export let linkunshareCallback: Function = (): boolean => {
		return false;
	};

	function copyLink() {
		navigator.clipboard.writeText(share_link);
	}

	// Used for styling button
	let hover = false;
	let share = shared_to.length > 0 ? true : false;

	// Handles the submit of the add user form
	// takes in user email and calls the shareCallback
	async function handleSubmit(e: any) {
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		e.target.reset();
		error = '';
		const result: Error | string = await shareCallback(data.user);
		if (result instanceof Error) {
			error = result.message;
			console.log(result.message);
			return;
		}
	}
</script>

<div>
	{#if big}
		<button
			class="btn-alt !px-3"
			on:click={() => {
				isOpen = true;
				invalidateAll();
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
			{#if share}
				<PhUsers class="mr-1 inline text-[17px]" /> Shared
			{:else}
				<PhLockKey class="mr-1 inline text-[17px]" /> Share
			{/if}
		</button>
	{:else}
		<button
			on:click={() => {
				isOpen = true;
				invalidateAll();
			}}
			class="-m-1.5 rounded-full p-1.5 text-neutral-500 hover:bg-green-900/10 hover:text-primary-dark active:bg-green-900/20 dark:text-neutral-300 dark:hover:bg-green-700/10 dark:hover:text-primary dark:active:bg-green-700/20"
		>
			{#if share}
				<UserInitial email={shared_to[0].email} />
			{:else}
				<PhShareNetwork class="mr-1 inline text-[20px]" />
			{/if}
		</button>
	{/if}

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
						class="pointer-events-auto h-[500px] w-[375px] rounded-lg bg-white p-5 shadow-xl transition-all dark:bg-neutral-700 dark:shadow-neutral-900"
					>
						<div class="flex h-full flex-col justify-between gap-3">
							<DialogTitle class="text-xl text-neutral-700 dark:text-neutral-200"
								>Share "{title}"</DialogTitle
							>

							<form on:submit|preventDefault={handleSubmit}>
								<div class="flex gap-2">
									<input
										class="input !h-[50px]"
										placeholder="Add by email"
										name="user"
										type="email"
									/>

									<button
										class="flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10 active:bg-black active:bg-opacity-20"
										type="submit"
										value="Submit"
									>
										<PhUserPlus class="text-[25px] dark:text-neutral-200" />
									</button>
								</div>
							</form>
							<span class:invisible={error === ''} class="invisible -my-3 text-sm text-red-500">
								Error: {error}
							</span>
							<span class="font-medium text-neutral-600 dark:text-neutral-300">
								People who can read this entry ({shared_to ? shared_to.length + 1 : 1})
							</span>
							<div class="ppl-scroll scrollba h-64 min-h-[75px] w-full overflow-y-scroll">
								<div
									class="flex h-12 w-full items-center rounded-md pl-1 hover:bg-neutral-200 dark:hover:bg-neutral-700"
								>
									<div class="h-[40px] w-[40px]">
										<PhUserCircle class="text-[34px] text-neutral-800 dark:text-neutral-300" />
									</div>
									<span class="p-2 text-sm font-medium dark:text-neutral-200">
										{shared_to ? (shared_to.length > 0 ? 'You' : 'Only you') : 'Only you'}
									</span>
								</div>
								{#if shared_to}
									{#each shared_to as user (user.email)}
										<div
											animate:flip
											in:fade|local
											out:fly|local={{ x: 100 }}
											class="flex h-12 w-full items-center justify-between rounded-md pl-1 hover:bg-neutral-200 dark:hover:bg-neutral-700"
										>
											<div class="ml-1 flex items-center">
												<UserInitial email={user.email} />
												<div class="max-w-[240px] overflow-hidden text-ellipsis">
													<span
														class="p-3 text-sm font-medium dark:text-neutral-200"
														title={user.email}
													>
														{user.email}
													</span>
												</div>
											</div>
											<button
												class="mr-2 flex h-[30px] w-[30px] items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10 dark:text-neutral-200 dark:hover:bg-neutral-600"
												on:click={() => {
													unshareCallback(user.email);
												}}
											>
												<PhX class="inline text-[13px]" />
											</button>
										</div>
									{/each}
								{/if}
							</div>

							{#if using_link_share}
								<div class="-m-5 flex flex-col gap-3 px-5 pt-2 align-baseline">
									<div class="flex gap-3">
										<span class="font-medium text-neutral-600 dark:text-neutral-300">
											Share by Link
										</span>

										<button
											on:click={onLinkShareChange}
											class="focus:shadow-outline relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
												   {link_share ? 'bg-primary' : 'bg-gray-200 dark:bg-neutral-500'}"
										>
											<span
												class="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out dark:bg-neutral-200
													  {link_share ? 'translate-x-5' : 'translate-x-0'}"
											/>
										</button>
									</div>

									<div class="flex min-h-[76px] flex-col">
										{#if link_share}
											<span class="pb-3 text-sm text-neutral-600 dark:text-neutral-300">
												Anyone with the link can view this entry
											</span>

											<div class="relative">
												<input class="input select-text text-sm" bind:value={share_link} readonly />
												<button
													type="button"
													class="absolute right-0 h-full rounded-md px-2 hover:text-primary active:text-primary-dark dark:text-white"
													on:click={() => {
														copyLink();
													}}
												>
													<PhClipboard class="mr-0.5 inline translate-y-[-1px] text-[14px]" />
												</button>
											</div>
										{:else}
											<span class="text-sm text-neutral-600 dark:text-neutral-300">
												Not shared by link
											</span>
										{/if}
									</div>
								</div>
							{/if}

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
</div>

<style lang="postcss">
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
</style>
