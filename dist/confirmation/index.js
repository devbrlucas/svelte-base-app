import { store } from "./store";
export { default as ConfirmationComponent } from "./component.svelte";
export function confirmation(node, properties) {
    const confirmationCallback = (event) => handleEvent(event, properties);
    const eventName = node instanceof HTMLFormElement ? 'submit' : 'click';
    node.addEventListener(eventName, confirmationCallback);
    return {
        destroy() {
            node.removeEventListener(eventName, confirmationCallback);
        },
    };
}
function handleEvent(event, properties) {
    event.preventDefault();
    store.set(properties);
}
