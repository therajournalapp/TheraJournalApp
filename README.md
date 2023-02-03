# Therajournal
![image](https://user-images.githubusercontent.com/60304853/216665091-d8d79335-69cf-4f24-a9f7-a4de4f04da00.png)

TheraJournal is a privacy focused journaling web app for therapy and mental health. Therapists often ask for their patients to keep a personal journal. A problem arises where this journal is often never revisited, even when patients may feel the desire to share certain parts of it with their trusted therapist. The project’s core aim is to solve that problem by providing a patient with a secure way to create journal entries and selectively share any specific entries with a trusted person - their therapist.

**Public Alpha Version of TheraJournal:** [Site](https://therajournal.app)

This is a rewrite of the original react version of the app using [SvelteKit](https://kit.svelte.dev/) and several different libraries.

----

## Building the Project
1. Copy the .env file into the root directory of the project.

2. Run `pnpm install` to install the project dependencies. Instructions for installing pnpm [here](https://pnpm.io/installation).

3. (Optional but recomended for devleopment) Install the extensions recomended in `.vscode/extensions.json`. You should get a pop up prompt when opening the project in vscode or you can type `@recommended` in the Extensions pane.

4. Run `pnpm run dev`. This will start the development server. Open [http://localhost:5173/](http://localhost:5173/) to see app.

----

## TODO

- [x] Routing - Using SvelteKit filebased routing with +layout.svelte.
- [x] Styling - Ported from Bootstrap components to [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/), and [Svelte Headless UI](https://svelte-headlessui.goss.io/docs).
- [x] ORM - Using [Prisma](https://www.prisma.io/) ORM with typesafety. (Need to experiment with migrations when developing with full team)
- [x] Dashboard Layout - reworked using svelte components and tailwind. Added polish and improved mobile layout.
- [x] Authentication - Using [Lucia Auth](https://github.com/pilcrowOnPaper/lucia-auth) and server handle hook. Protected routes should follow "/(protected)/".
- [x] WYSIWYG - Using [tiptap](https://tiptap.dev/) with the [tailwind typography plugin](https://tailwindcss.com/docs/typography-plugin) for text styling.
- [x] Vercel Hosting - The main branch of this repo is automatically deployed to [therajournalapp.vercel.app](https://therajournalapp.vercel.app)
- [x] Zod - Using [Zod](https://zod.dev/?id=introduction) for validation with TypeScript.
- [x] Journal Entry Journal Entry CRUD - Creating, Deleting, and Editing journal entries with autosave is implemented.
- [ ] tRPC - Looking into using [tRPC](trpc.io) with [tRPC-SvelteKit](https://github.com/icflorescu/trpc-sveltekit) for typesafe API. Currently using sveltekit page load functions and fetch.

----
