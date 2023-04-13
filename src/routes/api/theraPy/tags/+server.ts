import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

type tagResponse = {
    tags: string[],
    keywords: string[]
}

export const GET = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const entry_id = (await request.json()).entry_id;

    console.log("trying to get tags for entry: " + entry_id);

    const entry = await prisma.journalEntry.findUnique({
        select: {
            body: true
        },
        where: {
            id: entry_id
        }
    });

    if(!entry?.body)
        return new Response(JSON.stringify({ tags: [], keywords: [] }), { status: 201 });

    const response : tagResponse = await (await fetch('http://35.219.179.207:8080/tags', {
        method: 'POST',
        body: JSON.stringify({ text: entry.body }),
        headers: {
            'Content-type': 'application/json'
        }
    })).json();

    return new Response(JSON.stringify(response), { status: 201 });
}) satisfies RequestHandler;

export const POST = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = (await request.json()).text;
    if(!body)
        return new Response(JSON.stringify({ tags: [], keywords: [] }), { status: 201 });

    const response : tagResponse = await (await fetch('http://35.219.179.207:8080/tags', {
        method: 'POST',
        body: JSON.stringify({ text: body }),
        headers: {
            'Content-type': 'application/json'
        }
    })).json();

    return new Response(JSON.stringify(response), { status: 201 });
}) satisfies RequestHandler;