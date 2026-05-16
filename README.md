Are You Ready?
A platform for developers preparing for technical interviews. Find a mock interviewer, get AI feedback on your CV, and test your knowledge across different topics.
![Marketplace](screenshots/marketplace.jpg)
![CV Analyzer](screenshots/cv.jpg)
![Tests](screenshots/tests.jpg)

Tech Stack

Next.js 14 — framework, App Router, server components
React 18 — UI
TypeScript — strict mode
Tailwind CSS — styling
PostgreSQL — database
Prisma — ORM, schema and migrations
NextAuth.js — authentication (JWT strategy)
Groq (llama-3.3-70b) — AI analysis for CV section
unpdf — PDF text extraction

Features

Interview marketplace — browse mentor cards, filter by tech stack and session type, book a mock interview session
CV Analyzer — upload a PDF resume and get structured AI feedback with improvement suggestions
Knowledge tests — 7 categories (JavaScript, React, TypeScript, SQL, CSS, and more)
Dual role system — one account can be both a student and a mentor simultaneously
Mentor dashboard — manage incoming session requests, mark sessions as completed or cancelled
Student dashboard — track your sessions by status, leave reviews after completed sessions
Review system — star rating + comment, only available after a confirmed completed session
Real ratings — mentor rating and session count calculated from actual data, not hardcoded

Getting Started
Prerequisites

Node.js 18 or higher
PostgreSQL installed and running locally
A free Groq API key for the CV analyzer

1. Clone the repository
   bashgit clone https://github.com/RigelArstotskiy/are-you-ready.git
   cd are-you-ready
2. Install dependencies
   bashnpm install
3. Set up environment variables
   Copy the example file and fill in your values:
   bashcp .env.example .env
   Open .env and fill in:
   envDATABASE_URL="postgresql://your_user:your_password@localhost:5432/are_you_ready"
   NEXTAUTH_SECRET="any-random-string-you-choose"
   GROQ_API_KEY="your-key-from-console.groq.com"

4. Create the database
   Run this once in your PostgreSQL terminal to create the database:
   sqlCREATE DATABASE are_you_ready;
5. Apply the schema
   bashnpx prisma migrate dev
6. Seed the database with test data
   bashnpx prisma db seed
   This creates 4 mentor accounts, 3 student accounts, 40 marketplace cards, sessions, and reviews so you can explore the app immediately.
7. Start the development server
   bashnpm run dev
   Open http://localhost:3000

Test Accounts
All accounts use the password: password123
RoleEmailMentoralex@example.comMentormaria@example.comMentordmytro@example.comMentorolena@example.comStudentstudent1@example.comStudentstudent2@example.comStudentstudent3@example.com
