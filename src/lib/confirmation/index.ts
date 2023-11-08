import type { ActionReturn } from "svelte/action";
import { store } from "./store";
export type ConfirmationProperites = {
    callback: Function;
    message: string;
}
export { default as ConfirmationComponent } from "./component.svelte";
export function confirmation(node: HTMLElement , properties: ConfirmationProperites): ActionReturn
{
    const confirmationCallback = (event: Event) => handleEvent(event, properties);
    const eventName = node instanceof HTMLFormElement ? 'submit' : 'click';
    node.addEventListener(eventName, confirmationCallback);
    return {
        destroy() {
            node.removeEventListener(eventName, confirmationCallback);
        },
    }
}

function handleEvent(event: Event, properties: ConfirmationProperites): void
{
    event.preventDefault();
    store.set(properties);
}