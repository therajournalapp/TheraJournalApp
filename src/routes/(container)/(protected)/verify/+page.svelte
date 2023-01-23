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

	async function handleSubmit(e: any) {
		console.log('todo');
	}

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

		console.log('wweeee');

		const fb_verified = await getEmailVerifiedStatus();
		console.log('verified ' + fb_verified);
		if (fb_verified) {
			console.log('noooo');
			const user = await getCurrentUser();
			if (user != null && user.emailVerified) {
				console.log('bingo');
				console.log('setting verify on server');
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
		console.log(redirect);
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
	<h1 class="my-6 text-center text-3xl font-medium sm:text-4xl">Your Email Address is Verified!</h1>
	<p class="mx-auto mb-6 max-w-2xl text-center text-lg">
		Go to your dashboard by clicking the logo in the top left.
	</p>
{:else}
	<h1 class="my-6 text-center text-3xl font-medium sm:text-4xl">Verify Your Email Address</h1>
	<p class="mx-auto mb-6 max-w-2xl text-center text-lg">
		We emailed you a email link to {email}. Enter the code below to confirm your email address.
	</p>

	<p class="mx-auto mb-6 max-w-2xl text-center text-lg">
		Need another code?
		<span
			on:click={handleClick}
			on:keypress={handleClick}
			class="cursor-pointer text-primary underline hover:text-primary-light active:text-primary-dark"
		>
			{sendCodeText}
		</span>
	</p>
	<!-- <div class="flex justify-center">
	<input
		type="text"
		inputmode="decimal"
		placeholder="012345"
		class="input mx-auto max-w-xs bg-offwhite-formfield text-4xl"
	/>
</div> -->
{/if}

<style lang="postcss">
</style>
