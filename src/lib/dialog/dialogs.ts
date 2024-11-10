import type { ComponentType } from "svelte";
import { writable } from "svelte/store";
export const dialogs = writable<Dialog[]>([]);
type Dialog = {
    title: string;
    component: ComponentType;
    props?: Record<string, any> | undefined;
    id: string;
}
