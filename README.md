# Therajournal
![image](https://user-images.githubusercontent.com/60304853/216665091-d8d79335-69cf-4f24-a9f7-a4de4f04da00.png)

TheraJournal is a privacy focused journaling web app for therapy and mental health. Therapists often ask for their patients to keep a personal journal. A problem arises where this journal is often never revisited, even when patients may feel the desire to share certain parts of it with their trusted therapist. The project’s core aim is to solve that problem by providing a patient with a secure way to create journal entries and selectively share any specific entries with a trusted person - their therapist.


Create an account and try it out today on our 
**live site:** [therajournal.app](https://therajournal.app)

### Abstract

TheraJournal will feature a dashboard with data visualization based on your journal entries, medication tracking, and reminders from your therapist. It will have a separate dashboard for therapists where they can manage multiple clients. This is not an AI therapist. The software will never make mental health recommendations to the user. Rather, its purpose is to promote communication between clients and therapists.

Features in order of priority: 

Patient side: 
* Dashboard to see your journal entries and tracked habits
* Share individual habits and journal entries, or share everything by default with your therapist
* Ability to add your therapists using a unique code that you obtain from them personally 
* Share to another user account through their email account or through a special link
* Automatic suggested tags for your journal entries for fast and easy search of your journals
* Auto generated summaries of your longer journals
* Sort and filter through all of your journals

Therapist side: 
* A client management dashboard where you can see client data at a high-level view (mood, medication, NLP-generated journal highlights, etc.) 
* A per-client dashboard where you can view recent journal entries that have been shared and view client data via charts and graphs


### Summary of Technologies
* Programming Languages: Typescript, Python
* Web Framework / Frontend: Svelte + SvelteKit
* Authentication: FireBase
* NLP Libraries: Spacy, Textblob, (served with Flask on Google Cloud)
* Hosting: Vercel
* Databases: MariaDB on Google Cloud
* Platforms Supported: All modern browsers

You can read our full original project design document on [TheraJournal Wiki](https://capstone-cs.eng.utah.edu/groups/therajournal/-/wikis/home)

----

## Building the Project
1. Copy the .env file into the root directory of the project.

2. Run `pnpm install` to install the project dependencies. Instructions for installing pnpm [here](https://pnpm.io/installation).

3. (Optional but recomended for devleopment) Install the extensions recomended in `.vscode/extensions.json`. You should get a pop up prompt when opening the project in vscode or you can type `@recommended` in the Extensions pane.

4. Run `pnpm run dev`. This will start the development server. Open [http://localhost:5173/](http://localhost:5173/) to see app.

----

## Running Playwright Tests

[Playwright Documentation](https://playwright.dev/docs/intro)

1. Run `pnpm playwright install` to install the test browsers
2. Find the test task and run it to run all the tests, or use the Tests pane on VSCode to run individual tests or debug them as usual. 

----
