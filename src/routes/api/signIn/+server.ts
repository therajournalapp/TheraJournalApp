
import { auth } from "$lib/server/lucia";
import { fb_auth } from '$lib/server/admin';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals }) => {

    try {
        const body = await request.json()
        const token = body.token

        console.log(token)
        const decodedToken = await fb_auth.verifyIdToken(token)

        const fb_id = decodedToken.uid

        const user = await auth.authenticateUser("fb_id", fb_id, fb_id);
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