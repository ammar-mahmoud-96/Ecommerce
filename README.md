# Ecommerce

## Contact form email setup

The contact form sends messages to `ammarlbanna@gmail.com` through the SMTP account configured in `.env.local`.

1. Copy `.env.example` to `.env.local`.
2. Set `SMTP_USER` to the sender Gmail address.
3. Set `SMTP_PASSWORD` to a Gmail App Password. Do not use the normal Gmail password.
4. Restart `yarn dev` after changing environment variables.

For Gmail, enable 2-Step Verification, then create an App Password under Google Account security settings. Keep `.env.local` private; it is ignored by Git.
# E-commerce Next.js + TypeScript Starter

Minimal e-commerce starter using Next.js, TypeScript and Redux Toolkit. Contains core screens and slices you can extend.

Quick start:

```bash
cd Ecommerce
npm install
npm run dev
```
