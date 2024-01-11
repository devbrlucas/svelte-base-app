import type { ComponentType } from "svelte";
import { store } from "./store";
export { default as DialogComponent } from "./component.svelte";
export function dialog(title: string, component: ComponentType, props?: Record<string, any>): void
{
    store.set({
        title,
        component,
        props,
    });
}
