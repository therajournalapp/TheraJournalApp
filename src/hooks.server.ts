import { auth } from "$lib/server/lucia";
import { handleHooks } from "@lucia-auth/sveltekit";
import { sequence } from "@sveltejs/kit/hooks";
import { redirect, type Handle } from '@sveltejs/kit';

// export const handle = handleHooks(auth);

export const customHandle = (async ({ event, resolve }) => {

    console.log(event.url.pathname);
    if (event.route.id != null && event.route.id.includes('/(protected)')) {
        const session = await event.locals.validate();
        if (!session) throw redirect(302, "/");
    }

    const response = await resolve(event);
    return response;
}) satisfies Handle;

export const handle = sequence(handleHooks(auth), customHandle);