// Copyright (C) 2026 Toit contributors.
// Retire the previous Gatsby site's offline worker on the same origin.
/* global self, caches */
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const name of await caches.keys()) {
        if (name.startsWith('workbox-') || name.startsWith('gatsby-')) await caches.delete(name)
      }
      await self.registration.unregister()
      for (const client of await self.clients.matchAll({ type: 'window' })) {
        await client.navigate(client.url)
      }
    })()
  )
})
