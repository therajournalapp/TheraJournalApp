import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const PATCH = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json()
    const id = parseInt(body.id);
    const name = body.name;

    const habit = await prisma.habit.findUnique({
        where: {
            id: id
        }
    });

    console.log("Hit");

    if (!habit || habit.user_id !== user.userId) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    await prisma.habit.update({
        where: {
            id: id
        },
        data: {
            name: name,
        }
    })

    return new Response(JSON.stringify({ message: "success" }), { status: 201 })
}) satisfies RequestHandler;

export const DELETE = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json()
    const id = parseInt(body.id);

    const habit = await prisma.habit.findUnique({
        where: {
            id: id
        }
    });

    if (!habit || habit.user_id !== user.userId) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    await prisma.habit.delete({
        where: {
            id: id
        }
    })

    return new Response(JSON.stringify({ message: "success" }), { status: 201 })
}) satisfies RequestHandler;