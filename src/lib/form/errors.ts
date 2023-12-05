import { writable } from "svelte/store";
export type Errors = {
    [key: string]: string[];
}
export const errors = writable<Errors>({}); 
