import type { Actions } from './$types';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const actions = {
	newHabit: async ({ locals, request }) => {
		const user = (await locals.validateUser()).user;
		if (!user) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

		const body = await request.formData();
		// client side can ensure name is never empty, but just in case
		const habitName = body.get('name')?.toString() ?? 'New Habit';
		const habit = await prisma.habit.create({
			data: {
				name: habitName,
				type: 'Custom',
				user_id: user.userId
			}
		});
		console.log(habit);
	}
} satisfies Actions;
