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
		class="mx-auto flex w-full max-w-[450px] flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700 lg:max-w-full xl:flex-row"
	>
		<img
			src={Cole}
			alt="Cole Taylor"
			class="h-auto max-h-[450px] object-cover object-[50%40%] lg:max-h-full lg:max-w-[300px]"
		/>
		<div class="m-5 flex flex-col justify-between gap-5">
			<div class="flex flex-col gap-5">
				<h3 class="text-3xl dark:text-neutral-200">Cole Taylor</h3>
				<p class="dark:text-neutral-200">
					Cole is a graduating senior from The University of Utah with his B.S. in Computer Science.
					Throughout his academic career, he has been passionate about software and the team
					development process.
				</p>
				<p class="dark:text-neutral-200">
					During his undergraduate career, Cole has gained work experience through a number of
					different roles. In 2021 he worked at a startup called Velvet developing a marketplace for
					private investment funds. Cole was a TA for Peter Jensen's CS 3810 class later that year.
					In the summer of 2022, he interned at Adobe in Lehi, Utah, and has accepted an offer to
					work for them full-time in Fall 2023.
				</p>
				<p class="dark:text-neutral-200">
					In his free time, Cole enjoys being in the outdoors, spending time with friends, and
					pursuing crafting projects, especially sewing.
				</p>
			</div>
			<div class="flex w-fit flex-col gap-2">
				<a
					href="https://www.linkedin.com/in/coletaylor017/"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
				<a
					href="https://github.com/coletaylor017"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhGithubLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>Github</span>
				</a>
				<a
					href="mailto:coletaylor017@gmail.com"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhEnvelopeSimple class="inline translate-y-[0.5px] text-2xl" />
					<span>coletaylor017@gmail.com</span>
				</a>
			</div>
		</div>
	</div>
	<div
		class="mx-auto flex w-full max-w-[450px] flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700 lg:max-w-full lg:flex-row"
	>
		<img
			src={Ethan}
			alt="Ethan Pedersen"
			class="h-auto max-h-[450px] object-cover object-[50%0%] lg:max-h-full lg:max-w-[300px]"
		/>
		<div class="m-5 flex flex-col justify-between gap-5">
			<div class="flex flex-col gap-5">
				<h3 class="text-3xl dark:text-neutral-200">Ethan Pedersen</h3>
				<p class="dark:text-neutral-200">
					Ethan is a highly skilled and passionate student graduating with a degree in Computer
					Science from the University of Utah. With a strong focus on application development and
					design, Ethan has excelled in their studies and developed expertise in various programming
					languages, frameworks, and tools. During their time at the University of Utah, Ethan has
					focused their studies on data visualization, human-computer interaction, and mobile
					programming. In addition to their academic achievements, Ethan has also gained practical
					experience through their work as a web developer, utilizing .NET for developing E-Commerce
					sites and CRM software.
				</p>
				<p class="dark:text-neutral-200">
					Beyond their academic and professional pursuits, Ethan is also an avid outdoor enthusiast.
					They are passionate about competitive road running, skiing, and canyoneering, which
					provides them with a healthy work-life balance and fuels their creativity and
					problem-solving skills.
				</p>
			</div>
			<div class="flex w-fit flex-col gap-2">
				<a
					href="https://www.linkedin.com/in/ethanpedersen"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
				<a
					href="https://www.github.com/ethanjped"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhGithubLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>Github</span>
				</a>
				<a
					href="mailto:ethan.pedersen@utah.edu"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhEnvelopeSimple class="inline translate-y-[0.5px] text-2xl" />
					<span>ethan.pedersen@utah.edu</span>
				</a>
			</div>
		</div>
	</div>
	<div
		class="mx-auto flex w-full max-w-[450px] flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700 lg:max-w-full lg:flex-row"
	>
		<img
			src={Matthew}
			alt="Matthew Dicataldo"
			class="h-auto max-h-[450px] object-cover object-[50%40%] lg:max-h-full lg:max-w-[300px]"
		/>
		<div class="m-5 flex flex-col justify-between gap-5">
			<div class="flex flex-col gap-5">
				<h3 class="text-3xl dark:text-neutral-200">Matthew Dicataldo</h3>
				<p class="dark:text-neutral-200">
					Matthew Dicataldo is a driven and talented computer science student set to graduate with a
					Bachelor's degree from the University of Utah in May of 2023. He has a wide range of
					programming skills, including working with C#, TypeScript, C/C++, and Python, with a
					particular interest in front-end development and computer graphics. Matthew's passion for
					programming stems from a desire to bring ideas to life and to create visually appealing
					and user-friendly applications.
				</p>
				<p class="dark:text-neutral-200">
					As a member of the TheraJournal team, Matthew is the resident SvelteKit enthusiast/expert,
					and was reponsible for the app's front-end development, UI/UX, as well as working full
					stack for most features of the project.
				</p>
				<p class="dark:text-neutral-200">
					When he's not programming, Matthew enjoys watching anime, playing video games, and
					spending time outdoors.
				</p>
			</div>
			<div class="flex w-fit flex-col gap-2">
				<a
					href="https://www.linkedin.com/in/matthew-dicataldo"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
				<a
					href="https://github.com/matthewdicataldo"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhGithubLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>Github</span>
				</a>
				<a
					href="mailto:matthewdicataldo@gmail.com"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhEnvelopeSimple class="inline translate-y-[0.5px] text-2xl" />
					<span>matthewdicataldo@gmail.com</span>
				</a>
			</div>
		</div>
	</div>
	<div
		class="mx-auto flex w-full max-w-[450px] flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-offwhite-light ring-1 ring-black ring-opacity-10 dark:bg-neutral-700 dark:shadow-neutral-800 dark:ring-neutral-700 lg:max-w-full lg:flex-row"
	>
		<img
			src={Tanner}
			alt="Tanner Krone"
			class="h-auto max-h-[450px] object-cover object-[50%10%] lg:max-h-full lg:max-w-[300px]"
		/>
		<div class="m-5 flex flex-col justify-between gap-5">
			<div class="flex flex-col gap-5">
				<h3 class="text-3xl dark:text-neutral-200">Tanner Krone</h3>
				<p class="dark:text-neutral-200">
					After growing up in Washington state, Tanner moved to Utah and began attending the
					University of Utah shortly thereafter. After graduating in May of 2023 with his Bachelor
					of Science degree in Computer Science, he plans to continue his career as a software
					developer.
				</p>
				<p class="dark:text-neutral-200">
					In 2021 while attending the University of Utah, Tanner began a research assistant position
					at the University where he aided Biomedical Engineering students with the research and
					development of a novel form of artificial muscle mainly to be used in the control of
					robotic prosthetic limbs. Looking to continue to contribute with the improvement of
					robotic prosthetic limbs, Tanner took a software engineering internship with the
					biomedical engineering startup Gaia Technologies LLC. There, he aided in the invention of
					a novel sensor array aimed at replacing the current standard used in robotic prosthetic
					hands by providing more dexterous hand control at a cheaper price.
				</p>
				<p class="dark:text-neutral-200">
					In his free time, Tanner likes to spend time the Utah mountains with friends, hang out in
					Salt Lake City and tinker with electronics.
				</p>
			</div>
			<div class="flex w-fit flex-col gap-2">
				<a
					href="https://www.linkedin.com/in/tanner-krone/"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhLinkedinLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>LinkedIn</span>
				</a>
				<a
					href="https://github.com/tkrone"
					class="flex items-center gap-2 text-xl hover:text-primary-light active:text-primary-dark dark:text-white"
				>
					<PhGithubLogo class="inline translate-y-[0.5px] text-2xl" />
					<span>Github</span>
				</a>
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
