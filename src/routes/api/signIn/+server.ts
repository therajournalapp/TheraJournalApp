
import { auth } from "$lib/server/lucia";
import { fb_auth } from '$lib/server/admin';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals }) => {

    try {
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

        const user = await auth.authenticateUser("fb_id", fb_id, fb_id);
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
        if (e instanceof Error) {
            console.log(e.message);
        }
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }

    return new Response(JSON.stringify({ message: "success" }), { status: 200 })
}) satisfies RequestHandler;