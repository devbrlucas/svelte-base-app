import type { ComponentType } from "svelte";
import { store } from "./store";
export { default as DialogComponent } from "./component.svelte";
export function dialog(): void
export function dialog(title: string, component: ComponentType, props?: Record<string, any>): void
export function dialog(title?: string, component?: ComponentType, props?: Record<string, any>): void
{
    if (title && component) {
        store.set({
            title,
            component,
            props,
        });
    } else {
        store.set(null);
    }
}
