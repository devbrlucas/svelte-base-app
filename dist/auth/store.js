import { writable } from "svelte/store";
export const INITIAL_DATA = {
    access_token: '',
    type: '',
    user: {
        name: '',
        email: '',
        image: null,
    }
};
export const currentUser = writable(INITIAL_DATA);
