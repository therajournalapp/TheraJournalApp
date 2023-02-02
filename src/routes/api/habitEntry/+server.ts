import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const GET = (async ({ request, locals }) => {
    const user = (await locals.validateUser()).user;
    if(!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();

    const requestDate = body.date.toString();

    const habitEntries = await prisma.habitEntry.findMany({ 
        where: {
            habit_id: body.habitID,
            date: {
                lte: new Date(requestDate.getFullYear(), requestDate.getMonth(), 1),
                gte: new Date(requestDate.getFullYear(), requestDate.getMonth() + 1, 0)
            }
        }
    });
    return new Response(JSON.stringify({ message: "success" }), { status: 201 })
}) satisfies RequestHandler;