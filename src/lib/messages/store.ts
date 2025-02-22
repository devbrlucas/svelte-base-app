import { writable } from "svelte/store";
export type Message = {
    id: number;
    content: string;
    level: MessageLevel;
    close: boolean;
    callback?: (message: Message) => any|Promise<any>;
}
const store = writable<Message[]>([]);
export type MessageLevel = 'success' | 'warning' | 'error';
export { store as messages }
