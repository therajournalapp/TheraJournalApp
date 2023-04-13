import prisma from '$lib/prisma';
import type { JournalEntry } from '@prisma/client';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const { session, user } = await locals.validateUser();
    if (!session) return { error: 401, message: "Unauthorized" };
    if (!user) return { error: 401, message: "Unauthorized" };


    interface Shared {
        email: string
    }

    interface JournalEntryWithShared extends JournalEntry {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        SharedEntry: any[],
        shared?: Shared[],
    }

    const post_by_user: JournalEntryWithShared[] | null = await prisma.journalEntry.findMany({
        where: {
            user_id: user.userId,
        },
        include: {
            SharedEntry: {
                include: {
                    user: true
                }
            },
            LinkShare: {
                select: {
                    link: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const journal_entries = post_by_user.map(entry => {
        const { SharedEntry, ...rest } = entry;

        rest as JournalEntryWithShared;

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

    return {
        entries: journal_entries
    }
}) satisfies LayoutServerLoad;