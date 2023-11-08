/// <reference types="svelte" />
type Errors = {
    [key: string]: string[];
};
export declare const errors: import("svelte/store").Writable<Errors>;
export {};
