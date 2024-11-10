import { messages as store, type MessageLevel } from "./store";
export class Messages
{
    private appendMessage(level: MessageLevel, content?: string): number
    {
        if (!content) return -1;
        const id = Math.random();
        store.update(value => {
            value.push({
                id,
                content,
                level,
            });
            return value;
        });
        return id;
    }

    public error(content?: string): number
    {
        return this.appendMessage('error', content);
    }

    public warning(content?: string): number
    {
        return this.appendMessage('warning', content);
    }

    public success(content?: string): number
    {
        return this.appendMessage('success', content);
    }

    public close(id: number): void
    {
        store.update(value => value.filter(item => item.id !== id));
    }
}