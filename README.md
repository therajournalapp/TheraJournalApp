# Therajournal

TheraJournal is a privacy-focused journal designed specifically for people who go to therapy.

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
- [x] ORM - Using [Prisma](https://www.prisma.io/) ORM with typesafety.
- [x] Dashboard Layout - reworked using svelte components and tailwind. Added polish and improved mobile layout.
- [ ] Authentication - Looking into [Auth.js](https://authjs.dev/), [Firebase Authentication](https://firebase.google.com/docs/auth), and [Lucia Auth](https://github.com/pilcrowOnPaper/lucia-auth).
- [ ] WYSIWYG - Looking into [TinyMCE](https://www.tiny.cloud/), [tiptap](https://tiptap.dev/), [Quil](https://quilljs.com/), [ProseMirror](https://prosemirror.net/), and [Toast UI](https://github.com/nhn/tui.editor).
- [ ] Journal Entry CRUD - Connection to database is already setup, need to choose a new WSIWYG editor and add CRUD operations for it.
- [ ] tRPC - Looking into using [tRPC](trpc.io) with [tRPC-SvelteKit](https://github.com/icflorescu/trpc-sveltekit) for typesafe API.

----