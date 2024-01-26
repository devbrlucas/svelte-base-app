import { get } from "svelte/store";
import { qrcodeStore } from "./store";
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
            const response = await fetch(`https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURI(value)}`);
            if (!response.ok) reject(response.body);
            const blob = await response.blob();
            const reader = new FileReader;
            reader.readAsDataURL(blob);
            reader.addEventListener('load', () => resolve(String(reader.result)));
            reader.addEventListener('error', () => reject(reader.error));
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