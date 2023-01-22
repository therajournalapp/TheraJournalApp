<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { signIn } from '$lib/firebase/client';
	import 'iconify-icon';

	async function handleSubmit(e: any) {
		const formData = new FormData(e.target);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const userCredential = await signIn(email, password);

		const token = await userCredential.user.getIdToken();

		console.log(token);

		const response = await fetch('/api/signIn', {
			method: 'POST',
			body: JSON.stringify({ token: token }),
			headers: {
				'content-type': 'application/json'
			}
		});

		console.log(response);

		if (response.ok) {
			setTimeout(() => {
				goto('/dashboard', { invalidateAll: true });
			}, 500);
		} else {
			// TODO show error message
		}
	}
</script>

<div class="mx-auto">
	<h1 class="mb-12 text-center text-[28px] font-medium">Welcome back to TheraJournal</h1>
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
		<!-- <form method="POST" use:enhance> -->
		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-6">
				<input id="email" name="email" class="input" placeholder="Email" type="email" />
			</div>
			<div class="mb-6">
				<input id="password" name="password" class="input" placeholder="Password" type="password" />
			</div>
			<div class="flex justify-end">
				<button type="submit" class="btn">Log in</button>
			</div>
		</form>
	</div>
</div>
