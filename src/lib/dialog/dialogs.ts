import type { ComponentType } from "svelte";
import { writable } from "svelte/store";
export const dialogs = writable<Dialog[]>([]);
export type Dialog = {
    title: string;
    component: ComponentType;
    props?: Record<string, any>;
    can_close?: boolean;
    id: string;
}
