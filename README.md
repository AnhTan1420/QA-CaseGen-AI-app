# QA CaseGen AI

Modern Next.js + Supabase dashboard for generating QA test cases and exporting Excel files.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

- Frontend: Next.js App Router, React, Tailwind CSS, shadcn-style components, lucide-react
- Backend: Next.js Route Handlers for upload, generation, delete, and history endpoints
- Supabase: Auth, PostgreSQL schema, private Storage bucket `knowledge-base`
- AI: Mock LLM orchestration in `src/lib/ai`, ready to replace with Claude or OpenAI
- Excel: Client-side SheetJS export via `xlsx`

## Supabase setup

1. Create a Supabase project.
2. Create a private Storage bucket named `knowledge-base`.
3. Run `supabase/schema.sql` in the SQL editor.
4. Copy `.env.local.example` to `.env.local` and add your keys.
5. Enable Google/GitHub providers in Supabase Auth if needed.

The app runs in demo mode without Supabase keys.
# QA-CaseGen-AI-app
