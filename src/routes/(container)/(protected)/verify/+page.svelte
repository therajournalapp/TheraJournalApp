<script lang="ts">
	import {
		sendVerificationEmail,
		getCurrentUserEmail,
		getEmailVerifiedStatus,
		getCurrentUser
	} from '$lib/firebase/client';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getUser } from '@lucia-auth/sveltekit/client';

	let sendCodeText = 'Click here';

	const user = getUser();

	let email = '';
	if ($user?.email) {
		email = $user.email;
	}

	const lucia_email_verified = $user?.email_verified;
	let state = lucia_email_verified ? 'verified' : 'loading';

	onMount(async () => {
		if ($user?.email_verified) {
			state = 'verified';
			return;
		}

		const fb_verified = await getEmailVerifiedStatus();
		if (fb_verified) {
			const user = await getCurrentUser();
			if (user != null && user.emailVerified) {
				const token = await user.getIdToken();
				const response = await fetch('/api/verify', {
					method: 'POST',
					body: JSON.stringify({ token: token }),
					headers: {
						'content-type': 'application/json'
					}
				});
				state = 'verified';
			} else {
				state = 'not verified';
			}
		} else {
			state = 'not verified';
		}
	});

	async function handleClick() {
		sendCodeText = 'Sending...';
		const redirect = $page.url.host + '/verify';
		const a = await sendVerificationEmail(redirect);
		if (a === null) {
			// Error
			sendCodeText =
				'Error sending code, try logging out and back in and trying again or if issue persists contact support.';
		} else {
			sendCodeText = 'Sent.';
			setTimeout(() => {
				sendCodeText = 'Click here';
			}, 10000);
		}
	}
</script>

{#if state == 'loading'}
	<label class="loading">
		<progress class="loading" />
		Loading…
	</label>
{:else if state == 'verified'}
	<h1 class="my-6 text-center text-3xl font-medium dark:text-neutral-200 sm:text-4xl">
		Your Email Address is Verified!
	</h1>
	<p class="mx-auto mb-6 max-w-2xl text-center text-lg dark:text-neutral-300">
		Go to your dashboard by clicking the logo in the top left.
	</p>
{:else}
	<h1 class="my-6 text-center text-3xl font-medium dark:text-neutral-200 sm:text-4xl">
		Verify Your Email Address
	</h1>
	<p class="mx-auto mb-6 max-w-2xl text-center text-lg dark:text-neutral-300">
		We emailed you a email link to {email}. Enter the code below to confirm your email address.
	</p>

	<p class="mx-auto mb-6 max-w-2xl text-center text-lg dark:text-neutral-200">
		Need another code?
		<span
			on:click={handleClick}
			on:keypress={handleClick}
			class="cursor-pointer text-primary underline hover:text-primary-light active:text-primary-dark"
		>
			{sendCodeText}
		</span>
	</p>
{/if}

<style lang="postcss">
</style>
