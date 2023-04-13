import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

type sentimentResponse = {
    compound: string,
    neg: string,
    neu: string,
    pos: string

}

export const POST = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json()
    const entry_id = body.entry_id;

    console.log("trying to save sentiment for entry: " + entry_id);

    try {
        const entry = await prisma.journalEntry.findUnique({
            where: {
                id: entry_id
            }
        })

        if (!entry) return new Response(JSON.stringify({ message: "failure" }), { status: 400 })

        const response = await fetch('http://35.219.179.207:8080/sentiment', {
            method: 'POST',
            body: JSON.stringify({ text: entry.body }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data : sentimentResponse = await response.json();

        const compound = parseFloat(data.compound);
        console.log("Compound: " + compound);

        await prisma.journalEntry.update({
            where: {
                id: entry_id
            },
            data: {
                sentiment: compound
            }
        });

        return new Response(JSON.stringify({ message: "success" }), { status: 201 })
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }
}) satisfies RequestHandler;