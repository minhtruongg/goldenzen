# GoldenZen — Booking System

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Go to supabase.com → create free project
2. Go to SQL Editor → paste and run `supabase-setup.sql`
3. Go to Project Settings → API → copy URL and anon key

### 3. Set up Telegram bot
1. Open Telegram → @BotFather → /newbot
2. Copy your bot token
3. Send your bot any message
4. Visit: https://api.telegram.org/bot<TOKEN>/getUpdates
5. Copy the chat.id number

### 4. Configure environment variables
Edit `.env.local` and fill in:
- SUPABASE_URL
- SUPABASE_KEY
- TELEGRAM_TOKEN
- TELEGRAM_CHAT_ID=8245530756

### 5. Run locally
```bash
npm run dev
```
Open http://localhost:3000

### 6. Deploy to Vercel
```bash
npx vercel
```
Add the same env variables in Vercel dashboard → Settings → Environment Variables

## File structure
```
app/
  api/booking/route.js   ← API: saves to Supabase + sends Telegram
  page.js                ← serves landing page
public/
  goldenzen.html         ← landing page
  goldenzen-booking.html ← booking form
.env.local               ← your secrets (never commit this)
supabase-setup.sql       ← run once in Supabase SQL editor
```
