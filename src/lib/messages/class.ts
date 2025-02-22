import { messages as store, type Message, type MessageLevel } from "./store";
export class Messages
{
    private appendMessage(level: MessageLevel, content?: string, close: boolean = true, callback?: (message: Message) => any|Promise<any>): number
    {
        if (!content) return -1;
        const id = Math.random();
        store.update(value => {
            value.push({
                id,
                content,
                level,
                close,
                callback,
            });
            localStorage.setItem('app:persistent_messages', JSON.stringify(value.filter(item => !item.close)));
            return value;
        });
        return id;
    }

    public error(content?: string, close: boolean = true, callback?: (message: Message) => any|Promise<any>): number
    {
        return this.appendMessage('error', content, close, callback);
    }

    public warning(content?: string, close: boolean = true, callback?: (message: Message) => any|Promise<any>): number
    {
        return this.appendMessage('warning', content, close, callback);
    }

    public success(content?: string, close: boolean = true, callback?: (message: Message) => any|Promise<any>): number
    {
        return this.appendMessage('success', content, close, callback);
    }

    public close(id: number): void
    {
        store.update(value => value.filter(item => item.id !== id));
    }
}