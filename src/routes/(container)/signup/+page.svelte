<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getEmailVerifiedStatus, sendVerificationEmail } from '$lib/firebase/client';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import 'iconify-icon';
	import { onMount } from 'svelte';
	import { z } from 'zod';
	import type { ActionData } from './$types';

	// Holds the current state of the email and password fields
	// Used for validation
	let email = '';
	let password = '';

	// Validation States used for live updating icons
	// inital is when the form is empty, false is error, true means fields validate
	let emailVal = 'inital';
	let passwordVal = 'inital';

	// Set the icon string to a valid iconify-icon to change the icon
	let icon1 = 'ph:circle-dashed';
	let icon2 = 'ph:circle-dashed';
	let icon3 = 'ph:circle-dashed';

	// Used to hide and show the password field
	let show_password = false;
	$: type = show_password ? 'text' : 'password';

	// When true, disables the submit form button, false enables
	// Is set based on validation
	let disabled = true;

	// Used to export form data to server
	export let form: ActionData;

	const user = getUser();

	function onInput(event: any) {
		password = event.target.value;
		disabled = true;

		const isEmail = z.string().email();
		const emailReq = isEmail.safeParse(email).success;
		if (emailReq) {
			emailVal = 'true';
		} else {
			emailVal = 'false';
		}

		if (email == '') {
			emailVal = 'inital';
		}

		if (password == '') {
			icon1 = 'ph:circle-dashed';
			icon2 = 'ph:circle-dashed';
			icon3 = 'ph:circle-dashed';
			passwordVal = 'inital';
			return;
		}

		const lengthReq = password.length > 11;
		if (lengthReq) {
			icon1 = 'ph:check-circle';
		} else {
			icon1 = 'ph:x-circle';
			passwordVal = 'false';
		}

		const lettersAndNumbersRegex = /^(?=.*[A-Za-z])(?=.*[0-9])/;
		const lettersAndNumbersReq = lettersAndNumbersRegex.test(password);
		if (lettersAndNumbersReq) {
			icon2 = 'ph:check-circle';
		} else {
			icon2 = 'ph:x-circle';
			passwordVal = 'false';
		}

		const specialCharacterRegex = /[!-\/:-@[-`{-~]/;
		const specialCharacterReq = specialCharacterRegex.test(password);
		if (specialCharacterReq) {
			icon3 = 'ph:check-circle';
		} else {
			icon3 = 'ph:x-circle';
			passwordVal = 'false';
		}

		if (emailReq && lengthReq && lettersAndNumbersReq && specialCharacterReq) {
			passwordVal = 'true';
			if (emailReq) {
				disabled = false;
			}
		}
	}
</script>

<div class="mx-auto">
	<h1 class="mb-12 text-center text-[28px] font-medium">Sign up for TheraJournal</h1>
	<div class="mx-auto block w-full max-w-md rounded-l text-gray-700 ">
		<div class="mb-6">
			<a href="/" class="arrow-link">
				<div class="block h-[25px] w-[25px]">
					<iconify-icon inline icon="ph:caret-left-thin" width="25" class="arrow" />
				</div>
				<span class="pl-2">Back</span>
			</a>
		</div>
		<form method="POST" use:enhance autocomplete="off">
			<div class="mb-6">
				<input
					required
					id="email"
					type="email"
					name="email"
					placeholder="Email"
					class="input"
					bind:value={email}
					class:!border-red-500={emailVal == 'false'}
				/>
			</div>

			<div class="mb-2">
				<input
					required
					{type}
					id="password"
					name="password"
					class="input"
					placeholder="Password"
					value={password}
					on:input={onInput}
					class:!border-red-500={passwordVal == 'false'}
				/>
			</div>

			<button
				type="button"
				class="mb-2 hover:text-neutral-400 active:text-primary-dark"
				on:click={() => (show_password = !show_password)}
				>{show_password ? 'Hide Password' : 'Show Password'}</button
			>

			<ul class="mb-3 ml-6">
				<li>
					<iconify-icon
						icon={icon1}
						class:text-red-500={icon1 == 'ph:x-circle'}
						class:text-green-500={icon1 == 'ph:check-circle'}
						class="translate-y-[3px] text-[20px]"
					/> At least 12 characters
				</li>
				<li>
					<iconify-icon
						icon={icon2}
						class:text-red-500={icon2 == 'ph:x-circle'}
						class:text-green-500={icon2 == 'ph:check-circle'}
						class="translate-y-[3px] text-[20px]"
					/> Uses both letters and numbers
				</li>
				<li>
					<iconify-icon
						icon={icon3}
						class:text-red-500={icon3 == 'ph:x-circle'}
						class:text-green-500={icon3 == 'ph:check-circle'}
						class="translate-y-[3px] text-[20px]"
					/> Uses at least one special character
				</li>
			</ul>

			<!-- <div class="mb-3 flex items-center">
				<input
					id="terms"
					aria-describedby="terms"
					type="checkbox"
					class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
					required
				/>
				<div class="ml-3">
					<label for="terms" class="">
						I agree to recieve emails from TheraJournal for non-marketing purposes. (Required)
					</label>
				</div>
			</div> -->
			<div class="flex justify-end">
				<button
					{disabled}
					type="submit"
					class="btn disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
				>
					Sign up
				</button>
			</div>
			{#if form?.error}
				<p class="mt-4 text-red-500">{form.error}</p>
			{/if}
		</form>
		<div class="mt-4 text-center">
			<p>Already have an account? <a href="/login" class="link">Log in here</a></p>
		</div>
	</div>
</div>

<style lang="postcss">
	.arrow {
		@apply translate-y-1 translate-x-1 duration-150 ease-in-out;
	}

	.arrow-link {
		@apply flex -translate-x-[11px] items-baseline text-lg font-normal transition duration-150 hover:underline;
	}

	a:hover .arrow {
		transform: translate(0, 0.25rem);
	}
</style>
