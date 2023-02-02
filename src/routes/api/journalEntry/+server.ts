import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client'
import { NodeHtmlMarkdown } from 'node-html-markdown'
const prisma = new PrismaClient()

//TODO add local auth to all api methods

export async function GET() {
    const entry = {
        name: "test"
    }
    return new Response(JSON.stringify(entry));
}

export const POST = (async ({ locals }) => {
    try {
        const user = (await locals.validateUser()).user;
        if (user) {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = today.getFullYear();
            const todayString = mm + '/' + dd + '/' + yyyy;

            const newEntry = await prisma.journalEntry.create({
                data: {
                    title: todayString,
                    body: "<p>Type here...</p>",
                    user_id: user.userId,
                }
            });

            const id = newEntry.id;

            console.log(id);

            return new Response(JSON.stringify({ id: id }), { status: 201 })
        }
        else return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })

    } catch {
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }
}) satisfies RequestHandler;

export const PATCH = (async ({ request }) => {
    const body = await request.json()

    const preview = NodeHtmlMarkdown.translate(body.body).substring(0, 1000);
    console.log(preview);

    const updateEntry = await prisma.journalEntry.update({
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

    // console.log(NodeHtmlMarkdown.translate(body.body));

    // console.log("begin")
    // console.log(body.title)
    // console.log(body.body)
    // console.log("end")

    // console.log(body)

    console.log(updateEntry);

    // return new Response(JSON.stringify({ message: updateEntry }), { status: 201 })
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

    const deleteEntry = await prisma.journalEntry.delete({
        where: {
            id: id
        }
    })

    console.log(deleteEntry);

    return new Response(JSON.stringify({ message: "success" }), { status: 201 })
}) satisfies RequestHandler;