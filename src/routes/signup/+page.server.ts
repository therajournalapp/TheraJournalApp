import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import type { PageServerLoad, Actions } from "./$types";
import { LuciaError } from "lucia-auth";
import { fb_auth } from "$lib/server/admin";

// If the user exists, redirect authenticated users to the profile page.
export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate();
    if (session) throw redirect(302, "/");
    return {};
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        console.log("1. signup form recieved");

        const form = await request.formData();
        const email = form.get("email");
        const password = form.get("password");

        // check for empty values
        if (!email || !password || typeof email !== "string" || typeof password !== "string") {
            console.log("error: empty values in signup form");
            return fail(400, { email, empty: true });
        }

        console.log("2. creating fb user");

        let fb_id: string | null = null;

        try {
            const userRecord = await fb_auth.createUser({
                email: email,
                emailVerified: false,
                password: password,
            });
            console.log('3. Successfully created new fb user:', userRecord.uid);
            fb_id = userRecord.uid;
        }
        catch (error) {
            console.log('error: error creating new fb user:', error);
            return fail(400, { email, error: true });
        };

        if (fb_id) {
            try {
                console.log("4. try create lucia auth user")
                const user = await auth.createUser("fb_id", fb_id, {
                    attributes: {
                        fb_id
                    }
                });
                const session = await auth.createSession(user.userId);
                locals.setSession(session);
                console.log("5. user and session created!")
            } catch (e) {
                // fb_id already in use
                if (e instanceof LuciaError) {
                    console.log(e.message);
                }
                else if (e instanceof Error) {
                    console.log(e.message);
                }

                return fail(400, { email, error: true });
            }
        }
        else {
            console.log("error: fb_id is null");
        }
    }
};