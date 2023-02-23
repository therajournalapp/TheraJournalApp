import type { LayoutServerLoad } from './$types';
import type { Habit, JournalEntry } from '@prisma/client';
import prisma from '$lib/prisma';

export const load = (async ({ locals }) => {
	const { session, user } = await locals.validateUser();
	if (!session) return { error: 401, message: 'Unauthorized' };
	if (user) {
		const shared_post_ids: number[] = await prisma.sharedEntry
			.findMany({
				where: {
					user_id: user.userId
				},
				select: {
					entry_id: true
				}
			})
			.then((shared_entries) => {
				return shared_entries.map((x) => x.entry_id);
			});

		const shared_posts: JournalEntry[] | null = await prisma.journalEntry.findMany({
			where: {
				id: {
					in: shared_post_ids
				}
			},
			include: {
				user: true
			}
		});

		const shared_habit_ids: number[] = await prisma.sharedHabit
			.findMany({
				where: {
					user_id: user.userId
				},
				select: {
					habit_id: true
				}
			})
			.then((shared_entries) => {
				return shared_entries.map((x) => x.habit_id);
			});

		const first_day_of_week = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - new Date().getDay());
		const last_day_of_week = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (6 - new Date().getDay()));

		const shared_habits: Habit[] | null = await prisma.habit.findMany({
			where: {
				id: {
					in: shared_habit_ids
				}
			},
			include: {
				user: true,
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
			}
		});

		console.log(shared_habits);

		return {
			entries: shared_posts,
			habits: shared_habits
		};
	}
	return { error: 401, message: 'Unauthorized' };
}) satisfies LayoutServerLoad;
