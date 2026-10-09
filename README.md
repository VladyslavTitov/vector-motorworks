# Vector Motorworks

A mobile-first garage website with a private content dashboard, durable service prices, repair portfolio uploads and appointment request inbox.

## Try it

- Browse Home, Services, Price list, Our work and Contact.
- Use the category filters and service search on Price list.
- Open a repair project to see its details and photo gallery.
- Request a service in the three-step booking form. Requests are stored; no email is sent.
- Open Workshop dashboard from the footer. The private website first requires your ChatGPT account, then the dashboard requires your separate workshop username and password.

## Edit your website

1. Prices: edit or add a service. Upload a new service illustration in the editor if needed, then choose **Apply to list**.
2. Portfolio: edit or add a repair project. Upload a cover photo and up to 12 gallery photos (JPG, PNG or WebP, 5 MB maximum each). Choose **Apply to list**.
3. Shop details: update the business name, city, phone, email, address and opening hours.
4. Choose **Save changes** to publish your content updates. Unsaved edits remain in the current page only.
5. Requests: review appointment requests, contact the customer and update their status.

Concurrent content saves are checked to prevent overwriting a newer version. Photos are stored in R2; structured content and requests are stored in D1.

## Before a real business launch

Replace the working name, sample contact details, prices, generated imagery and illustrative projects/testimonials. Set the exact map location, add the real business legal/privacy information, connect email notifications if needed, and review the public visitor booking flow before changing this private test site to a public audience.

The site deliberately avoids unverified certification, review-count and warranty claims. The displayed testimonials are explicitly marked illustrative. Booking is an appointment request, never an automatic confirmation or payment.

## Development

Keep the existing pnpm lockfile. Use the Sites build workflow for hosting. The app uses React, Tailwind CSS, Vinext and Cloudflare Workers. D1 migrations live in drizzle/ and the schema in db/schema.ts. Use the supervised preview for development in the managed environment.

Backend smoke checks exercise rendered routes, saved prices, concurrent-write protection, validation, uploads, saved gallery data, booking inbox, appointment status and the 404 page. Browser visual QA was unavailable in this session; check small-phone and desktop layouts on the private test URL.

## Dashboard authentication

Credentials are configured as server environment values, never embedded in client code. The password is stored as a salted PBKDF2 hash. Dashboard sessions use a Secure, HttpOnly, SameSite=Strict cookie, expire after 8 hours and are revoked on logout. Content writes, service/portfolio uploads, appointment reads and status changes require a dashboard session. Private-site visitors can still send booking requests and upload an attachment without a dashboard session. Login attempts are limited to five per 15-minute window per client address.

Required server settings: DASHBOARD_USERNAME and DASHBOARD_PASSWORD_HASH (salt:hash). Neither the real password nor its hash belongs in this repository.
