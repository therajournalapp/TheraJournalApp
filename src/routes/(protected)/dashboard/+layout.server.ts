import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    return {
        test: "test!"
    };
}) satisfies LayoutServerLoad;