<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="absolute top-1/2 m-0 w-full -translate-y-1/2">
	<div
		class="mx-auto block w-full max-w-sm rounded-lg bg-white p-4 shadow-lg shadow-offwhite ring-1 ring-black ring-opacity-10"
	>
		<h1 class="mb-6">Sign in</h1>

		<form method="POST" use:enhance>
			<div class="mb-6">
				<input
					id="username"
					name="username"
					placeholder="Username"
					class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
				/>
			</div>
			<div class="mb-6">
				<input
					type="password"
					id="password"
					name="password"
					class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
					placeholder="Password"
				/>
			</div>
			<button
				type="submit"
				class="inline-block w-full rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
				data-mdb-ripple="true"
				data-mdb-ripple-color="light">Continue</button
			>
		</form>
	</div>
</div>
