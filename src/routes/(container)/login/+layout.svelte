<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { sendVerificationEmailWithUser, signIn } from '$lib/firebase/client';
	import { z } from 'zod';
	import PhCaretLeftThin from '~icons/ph/caret-left-thin';

	// Is used after login api returns
	// and waiting to navigate to dashboard
	let loading = false;
	// Used to show user errors
	let error = '';

	async function handleSubmit(e: any) {
		const formData = new FormData(e.target);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			loading = true;
			const isEmail = z.string().email();
			if (!isEmail.safeParse(email).success) {
				throw error;
			}

			const userCredential = await signIn(email, password);
			const token = await userCredential.user.getIdToken();
			const user = userCredential.user;
			const emailVerified = user.emailVerified;

			if (!emailVerified) {
				const redirect = $page.url.host + '/verify';
				sendVerificationEmailWithUser(redirect, user);
			}

			const response = await fetch('/api/signIn', {
				method: 'POST',
				body: JSON.stringify({ token: token, email: email, email_verified: emailVerified }),
				headers: {
					'content-type': 'application/json'
				}
			});
			if (response.ok) {
				loading = true;
				setTimeout(() => {
					goto('/dashboard', { invalidateAll: true });
				}, 500);
			} else {
				loading = false;
				error = 'Error signing in please check your email and password are correct.';
			}
		} catch (err) {
			loading = false;
			error = 'Error signing in. Please check that your email and password are correct.';
		}
	}
</script>

{#if loading}
	<label class="loading">
		<progress class="loading" />
		Loading…
	</label>
{:else}
	<div class="mx-auto">
		<slot />

		<div class="mx-auto mt-12 block w-full max-w-md rounded-l text-gray-700 ">
			<div class="mb-6">
				<a href="/" class="arrow-link dark:text-neutral-200">
					<div class="arrow">
						<PhCaretLeftThin class="inline text-[22px]" />
					</div>
					<span class="pl-2">Back</span>
				</a>
			</div>

			<!-- <form method="POST" use:enhance> -->
			<form on:submit|preventDefault={handleSubmit}>
				<div class="mb-6">
					<input id="email" name="email" class="input" placeholder="Email" type="email" />
				</div>
				<div class="mb-6">
					<input
						id="password"
						name="password"
						class="input"
						placeholder="Password"
						type="password"
					/>
				</div>

				{#if error != ''}
					<p class="my-3 text-red-500">{error}</p>
				{/if}

				<div class="flex items-center justify-end">
					<button type="submit" class="btn">Log in</button>
				</div>
			</form>

			<div class="mt-4 text-center dark:text-neutral-200">
				<p>Don't have an account? <a href="/signup" class="link">Register here</a></p>
			</div>

			<div class="mt-4 text-center dark:text-neutral-200">
				<p>Forgot your password? <a href="/resetpassword" class="link">Reset password</a></p>
			</div>
		</div>
	</div>
{/if}

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
