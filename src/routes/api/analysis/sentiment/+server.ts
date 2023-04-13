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


    const first_day_of_month = new Date(date_str);
    const last_day_of_month = new Date(first_day_of_month.getFullYear(), first_day_of_month.getMonth() + 1, 0);

    const sentiment_entries = await prisma.journalEntry.findMany({
        select: {
            createdAt: true,
            sentiment: true,
        },
        where: {
            user_id: id_str,
            createdAt: {
                gte: first_day_of_month,
                lte: last_day_of_month
            }
        }
    });

    return new Response(JSON.stringify({ entries: sentiment_entries }), { status: 200 });
}) satisfies RequestHandler;