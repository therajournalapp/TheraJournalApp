<script lang="ts">
	import { enhance } from '$app/forms';
	import 'iconify-icon';
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
		<form method="POST" use:enhance>
			<div class="mb-6">
				<input id="email" name="email" placeholder="Email" class="input" />
			</div>
			<div class="mb-2">
				<input type="password" id="password" name="password" class="input" placeholder="Password" />
			</div>
			<!-- <div class="mb-2">
				<input
					type="password"
					id="password"
					name="password"
					class:hidden={active_step !== 'Password'}
					class="input"
					placeholder="Password"
				/>
			</div> -->
			<ul class="mb-3 ml-6 list-inside list-disc">
				<li>At least 12 characters</li>
				<li>Uses both letters and numbers</li>
				<li>Uses at least one special character</li>
			</ul>
			<div class="mb-6">
				<input
					type="password"
					id="confirm-password"
					name="confirm-password"
					class="input"
					placeholder="Confirm Password"
				/>
			</div>
			<!-- TODO: add email verification box -->

			<div class="mb-3 flex items-center">
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
			</div>
			<div class="flex justify-end">
				<button type="submit" class="btn"> Sign up </button>
			</div>
		</form>
	</div>
</div>
