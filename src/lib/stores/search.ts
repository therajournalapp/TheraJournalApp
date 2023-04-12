import type { JournalEntry } from "@prisma/client";
import { filter } from "lodash";
import { writable } from "svelte/store";

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
    data: T[];
    filtered: T[];
    search: string;
    isShared: boolean | undefined;
}

export const createSearchStore = <T extends Record<PropertyKey, any>>(data : T[]) => {
    const { subscribe, set, update } = writable<SearchStoreModel<T>>({
        data: data,
        filtered: data,
        search: '',
        isShared: undefined,
    });
    return {
        subscribe,
        set,
        update,
    };
}

export const searchHandler = <T extends Record<PropertyKey, any>>(store : SearchStoreModel<T>) => {
    const search = store.search.toLowerCase() || '';
    const filterShared = store.isShared !== undefined ? store.isShared : undefined;
    console.log('searching!', search, filterShared);
    store.filtered = store.data.filter((entry : T) => {
        let filtered : boolean = entry.terms.toLowerCase().includes(search);
        if (filterShared != undefined) {
            console.log('filter for shared is ', filterShared);
            filtered = filterShared === entry.shared.length > 0;
            console.log('filtered is not undefined - filtered: ', filtered);
        }
        return filtered;
    });
}