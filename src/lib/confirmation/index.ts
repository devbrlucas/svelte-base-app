import type { ActionReturn } from "svelte/action";
import { store } from "./store";
export type ConfirmationProperites = {
    callback: Function;
    message: string;
    deniedCallback?: Function;
}
export { default as ConfirmationComponent } from "./component.svelte";
export function confirmation(properties: ConfirmationProperites): void
export function confirmation(node: HTMLElement, properties: ConfirmationProperites): ActionReturn
export function confirmation(node: HTMLElement|ConfirmationProperites , properties?: ConfirmationProperites): ActionReturn | void
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
    }
}

function handleEvent(event: Event, properties: ConfirmationProperites): void
{
    event.preventDefault();
    store.set(properties);
}