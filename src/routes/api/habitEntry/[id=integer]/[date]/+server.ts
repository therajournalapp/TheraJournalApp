import type { RequestHandler } from '../[date=Date]/$types';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const GET = (async ({ params, request, locals }) => {
    const user = (await locals.validateUser()).user;
    if(!user) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const requestDate = new Date(params.date);
    const habitEntries = await prisma.habitEntry.findMany({ 
        where: {
            habit_id: parseInt(params.id),
            date: {
                lte: new Date(requestDate.getFullYear(), requestDate.getMonth() + 1, 0),
                gte: new Date(requestDate.getFullYear(), requestDate.getMonth(), 1) 
            }
        }
    });
    const entries = await habitEntries;
    return new Response(JSON.stringify({entries: habitEntries, message: "success" }), { status: 201 })
}) satisfies RequestHandler;