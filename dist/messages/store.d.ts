/// <reference types="svelte" />
type Message = {
    id: number;
    content: string;
    level: MessageLevel;
};
declare const store: import("svelte/store").Writable<Message[]>;
export type MessageLevel = 'success' | 'warning' | 'error';
export { store as messages };
