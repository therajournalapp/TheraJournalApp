<script>
	import { Popover, PopoverButton, PopoverPanel, Transition } from '@rgossiaux/svelte-headlessui';
</script>

<Popover class="relative z-10 max-h-[50px]" let:open>
	<PopoverButton class="z-0 max-h-[50px]">
		<div
			class="h-[50px] pr-3 before:absolute before:left-[-5px] before:z-[-1] before:h-[60px] before:w-[60px] before:translate-y-[-5px] before:rounded-full hover:text-primary-dark hover:before:bg-green-900/5 active:before:bg-green-900/20"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="50"
				height="50"
				fill="currentColor"
				viewBox="0 0 256 256"
				class="text-black hover:text-primary-dark"
			>
				<rect width="256" height="256" fill="none" /><circle
					cx="128"
					cy="120"
					r="40"
					fill="none"
					stroke="currentColor"
					stroke-miterlimit="10"
					stroke-width="16"
				/>
				<path
					d="M63.8,199.4a72,72,0,0,1,128.4,0"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/>
				<g id="gear" class:open>
					<circle
						cx="200"
						cy="56"
						r="16"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="16"
					/>
					<line
						x1="200"
						y1="40"
						x2="200"
						y2="28"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="16"
					/>
					<line
						x1="186.1"
						y1="48"
						x2="175.8"
						y2="42"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="16"
					/>
					<line
						x1="186.1"
						y1="64"
						x2="175.8"
						y2="70"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="16"
					/>
					<line
						x1="200"
						y1="72"
						x2="200"
						y2="84"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="16"
					/>
					<line
						x1="213.9"
						y1="64"
						x2="224.2"
						y2="70"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="16"
					/>
					<line
						x1="213.9"
						y1="48"
						x2="224.2"
						y2="42"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="16"
					/>
				</g>
				<path
					d="M223.3,116.5A87.7,87.7,0,0,1,224,128a96,96,0,1,1-96-96,87,87,0,0,1,8.9.4"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/>
			</svg>
		</div>
	</PopoverButton>
	<Transition
		enter="transition duration-100 ease-out"
		enterFrom="transform scale-95 opacity-0"
		enterTo="transform scale-100 opacity-100"
		leave="transition duration-75 ease-out"
		leaveFrom="transform scale-100 opacity-100"
		leaveTo="transform scale-95 opacity-0"
	>
		<PopoverPanel class="absolute right-0 z-10 mt-0 w-48 max-w-sm transform">
			<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
				<div class="relative grid grid-cols-1 divide-y bg-white">
					<PopoverButton
						as="a"
						href="/settings"
						class="px-4 py-3 text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:bg-primary-light hover:text-white active:bg-primary"
					>
						Settings
					</PopoverButton>
					<PopoverButton
						as="a"
						href="##"
						class="px-4 py-3 text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:bg-primary-light hover:text-white active:bg-primary"
					>
						Invite a Friend
					</PopoverButton>
					<PopoverButton
						as="a"
						href="##"
						class="px-4 py-3 text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:bg-primary-light hover:text-white active:bg-primary"
					>
						Add a Therapist
					</PopoverButton>
					<PopoverButton
						as="a"
						href="##"
						class="px-4 py-3 text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:bg-primary-light hover:text-white active:bg-primary"
					>
						Data Privacy
					</PopoverButton>
					<PopoverButton
						as="a"
						href="##"
						class="px-4 py-3 text-sm font-medium text-gray-900 transition duration-150 ease-in-out hover:bg-primary-light hover:text-white active:bg-primary"
					>
						Log Out
					</PopoverButton>
				</div>
			</div>
		</PopoverPanel>
	</Transition>
</Popover>

<style>
	#gear {
		transform-box: fill-box;
		transform-origin: 50% 50%;
		transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.open {
		transform: rotate(30deg);
	}
</style>
