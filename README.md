# Valorant Sensitivity Calculator Frontend

This repository contains a simple web interface for calculating Valorant sensitivity metrics. Unlike earlier versions that depended on a remote API, the current implementation runs **entirely in your browser**. You can compute effective DPI (eDPI), cm/360, and Perfect Sensitivity Approximation (PSA) values without any server calls.

## Features

- **Local calculations** of eDPI, cm/360 and PSA low/average/high values – no backend required.
- **Random pro recommendations**: click a button to see a professional player's DPI and sensitivity.
- **History tracking**: your past calculations are stored in the browser and listed for quick reference.
- **Shareable links**: generate a link with your DPI and sensitivity values encoded as query parameters.
- **Affiliate recommendations**: section for recommended gear (e.g. a gaming mouse) with a link you can replace with your own Coupang or Amazon affiliate URL.
- **AdSense integration**: includes a placeholder `div` and script tag for Google AdSense. Replace the `ca-pub-xxxxxxxxxxxxxxxx` and ad-slot ID with your own values.
- **Support link**: footer includes a "Buy me a coffee" link (you can replace the URL).

## Usage

1. Clone or download this repository.
2. Open `index.html` in a modern web browser.
3. Enter your DPI and sensitivity and click **Calculate** to see the results.
4. Use the **Random Pro** button to see example settings from well-known players.
5. Your calculation history and share link will appear under the results section.

To customize adverts and affiliates:

- Replace the AdSense client ID and ad slot in `index.html` with your own.
- Replace the affiliate link in the “Recommended Gear” section with your own affiliate URL.

## Deployment

Because everything runs in the browser, you can host this site on any static hosting service (GitHub Pages, Vercel, Netlify, etc.). For GitHub Pages:

1. Commit the files to the `main` branch.
2. In your repository's **Settings → Pages**, set the source to the `main` branch and the root folder.
3. Save the configuration and wait for the site to build.

Once deployed, share your GitHub Pages URL with others. Advertising revenue (AdSense) and affiliate links will be active on the public site.
