export async function handleInstallEvent(event: ExtendableEvent, cacheName: string, assets: string[], serviceWorker: ServiceWorkerGlobalScope): Promise<void>
{
    try {
        serviceWorker.skipWaiting();
    } catch (error) {
        console.error(error);
    }
    async function addFilesToCache() {
        const cache = await caches.open(cacheName);
        await cache.addAll(assets);
    }
    try {
        event.waitUntil(addFilesToCache());
    } catch (error) {
        console.error(error);
    }
}
export async function handleActivateEvent(event: ExtendableEvent, cacheName: string): Promise<void>
{
    async function deleteOldCaches() {
        for (const key of await caches.keys()) {
            if (key !== cacheName) await caches.delete(key);
        }
    }
    event.waitUntil(deleteOldCaches());
}
export async function handleFetch(event: FetchEvent, cacheName: string, assets: string[]): Promise<Response | void>
{
    if (event.request.method !== 'GET') return;
    if (/\/api\//.test(event.request.url)) return;
    if (/chrome-extension:\/\//.test(event.request.url)) return;
    async function respond(): Promise<Response>
    {
        const url = new URL(event.request.url);
        const cache = await caches.open(cacheName);
        if (assets.includes(url.pathname)) return await cache.match(event.request) as Response;
        if (event.request.mode === 'navigate') {
            const navURL = new URL(url.origin);
            return await cache.match(navURL) as Response;
        }
        try {
            const response = await fetch(event.request);
            if (response.status === 200) cache.put(event.request, response.clone());
            return response;
        } catch {
            return await cache.match(event.request) as Response;
        }
    }
    event.respondWith(respond());
}
