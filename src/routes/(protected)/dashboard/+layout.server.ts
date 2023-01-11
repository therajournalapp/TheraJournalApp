/* A server.ts file is required to protect a route */

import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    return {
        test: "test!"
    };
}) satisfies LayoutServerLoad;