<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/logo-no-background.svg';
	import logo_small from '$lib/images/logo-no-text.svg';
	import 'iconify-icon';
	import NavPopover from './NavPopover.svelte';
</script>

<header
	class="mx-auto my-5 flex w-full justify-between px-5 md:my-12 md:w-10/12 md:px-0 xl:max-w-screen-xl"
>
	<nav>
		<ul>
			<div id="logo" class="mr-10">
				<a href="/">
					<picture class="ml-1 max-w-[40px] md:ml-0 md:max-w-[300px]">
						<source media="(min-width:768px)" srcset={logo} />
						<img src={logo_small} alt="TheraJournal" style="width:auto;" />
					</picture>
				</a>
			</div>
			<!-- <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li> -->
			<li aria-current={$page.url.pathname === '/dashboard' ? 'page' : undefined}>
				<a href="/dashboard">Dashboard</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a href="/sverdle">Sverdle</a>
			</li>
		</ul>
	</nav>

	<NavPopover />
	<!-- <iconify-icon icon="ph:user-circle-gear" style="font-size: 50px;" class="h-[50px] pr-3" /> -->
	<!-- <div class="pr-3">
		<img src={user} alt="TheraJournal" class="max-w-[50px]" />
	</div> -->
</header>

<style>
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 3px;
		content: '';
		display: block;
		width: 85%;
		height: 2px;
		position: absolute;
		bottom: 8px;
		left: 7.5%;
		/* border: var(--size) solid transparent; */
		border-bottom: var(--size) solid var(--light-green);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: rgba(0, 0, 0, 0.7);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--light-green);
	}
</style>
