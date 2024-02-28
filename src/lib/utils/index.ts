import type { Writable } from "svelte/store";
import { titleStore } from "./title_store";
export * from "./formatter";
export function title(): Writable<string>
export function title(value: string): void
export function title(value?: string): Writable<string> | void
{
    if (value) {
        titleStore.set(value);
        return;
    }
    return titleStore;
}
export function createFormDataFromObject(object: Record<string, any>, namespace?: string, form?: FormData): FormData
{
    form = form || new FormData;
    for (const key in object) {
        const formKey = namespace ? `${namespace}[${key}]` : key;
        const objectItem = object[key];
        if (typeof objectItem === 'object' && !(objectItem instanceof File)) {
            createFormDataFromObject(object[key], formKey, form);
        } else {
            form.append(formKey, object[key]);
        }
    }
    return form;
}
