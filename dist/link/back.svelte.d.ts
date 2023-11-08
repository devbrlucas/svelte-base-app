import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        href: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type BackProps = typeof __propDef.props;
export type BackEvents = typeof __propDef.events;
export type BackSlots = typeof __propDef.slots;
export default class Back extends SvelteComponent<BackProps, BackEvents, BackSlots> {
}
export {};
