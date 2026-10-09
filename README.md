# Vector Motorworks

Mobile-first auto repair website with prices, illustrated services, portfolio galleries, appointment requests and a secure dashboard.

## Hosting

This version runs on Next.js, Vercel, Neon Postgres and a private Vercel Blob store. Pushes to `main` deploy through Vercel's GitHub integration. Original Cloudflare implementation is preserved in GitHub commit `0d128bedf3094d39e65b755d7ef024ae28934092`.

Required server environment variables:
- `DATABASE_URL`: Neon PostgreSQL connection URL.
- `BLOB_READ_WRITE_TOKEN`: private image store token.
- `DASHBOARD_USERNAME` and `DASHBOARD_PASSWORD_HASH`: salted PBKDF2 SHA-256 hash, encoded `salt:hash`, 100,000 iterations, 16-byte salt and 32-byte derived key.

Keep all secrets outside GitHub. Tables are created transactionally on first database use. All service prices, content, booking requests, session records and login limits persist in Postgres. Image uploads persist in Blob; image routes stream validated JPG, PNG and WebP uploads, up to 4 MB each.

## Dashboard

Open `/dashboard` and sign in with the configured workshop account.

1. **Prices**: add/edit a service and illustration, then **Apply to list**.
2. **Portfolio**: add/edit a repair project, cover and up to 12 gallery images, then **Apply to list**.
3. **Shop details**: edit name, contact details, address and opening hours.
4. **Save changes** publishes the edited content immediately. Concurrent saves cannot overwrite a newer version.
5. **Requests**: read bookings and change status. Status changes save immediately.
6. **Log out** revokes the session. Sessions expire after 8 hours.

Public visitors can request appointments. Bookings are requests, not confirmations, and no email notifications are sent. Review the inbox and contact customers yourself.

## Development

Use Node.js 22 and `npm ci`, then `npm run dev`. `npm run build` verifies types and produces the production app.

## Business launch

Replace sample shop details, prices, generated imagery, illustrative projects and testimonials with verified business material. Set the exact map location and add the business's legal and privacy information. Use a strong dashboard password before handling real customer bookings.
