import type { ComponentType } from "svelte";
import { dialogs } from "./dialogs";
export { default as DialogComponent } from "./component.svelte";
type DialogMessage = {
    close?: boolean;
    resolve?: any;
}
function getActiveDialogId(): string
{
    return document
                    .querySelector<HTMLDivElement>('#app-dialog > div.active')
                    ?.dataset
                    .id ?? '';
}
function getActiveDialogChannel(): BroadcastChannel
{
    return new BroadcastChannel(getActiveDialogId());
}
async function open<T>(title: string, component: ComponentType, props?: Record<string, any>): Promise<T | undefined>
{
    const id = `dialog-${component.name}`;
    dialogs.update(value => {
        if (value.find(item => item.id === id) === undefined) {
            value.push({
                title,
                component,
                props: props ?? {},
                id,
            });
        }
        return value;
    });
    const channel = new BroadcastChannel(id);
    return new Promise((resolve, reject) => {
        const channelCallback = (event: MessageEvent<DialogMessage>) => {
            if (event.data.close) resolve(undefined);
            if (event.data.resolve) resolve(event.data.resolve);
            channel.removeEventListener('message', channelCallback);
            channel.close();
        }
        channel.addEventListener('message', channelCallback);
    });
}
function close(): void
{
    const id = getActiveDialogId();
    dialogs.update(value => value.filter(item => item.id !== id));
    getActiveDialogChannel().postMessage({ close: true });
}
function closeAll(): void
{
    dialogs.set([]);
}
function resolve<T>(data: T, close: boolean = true): void
{
    const id = getActiveDialogId();
    getActiveDialogChannel().postMessage({ resolve: data });
    if (close) dialogs.update(value => value.filter(item => item.id !== id));
}
export const dialog = {
    open,
    close,
    closeAll,
    resolve,
}
