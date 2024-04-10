import { get } from "svelte/store";
import { qrcodeStore } from "./store";
import QRCode from "qrcode";
import { error } from "@sveltejs/kit";
export { default as QRCodeReaderComponent } from "./component.svelte";
async function openQRCodeReader(): Promise<string | null>
{
    return new Promise((resolve, reject) => {
        try {
            const store = get(qrcodeStore);
            store.container?.classList.add('open');
            store.result = undefined;
            qrcodeStore.subscribe(value => {
                if (value.result !== undefined) {
                    resolve(value.result)
                }
            });
            store.scanner?.start();
        } catch (error) {
            reject(error);
        }
    });
}
function closeQRCodeReader(): void
{
    const store = get(qrcodeStore);
    store.scanner?.stop();
    store.container?.classList.remove('open');
    qrcodeStore.update(value => {
        value.result = null;
        return value;
    });
}
async function generateQRCode(value: string): Promise<string>
{
    return new Promise(async (resolve, reject) => {
        try {
            if (!value) reject('Informe algum texto para gerar o QR Code');
            const result = await QRCode.toDataURL(value);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
export const qrcode = {
    read: openQRCodeReader,
    close: closeQRCodeReader,
    generate: generateQRCode,
}