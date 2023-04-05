import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load = (async ({ params }) => {
    console.log(params.code);

    try {
        const link_share = await prisma.linkShare.findUnique({
            where: {
                link: params.code
            }
        });

        if (!link_share) return {
            entry: null
        };

        const entry = await prisma.journalEntry.findUnique({
            where: {
                id: link_share.entry_id
            }
        });

        return {
            entry: entry
        };
    }
    catch (e) {
        console.log(e);
    }

}) satisfies PageServerLoad;