<script lang="ts">
	import { enhance } from '$app/forms';
	let active_step = 'Email';
</script>

<div class="mx-auto">
	<!-- mx-auto block w-full max-w-sm rounded-lg bg-white p-4 text-gray-700 shadow-lg shadow-offwhite ring-1 ring-black ring-opacity-10 -->
	<h1 class="mb-12 text-center text-[28px] font-medium">Sign up for TheraJournal</h1>
	<div class="mx-auto block w-full max-w-md rounded-l text-gray-700 ">
		<form method="POST" use:enhance>
			{#if active_step == 'Password'}
				<button
					class="py-2 text-lg font-normal transition duration-150 hover:underline"
					on:click={() => (active_step = 'Email')}
				>
					<iconify-icon inline icon="ph:caret-left-thin" width="25" class="translate-y-1" />Back
				</button>
			{/if}
			<div class="mb-6">
				<input
					id="email"
					name="email"
					placeholder="Email"
					class:hidden={active_step !== 'Email'}
					class="form-control text-md m-0 block w-full rounded-md border border-solid border-gray-300 bg-formbg bg-clip-padding px-2 py-1.5 font-normal text-gray-900 shadow-inner transition ease-in-out placeholder:text-gray-500 focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
				/>
			</div>
			<div class="mb-2">
				<input
					type="password"
					id="password"
					name="password"
					class:hidden={active_step !== 'Password'}
					class="form-control text-md m-0 block w-full rounded-md border border-solid border-gray-300 bg-formbg bg-clip-padding px-2 py-1.5 font-normal text-gray-900 shadow-inner transition ease-in-out placeholder:text-gray-500 focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
					placeholder="Password"
				/>
			</div>
			<ul class:hidden={active_step !== 'Password'} class="mb-3 ml-6 list-inside list-disc">
				<li>At least 12 characters</li>
				<li>Uses both letters and numbers</li>
				<li>Uses at least one special character</li>
			</ul>
			<div class="mb-6">
				<input
					type="password"
					id="confirm-password"
					name="password"
					class:hidden={active_step !== 'Password'}
					class="form-control text-md m-0 block w-full rounded-md border border-solid border-gray-300 bg-formbg bg-clip-padding px-2 py-1.5 font-normal text-gray-900 shadow-inner transition ease-in-out placeholder:text-gray-500 focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
					placeholder="Confirm Password"
				/>
			</div>
			{#if active_step == 'Password'}
				<div class="flex justify-end">
					<button
						type="submit"
						class="hover:shadow-l text-md inline-block rounded bg-primary px-3.5 py-2 font-normal leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-light focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-dark active:shadow-lg"
						>Signup</button
					>
				</div>
			{/if}
		</form>
		{#if active_step == 'Email'}
			<div class="flex w-full justify-end">
				<button
					class="text-md inline-block rounded bg-primary px-3.5 py-2 font-normal leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-light focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-dark active:shadow-lg"
					on:click={() => (active_step = 'Password')}
				>
					Continue
				</button>
			</div>
		{/if}
	</div>
</div>
