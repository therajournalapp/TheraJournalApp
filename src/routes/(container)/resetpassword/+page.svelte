<script lang="ts">
	import PhCaretLeftThin from '~icons/ph/caret-left-thin';
	import { sendResetPasswordEmail } from '$lib/firebase/client';

	// Is used after login api returns
	// and waiting to navigate to dashboard
	enum state {
		inital,
		loading,
		success,
		error
	}
	let sent = state.inital;

	async function handleSubmit(e: any) {
		sent = state.loading;

		const formData = new FormData(e.target);
		const email = formData.get('email') as string;

		try {
			const response = await sendResetPasswordEmail(email);
			sent = state.success;
		} catch (err) {
			sent = state.error;
		}
	}
</script>

<div class="mx-auto">
	<h1 class="mb-2 text-center text-[28px] font-medium">Reset your password</h1>

	<p class="text-center">
		Enter the your account email to send an email with a link to change your password.
	</p>

	<div class="mx-auto mt-12 block w-full max-w-md rounded-l text-gray-700 ">
		<div class="mb-6">
			<a href="/" class="arrow-link">
				<div class="arrow">
					<PhCaretLeftThin class="inline text-[22px]" />
				</div>
				<span class="pl-2">Back</span>
			</a>
		</div>

		{#if sent == state.success}
			<p class="text-center text-lg font-semibold">
				We sent an email with a link to reset your password.
			</p>
			<p class="pt-2 text-center">If you don't see the email, check your spam folder.</p>
		{:else if sent == state.loading}
			<label class="loading">
				<progress class="loading" />
				Loading…
			</label>
		{:else if sent == state.error}
			<p class="text-center text-red-500">
				There was an error sending your reset email. Please check the spelling of the email entered
				and <button on:click={() => (sent = state.inital)} class="link">try again</button>.
			</p>
		{:else}
			<form on:submit|preventDefault={handleSubmit}>
				<div class="mb-6">
					<input id="email" name="email" class="input" placeholder="Email" type="email" />
				</div>

				<div class="flex items-center justify-end">
					<button type="submit" class="btn">Reset Password</button>
				</div>
			</form>
		{/if}
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
