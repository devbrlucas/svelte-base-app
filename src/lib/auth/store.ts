import { writable } from "svelte/store";
export const INITIAL_DATA: CurrentUser = {
    access_token: '',
    type: '',
    user: {
        name: '',
        email: '',
        image: null,
    }
}
export const currentUser = writable<CurrentUser>(INITIAL_DATA);
