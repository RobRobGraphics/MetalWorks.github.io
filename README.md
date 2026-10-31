# Metal Works — starter storefront

A responsive React + Vite storefront starter for the Metal Works brand.

## Run it locally

1. Install Node.js (LTS): https://nodejs.org/
2. Open this folder in VS Code.
3. Open a terminal in the project folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL Vite prints (usually http://localhost:5173).

## Publish with GitHub Pages

For the simplest first deployment, use a GitHub repository and a deployment workflow such as `peaceiris/actions-gh-pages`, or connect the repository to Netlify or Vercel. Vercel/Netlify are usually easier for a Vite React site and support automatic deployments on every GitHub push.

## What is working in this starter

- Responsive homepage and navigation
- Product collection grid
- Category filters and search
- Add-to-bag, quantity controls, remove item, subtotal
- Brand/story and coming-soon sections

## What is placeholder / still needs connecting

- Product names, photos, descriptions, and prices are sample content. Replace them in `src/main.jsx`.
- The newsletter form is a visual placeholder.
- Checkout is intentionally not connected. To accept real orders, connect an ecommerce platform/payment provider and configure products, taxes, shipping, order management, and customer support.
- The current cart lives in browser memory and resets when the page reloads. Persistent cart and customer accounts can be added later.

## Main files

- `src/main.jsx` — page content, product data, and interactions
- `src/styles.css` — all visual styling
- `index.html` — page title, metadata, fonts
