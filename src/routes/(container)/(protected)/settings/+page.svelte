<script lang="ts">
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';
	import {
		getAuth,
		signOut as signOutFirebase,
		deleteUser,
		EmailAuthProvider,
		reauthenticateWithCredential
	} from 'firebase/auth';
	import { invalidateAll } from '$app/navigation';
	import Dialog from '$lib/components/Dialog.svelte';
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	const user = getUser();
	const auth = getAuth();

	let confirmDownload = false;
	let disabledConfirmDelete = true;
	let downloadDialog: HTMLDialogElement;
	let deleteDialog: HTMLDialogElement;
	let confirmedPassword = '';

	onMount(async () => {
		console.log(auth);
	});

	function onConfirmPwordChange(e: Event) {
		confirmedPassword = (e.target as HTMLInputElement).value;
		disabledConfirmDelete = confirmedPassword.length < 6;
	}

	async function onConfirmDelete() {
		//TODO
		// first confirm password, login with firebase
		const userprovidedPassword = confirmedPassword;
		let email = '';
		if ($user && !$user.email_verified) {
			email = $user.email;
		}
		const credential = EmailAuthProvider.credential(email, confirmedPassword);
		if (auth.currentUser != null) {
			try {
				let currentUser = auth.currentUser;
				await reauthenticateWithCredential(currentUser, credential);
				// User re-authenticated.
				// then delete user
				await deleteUser(currentUser);
				// User deleted in firebase
				// then delete user in db and lucia
				await fetch('/api/deleteAccount', {
					method: 'DELETE',
					body: JSON.stringify({
						userId: $user?.userId
					})
				});
				// User deleted in db
				// then sign out
				await signOutFirebase(auth);
				// Sign-out successful.
				redirect(302, '/login');
				invalidateAll();
			} catch (error) {
				// An error ocurred
			}
		} else invalidateAll(); //bad error if current user can't be retrieved, just boot from page
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
<!--  Create a row for a button -->
<div class="mt-2 flex flex-row justify-between">
	<!--  Create a column for the button -->
	<div class="flex flex-col">
		<!--  Create a button -->
		<!-- Download User data button -->
		<button class="btn" on:click={() => downloadDialog.showModal()}>
			<i />
			<!-- Insert icon for download -->
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
</div>
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
		<h1 class="text-xl text-red-600 ">Are you sure you want to delete your account?</h1>
		<p class="my-4">
			This will delete all your data, including all journals. You will not be able to recover it.
		</p>
		<label class="block text-sm text-gray-700" for="deleteConfirmPword"
			>Please confirm your password before you delete your account.</label
		>
		<input
			id="deleteConfirmPword"
			class="input"
			placeholder="Confirm your password"
			value={confirmedPassword}
		/>
		<hr />
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
						onConfirmDelete();
					}}>Yes, delete everything</button
				>
			</div>
		</div>
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
