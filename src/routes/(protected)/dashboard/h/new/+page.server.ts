import type { Actions } from './$types';
import { PrismaClient } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const actions = {
    default: async ({ locals, request }) => {
        const user = (await locals.validateUser()).user;
        if (!user) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

        const body = await request.formData();
        let habitName = body.get('name')?.toString() ?? 'New Habit';
        habitName = habitName == "" ? "New Habit" : habitName;
        const habit = await prisma.habit.create({
            data: {
                name: habitName,
                type: 'Custom',
                user_id: user.userId
            }
        });
        if (!habit) return fail(500, { message: 'Failed to create habit' });
        throw redirect(302, `/dashboard/h/${habit.id}`);
    }
} satisfies Actions;
