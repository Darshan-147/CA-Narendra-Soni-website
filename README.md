# Narendra Soni & Associates — Chartered Accountant Website (MERN)

A single-page marketing website for a Chartered Accountancy firm built on the MERN stack:

- **Frontend:** React 18 + Vite, custom CSS (no UI framework), single page
  with Header, Hero, Stats "ledger", About, Services, Process, Testimonials,
  Insights (blog) and Contact sections.
- **Backend:** Node.js + Express + MongoDB (Mongoose) with two APIs:
  - `POST /api/contact` — saves enquiry/contact form submissions
  - `GET /api/blog` — serves "Insights" articles

---

## 1. Prerequisites

- Node.js 18+ and npm
- A MongoDB database — either:
  - a local MongoDB instance (`mongodb://127.0.0.1:27017`), or
  - a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (recommended)

---

## 2. Project structure

```
ca-website/
├── server/        # Express + MongoDB API
│   ├── config/db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   ├── server.js
│   └── .env.example
└── client/        # React (Vite) frontend
    ├── src/
    │   ├── components/
    │   ├── api/api.js
    │   ├── App.jsx
    │   └── index.css
    └── vite.config.js
```

---

## 3. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` and set your MongoDB connection string:

```
MONGO_URI=mongodb://127.0.0.1:27017/ca_website
PORT=5000
CLIENT_URL=http://localhost:5173
```

Seed sample "Insights" (blog) articles:

```bash
npm run seed
```

Start the API server:

```bash
npm run dev      # uses nodemon for auto-reload
# or
npm start
```

The API runs at `http://localhost:5000`. Quick checks:

- `GET http://localhost:5000/` → `{ "message": "Narendra Soni & Associates API is running." }`
- `GET http://localhost:5000/api/blog` → list of seeded articles
- `POST http://localhost:5000/api/contact` → submit `{ name, email, phone, service, message }`

---

## 4. Frontend setup

In a second terminal:

```bash
cd client
npm install
npm run dev
```

The site runs at `http://localhost:5173`. Vite is configured to proxy any
`/api/*` request to `http://localhost:5000`, so the React app talks to the
Express API without any extra configuration during development.

---

## 5. EmailJS setup

The contact form uses EmailJS to send enquiry emails from the browser.

Create `client/.env` from `client/.env.example`:

```bash
cd client
cp .env.example .env
```

Set these values from your EmailJS dashboard:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_TO_EMAIL=recipient@example.com
VITE_EMAILJS_TO_NAME=Narendra Soni
```

In the EmailJS template, use these variables:

```text
{{to_name}}
{{to_email}}
{{from_name}}
{{from_email}}
{{phone}}
{{service}}
{{message}}
{{submitted_at}}
```

If you want the recipient to come from the website config, set the template's
To Email field to `{{to_email}}`. You can also hardcode the recipient directly
inside the EmailJS template.

---

## 6. Customizing content

- **Branding & copy:** edit text directly inside `client/src/components/*.jsx`
  (firm name "Narendra Soni & Associates", founder names, addresses, phone numbers,
  testimonials, etc.).
- **Colors & typography:** all design tokens (colors, fonts, spacing) live at
  the top of `client/src/index.css` under `:root`.
- **Services grid:** edit the `SERVICES` array in `Services.jsx`.
- **Insights/Blog content:** edit `server/seed.js` and re-run `npm run seed`,
  or build an admin flow on top of the existing `BlogPost` model.
- **Contact form fields/options:** edit `Contact.jsx` (frontend) and
  `models/Contact.js` (backend schema, including the `service` enum).

---

## 7. Production build

```bash
cd client
npm run build
```

This outputs static files to `client/dist/`, which can be served by any
static host (Netlify, Vercel, Nginx, etc.) or by Express itself. Deploy the
`server/` folder separately (Render, Railway, EC2, etc.) with a production
MongoDB connection string, and update the frontend's API base URL /
deployment config accordingly (e.g. via an environment variable and a
reverse proxy, or by setting `baseURL` in `client/src/api/api.js`).

For a Vercel frontend + Render backend deployment, set these environment
variables in the hosting dashboards:

```env
# Vercel frontend
VITE_API_URL=https://your-render-service.onrender.com/api

# Render backend
MONGO_URI=mongodb+srv://...
CLIENT_URL=https://your-vercel-app.vercel.app
```

If you need multiple frontend URLs, such as local development plus production,
set `CLIENT_URL` as a comma-separated list:

```env
CLIENT_URL=http://localhost:5173,https://your-vercel-app.vercel.app
```

---

## 8. Notes

- The contact form's `GET /api/contact` route returns all submitted
  enquiries — useful for a future admin dashboard, but should be protected
  with authentication before production use.
- This is a single-page layout; all navigation links scroll to sections on
  the same page (`#about`, `#services`, etc.).
