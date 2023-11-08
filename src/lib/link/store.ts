import { writable } from "svelte/store";
export const store = writable<Record<string, string | undefined>>({});
