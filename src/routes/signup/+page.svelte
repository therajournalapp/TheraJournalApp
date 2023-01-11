<script lang="ts">
	import { enhance } from '$app/forms';
	let active_step = 'Email';
</script>

<div class="mx-auto">
	<h1 class="mb-12 text-center text-[28px] font-medium">Sign up for TheraJournal</h1>
	<div class="mx-auto block w-full max-w-md rounded-l text-gray-700 ">
		<div class="mb-6">
			<a
				href="/"
				class:hidden={active_step !== 'Email'}
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
			<button
				class:hidden={active_step !== 'Password'}
				class="block -translate-x-[11px] text-lg font-normal transition duration-150 hover:underline"
				on:click={() => (active_step = 'Email')}
			>
				<iconify-icon
					inline
					icon="ph:caret-left-thin"
					width="25"
					class="translate-y-1 translate-x-1"
				/>
				Back
			</button>
		</div>
		<form method="POST" use:enhance>
			<div class:hidden={active_step !== 'Email'} class="mb-6">
				<input
					id="email"
					name="email"
					placeholder="Email"
					class:hidden={active_step !== 'Email'}
					class="input"
				/>
			</div>
			<div class="mb-2">
				<input
					type="password"
					id="password"
					name="password"
					class:hidden={active_step !== 'Password'}
					class="input"
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
					class="input"
					placeholder="Confirm Password"
				/>
			</div>
			{#if active_step == 'Password'}
				<div class="flex justify-end">
					<button type="submit" class="btn"> Sign up </button>
				</div>
			{/if}
		</form>
		{#if active_step == 'Email'}
			<div class="flex w-full justify-end">
				<button class="btn" on:click={() => (active_step = 'Password')}> Continue </button>
			</div>
		{/if}
	</div>
</div>
