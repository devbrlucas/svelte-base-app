export async function handleInstallEvent(event: ExtendableEvent, cacheName: string, assets: string[], serviceWorker: ServiceWorkerGlobalScope): Promise<void>
{
    try {
        serviceWorker.skipWaiting();
    } catch (error) {
        console.error(error);
    }
    async function addFilesToCacheAndSkipWaiting(): Promise<void>
    {
		const cache = await caches.open(cacheName);
		await cache.addAll(assets);
	}
    try {
        event.waitUntil(addFilesToCacheAndSkipWaiting());
    } catch (error) {
        console.error(error);
    }
}
export async function handleActivateEvent(event: ExtendableEvent, cacheName: string, serviceWorker: ServiceWorkerGlobalScope): Promise<void>
{
    async function deleteOldCachesAndClaimClients(): Promise<void>
    {
		for (const key of await caches.keys()) {
			if (key !== cacheName) await caches.delete(key);
		}
		await serviceWorker.clients.claim();
	}
	event.waitUntil(deleteOldCachesAndClaimClients());
}
export async function handleFetch(event: FetchEvent, cacheName: string, assets: string[]): Promise<Response | void>
{
    if (event.request.method !== 'GET') return;
    if (/\/api\//.test(event.request.url)) return;
    if (/chrome-extension:\/\//.test(event.request.url)) return;
    function respondWithRedirect(): Response
    {
        return new Response('', {
            status: 303,
            headers: {
                'Location': '/',
            },
        });
    }
    async function respond(): Promise<Response>
    {
        const url = new URL(event.request.url);
        const cache = await caches.open(cacheName);
        if (assets.includes(url.pathname)) {
            const response = await cache.match(event.request);
            if (response) return response;
        }
        try {
            const response = await fetch(event.request);
            if (!(response instanceof Response)) throw new Error('Invalid response from fetch');
            if (response.status === 200) cache.put(event.request, response.clone());
            return response;
        } catch (error) {
            let response = await cache.match(event.request);
			if (response) return response;
            if (error instanceof TypeError) response = await cache.match(new URL('/offline.html'));
            if (response) return response;
            return respondWithRedirect();
        }
    }
    event.respondWith(respond());
}
