import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const load = (async ({ params }) => {

    const entry = await prisma.journalEntry.findUnique({
        where: {
            id: parseInt(params.index)
        }
    });

    return {
        entry: entry
    };
}) satisfies PageServerLoad;