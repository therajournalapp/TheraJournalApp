<script lang="ts">
	import { enhance } from '$app/forms';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import { z } from 'zod';
	import type { ActionData } from './$types';
	import PhCaretLeftThin from '~icons/ph/caret-left-thin';
	import PhEye from '~icons/ph/eye';
	import PhEyeClosed from '~icons/ph/eye-closed';
	import PhCircleDashed from '~icons/ph/circle-dashed';
	import PhXCircle from '~icons/ph/x-circle';
	import PhCheckCircle from '~icons/ph/check-circle';

	// Holds the current state of the email and password fields
	// Used for validation
	let email = '';
	let password = '';

	// Validation States used for live updating icons
	// inital is when the form is empty, false is error, true means fields validate
	let emailVal = 'inital';
	let passwordVal = 'inital';

	// Set the icon variables with the enum
	enum Icon {
		circle_dashed,
		check_circle,
		x_circle
	}
	let icon1: Icon = Icon.circle_dashed;
	let icon2: Icon = Icon.circle_dashed;
	let icon3: Icon = Icon.circle_dashed;

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
			icon1 = Icon.circle_dashed;
			icon2 = Icon.circle_dashed;
			icon3 = Icon.circle_dashed;
			passwordVal = 'inital';
			return;
		}

		const lengthReq = password.length > 11;
		if (lengthReq) {
			icon1 = Icon.check_circle;
		} else {
			icon1 = Icon.x_circle;
			passwordVal = 'false';
		}

		const lettersAndNumbersRegex = /^(?=.*[A-Za-z])(?=.*[0-9])/;
		const lettersAndNumbersReq = lettersAndNumbersRegex.test(password);
		if (lettersAndNumbersReq) {
			icon2 = Icon.check_circle;
		} else {
			icon2 = Icon.x_circle;
			passwordVal = 'false';
		}

		const specialCharacterRegex = /[!-\/:-@[-`{-~]/;
		const specialCharacterReq = specialCharacterRegex.test(password);
		if (specialCharacterReq) {
			icon3 = Icon.check_circle;
		} else {
			icon3 = Icon.x_circle;
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
	<h1 class="mb-12 text-center text-[28px] font-medium dark:text-neutral-200">
		Sign up for TheraJournal
	</h1>
	<div class="mx-auto block w-full max-w-md rounded-l text-gray-700 ">
		<div class="mb-6">
			<a href="/" class="arrow-link dark:text-neutral-200">
				<div class="arrow">
					<PhCaretLeftThin class="inline text-[22px]" />
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

			<div class="relative mb-2">
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
				<button
					type="button"
					class="absolute right-0 h-full rounded-md px-2 hover:text-primary active:text-primary-dark dark:text-neutral-200"
					on:click={() => (show_password = !show_password)}
				>
					{#if show_password}
						<PhEyeClosed class="mr-0.5 inline translate-y-[-1px] text-[14px]" />
					{:else}
						<PhEye class="mr-0.5 inline translate-y-[-1px] text-[14px]" />
					{/if}
					{show_password ? 'Hide Password' : 'Show Password'}
				</button>
			</div>

			<ul class="mb-3 mt-1 ml-6 dark:text-neutral-200">
				<li>
					{#if icon1 == Icon.circle_dashed}
						<PhCircleDashed class="inline translate-y-[-1px] text-[18px]" />
					{:else if icon1 == Icon.x_circle}
						<PhXCircle class="inline translate-y-[-1px] text-[18px] text-red-500" />
					{:else if icon1 == Icon.check_circle}
						<PhCheckCircle class="inline translate-y-[-1px] text-[18px] text-green-500" />
					{/if}
					At least 12 characters
				</li>
				<li>
					{#if icon2 == Icon.circle_dashed}
						<PhCircleDashed class="inline translate-y-[-1px] text-[18px]" />
					{:else if icon2 == Icon.x_circle}
						<PhXCircle class="inline translate-y-[-1px] text-[18px] text-red-500" />
					{:else if icon2 == Icon.check_circle}
						<PhCheckCircle class="inline translate-y-[-1px] text-[18px] text-green-500" />
					{/if}
					Uses both letters and numbers
				</li>
				<li>
					{#if icon3 == Icon.circle_dashed}
						<PhCircleDashed class="inline translate-y-[-1px] text-[18px]" />
					{:else if icon3 == Icon.x_circle}
						<PhXCircle class="inline translate-y-[-1px] text-[18px] text-red-500" />
					{:else if icon3 == Icon.check_circle}
						<PhCheckCircle class="inline translate-y-[-1px] text-[18px] text-green-500" />
					{/if}
					Uses at least one special character
				</li>
			</ul>

			{#if form?.error}
				<p class="my-4 text-red-500">{form.error}</p>
			{/if}

			<div class="flex justify-end">
				<button
					{disabled}
					type="submit"
					class="btn disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
				>
					Sign up
				</button>
			</div>
		</form>
		<div class="mt-4 text-center dark:text-neutral-200">
			<p>Already have an account? <a href="/login" class="link">Log in here</a></p>
		</div>
	</div>
</div>

<style lang="postcss">
	.arrow {
		@apply translate-y-[-1.5px] translate-x-1 duration-150 ease-in-out;
	}

	.arrow-link {
		@apply flex -translate-x-[11px] items-baseline text-lg font-normal transition duration-150 hover:underline;
	}

	a:hover .arrow {
		transform: translate(0, -1.5px);
	}
</style>
