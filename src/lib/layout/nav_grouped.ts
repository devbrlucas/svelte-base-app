import { writable } from "svelte/store";
export const store = writable<Map<string, boolean>>(new Map);