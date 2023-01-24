import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client'
import { NodeHtmlMarkdown } from 'node-html-markdown'
const prisma = new PrismaClient()

export const POST = (async ({ request, locals }) => {
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