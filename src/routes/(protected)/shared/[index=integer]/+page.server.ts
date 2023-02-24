import type { PageServerLoad } from './$types';
import type { JournalEntry } from '@prisma/client'
import prisma from '$lib/prisma';

export const load = (async ({ params, locals }) => {
    const { session, user } = await locals.validateUser();
    if (!session) return null;
    if (!user) return null;

    interface Shared {
        email: string
    }

    interface JournalEntryWithShared extends Pick<JournalEntry, 'id' | 'title' | 'body'> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        SharedEntry?: any[],
        shared_to?: Shared[],
    }

    let entry: JournalEntryWithShared | null = await prisma.journalEntry.findUnique({
        where: {
            id: parseInt(params.index)
        },
        select: {
            id: true,
            title: true,
            body: true,
            createdAt: true,
            SharedEntry: {
                select: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            }
        }
    });

    if (!entry) return null;

    // Check if the user is allowed to view the entry
    const { SharedEntry, ...rest } = entry;
    entry = rest;
    const shared_to = SharedEntry?.map(shared => shared.user.email);
    if (shared_to && !shared_to.includes(user.email)) return null;

    return {
        entry: entry
    };
}) satisfies PageServerLoad;