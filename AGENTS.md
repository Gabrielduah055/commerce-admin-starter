# Commerce Admin Starter

Angular 19 standalone owner administration UI, strict TypeScript, RxJS and Tailwind 4.
Node 22. The backend, customer storefront and shared OrderBridge are separate repos.
Preserve existing feature/service boundaries and API contracts; do not add mock live data.

Branding belongs in src/app/core/admin.config.ts. Production origins belong in
src/environments/connections.config.ts. Development /api requests proxy to the local
backend through proxy.conf.json; default admin port is 4201 and storefront port 4200.
Do not point this starter at a previous client's API or inject an Origin header to
impersonate a different frontend. Configuration is public/compiled, never a secret store.

Preserve bearer-token scoping, route guards, expiration/sign-out handling, server
validation, pagination, and pending-edit protection. Each business uses its own API,
database, JWT secret, bootstrap owner account, and deployment. Provider secrets,
bootstrap passwords and database strings remain on the backend or OrderBridge.

Cloudinary images use protected signature issuance; uploads must not receive the
admin bearer token. Preserve signed-folder/media checks. Product/category archive
and restore behavior and stock fields must continue matching the backend contract.

Payment status is server authoritative. Fulfillment/delivery updates cannot mark
an order paid. GHS and integer-pesewa payment values remain intentional; delivery
collection is separate. Do not invent payment, refund, or provider configuration APIs.

Purchase reviews publish immediately after valid storefront submission. No review
approval/rejection controls. Preserve one editable public owner reply, archive behavior,
legacy statuses, draft/error handling, partial reply response merging, and reply/archive/
list coordination so stale requests cannot overwrite a saved reply. Render text safely.

Use semantic accessible controls, clear loading/empty/error states, and responsive
layouts. Keep changes focused. Respect the user's scope: no tests, builds, typechecks,
lint, installs, servers, bootstrap scripts, live provider checks, pushes or deployment
for this extraction. Leave pushing to the user unless explicitly asked otherwise.
Report source inspection separately from runtime validation.
