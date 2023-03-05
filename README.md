## Getting Started

```bash
npm install
```

Copy and update the environment variables:

```bash
cp .env.local.example .env.local
```

Run the development server:

```bash
npx supabase start
npm run dev
```

## Running the edge functions locally

```bash
npx supabase functions serve --env-file .env.local
```
