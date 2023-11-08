import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        href: string;
        callback: (response: Response) => Promise<boolean>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type RestoreProps = typeof __propDef.props;
export type RestoreEvents = typeof __propDef.events;
export type RestoreSlots = typeof __propDef.slots;
export default class Restore extends SvelteComponent<RestoreProps, RestoreEvents, RestoreSlots> {
}
export {};
