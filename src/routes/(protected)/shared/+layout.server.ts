import type { LayoutServerLoad } from './$types';
import { PrismaClient, type JournalEntry } from '@prisma/client';
const prisma = new PrismaClient();

export const load = (async ({ locals }) => {
	const { session, user } = await locals.validateUser();
	if (!session) return { error: 401, message: 'Unauthorized' };
	if (user) {
		const shared_post_ids: number[] = await prisma.sharedEntry
			.findMany({
				where: {
					user_id: user.userId
				},
				select: {
					entry_id: true
				}
			})
			.then((shared_entries) => {
				return shared_entries.map((x) => x.entry_id);
			});

		const shared_posts: JournalEntry[] | null = await prisma.journalEntry.findMany({
			where: {
				id: {
					in: shared_post_ids
				}
			},
			include: {
				user: true
			}
		});
		console.log('posts', shared_posts);
		return {
			entries: shared_posts
		};
	}
	return { error: 401, message: 'Unauthorized' };
}) satisfies LayoutServerLoad;
