<script lang="ts">
	import {
		sendVerificationEmail,
		getCurrentUserEmail,
		getEmailVerifiedStatus
	} from '$lib/firebase/client';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	async function handleSubmit(e: any) {
		console.log('todo');
	}

	export let sendCodeText = 'Click here';

	export let email = '';

	export let state = 'loading';

	async function handleClick() {
		sendCodeText = 'Sending...';
		const redirect = $page.url.host + '/verify';
		const a = await sendVerificationEmail(redirect);
		if (a === null) {
			// Error
			sendCodeText = 'Error sending code, try loging out and back in or contacting support';
		} else {
			sendCodeText = 'Sent.';
			setTimeout(() => {
				sendCodeText = 'Click here';
			}, 10000);
		}
	}

	onMount(async () => {
		console.log('ping');
		email = (await getCurrentUserEmail()) ?? '';
		const verified = await getEmailVerifiedStatus();
		if (verified) {
			state = 'verified';
		} else {
			state = 'not verified';
		}
	});
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
