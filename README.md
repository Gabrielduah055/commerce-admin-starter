# Commerce Admin Starter

Angular 19 owner dashboard for commerce-backend-starter. Includes JWT sign-in,
commerce summaries, orders and delivery/fulfillment updates, verified customers,
product/category management, signed Cloudinary uploads, published reviews, and
public owner replies. Node 22, Tailwind CSS 4, strict TypeScript.

Extracted from Gabrielduah055/kawamaAdmin-frontend at commit
`21de2fda0b0bf33a5f99d3c963c3ef8f2ee041a0`, including merged review PR #2 and its
reply/archive coordination fix. No client credentials, data, production endpoint,
or hosting project binding is bundled. Records come from the connected API only.

## Configure a new business

| File | Configure |
| --- | --- |
| `src/app/core/admin.config.ts` | Business name, badge initials, workspace label, and login copy |
| `src/environments/connections.config.ts` | Production backend origin and optional development/production storefront origins |
| `proxy.conf.json` | Development backend target; defaults to `http://localhost:3000` |
| `src/styles.css` | Shared brand color/theme tokens |
| `src/index.html` and `public/favicon.svg` | Static title/description fallback, theme color, fonts, and favicon |

The production API origin defaults deliberately to `https://api.example.invalid`.
Replace it with the new client's backend HTTPS origin, WITHOUT `/api` or `/api/v1`.
The environment appends `/api/v1` once. Set `productionStorefrontOrigin` to the
client's customer storefront origin to enable active-product preview links. Blank
keeps that optional link hidden. Local storefront defaults to `http://localhost:4200`.

These are public, compiled configuration files. Rebuild after edits. Adding similarly
named Vercel variables or a `.env` file does not automatically change Angular config.
Never put bootstrap passwords, JWT signing secrets, MongoDB strings, Paystack secrets,
Cloudinary API secrets, or OrderBridge/Wasender/OpenRouter credentials in this app.

Every client gets a separate backend/database, admin deployment, storefront deployment,
and OrderBridge business record. Do not target another client's API or copy their
browser session. Sign out/clear local session storage when switching local clients.

## Connect all three starters

| Project | Local address | Connection |
| --- | --- | --- |
| commerce-backend-starter | `http://localhost:3000` | New client's MongoDB, owner bootstrap, keys, approved policies, and provider integrations |
| commerce-storefront-starter | `http://localhost:4200` | Backend origin in its `src/environments/backend.config.ts` |
| commerce-admin-starter | `http://localhost:4201` | Local `/api` proxy forwards to port 3000; production uses `connections.config.ts` |

On the backend set `FRONTEND_ORIGINS` to both exact storefront/admin origins,
comma-separated, without trailing slashes. Locally these are
`http://localhost:4200,http://localhost:4201`. The local admin proxy does not inject
an Origin header to impersonate another frontend. Its proxy is a dev-server feature,
not a production proxy; production calls the configured backend origin directly.

Set a unique backend `JWT_SECRET` of at least 32 random characters. Temporarily
supply a valid email address as `ADMIN_EMAIL` and a strong `ADMIN_PASSWORD`, then
intentionally run the BACKEND's `npm run seed:admin` against the new database after
its dependencies are installed. Remove the bootstrap password afterwards. This
admin login requires an email address; use the account you actually bootstrapped.
There is no default/demo administrator and no browser-side account creation.

API auth uses `POST /api/v1/auth/login` and the returned bearer token. The existing
interceptor attaches it only to this API's requests. Session storage is per tab;
logout removes the stored session, and unauthorized API responses return to sign-in.
The backend remains the authority for token validation and access control.

## Catalog and commerce

Add the new business's categories, products, images, stock, and publishing details
through the authenticated UI. Cloudinary product-media settings and business-specific
folder belong on the backend. The admin asks for signed upload parameters and uploads
the file directly; the Cloudinary API secret remains server-side. No catalog seeds
or real orders/customer records are imported by this app.

Order/customer/dashboard data comes from the API. Product revenue is based on verified
payments. Fulfillment and delivery-fee changes use protected backend endpoints and do
not establish payment. Currency remains GHS with integer pesewa payment values, and
delivery fees are arranged separately from product payment. Different currencies,
refund automation, collecting delivery at checkout, team roles, or different business
workflows require explicit implementation rather than just changing display labels.

Reviews publish after valid single-use purchase submission on the storefront. The
admin has one editable public reply per review and retained archive functionality,
not approval/rejection controls. Legacy pending/rejected records can be inspected
without bulk publishing them. Reply editing handles trimmed 1-1000-character text,
failed requests, and coordinated archive/list operations. The corresponding public
product shows the reply through the storefront's review API connection.

## Payment, receipts, and OrderBridge settings

The admin does not configure provider credentials. On the commerce backend configure
Paystack's actual merchant secret, matching-mode webhook, and callback:

- Callback: `<storefront-origin>/checkout/result`.
- Webhook configured in Paystack: `https://YOUR-API-HOST/api/v1/webhooks/paystack`.
- Review links: separate `REVIEW_LINK_SECRET`, `STOREFRONT_BASE_URL`, and production
  `STOREFRONT_PRODUCT_URL_TEMPLATE` matching `/product/{slug}`.
- Outgoing OrderBridge calls: origin, new business ID, and website integration key.
- Incoming OrderBridge calls: the distinct server-only commerce API key.
- Paid-order forwarding: `ORDERBRIDGE_PAID_ORDER_EVENTS_ENABLED=true` after configuration.

The existing OrderBridge superadmin owns business channel configuration, Wasender
session/sending credentials, owner/manager recipients, paid-order notifications,
receipt PDF storage, and review reminders. This app is the store owner's commerce
admin, not the OrderBridge superadmin. Receipt Cloudinary settings are configured
on OrderBridge separately from the backend's product-media settings. Enable PDF
delivery on that Cloudinary account. Delivery depends on the deployed OrderBridge
implementation and still needs the owner's manual end-to-end check.

## Local development and hosting

After configuration, use `npm ci` then `npm start`. The dev server defaults to port
4201 in angular.json and uses proxy.conf.json. These are setup instructions; neither
command was run while preparing this extraction.

`npm run build` outputs `dist/commerce-admin-starter/browser`. `vercel.json` selects
Angular, that output folder, and an index.html SPA fallback for direct login/product/
order URLs. Connect this new repo to its own Vercel project. Other static hosts need
the browser output and an equivalent SPA fallback. Update backend CORS for the actual
admin/storefront domains, then rebuild/redeploy when compiled frontend settings change.
Vercel reference: https://vercel.com/docs/project-configuration/vercel-json

## Validation status

No tests, builds, lint, typechecks, dependency installs, server starts, bootstrap
scripts, pushes, or deployments ran during extraction. Existing dependency versions
and specs are retained; only synthetic order-reference fixtures were renamed.
Before launch, manually verify sign-in/out and expired sessions, empty/new catalog
handling, category/product/image operations, order/customer views, fulfillment and
delivery changes, product preview links, published reviews and replies, and the full
storefront payment -> customer receipt -> review reminder -> review -> reply journey.
