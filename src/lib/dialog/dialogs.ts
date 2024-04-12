import type { ComponentType } from "svelte";
import { writable, type Unsubscriber } from "svelte/store";
export const dialogs = writable<Dialog[]>([]);
type Dialog = {
    title: string;
    component: ComponentType;
    props?: Record<string, any> | undefined;
    id: number;
}
