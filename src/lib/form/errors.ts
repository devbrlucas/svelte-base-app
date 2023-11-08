import { writable } from "svelte/store";
type Errors = {
    [key: string]: string[];
}
export const errors = writable<Errors>({}); 
