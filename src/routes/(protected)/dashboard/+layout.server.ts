import type { LayoutServerLoad } from './$types';
import { PrismaClient, type JournalEntry } from '@prisma/client';
const prisma = new PrismaClient()

export const load = (async ({locals}) => {
    const { session, user } = await locals.validateUser();
    if(!session) return { error: 401, message: "Unauthorized" };
    if(user)
    {
  
    const post_by_user : JournalEntry[] | null =  await prisma.user.findUnique({
        where: {
            id: user.userId
        }}).JournalEntry();

    return {
        entries: post_by_user,
    };
}
return { error: 401, message: "Unauthorized" };
}) satisfies LayoutServerLoad;