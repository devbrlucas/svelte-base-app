import { writable } from "svelte/store";
export type UserData = {
    access_token: string;
    user: any;
    type: string;
}
export const INITIAL_DATA: UserData = {
    access_token: '',
    type: '',
    user: undefined,
}
export const currentUser = writable<SvelteBaseApp.CurrentUser>(proxyUser(INITIAL_DATA));
export function proxyUser(user: UserData): UserData
{
    return new Proxy(user, {
        get(target, name) {
            if (name === 'access_token') return target.access_token;
            if (name === 'current') return target.user;
            return target.type === name ? target.user : undefined;
        },
    })
}