import { writable } from "svelte/store";
type Message = {
    id: number;
    content: string;
    level: MessageLevel;
    close: boolean;
}
const store = writable<Message[]>([]);
// store.subscribe(value => localStorage.setItem('app:persistent_messages', JSON.stringify(value.filter(item => !item.close))));
export type MessageLevel = 'success' | 'warning' | 'error';
export { store as messages }
