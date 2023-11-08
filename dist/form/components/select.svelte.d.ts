import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        label: string;
        value: string | number | null;
        error: string;
        blank?: boolean | undefined;
        disabled?: boolean | undefined;
    };
    events: {
        change: Event;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SelectProps = typeof __propDef.props;
export type SelectEvents = typeof __propDef.events;
export type SelectSlots = typeof __propDef.slots;
export default class Select extends SvelteComponent<SelectProps, SelectEvents, SelectSlots> {
}
export {};
