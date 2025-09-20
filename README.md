# Part Merged App (Demo)

This is a minimal Node.js + Express + MongoDB application that includes:

- User registration, login, logout, forgot (demo).
- Session-based authentication (express-session + connect-mongo).
- CRUD for Suppliers and Products.
- Home page with product listing, search by name and filter by supplier.
- EJS views.

## Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `SESSION_SECRET`.
2. Install dependencies:
```bash
npm install
```
3. Start:
```bash
npm run dev
```

## Notes

- Forgot password is only a demo (no email sending).
- For production, secure session secret and use HTTPS.
