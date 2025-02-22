import { messages as store, type MessageLevel } from "./store";
export class Messages
{
    private appendMessage(level: MessageLevel, content?: string, close: boolean = true): number
    {
        if (!content) return -1;
        const id = Math.random();
        store.update(value => {
            value.push({
                id,
                content,
                level,
                close,
            });
            localStorage.setItem('app:persistent_messages', JSON.stringify(value.filter(item => !item.close)));
            return value;
        });
        return id;
    }

    public error(content?: string, close: boolean = true): number
    {
        return this.appendMessage('error', content, close);
    }

    public warning(content?: string, close: boolean = true): number
    {
        return this.appendMessage('warning', content, close);
    }

    public success(content?: string, close: boolean = true): number
    {
        return this.appendMessage('success', content, close);
    }

    public close(id: number): void
    {
        store.update(value => value.filter(item => item.id !== id));
    }
}