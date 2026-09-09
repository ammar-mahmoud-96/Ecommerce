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
- Firebase email/password sign-in 
- Responsive customer profile dashboard.
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

### Firebase authentication setup

Firebase Authentication handles email/password accounts. In the Firebase Console:

1. Open **Build → Authentication → Sign-in method**.
2. Enable **Email/Password**.
3. Open **Project settings → Your apps** and register a Web app if one does not exist.
4. Copy the Firebase Web SDK configuration values into `.env.local` using the `NEXT_PUBLIC_FIREBASE_*` names from `.env.example`.
5. Restart the development server after changing environment variables.

Firebase stores and hashes passwords through its Authentication service. The application never receives or stores a user's raw password.

### Firestore order storage

The checkout stores authenticated orders in a Firestore `orders` collection, and the profile page reads only orders belonging to the current Firebase user.

1. In Firebase Console, open **Build -> Firestore Database** and create a database.
2. Add rules that restrict each order to its owner:

```text
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
		match /orders/{orderId} {
			allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
			allow read: if request.auth != null && resource.data.userId == request.auth.uid;
			allow update, delete: if false;
		}
	}
}
```

Unauthenticated checkouts can still send an email, but their orders are not stored because there is no Firebase user ID to associate with them.

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
