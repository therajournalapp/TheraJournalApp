import type { JournalEntry } from "@prisma/client";
import { filter } from "lodash";
import { writable } from "svelte/store";

export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
    data: T[];
    filtered: T[];
    search: string;
    isShared: boolean | undefined;
    beginDate: string;
    endDate: string;
    sortBy: string;
    sortOrder: string;
}

export const createSearchStore = <T extends Record<PropertyKey, any>>(data : T[]) => {
    const { subscribe, set, update } = writable<SearchStoreModel<T>>({
        data: data, // raw data
        filtered: data, // filtered data
        search: '', // user search term
        isShared: undefined, // filter on shared - true to get shared only, false unshared only, undefined to get all
        beginDate: '',
        endDate: '',
        sortBy: 'created', // created or updated
        sortOrder: 'desc', // asc or desc
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
        // filter on search terms / shared / date
        let filtered : boolean = entry.terms.toLowerCase().includes(search);
        if (filterShared != undefined) {
            filtered = filtered && filterShared === entry.shared.length > 0;
        }
        if(store.beginDate && store.endDate) {
            const beginDate = new Date(store.beginDate);
            const endDate = new Date(store.endDate);
            const entryDate = store.sortBy === 'created' ?  new Date(entry.createdAt) : new Date(entry.updatedAt);
            filtered = filtered && entryDate >= beginDate && entryDate <= endDate;
        }
        return filtered;
    });
    // set the sort order
    store.filtered = store.filtered.sort((a : T, b : T) => {
        if (store.sortBy === 'created') {
            return store.sortOrder === 'desc' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt;
        } else {
            return store.sortOrder === 'desc' ? b.updatedAt - a.updatedAt : a.updatedAt - b.updatedAt;
        }
    });
}