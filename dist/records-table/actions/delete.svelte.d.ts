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
export type DeleteProps = typeof __propDef.props;
export type DeleteEvents = typeof __propDef.events;
export type DeleteSlots = typeof __propDef.slots;
export default class Delete extends SvelteComponent<DeleteProps, DeleteEvents, DeleteSlots> {
}
export {};
