import { messages as store, type MessageLevel } from "./store";
import { get } from "svelte/store";
export class Messages
{
    private appendMessage(level: MessageLevel, content?: string): void
    {
        if (!content) return;
        const storedMessages = get(store);
        storedMessages.push({
            id: Math.random(),
            content,
            level,
        });
        store.set(storedMessages);
    }

    public error(content?: string): Messages
    {
        this.appendMessage('error', content);
        return this;
    }

    public warning(content?: string): Messages
    {
        this.appendMessage('warning', content);
        return this;
    }

    public success(content?: string): Messages
    {
        this.appendMessage('success', content);
        return this;
    }
}