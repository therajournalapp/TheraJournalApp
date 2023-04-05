import prisma from '$lib/prisma';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const { session, user } = await locals.validateUser();
    if (!session) return { error: 401, message: "Unauthorized" };
    if (!user) return { error: 401, message: "Unauthorized" };

    let journal_entries = await prisma.journalEntry.findMany({
        select: {
            id: true,
            user_id: true,
            title: true,
            body: true,
            createdAt: true,
            updatedAt: true,
            tags: true,
            SharedEntry: {
                select: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            },
            LinkShare: {
                select: {
                    link: true
                }
            }
        },
        where: {
            user_id: user.userId
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });

    journal_entries = journal_entries.map(entry => {
        const { SharedEntry, ...rest } = entry;

        if (SharedEntry.length > 0) {
            rest.shared = SharedEntry.map(shared => {
                return {
                    email: shared.user.email as string,
                }
            });
        } else {
            rest.shared = [];
        }

        return rest
    });

    console.log(JSON.stringify(journal_entries));

    return {
        entries: journal_entries
    }
}) satisfies LayoutServerLoad;