# 🚀 TinyLink – URL Shortener (Next.js + Neon Postgres + Prisma)

A simple Bit.ly–style URL shortener built using **Next.js (App Router)**, **Prisma**, and **Neon PostgreSQL**.
Supports creating short codes, redirecting, statistics, deleting links, and viewing all links in a dashboard.

---

# 📦 **Project Setup & Installation**

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Create `.env` file

In the project root, create a file named **.env** and add:

```
DATABASE_URL="your_neon_postgres_url_here"
BASE_URL="http://localhost:3000"
```

To get the database URL:

* Open **Neon.tech**
* Go to your project → **Connect**
* Copy the **Postgres connection string** (NOT the psql command)
* Paste it into `DATABASE_URL` above

---

# 🗄 **3️⃣ Setup database (Prisma)**

Generate Prisma client:

```bash
npx prisma generate
```

Run DB migrations:

```bash
npx prisma migrate dev --name init
```

This creates the `Link` table in your Neon database.

---

# ▶️ **4️⃣ Run the development server**

```bash
npm run dev
```

Open:

👉 [http://localhost:3000](http://localhost:3000)

---

# 🧩 **Project Features**

### ✔ Create short links

* Enter a long URL
* Optionally provide custom short code (6–8 characters)
* Validates URL
* Prevents duplicate codes (returns 409)

### ✔ Redirect

Visiting:

```
https://yourapp.com/{code}
```

Performs:

* 302 redirect → original URL
* Increments click count
* Updates `lastClicked` timestamp

### ✔ Delete links

Removes link from database
After deletion, visiting the code returns **404**.

### ✔ Dashboard `/`

Shows table of all links:

* Short code
* Long URL
* Total clicks
* Last clicked
* Copy button
* Stats button
* Delete button

### ✔ Stats Page `/code/:code`

Displays:

* URL
* Code
* Click count
* Created at
* Last clicked

### ✔ Health Check

`GET /healthz` →

```json
{ "ok": true, "version": "1.0" }
```

---

# 🔗 **API Endpoints**

| Method   | Route              | Description             |
| -------- | ------------------ | ----------------------- |
| `POST`   | `/api/links`       | Create a new short link |
| `GET`    | `/api/links`       | List all links          |
| `GET`    | `/api/links/:code` | Get stats for a code    |
| `DELETE` | `/api/links/:code` | Delete a link           |
| `GET`    | `/:code`           | Redirect to long URL    |
| `GET`    | `/healthz`         | Health check            |

**Code format rule:**
`[A-Za-z0-9]{6,8}`

---

# 🌐 **Deployment (Vercel + Neon)**

### 1. Push project to GitHub

```bash
git init
git add .
git commit -m "Initial"
git branch -M main
git remote add origin <your_repo_url>
git push -u origin main
```

### 2. Deploy on Vercel

* Go to [https://vercel.com](https://vercel.com)
* Import your GitHub repo
* Add ENV variables:

```
DATABASE_URL=your neon url
BASE_URL=https://yourapp.vercel.app
```

### 3. Run production migrations

Locally run:

```bash
npx prisma migrate deploy
```

(Use your production DATABASE_URL in `.env` before running)

---

# 📁 **Important Folders**

```
app/              → Next.js routes
app/api/links     → CRUD API
app/[code]        → Redirect route
app/code/[code]   → Stats page
prisma/schema.prisma → DB schema
lib/prisma.js     → Prisma client setup
```
# 🎥 **Video Explanation Script**

A short explanation script is included in `video_script.md`.

---
