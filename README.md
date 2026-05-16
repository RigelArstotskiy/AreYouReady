# Are You Ready?

A platform for developers preparing for technical interviews. Find a mock interviewer, get AI feedback on your CV, and test your knowledge across different topics.

---

## Screenshots

![Marketplace](screenshots/Marketplace.jpg)
![CV Analyzer](screenshots/CV.jpg)
![Tests](screenshots/Tests.jpg)

---

## Tech Stack

| Technology         | Purpose                                  |
| ------------------ | ---------------------------------------- |
| Next.js 14         | Framework, App Router, server components |
| React 18           | UI                                       |
| TypeScript         | Strict mode                              |
| Tailwind CSS       | Styling                                  |
| PostgreSQL         | Database                                 |
| Prisma             | ORM, schema and migrations               |
| NextAuth.js        | Authentication (JWT strategy)            |
| Groq llama-3.3-70b | AI analysis for CV section               |
| unpdf              | PDF text extraction                      |

---

## Features

- **Interview marketplace** — browse mentor cards, filter by tech stack and session type, book a mock interview session
- **CV Analyzer** — upload a PDF resume and get structured AI feedback with improvement suggestions
- **Knowledge tests** — 6 categories (JavaScript, React, TypeScript, SQL, CSS, and more)
- **Dual role system** — one account can be both a student and a mentor simultaneously
- **Mentor dashboard** — manage incoming session requests, mark sessions as completed or cancelled
- **Student dashboard** — track your sessions by status, leave reviews after completed sessions
- **Review system** — star rating + comment, only available after a confirmed completed session
- **Real ratings** — mentor rating and session count calculated from actual data, not hardcoded

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL installed and running locally
- A free [Groq API key](https://console.groq.com) for the CV analyzer

### 1. Clone the repository

```bash
git clone https://github.com/RigelArstotskiy/are-you-ready.git
cd are-you-ready
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/are_you_ready"
NEXTAUTH_SECRET="any-random-string-you-choose"
GROQ_API_KEY="your-key-from-console.groq.com"
```

> Replace `YOUR_USER` and `YOUR_PASSWORD` with your local PostgreSQL credentials.

### 4. Create the database

Run this in your PostgreSQL terminal:

```sql
CREATE DATABASE are_you_ready;
```

### 5. Apply the schema

```bash
npx prisma migrate dev
```

### 6. Seed the database

```bash
npx prisma db seed
```

This creates 4 mentor accounts, 3 student accounts, 40 marketplace cards, sessions, and reviews.

### 7. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Test Accounts

All accounts use the password: `password123`

| Role    | Email                |
| ------- | -------------------- |
| Mentor  | alex@example.com     |
| Mentor  | maria@example.com    |
| Mentor  | dmytro@example.com   |
| Mentor  | olena@example.com    |
| Student | student1@example.com |
| Student | student2@example.com |
| Student | student3@example.com |
