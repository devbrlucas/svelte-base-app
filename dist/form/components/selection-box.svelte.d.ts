import { SvelteComponent } from "svelte";
declare class __sveltets_Render<T> {
    props(): {
        [x: string]: any;
        type: "checkbox" | "checkgroup" | "radio";
        label: string;
        value?: string | number | boolean | undefined;
        selected?: string | number | boolean | undefined;
        checked?: boolean | undefined;
        group?: (string | number)[] | undefined;
        error?: string | undefined;
        disabled?: boolean | undefined;
    };
    events(): {
        change: Event;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type SelectionBoxProps<T> = ReturnType<__sveltets_Render<T>['props']>;
export type SelectionBoxEvents<T> = ReturnType<__sveltets_Render<T>['events']>;
export type SelectionBoxSlots<T> = ReturnType<__sveltets_Render<T>['slots']>;
export default class SelectionBox<T> extends SvelteComponent<SelectionBoxProps<T>, SelectionBoxEvents<T>, SelectionBoxSlots<T>> {
}
export {};
