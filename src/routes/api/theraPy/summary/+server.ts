import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

type summaryResponse = {
    summary: string
}

export const GET = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    return new Response(JSON.stringify({ message: "success" }), { status: 201 })
}) satisfies RequestHandler;

export const POST = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = (await request.json()).text;
    
    const response = await fetch('http://35.219.179.207:8080/summary', {
            method: 'POST',
            body: JSON.stringify({ text: body }),
            headers: {
                'Content-type': 'application/json'
            }
        });

    const data : summaryResponse = await response.json();

    return new Response(JSON.stringify({ summary: data.summary }), { status: 201 })

}) satisfies RequestHandler;