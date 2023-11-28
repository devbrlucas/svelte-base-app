import { writable } from "svelte/store";
export const INITIAL_DATA: SvelteBaseApp.CurrentUser = {
    access_token: '',
    type: '',
    user: {
        name: '',
        email: '',
        image: null,
    }
}
export const currentUser = writable<SvelteBaseApp.CurrentUser>(INITIAL_DATA);
