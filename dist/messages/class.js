import { messages as store } from "./store";
import { get } from "svelte/store";
export class Messages {
    appendMessage(level, content) {
        if (!content)
            return;
        const storedMessages = get(store);
        storedMessages.push({
            id: Math.random(),
            content,
            level,
        });
        store.set(storedMessages);
    }
    error(content) {
        this.appendMessage('error', content);
        return this;
    }
    warning(content) {
        this.appendMessage('warning', content);
        return this;
    }
    success(content) {
        this.appendMessage('success', content);
        return this;
    }
}
