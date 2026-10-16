// Only for order alerts on the dashboard: shows system notifications and focuses the app when one is tapped.
// No fetch handler on purpose, so the browser never serves an old copy of the app.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((all) => {
    const open = all.find((c) => c.url.includes("#/app"));
    return open ? open.focus() : self.clients.openWindow(e.notification.data?.url || self.registration.scope);
  }));
});
