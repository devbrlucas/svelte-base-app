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
export type EditProps = typeof __propDef.props;
export type EditEvents = typeof __propDef.events;
export type EditSlots = typeof __propDef.slots;
export default class Edit extends SvelteComponent<EditProps, EditEvents, EditSlots> {
}
export {};
