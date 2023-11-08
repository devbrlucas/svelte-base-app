import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        href: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ShowProps = typeof __propDef.props;
export type ShowEvents = typeof __propDef.events;
export type ShowSlots = typeof __propDef.slots;
export default class Show extends SvelteComponent<ShowProps, ShowEvents, ShowSlots> {
}
export {};
