# Meghpushpam Website

Static HTML, CSS and vanilla JavaScript website.

## Run locally

From this directory:

```powershell
py -m http.server 8000
```

Open `http://localhost:8000`.

## Structure

- Main pages: `index.html`, `about.html`, `products.html`, `wellness.html`, `company.html`, `opportunity.html`, `team.html`, `news.html`, `contact.html`, `faq.html`, `privacy-policy.html`, `terms.html`
- Product detail pages: `products/`
- Starter articles: `blog/`
- Shared styles: `css/style.css`
- Shared interactions: `js/main.js`
- Images: `images/`

## Before publication

- Replace `example.com` in canonical metadata, robots and sitemap.
- Replace editable contact details and map placeholder.
- Replace sample testimonials only with permissioned, verified testimonials.
- Confirm product specifications, benefits and certifications with official sources.
- Connect contact and newsletter forms to an approved backend or form service.
- Have privacy and terms reviewed for the applicable jurisdiction.

## Static Admin Panel

Open `/admin.html` in the website:

- Admin ID: `admin`
- Password: `meghpushpam2026`

This is a browser-only demonstration panel. It stores site settings and form submissions in localStorage and is not secure for public production use. A real deployment requires server-side authentication, database storage and secure form handling.
