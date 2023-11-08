import { writable } from "svelte/store";
type Message = {
    id: number;
    content: string;
    level: MessageLevel;
}
const store = writable<Message[]>([]);
export type MessageLevel = 'success' | 'warning' | 'error';
export { store as messages }
