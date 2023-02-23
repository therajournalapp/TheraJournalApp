import type { RequestHandler } from './$types';
import { NodeHtmlMarkdown } from 'node-html-markdown'
import prisma from '$lib/prisma';

export const POST = (async ({ locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    try {

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const todayString = mm + '/' + dd + '/' + yyyy;

        const newEntry = await prisma.journalEntry.create({
            data: {
                createdAt: today,
                title: todayString,
                body: "<p>Type here...</p>",
                user_id: user.userId,
            }
        });

        const id = newEntry.id;

        return new Response(JSON.stringify({ id: id }), { status: 201 })
    }
    catch {
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }
}) satisfies RequestHandler;

export const PATCH = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json()

    const preview = NodeHtmlMarkdown.translate(body.body).substring(0, 1000);

    await prisma.journalEntry.update({
        where: {
            // ... provide filter here
            id: body.id
        },
        data: {
            // ... provide data here
            title: body.title,
            body: JSON.stringify(body.body),
            preview: preview,
            updatedAt: new Date()
        }
    })

    return new Response(JSON.stringify({ message: "success" }), { status: 201 })
}) satisfies RequestHandler;

export const DELETE = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json()
    const id = parseInt(body.id);

    const entry = await prisma.journalEntry.findUnique({
        where: {
            id: id
        }
    });

    if (!entry || entry.user_id !== user.userId) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    await prisma.journalEntry.delete({
        where: {
            id: id
        }
    })

    return new Response(JSON.stringify({ message: "success" }), { status: 201 })
}) satisfies RequestHandler;