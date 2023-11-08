import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        label: string;
        value: string | number | undefined;
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
export type TextAreaProps = typeof __propDef.props;
export type TextAreaEvents = typeof __propDef.events;
export type TextAreaSlots = typeof __propDef.slots;
export default class TextArea extends SvelteComponent<TextAreaProps, TextAreaEvents, TextAreaSlots> {
}
export {};
