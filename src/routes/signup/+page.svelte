<script lang="ts">
	import { enhance } from '$app/forms';
	import { getEmailVerifiedStatus } from '$lib/firebase/client';
	import 'iconify-icon';
	import { onMount } from 'svelte';
	import { getUser } from '@lucia-auth/sveltekit/client';

	export let icon1 = 'ph:circle-dashed';
	export let icon2 = 'ph:circle-dashed';
	export let icon3 = 'ph:circle-dashed';

	let show_password = false;
	$: type = show_password ? 'text' : 'password';

	export let password = '';

	onMount(async () => {
		// setTimeout(() => {
		// 	icon1 = 'ph:circle';
		// 	icon2 = 'ph:circle';
		// 	icon3 = 'ph:circle';
		// }, 1000);

		const user = getUser();
		if (JSON.stringify(user) === '{}') {
			//not logged in
		} else {
			const verified = await getEmailVerifiedStatus();
			console.log('verified? ' + verified);
			if (verified === false) {
				console.log('not verified ???');
			}
		}
	});

	function onInput(event: any) {
		password = event.target.value;

		if (password.length > 11) {
			icon1 = 'ph:check-circle';
		} else {
			icon1 = 'ph:x-circle';
		}
		console.log(password.length);
	}
</script>

<div class="mx-auto">
	<h1 class="mb-12 text-center text-[28px] font-medium">Sign up for TheraJournal</h1>
	<div class="mx-auto block w-full max-w-md rounded-l text-gray-700 ">
		<div class="mb-6">
			<a
				href="/"
				class="block -translate-x-[11px] text-lg font-normal transition duration-150 hover:underline"
			>
				<iconify-icon
					inline
					icon="ph:caret-left-thin"
					width="25"
					class="translate-y-1 translate-x-1"
				/>
				Back
			</a>
		</div>
		<form method="POST" use:enhance autocomplete="off">
			<div class="mb-6">
				<input required id="email" name="email" placeholder="Email" class="input" />
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
				<button type="submit" class="btn"> Sign up </button>
			</div>
		</form>
	</div>
</div>
