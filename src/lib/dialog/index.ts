import type { ComponentType } from "svelte";
import { dialogs, type Dialog } from "./dialogs";
import { get } from "svelte/store";
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
async function open<T>(title: string, component: ComponentType, props?: Record<string, any>, canClose: boolean = true): Promise<T | undefined>
{
    const id = `dialog-${component.name}`;
    dialogs.update(value => {
        if (value.find(item => item.id === id) === undefined) {
            value.push({
                title,
                component,
                props: props ?? {},
                id,
                can_close: canClose,
            });
        }
        return value;
    });
    const channel = new BroadcastChannel(id);
    return new Promise((resolve, reject) => {
        const channelCallback = (event: MessageEvent<DialogMessage>) => {
            if (event.data.close) return resolve(undefined);
            resolve(event.data.resolve);
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
function canClose(value: boolean): void
{
    const id = getActiveDialogId();
    dialogs.update(dialogs => {
        for (const dialog of dialogs) {
            if (dialog.id === id) {
                dialog.can_close = value;
            }
        }
        return dialogs;
    });
}
function active(): Dialog|null
{
    const id = getActiveDialogId();
    for (const dialog of get(dialogs)) {
        if (dialog.id === id) return dialog;
    }
    return null;
}
export const dialog = {
    open,
    close,
    closeAll,
    resolve,
    canClose,
    active,
}
