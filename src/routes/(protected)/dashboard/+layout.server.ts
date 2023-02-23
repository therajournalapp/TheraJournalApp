import type { LayoutServerLoad } from './$types';
import { PrismaClient, type Habit, type JournalEntry } from '@prisma/client';
const prisma = new PrismaClient()


export const load = (async ({ locals }) => {
    const { session, user } = await locals.validateUser();
    if (!session || !user) return { error: 401, message: "Unauthorized" };
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
        },
        orderBy: {
            updatedAt: 'desc'
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

    interface HabitWithHabitEntry extends Habit {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        HabitEntry: any[],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        SharedHabit?: any[],
        shared_to?: Shared[],
    }

    const first_day_of_week = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - new Date().getDay());
    const last_day_of_week = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (6 - new Date().getDay()));

    //TODO remove after testing
    console.log("first day of week: ");
    console.log(first_day_of_week)
    console.log("last day of week: ");
    console.log(last_day_of_week)

    let habits: HabitWithHabitEntry[] | null = await prisma.habit.findMany({
        where: {
            user_id: user.userId,
        },
        orderBy: {
            id: 'desc'
        },
        include: {
            HabitEntry: {
                select: {
                    date: true,
                },
                where: {
                    date: {
                        gte: first_day_of_week,
                        lte: last_day_of_week,
                    }
                }
            },
            SharedHabit: {
                include:
                {
                    user: {
                        select: {
                            email: true,
                        }
                    }

                }
            }
        }
    });

    habits = habits.map(habit => {
        const { SharedHabit, ...rest } = habit;
        if (SharedHabit && SharedHabit.length > 0) {
            rest.shared_to = SharedHabit.map(entry => (entry.user));
        }
        else {
            rest.shared_to = [];
        }

        return rest;
    });

    if (habits[0]?.HabitEntry) {
        console.log("habit entries on server: ");
        for (let i = 0; i < habits[0].HabitEntry.length; i++) {
            console.log(JSON.stringify(habits[0].HabitEntry[i]));
        }
        console.log("---");
    }

    return {
        entries: journal_entries,
        habits: habits
    };
}) satisfies LayoutServerLoad;