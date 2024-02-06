/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version, prerendered } from "$service-worker";
import { handleActivateEvent, handleFetch, handleInstallEvent } from "$lib/service-worker";
const sw = self as unknown as ServiceWorkerGlobalScope;
/*
|------------------------------------------------------
| Parte referente ao cache da aplicação
|------------------------------------------------------
|
*/
const CACHE_NAME = `cache-${version}`;
const ASSETS = [
    ...build,
    ...files,
    ...prerendered,
    '/',
];
sw.addEventListener('install', event => handleInstallEvent(event, CACHE_NAME, ASSETS, sw));
sw.addEventListener('activate', event => handleActivateEvent(event, CACHE_NAME, sw));
sw.addEventListener('fetch', event => handleFetch(event, CACHE_NAME, ASSETS));