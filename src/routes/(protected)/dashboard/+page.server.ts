//TODO: delete this file once api routes are moved

import type { Actions } from './$types';
import { PrismaClient } from '@prisma/client';
import { fail } from '@sveltejs/kit';
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
	},
	newHabitEntry: async ({ locals, request }) => {
		const user = (await locals.validateUser()).user;
		if (!user) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

		const body = await request.formData();

		let habit_id: number;
		if (!body.get('habit_id')) {
			return fail(400, { missing: true });
		} else {
			habit_id = parseInt(body.get('habit_id')?.toString() ?? '0');
		}
		const entryDate = new Date(body.get('date')?.toString() ?? new Date());
		const habitEntry = await prisma.habitEntry.create({
			data: {
				habit_id: habit_id,
				date: entryDate,
				value: 1
			}
		});
		console.log(habitEntry);
	}
} satisfies Actions;
