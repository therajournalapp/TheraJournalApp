import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const GET = (async ({ url, locals }) => {
	const user = (await locals.validateUser()).user;
	if (!user) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
	}

    let moodHabitId: any | null = await prisma.habit.findFirst({
        select: {
            id: true
        },
        where: {
            user_id: user.userId,
            type: 'Mood'
        }
    });
    const test = moodHabitId;
})