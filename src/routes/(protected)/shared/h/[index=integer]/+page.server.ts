import type { PageServerLoad } from './$types';
import { PrismaClient, type Habit } from '@prisma/client'
const prisma = new PrismaClient()

export const load = (async ({ params, locals }) => {
    const { session, user } = await locals.validateUser();
    if (!session) return null;
    if (!user) return null;

    const first_day_of_month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    interface HabitWithHabitEntry extends Habit {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        HabitEntry: any[],
    }

    const habit: HabitWithHabitEntry | null = await prisma.habit.findUnique({
        where: {
            id: parseInt(params.index)
        },
        include: {
            HabitEntry: {
                where: {
                    date: {
                        gte: first_day_of_month,
                        lte: new Date(),
                    }
                },
                select: {
                    date: true,
                }
            },
        }
    });

    if (!habit) {
        return null;
    }

    habit.HabitEntry = habit.HabitEntry.map(entry => (entry.date));

    return {
        habit: habit
    };
}) satisfies PageServerLoad;
