import type { ActionReturn } from "svelte/action";
import { store } from "./store";
export type ConfirmationProperites = {
    callback: Function;
    message: string;
    deniedCallback?: Function;
}
export { default as ConfirmationComponent } from "./component.svelte";
export function confirmation(properties: ConfirmationProperites): Promise<void>
export function confirmation(node: HTMLElement, properties: ConfirmationProperites): ActionReturn
export function confirmation(node: HTMLElement|ConfirmationProperites , properties?: ConfirmationProperites): ActionReturn | Promise<void> | void
{
    if (node instanceof Element && properties) {
        const confirmationCallback = (event: Event) => handleEvent(event, properties);
        const eventName = node instanceof HTMLFormElement ? 'submit' : 'click';
        node.addEventListener(eventName, confirmationCallback);
        return {
            destroy() {
                node.removeEventListener(eventName, confirmationCallback);
            },
        }
    } else if (!(node instanceof Element)) {
        store.set(node);
        return new Promise((resolve, reject) => {
            const unsubscriber = store.subscribe(value => {
                if (value === null) {
                    unsubscriber();
                    resolve();
                }
            });
        });
    }
}

function handleEvent(event: Event, properties: ConfirmationProperites): void
{
    event.preventDefault();
    store.set(properties);
}