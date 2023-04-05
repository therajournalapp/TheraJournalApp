// TODO change from being generic int matcher to a sharecode matcher

import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return /^\d+$/.test(param);
}) satisfies ParamMatcher;