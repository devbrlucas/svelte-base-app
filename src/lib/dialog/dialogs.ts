import type { Component } from "svelte";
import { writable } from "svelte/store";
export const dialogs = writable<Dialog[]>([]);
export type Dialog = {
    title: string;
    component: Component<any>;
    props?: Record<string, any>;
    can_close?: boolean;
    id: string;
}
