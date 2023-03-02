import type { PageServerLoad } from './$types';
import type { Habit } from '@prisma/client';
import prisma from '$lib/prisma';

export const load = (async ({ params, locals }) => {
	const { session, user } = await locals.validateUser();
	if (!session) return null;
	if (!user) return null;

	const first_day_of_month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

	interface HabitWithHabitEntry extends Habit {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		HabitEntry: any[];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		SharedHabit: any[];
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
						lte: new Date()
					}
				},
				select: {
					date: true,
					value: true
				}
			},
			SharedHabit: {
				include: {
					user: {
						select: {
							email: true
						}
					}
				}
			}
		}
	});

	if (!habit) {
		return null;
	}

	const entryVals = habit.HabitEntry.map((entry) => entry.value);
	habit.HabitEntry = habit.HabitEntry.map((entry) => entry.date);

	habit.SharedHabit = habit.SharedHabit.map((share) => share.user); //TODO check this

	// map date to value
	const entry_values = new Map();
	for (let i = 0; i < habit.HabitEntry.length; i++) {
		entry_values.set(habit.HabitEntry[i], entryVals[i]);
	}

	return {
		habit: habit,
		entry_values: entry_values
	};
}) satisfies PageServerLoad;
