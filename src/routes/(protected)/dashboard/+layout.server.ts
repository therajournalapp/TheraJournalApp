import type { LayoutServerLoad } from './$types';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const load = (async () => {

    const journalEntries = await prisma.journalEntry.findMany({
        orderBy: {
            id: 'desc'
        },
        take: 10
    });

    return {
        entries: journalEntries
    };
}) satisfies LayoutServerLoad;