# Shop.co Ecommerce

A responsive fashion e-commerce storefront built with ReactJS, Next.js, TypeScript, and Redux Toolkit. The project includes product discovery, filtering, pagination, cart management, checkout, order email delivery, and a responsive mobile checkout experience.

## Features

- Homepage with hero content, brand strip, new arrivals, top-selling products, dress styles, testimonials, and newsletter section.
- Product listing pages for all products, best sellers, new arrivals, and sale items.
- Search products from the global header.
- Filter the catalog by category, price, color, size, and dress style.
- Pagination for product listing screens.
- Product detail pages with cart controls.
- Redux-powered cart with quantity controls and sale pricing.
- Checkout with contact, delivery, discount, payment, and order summary sections.
- Responsive checkout layout with a mobile order-summary drawer and fixed order action bar.
- Contact form and checkout order emails sent through SMTP.

## Technology

- **Next.js 13**: React framework, routing, static pages, and API routes.
- **React 18**: UI components and stateful interactions.
- **TypeScript**: Static typing across pages, components, store, and API handlers.
- **Redux Toolkit**: Product and cart state management.
- **React Redux**: Connects React components to the Redux store.
- **Nodemailer**: Sends contact and order emails through SMTP.
- **CSS**: Responsive layouts and component styling in `src/styles/globals.css`.
- **Yarn**: Dependency installation and project scripts.

## Getting Started

Install dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

Create a production build:

```bash
yarn build
yarn start
```

## Email Configuration

The contact form and checkout send emails to `ammarlbanna@gmail.com` through the SMTP account configured in `.env.local`.

1. Copy `.env.example` to `.env.local`.
2. Set `SMTP_USER` to the sender Gmail address.
3. Set `SMTP_PASSWORD` to a Gmail App Password. Do not use the normal Gmail password.
4. Restart `yarn dev` after changing environment variables.

Example configuration:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-sender@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM=your-sender@gmail.com
```

For Gmail, enable 2-Step Verification and create an App Password in Google Account security settings. Keep `.env.local` private; it is ignored by Git.

## Project Structure

```text
src/
	components/       Reusable storefront, product, cart, and pagination components
	pages/            Next.js pages and server-side API routes
		api/             Contact and order email endpoints
	store/            Redux Toolkit store and slices
	styles/           Global responsive CSS
	types/            Shared TypeScript types
public/assets/      Product and hero images
```

## Available Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the development server on port 3000 |
| `yarn build` | Create an optimized production build |
| `yarn start` | Start the production server on port 3000 |
| `yarn lint` | Run the configured Next.js lint command |
