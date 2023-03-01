
import { auth } from "$lib/server/lucia";
import { fb_auth } from '$lib/server/admin';
import type { RequestHandler } from './$types';
import { LuciaError } from "lucia-auth";
import prisma from "$lib/prisma";

export const DELETE = (async ({ request, locals }) => {
        console.log("deleting account")

        const body = await request.json()
        const userId = body.userId

        await auth.deleteUser(userId);
        await prisma.user.delete({
            where: {
                id: userId
            }
        });


    return new Response(JSON.stringify({ message: "success" }), { status: 200 })
}) satisfies RequestHandler;