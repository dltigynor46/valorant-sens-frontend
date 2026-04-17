# Valorant Sensitivity Calculator Frontend

This repository contains the frontend web interface for the [Valorant Sensitivity Calculator API](https://valorant-sens-backend-production.up.railway.app). It allows players to calculate their effective DPI (eDPI), cm/360, and PSA (Perfect Sensitivity Approximation) values and explore recommended settings.

## Features

- Simple form to enter DPI and in‑game sensitivity.
- Fetches results from the deployed API and displays:
  - eDPI
  - cm/360
  - PSA low, average and high values
- Responsive layout with light styling.
- Placeholder area for advertisements or promotional content.
- "Buy me a coffee" link in the footer for donations.

## Usage

1. Clone or download this repository.
2. Open `index.html` in a web browser.
3. Enter your DPI and sensitivity and click "Calculate" to see results.

This frontend is configured to call the production API at:

```
const apiBase = 'https://valorant-sens-backend-production.up.railway.app';
```

If you deploy your own API instance, update the `apiBase` constant in `script.js` to point to your API URL.

## Deployment

This frontend can be hosted on any static hosting service, such as GitHub Pages, Vercel, Netlify, or your own web server. For example, to deploy on GitHub Pages:

1. Push the files to the main branch of the repository.
2. In repository settings, enable GitHub Pages and select the source branch.
3. Your site will be available at `https://<username>.github.io/<repository>`.

Make sure to update `apiBase` if your API is hosted at a custom domain.

## Monetization

This project provides a basic placeholder `<div id="ad-slot"></div>` where you can embed advertisements (e.g., via Google AdSense) or promote premium features. You can also customize the footer to include a donation link or integrate your preferred payment platform.

Premium features such as saving sensitivity history, comparing against professional player settings, and generating detailed reports could be implemented by expanding the backend and adding user accounts and payments. These are not included in this demo frontend.
