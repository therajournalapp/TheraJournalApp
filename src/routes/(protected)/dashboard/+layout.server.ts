import type { LayoutServerLoad } from './$types';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const load = (async () => {

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

    const journalEntries = await prisma.journalEntry.findMany({
        orderBy: {
            id: 'desc'
        },
        take: 10
    });

    return {
        entries: journalEntries,
        habits: habits
    };
}) satisfies LayoutServerLoad;