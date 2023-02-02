import type { LayoutServerLoad } from './$types';
import { PrismaClient, type JournalEntry } from '@prisma/client';
const prisma = new PrismaClient()


export const load = (async ({ locals }) => {
    const { session, user } = await locals.validateUser();
    if (!session) return { error: 401, message: "Unauthorized" };
    if (user) {
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
                }
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

        const habits = await prisma.habit.findMany({
            orderBy: {
                id: 'desc'
            },
            include: {
                HabitEntry: {
                    where: {
                        date: {
                            lte: new Date(),
                            gte: new Date(new Date().setDate(new Date().getDate() - 7))
                        }
                    }
                }
            }
        });

        return {
            entries: journal_entries,
            habits: habits
        };
    }
    return { error: 401, message: "Unauthorized" };
}) satisfies LayoutServerLoad;