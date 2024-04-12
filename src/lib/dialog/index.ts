import type { ComponentType } from "svelte";
import { dialogs } from "./dialogs";
export { default as DialogComponent } from "./component.svelte";
type DialogMessage = {
    close?: boolean;
    resolve?: any;
}
function getActiveDialogId(): number
{
    const stringId = document
                    .querySelector<HTMLDivElement>('#app-dialog > div.active')
                    ?.dataset
                    .id ?? '';
    return Number(stringId);
}
function getActiveDialogChannel(): BroadcastChannel
{
    return new BroadcastChannel(`dialog-${getActiveDialogId()}`);
}
async function open<T>(title: string, component: ComponentType, props?: Record<string, any>): Promise<T | undefined>
{
    const id = Math.random();
    dialogs.update(value => {
        value.push({
            title,
            component,
            props: props ?? {},
            id,
        });
        return value;
    });
    const channel = new BroadcastChannel(`dialog-${id}`);
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
function resolve<T>(data: T): void
{
    const id = getActiveDialogId();
    getActiveDialogChannel().postMessage({ resolve: data });
    dialogs.update(value => value.filter(item => item.id !== id));
    // const id = getActiveDialogId();
    // dialogs.update(value => {
    //     return value.map(item => {
    //         if (item.id === id) item.resolved = data;
    //         return item;
    //     });
    // });
}
export const dialog = {
    open,
    close,
    closeAll,
    resolve,
}
