import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const actions = {
    default: async ({ locals, request }) => {
        const user = (await locals.validateUser()).user;
        if (!user) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

        const body = await request.formData();
        const habitName = body.get('name')?.toString() ?? '';
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
