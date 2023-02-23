import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const GET = (async ({ url, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const id_str = url.searchParams.get('id');
    if (!id_str) {
        return new Response(JSON.stringify({ message: "Invalid request" }), { status: 400 });
    }
    const id = parseInt(id_str);

    const month_str = url.searchParams.get('month');
    if (!month_str) {
        return new Response(JSON.stringify({ message: "Invalid request" }), { status: 400 });
    }
    const month = new Date(month_str);

    const habit = await prisma.habit.findUnique({
        where: {
            id: id
        }
    });

    if (!habit || habit.user_id !== user.userId) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    // Get entries for selected month
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let entries: any[] | null = await prisma.habitEntry.findMany({
        select: {
            date: true
        },
        where: {
            habit_id: id,
            date: {
                gte: month,
                lte: new Date(new Date(month).getFullYear(), new Date(month).getMonth() + 1, 0),
            }
        }
    })

    entries = entries.map(e => e.date);

    console.log("api/habitEntry GET: ");
    console.log(entries);

    return new Response(JSON.stringify(entries), { status: 200 })

}) satisfies RequestHandler;

export const PATCH = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if (!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json()
    const id = parseInt(body.id);
    const month: Date = body.month;
    const entries: Date[] = body.entries;

    const habit = await prisma.habit.findUnique({
        where: {
            id: id
        }
    });

    if (!habit || habit.user_id !== user.userId) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    // Get entries for selected month
    const prev_entries = await prisma.habitEntry.findMany({
        where: {
            habit_id: id,
            date: {
                gte: month,
                lte: new Date(new Date(month).getFullYear(), new Date(month).getMonth() + 1, 0),
            }
        }
    })

    // Delete entries that are no longer in the list
    for (const entry of prev_entries) {
        if (!entries.includes(entry.date)) {
            await prisma.habitEntry.delete({
                where: {
                    id: entry.id
                }
            })
        }
    }

    // Add entries that are not in the list
    for (const entry of entries) {
        if (!prev_entries.map(e => e.date).includes(entry)) {
            await prisma.habitEntry.create({
                data: {
                    date: entry,
                    habit_id: id,
                    value: 1
                }
            })
        }
    }

    return new Response(JSON.stringify({ message: "success" }), { status: 201 })
}) satisfies RequestHandler;