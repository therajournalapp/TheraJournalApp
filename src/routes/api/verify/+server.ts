
import { auth } from "$lib/server/lucia";
import { fb_auth } from '$lib/server/admin';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {

    try {
        const body = await request.json()
        const token = body.token
        // console.log(token);

        const decodedToken = await fb_auth.verifyIdToken(token)
        const fb_id = decodedToken.uid

        const fb_user = await fb_auth.getUser(fb_id)

        // console.log("email_verified? " + fb_user.emailVerified);

        const user = await auth.getUserByProviderId("fb_id", fb_id);
        auth.updateUserAttributes(user.userId, {
            email_verified: fb_user.emailVerified
        })


        console.log("yey!")

        return new Response(JSON.stringify({ message: "success" }), { status: 200 })
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
        return new Response(JSON.stringify({ message: "failure" }), { status: 400 })
    }
}) satisfies RequestHandler;