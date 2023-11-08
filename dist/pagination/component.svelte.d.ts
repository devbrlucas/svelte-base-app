import { SvelteComponent } from "svelte";
import type { PaginatedResponse } from "./index";
import "./style.less";
declare const __propDef: {
    props: {
        meta: PaginatedResponse['meta'];
        links: PaginatedResponse['links'];
    };
    events: {
        submit: SubmitEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
