
# Montrose Events (Static Site)

A tiny, fast, community-run events website you can host for free (GitHub Pages, Netlify, Cloudflare Pages).

## How it works
- **`index.html`** loads **`events.json`** and renders cards.
- Users can **search**, **filter by tags** (e.g. `nonprofit`, `family`, `music`), and toggle **“This weekend only.”**
- Update events by editing **`events.json`**—no build tools required.

## Quick start
1. Upload these files to a new GitHub repo (or drop into Netlify/Cloudflare).
2. Enable GitHub Pages on the repo (Settings → Pages → Source: `main` branch). Your site goes live.
3. Update `events.json` anytime. Changes publish automatically.

## Updating events
Edit `events.json` and add more objects to the `events` array. Keep ISO date-times (local Mountain time suggested with `-06:00/-07:00`). Example:

```json
{
  "title": "Library Storytime",
  "start": "2025-10-19T10:00:00-06:00",
  "end": "2025-10-19T11:00:00-06:00",
  "venue": "Montrose Library",
  "map": "https://maps.google.com/?q=Montrose+Library",
  "link": "https://example.com/library-storytime",
  "tags": ["family","free"],
  "description": "Stories, songs, and crafts for kids 3–6."
}
```

### Tags
Use any tags you like. Predefined filter chips on the page: `nonprofit`, `family`, `music`, `outdoors`. You can edit the chips in `index.html`.

## Optional: Google Calendar embed
If you prefer keeping an internal Google Calendar:
- Make a public calendar for “Montrose Events.”
- Grab the **public embed link** and paste it into `index.html` (e.g., inside the `<main>`).
- Or export to `.ics` and publish alongside the site.

## Custom domain
- On GitHub Pages, add your domain under **Pages → Custom domain** (e.g., `events.montrose.community`). Create a CNAME record to your Pages URL.
- On Netlify/Cloudflare, follow their custom domain wizard.

## Accessibility & SEO
- Semantic HTML, labeled inputs, good color contrast.
- Basic Open Graph tags for link previews.
- Mobile-first responsive layout.

## Safety note
This is community-curated. Encourage organizers to include official links. Add a short disclaimer (already in footer).
