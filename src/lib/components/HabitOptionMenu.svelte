<script lang="ts">
	import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@rgossiaux/svelte-headlessui';
	import PhDotsThreeCircleVertical from '~icons/ph/dots-three-circle-vertical';
	import PhTrash from '~icons/ph/trash';

	export let deleteCallBack: () => void;
</script>

<Menu class="relative z-10 max-h-[50px] ">
	<MenuButton>
		<div
			class="-m-1.5 flex items-center justify-center rounded-full p-1.5 text-neutral-500 hover:bg-green-900/10 hover:text-primary-dark active:bg-green-900/20"
		>
			<PhDotsThreeCircleVertical class="inline text-[23px]" />
		</div>
	</MenuButton>
	<Transition
		enter="transition duration-100 ease-out"
		enterFrom="transform scale-95 opacity-0"
		enterTo="transform scale-100 opacity-100"
		leave="transition duration-75 ease-out"
		leaveFrom="transform scale-100 opacity-100"
		leaveTo="transform scale-95 opacity-0"
	>
		<MenuItems
			class="absolute right-0 z-10 mt-2 w-56 max-w-sm origin-top-right transform divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
		>
			<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
				<div class="relative grid grid-cols-1 divide-y bg-white">
					<div class="px-1 py-1">
						<MenuItem let:active on:click={deleteCallBack}>
							<button
								class="group flex w-full items-center rounded-md p-2 text-sm text-gray-900"
								class:active
							>
								<PhTrash class="mr-2 inline text-[17px]" />
								Delete Habit Tracker
							</button>
						</MenuItem>
					</div>
				</div>
			</div>
		</MenuItems>
	</Transition>
</Menu>

<style lang="postcss">
	.active {
		@apply bg-primary text-white;
	}
</style>
