import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const load = (async ({ params, locals }) => {
    const { session, user } = await locals.validateUser();
    if (!session) return null;
    if (!user) return null;

    const habit = await prisma.habit.findUnique({
        where: {
            id: parseInt(params.index)
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

    console.log(habit);

    return {
        habit: habit
    };
}) satisfies PageServerLoad;