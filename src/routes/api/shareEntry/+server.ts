import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client'
import { NodeHtmlMarkdown } from 'node-html-markdown'
const prisma = new PrismaClient()

//TODO add local auth to all api methods

export const POST = (async ({ request, locals }) => {
    const body = await request.json()

    const id = parseInt(body.id);

    try {
        const user = (await locals.validateUser()).user;
        if(user) {
            const newShare = await prisma.sharedEntry.create({
                    data: {
                        user_id : 'cldhr15i60000v364squlah44',
                        entry_id : id,
                    }
                })
            console.log(newShare);

            return new Response(JSON.stringify({ message: "success" }), { status: 201 })
        }
        else return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
        
    } catch {
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }
}) satisfies RequestHandler;


export const DELETE = (async ({ request, locals }) => {
    const body = await request.json()

    const id = parseInt(body.id);

    try {
        const user = (await locals.validateUser()).user;
        if(user) {
            const deleteShare = await prisma.sharedEntry.deleteMany({
                where: {
                    entry_id: id
                }
            })
            console.log(deleteShare);

            return new Response(JSON.stringify({ message: "success" }), { status: 201 })
        }
        else return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
        
    } catch {
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }
}) satisfies RequestHandler;