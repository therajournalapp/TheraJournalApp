import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const GET = (async ({ url, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    // Retrieves the user ID of the user who shared their data
    const id_str = url.searchParams.get('sharedId');
    if (!id_str) {
        console.log("Invalid request: no sharedId parameter");
        return new Response(JSON.stringify({ message: 'Invalid request' }), { status: 400 });
    }

    // Retrieves the requested habit name
    const habit_str = url.searchParams.get('habit');
    if (!habit_str) {
        console.log("Invalid request: no habit parameter");
        return new Response(JSON.stringify({ message: 'Invalid request' }), { status: 400 });
    }

    // Retrieves the habit ID of the requested habit
    let habit_id: any | null = await prisma.habit.findFirst({
        select: {
            id: true
        },
        where: {
            user_id: id_str,
            name: habit_str
        }
    });

    // If the habit ID is null, the habit does not exist
    if (habit_id == null) {
        console.log("Invalid request: habit not found");
        return new Response(JSON.stringify({ message: 'Invalid request' }), { status: 400 });
    }

    // Retrieves all habit entries for the requested habit
    const habit_entries: any[] | null = await prisma.habitEntry.findMany({
        select: {
            date: true,
        },
        where: {
            habit_id: habit_id.id
        },
        orderBy: {
            date: 'asc'
        }
    });

    // Gets an array of strings in the format 'Month Year' for each habit entry
    const habit_dates = habit_entries.map((entry) => new Date(entry.date).toLocaleString('en-US', { month: 'long', year: 'numeric' }));

    // Creates a map of the format 'Month Year': count
    const month_counts = new Map();
    habit_dates.forEach((date: String) => {
        if (month_counts.has(date)) {
            month_counts.set(date, month_counts.get(date) + 1);
        } else {
            month_counts.set(date, 1);
        }
    });

    // Converts map to 2D array of the format [['Month Year', count], ...] for use in the frontend
    let month_count_arr = Array.from(month_counts);

    return new Response(JSON.stringify({ month_counts: month_count_arr }), { status: 200 });
}) satisfies RequestHandler;