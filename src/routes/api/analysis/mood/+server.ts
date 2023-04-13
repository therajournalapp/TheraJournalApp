import type { RequestHandler } from '././$types';
import prisma from '$lib/prisma';

export const GET = (async ({ url, locals }) => {
	const user = (await locals.validateUser()).user;
	if (!user) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

    // Retrieves the user ID of the user who shared their data
    const id_str = url.searchParams.get('sharedId');
	if (!id_str) {
		return new Response(JSON.stringify({ message: 'Invalid shared ID request' }), { status: 400 });
	}

    // Retrieves the requested month range for mood entries
    const date_str = url.searchParams.get('date');
    if (!date_str) {
        return new Response(JSON.stringify({ message: 'Invalid month request' }), { status: 400 });
    }

    // Retrieves the mood habit ID of the user who shared their data
    let mood_habit_id: any | null = await prisma.habit.findFirst({
        select: {
            id: true
        },
        where: {
            user_id: id_str,
            type: 'Mood'
        }
    });


    const first_day_of_month = new Date(date_str);
    const last_day_of_month = new Date(first_day_of_month.getFullYear(), first_day_of_month.getMonth() + 1, 0);
    
    // Gets date and value of the mood habit entries from the current month
    let mood_habit_entries: any[] | null = await prisma.habitEntry.findMany({
        select: {
            date: true,
            value: true,
        },
        where: {
            habit_id: mood_habit_id.id,
			date: {
				gte: first_day_of_month,
				lte: last_day_of_month
			}
        }
    });


	return new Response(JSON.stringify({ entries: mood_habit_entries }), { status: 200 });
}) satisfies RequestHandler;