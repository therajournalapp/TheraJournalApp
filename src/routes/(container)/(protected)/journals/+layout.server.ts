import prisma from '$lib/prisma';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const { session, user } = await locals.validateUser();
    if (!session) return { error: 401, message: "Unauthorized" };
    if (!user) return { error: 401, message: "Unauthorized" };

    const journal_entries = await prisma.journalEntry.findMany({
        where: {
            user_id: user.userId
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });

    return {
        entries: journal_entries
    }
}) satisfies LayoutServerLoad;