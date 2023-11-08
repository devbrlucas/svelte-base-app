import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        name: string;
        email: string;
        url?: string | undefined;
        callback?: Function | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ProfileComponentProps = typeof __propDef.props;
export type ProfileComponentEvents = typeof __propDef.events;
export type ProfileComponentSlots = typeof __propDef.slots;
export default class ProfileComponent extends SvelteComponent<ProfileComponentProps, ProfileComponentEvents, ProfileComponentSlots> {
}
export {};
