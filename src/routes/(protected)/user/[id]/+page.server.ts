import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load = (async ({ params, locals }) => {
	const { session, user } = await locals.validateUser();
	if (!session) return null;
	if (!user) return null;

	return {
		shared_user_id: params.id
	}

}) satisfies PageServerLoad;
