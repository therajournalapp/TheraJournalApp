<script lang="ts">
	import PhCaretLeftThin from '~icons/ph/caret-left-thin';
	import PhGithubLogo from '~icons/ph/github-logo';
	import PhEnvelopeSimple from '~icons/ph/envelope-simple';
	import PhLinkedinLogo from '~icons/ph/linkedin-logo';

	import Cole from '$lib/images/Cole.jpg';
	import Ethan from '$lib/images/Ethan.jpg';
	import Matthew from '$lib/images/Matthew.jpg';
	import Tanner from '$lib/images/Tanner.jpg';
</script>

<div class="mb-6">
	<a href="/#team" class="arrow-link dark:text-neutral-200">
		<div class="arrow">
			<PhCaretLeftThin class="inline text-[22px]" />
		</div>
		<span class="pl-2">Back</span>
	</a>
</div>

<h1 class="my-10 text-4xl font-medium dark:text-neutral-200">About Us</h1>

<div class="mx-auto flex flex-col justify-between gap-5">
	<div
		class="flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700 md:flex-row"
	>
		<img src={Cole} alt="Cole Taylor" class="aspect-square flex-shrink-0 object-cover md:w-1/4" />
		<div class="m-5 flex flex-col gap-5">
			<h3 class="text-3xl dark:text-neutral-200">Cole Taylor</h3>
			<p class="dark:text-neutral-200">
				Cole is a graduating senior from The University of Utah with his B.S. in Computer Science.
				Throughout his academic career, he has been passionate about software and the team
				development process. During his undergraduate career, Cole has gained work experience
				through a number of different roles. In 2021 he worked at a startup called Velvet developing
				a marketplace for private investment funds. Cole was a TA for Peter Jensen's CS 3810 class
				later that year. In the summer of 2022, he interned at Adobe in Lehi, Utah, and has accepted
				an offer to work for them full-time in Fall 2023. In his free time, Cole enjoys being in the
				outdoors, spending time with friends, and pursuing crafting projects, especially sewing.
			</p>

			<div class="flex w-fit flex-col gap-2">
				<a
					href="https://www.linkedin.com/in/coletaylor017/"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
				<a
					href="https://www.linkedin.com/in/coletaylor017/"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
				<a
					href="https://www.linkedin.com/in/coletaylor017/"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
			</div>
		</div>
	</div>
	<div
		class="flex w-full overflow-hidden rounded-lg bg-white shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700"
	>
		<img
			src={Ethan}
			alt="Ethan Pedersen"
			class="aspect-square flex-shrink-0 object-cover md:w-1/4"
		/>
		<div class="m-5 flex flex-col gap-5">
			<h3 class="text-3xl dark:text-neutral-200">Ethan Pedersen</h3>
			<p class="dark:text-neutral-200">
				Ethan is a highly skilled and passionate student graduating with a degree in Computer
				Science from the University of Utah. With a strong focus on application development and
				design, Ethan has excelled in their studies and developed expertise in various programming
				languages, frameworks, and tools. During their time at the University of Utah, Ethan has
				focused their studies on data visualization, human-computer interaction, and mobile
				programming. In addition to their academic achievements, Ethan has also gained practical
				experience through their work as a web developer, utilizing .NET for developing E-Commerce
				sites and CRM software. Beyond their academic and professional pursuits, Ethan is also an
				avid outdoor enthusiast. They are passionate about competitive road running, skiing, and
				canyoneering, which provides them with a healthy work-life balance and fuels their
				creativity and problem-solving skills. You can connect with Ethan at
				www.linkedin.com/in/ethanpedersen and www.github.com/ethanjped
			</p>
			<div class="flex w-fit flex-col gap-2">
				<a
					href="#"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
				<a
					href="#"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
				<a
					href="#"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
			</div>
		</div>
	</div>
	<div
		class="flex w-full overflow-hidden rounded-lg bg-white shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700"
	>
		<img
			src={Matthew}
			alt="Matthew Dicataldo"
			class="aspect-square flex-shrink-0 object-cover md:w-1/4"
		/>
		<div class="m-5 flex flex-col gap-5">
			<h3 class="text-3xl dark:text-neutral-200">Matthew Dicataldo</h3>
			<p class="dark:text-neutral-200">TODO</p>
			<div class="flex w-fit flex-col gap-2">
				<a
					href="#"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
				<a
					href="#"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
				<a
					href="#"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
			</div>
		</div>
	</div>
	<div
		class="flex w-full overflow-hidden rounded-lg bg-white shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700"
	>
		<img
			src={Tanner}
			alt="Tanner Krone"
			class="aspect-square flex-shrink-0 object-cover md:w-1/4"
		/>
		<div class="m-5 flex flex-col gap-5">
			<h3 class="text-3xl dark:text-neutral-200">Tanner Krone</h3>
			<p class="dark:text-neutral-200">
				After growing up in Washington state, Tanner moved to Utah and began attending the
				University of Utah shortly thereafter. After graduating in May of 2023 with his Bachelor of
				Science degree in Computer Science, he plans to continue his career as a software developer.
				In 2021 while attending the University of Utah, Tanner began a research assistant position
				at the University where he aided Biomedical Engineering students with the research and
				development of a novel form of artificial muscle mainly to be used in the control of robotic
				prosthetic limbs. Looking to continue to contribute with the improvement of robotic
				prosthetic limbs, Tanner took a software engineering internship with the biomedical
				engineering startup Gaia Technologies LLC. There, he aided in the invention of a novel
				sensor array aimed at replacing the current standard used in robotic prosthetic hands by
				providing more dexterous hand control at a cheaper price. In his free time, Tanner likes to
				spend time the Utah mountains with friends, hang out in Salt Lake City and tinker with
				electronics.
			</p>
			<div class="flex w-fit flex-col gap-2">
				<a
					href="mailto:tannerkrone@gmail.com"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhEnvelopeSimple class="inline translate-y-[0.5px] text-2xl" />
					<span>tannerkrone@gmail.com</span>
				</a>
			</div>
		</div>
	</div>
</div>

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
