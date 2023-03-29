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
        user_id?: string,
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
            user_id: true,
            SharedEntry: {
                select: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            },
            tags: true
        }
    });

    if (!entry) return null;

    // Reshape SharedEntry into shared_to
    const { SharedEntry, user_id, ...rest } = entry;
    entry = rest;
    entry.shared_to = SharedEntry?.map(shared => shared.user);

    // Check if the user is allowed to view the entry
    if (user_id !== user.userId) return null;

    return {
        entry: entry
    };
}) satisfies PageServerLoad;