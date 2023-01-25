<script lang="ts">
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';
	import { getAuth, signOut as signOutFirebase, deleteUser } from 'firebase/auth';
	import { invalidateAll } from '$app/navigation';
	import Dialog from '$lib/components/Dialog.svelte';
	import { onMount } from 'svelte';
	const user = getUser();
	const auth = getAuth();

	let confirmDownload = false;

	let dialog: HTMLDialogElement;
	onMount(async () => {
		console.log(auth);
	});
</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="TheraJournal settings" />
</svelte:head>

<h1>Profile</h1>
<div>
	<p>User id: {$user?.userId}</p>
	<p>Email: {$user?.email}</p>
</div>
<div>
	<p>Display name: {auth.currentUser?.displayName}</p>
	<p>Email: {auth.currentUser?.email}</p>
</div>

<!--  Create a row for a button -->
<div class="mt-2 flex flex-row justify-between">
	<!--  Create a column for the button -->
	<div class="flex flex-col">
		<!--  Create a button -->
		<!-- Download User data button -->
		<button class="btn" on:click={() => (confirmDownload = true)}>
			<i />
			<!-- Insert icon for download -->
			Download a copy of my data</button
		>
	</div>
</div>
<div class="mt-2 flex flex-row">
	<div class="flex flex-col">
		<button
			class="btn-danger"
			on:click={() => {
				dialog.showModal();
			}}
		>
			<i />
			<!-- Insert icon for skull -->
			Delete My Account
		</button>
	</div>
	<Dialog bind:dialog on:close={() => console.log('closed')}>
		<h1 class="text-lg">Are you sure you want to delete your account?</h1>
		<p class="mt-4">
			This will delete all your data, including all journals. You will not be able to recover it.
		</p>
		<hr />
		<div class="mt-2 flex flex-row">
			<div class="flex-col">
				<button class="btn" on:click={() => dialog.close()}>Cancel</button>
			</div>
			<div class="flex-col">
				<button
					class="btn-danger"
					on:click={() => {
						dialog.close();
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
