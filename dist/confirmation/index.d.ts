import type { ActionReturn } from "svelte/action";
export type ConfirmationProperites = {
    callback: Function;
    message: string;
};
export { default as ConfirmationComponent } from "./component.svelte";
export declare function confirmation(node: HTMLElement, properties: ConfirmationProperites): ActionReturn;
