import { fail, redirect, type Redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { Actions } from './$types';
import { fb_auth } from '$lib/server/admin';
import prisma from '$lib/prisma';
import { LuciaError } from 'lucia-auth';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		console.log('form hit!');
		const form = await request.formData();
		const token = form.get('token');

		console.log(token);
		if (!token) return fail(400);
		const { user } = await locals.validateUser();
		if (!user) return fail(400);

		try {
			const decodedToken = await fb_auth.verifyIdToken(token.toString());

			// recheck with firebase
			const fb_id = decodedToken.uid;
			await fb_auth.deleteUser(fb_id);
			await auth.deleteUser(user.userId);
			await auth.invalidateSession(user.userId);
		} catch (err) {
			if (err instanceof LuciaError) {
				const message = err.message;
			}

			if (err instanceof Error) {
				console.log(err.message);
			}

			return fail(400, { error: 'Invalid password' });
		}
		throw redirect(302, '/');
	}
};
