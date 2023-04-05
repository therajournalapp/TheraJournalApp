import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import { generateRandomString } from "lucia-auth";

export const POST = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json()
    const entry_id = body.entry_id;

    console.log("trying to create new link share for entry: " + entry_id);

    try {
        let link = generateRandomString(10)

        // check if link already exists
        let link_exists = true;
        while (link_exists) {
            try {
                link = generateRandomString(10);
                await prisma.linkShare.findUnique({
                    where: {
                        link: link
                    }
                })
                link_exists = false;
            } catch (e) {
                link_exists = true;
            }
        }

        // create new link share
        await prisma.linkShare.create({
            data: {
                link: link,
                entry_id: entry_id
            }
        })

        return new Response(JSON.stringify({ link: link }), { status: 201 })
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }
}) satisfies RequestHandler;

export const DELETE = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json()
    const entry_id = body.entry_id;

    console.log("trying to delete link share for habit: " + entry_id);

    try {
        await prisma.linkShare.delete({
            where: {
                entry_id: entry_id
            }
        })

        return new Response(JSON.stringify({ message: "success" }), { status: 201 })
    } catch {
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }
}) satisfies RequestHandler;