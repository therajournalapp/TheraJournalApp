import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const POST = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    try {

        const body = await request.json()

        const today = new Date();
        const updatedEntry = await prisma.journalEntry.update({
            where: {
                id: body.id
            },
            data: {
                tags: body.tags
            }
        });

        return new Response(JSON.stringify({ message: "Success" }), { status: 201 })
    }
    catch {
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }
}) satisfies RequestHandler;

