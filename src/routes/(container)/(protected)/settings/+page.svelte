<script>
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';
	import { invalidateAll } from '$app/navigation';
	const user = getUser();
</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="TheraJournal settings" />
</svelte:head>

<h1>TODO: settings page</h1>

<h1>Profile</h1>
<div>
	<p>User id: {$user?.userId}</p>
	<p>Email: {$user?.email}</p>
</div>

<button
	class="btn"
	on:click={async () => {
		await signOut();
		invalidateAll();
	}}>Sign out</button
>
