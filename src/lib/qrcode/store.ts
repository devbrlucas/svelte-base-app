import { writable } from "svelte/store";
import type QRScanner from "qr-scanner";
type QRCode = {
    scanner?: QRScanner;
    container?: HTMLDivElement;
    result?: string | null;
}
export const qrcodeStore = writable<QRCode>({});
