import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        nav: {};
        body: {};
    };
};
export type AdminComponentProps = typeof __propDef.props;
export type AdminComponentEvents = typeof __propDef.events;
export type AdminComponentSlots = typeof __propDef.slots;
export default class AdminComponent extends SvelteComponent<AdminComponentProps, AdminComponentEvents, AdminComponentSlots> {
}
export {};
