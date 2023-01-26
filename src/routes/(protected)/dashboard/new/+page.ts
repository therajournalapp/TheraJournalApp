import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
    const res = await fetch('/api/journalEntry', { method: 'POST' });
    const data = await res.json();

    console.log(data);

    return { id: data.id };
}) satisfies PageLoad;