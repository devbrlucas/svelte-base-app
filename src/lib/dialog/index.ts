import type { ComponentType } from "svelte";
import { store } from "./store";
export { default as DialogComponent } from "./component.svelte";
async function open<T>(title: string, component: ComponentType, props?: Record<string, any>): Promise<T | null>
{
    store.set({
        title,
        component,
        props,
    });
    return new Promise((resolve, reject) => {
        store.subscribe(value => {
            if (value.resolved) {
                resolve(value.resolved);
            }
            if (value.resolved === null) resolve(null);
        });
    });
}
function close(): void
{
    store.set({});
}
function resolve<T>(data: T): void
{
    store.set({
        resolved: data,
    });
}
export const dialog = {
    open,
    close,
    resolve,
}
