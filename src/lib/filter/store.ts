import { writable } from "svelte/store";
type FilterStore = {
    visible: boolean;
    active: boolean;
}
export const filterStore = writable<FilterStore>({
    active: false,
    visible: false,
});