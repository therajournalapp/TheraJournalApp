import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import type { PageServerLoad, Actions } from "./$types";

// If the user exists, redirect authenticated users to the profile page.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const load: PageServerLoad = async ({ locals }: { locals: any }) => {
    const session = await locals.validate();
    if (session) throw redirect(302, "/");
    return {};
};

export const actions: Actions = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const username = form.get("username");
        const password = form.get("password");

        // check for empty values
        if (!username || !password || typeof username !== "string" || typeof password !== "string") {
            return fail(400);
        }

        try {
            const user = await auth.createUser("username", username, {
                password,
                attributes: {
                    username
                }
            });
            const session = await auth.createSession(user.userId);
            locals.setSession(session);
        } catch {
            // username already in use
            return fail(400);
        }
    }
};