import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const load = (({ params }) => {

    const entry = prisma.journalEntry.findUnique({
        where: {
            id: parseInt(params.index)
        }
    });

    return {
        entry: entry
    };
}) satisfies PageServerLoad;