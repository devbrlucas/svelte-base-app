import { SvelteComponent } from "svelte";
import "./style.less";
declare const __propDef: {
    props: {
        center?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        head: {};
        body: {};
    };
};
export type TableProps = typeof __propDef.props;
export type TableEvents = typeof __propDef.events;
export type TableSlots = typeof __propDef.slots;
export default class Table extends SvelteComponent<TableProps, TableEvents, TableSlots> {
}
export {};
