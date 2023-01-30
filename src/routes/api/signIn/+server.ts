
import { auth } from "$lib/server/lucia";
import { fb_auth } from '$lib/server/admin';
import type { RequestHandler } from './$types';
import { LuciaError } from "lucia-auth";

export const POST = (async ({ request, locals }) => {

    try {
        console.log("signin attempt!")

        const body = await request.json()
        const token = body.token
        const email = body.email
        const email_verified = body.email_verified

        console.log(token)
        console.log(email)
        console.log(email_verified)

        console.log(token)
        const decodedToken = await fb_auth.verifyIdToken(token)

        const fb_id = decodedToken.uid

        // If fb_id exists for lucia auth login, otherwise create new lucia auth user and sign in
        try {
            const user = await auth.authenticateUser("fb_id", fb_id, fb_id);
            console.log(user)
            if (user.email != email) {
                user.email = email
            }
            if (user.email_verified != email_verified) {
                user.email_verified = email_verified
            }
            const session = await auth.createSession(user.userId);
            locals.setSession(session);
        }
        catch (e) {
            if (e instanceof LuciaError) {
                console.log(e.message);
                console.log("fb_id not found, creating new lucia auth user")

                try {
                    // Create Lucia Auth User
                    const user = await auth.createUser("fb_id", fb_id, {
                        password: fb_id,
                        attributes: {
                            fb_id: fb_id,
                            email: decodedToken.email ? decodedToken.email : email,
                            email_verified: decodedToken.email_verified ? decodedToken.email_verified : email_verified
                        }
                    });
                    console.log("Created new lucia auth user: " + user.userId)
                    const session = await auth.createSession(user.userId);
                    locals.setSession(session);
                }
                catch (e) {
                    console.log("Error Creating Lucia Auth User");
                    throw e;
                }

            }
            else {
                throw e
            }
        }
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }

    return new Response(JSON.stringify({ message: "success" }), { status: 200 })
}) satisfies RequestHandler;