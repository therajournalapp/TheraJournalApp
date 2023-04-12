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

    // Retrieves the habit ID of the requested habit
    let habits: any | null = await prisma.habit.findMany({
        select: {
            name: true
        },
        where: {
            user_id: id_str,
            type: "Custom"
        }
    });

    habits = habits.map((habit: any) => habit.name);

    console.log(habits);

	return new Response(JSON.stringify({ habit_names: habits }), { status: 200 });
}) satisfies RequestHandler;