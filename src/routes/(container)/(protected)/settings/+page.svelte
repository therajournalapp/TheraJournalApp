<script lang="ts">
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';
	import { signIn } from '$lib/firebase/client';
	import { getAuth, signOut as signOutFirebase } from 'firebase/auth';
	import { invalidateAll } from '$app/navigation';
	import Dialog from '$lib/components/Dialog.svelte';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	const user = getUser();
	const email = $user?.email;
	console.log(email); //TODO remove after test
	const auth = getAuth();

	let confirmDownload = false;
	let disabledConfirmDelete = true;
	let downloadDialog: HTMLDialogElement;
	let deleteDialog: HTMLDialogElement;
	let confirmedPassword = '';

	// Used to export form data to server
	export let form: ActionData;

	onMount(async () => {
		console.log(auth);
	});

	function onConfirmPwordChange(e: Event) {
		confirmedPassword = (e.target as HTMLInputElement).value;
		disabledConfirmDelete = confirmedPassword == '';
	}
</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="TheraJournal settings" />
</svelte:head>
<div class="mb-10 text-3xl">Settings</div>
<h1>Profile</h1>
<div>
	<p>User id: {$user?.userId}</p>
	<p>Email: {$user?.email}</p>
</div>
<!--<div class="mt-2 flex flex-row justify-between">
	<div class="flex flex-col">
		<button class="btn" on:click={() => downloadDialog.showModal()}>
			<i />
			Download a copy of my data</button
		>
	</div>
	<Dialog bind:dialog={downloadDialog} on:close={() => console.log('closed')}>
		<h1 class="text-xl text-primary">Download a copy of your data</h1>
		<p class="my-4">
			This will download a zip file containing all of the data you have on TheraJournal.
			<br />This may take a few minutes.
		</p>
		<label class="block text-sm text-gray-700" for="deleteConfirmPword"
			>Please confirm your password.</label
		>
		<input
			id="deleteConfirmPword"
			class="input"
			placeholder="Confirm your password"
			on:change={onConfirmPwordChange}
		/>
		<hr />
		<div class="mt-4 flex flex-row justify-end space-x-2">
			<div class=" flex-col">
				<button class="btn-gray" on:click={() => downloadDialog.close()}>Cancel</button>
			</div>
			<div class="flex-col">
				<button
					class="btn"
					disabled={disabledConfirmDelete}
					on:click={() => {
						downloadDialog.close();
					}}>Confirm Download</button
				>
			</div>
		</div>
	</Dialog>
</div> -->
<div class="mt-2 flex flex-row">
	<div class="flex flex-col">
		<button
			class="btn-danger"
			on:click={() => {
				deleteDialog.showModal();
			}}
		>
			<i />
			<!-- Insert icon for skull -->
			Delete My Account
		</button>
	</div>
	<Dialog bind:dialog={deleteDialog} on:close={() => console.log('closed')}>
		<form
			method="POST"
			use:enhance={async ({ form, data, action, cancel }) => {
				// `data` is its `FormData` object
				// `action` is the URL to which the form is posted
				// `cancel()` will prevent the submission
				const userprovidedPassword = confirmedPassword;

				// Logged in user should always have email
				if (!email) {
					cancel();
					return;
				}

				const userCredential = await signIn(email, confirmedPassword);
				const token = await userCredential.user.getIdToken();
				const user = userCredential.user;

				data.append('token', token);
				return async ({ result, update }) => {
					// `result` is an `ActionResult` object
					// `update` is a function which triggers the logic that would be triggered if this callback wasn't set
					update();
				};
			}}
		>
			<h1 class="text-xl text-red-600 ">Are you sure you want to delete your account?</h1>
			<p class="my-4">
				This will delete all your data, including all journals. You will not be able to recover it.
			</p>
			<label class="block text-sm text-gray-700" for="deleteConfirmPword"
				>Please confirm your password before you delete your account.</label
			>
			<input
				id="password"
				name="password"
				class="input"
				placeholder="Confirm your password"
				on:input={onConfirmPwordChange}
				value={confirmedPassword}
			/>
			<hr />
			{#if form?.error}
				<p class="mt-4 text-right text-red-500">{form.error}</p>
			{/if}
			<div class="mt-4 flex flex-row justify-end space-x-2">
				<div class=" flex-col">
					<button class="btn-gray" on:click={() => deleteDialog.close()}>Cancel</button>
				</div>
				<div class="flex-col">
					<button
						class="btn-danger"
						disabled={disabledConfirmDelete}
						on:click={() => {
							deleteDialog.close();
							// onConfirmDelete();
						}}>Yes, delete everything</button
					>
				</div>
			</div>
		</form>
	</Dialog>
</div>
<div class="mt-2 flex flex-row">
	<div class="flex flex-col">
		<button
			class="btn"
			on:click={async () => {
				await signOut();
				invalidateAll();
			}}>Sign out</button
		>
	</div>
</div>
