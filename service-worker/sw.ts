/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

const assets = self.__WB_MANIFEST;

//________*  *_______//
// precacheAndRoute(assets);

//________*  *_______//
// registerRoute(({ url }) => assets.some((entry: any) => entry.url === url.pathname), new NetworkFirst());

//________*  *_______//
registerRoute(
	({ url }) => assets.some((entry: any) => entry.url === url.pathname || `/${entry.url}` === url.pathname),
	new StaleWhileRevalidate(),
);
