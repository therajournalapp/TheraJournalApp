import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { fb_auth } from "$lib/server/admin";
import { auth } from '$lib/server/lucia';

export const POST = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json()
    const email = body.email;
    const entry_id = body.entry_id;

    console.log("trying to create new share for entry: " + entry_id + " with email: " + email);

    try {
        // try to get lucia auth user by email
        const fb_user = await fb_auth.getUserByEmail(email)
        console.log(fb_user.uid);
        const fb_uid = fb_user.uid;

        // check if user with fb_id exists in db, if not create one
        type LAUser = {
            userId: string;
            email: string;
            email_verified: boolean | null;
        };
        let la_user: LAUser;
        try {
            la_user = await auth.getUserByProviderId("fb_id", fb_uid)
            console.log(la_user);
        } catch (e) {
            console.log("fb_id not found, creating new lucia auth user");
            la_user = await createUser(fb_uid, fb_user.email ? fb_user.email : email, fb_user.emailVerified);
            console.log(la_user);
        }

        try {
            const newShare = await prisma.sharedEntry.create({
                data: {
                    user_id: la_user.userId,
                    entry_id: entry_id,
                }
            })
            console.log("prisma object for new share:");
            console.log(newShare);
        }
        catch (e) {
            console.log("share already exists");
            return new Response(JSON.stringify({ message: "share already exists" }), { status: 409 })
        }

        return new Response(JSON.stringify({ message: "success" }), { status: 201 })
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }
}) satisfies RequestHandler;

// Creates a new user or throws an error
async function createUser(fb_id: string, email: string, email_verified: boolean) {
    const user = await auth.createUser("fb_id", fb_id, {
        password: fb_id,
        attributes: {
            fb_id: fb_id,
            email: email,
            email_verified: email_verified
        }
    });

    return user;
}

export const DELETE = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json()
    const email = body.email;
    const entry_id = body.entry_id;

    console.log("trying to delete share for entry: " + entry_id + " with email: " + email);

    try {
        // try to get lucia auth user by email
        const fb_user = await fb_auth.getUserByEmail(email)
        console.log(fb_user.uid);
        const fb_uid = fb_user.uid;

        // check if user with fb_id exists in db, if not create one
        type LAUser = {
            userId: string;
            email: string;
            email_verified: boolean | null;
        };
        let la_user: LAUser;
        try {
            la_user = await auth.getUserByProviderId("fb_id", fb_uid)
            console.log(la_user);
        } catch (e) {
            console.log("fb_id not found, creating new lucia auth user");
            la_user = await createUser(fb_uid, fb_user.email ? fb_user.email : email, fb_user.emailVerified);
            console.log(la_user);
        }

        const deleteShare = await prisma.sharedEntry.delete({
            where: {
                entry_id_user_id: {
                    entry_id: entry_id,
                    user_id: la_user.userId
                }
            }
        })
        console.log(deleteShare);

        return new Response(JSON.stringify({ message: "success" }), { status: 201 })

    } catch {
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }
}) satisfies RequestHandler;