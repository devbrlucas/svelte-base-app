import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        type: "number" | "password" | "email" | "text" | "tel" | "date" | "datetime-local" | "search" | "file" | "color";
        label: string;
        value: string | number | FileList | File | undefined | null;
        error?: string | undefined;
        disabled?: boolean | undefined;
    };
    events: {
        input: Event;
        blur: FocusEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type InputProps = typeof __propDef.props;
export type InputEvents = typeof __propDef.events;
export type InputSlots = typeof __propDef.slots;
export default class Input extends SvelteComponent<InputProps, InputEvents, InputSlots> {
}
export {};
