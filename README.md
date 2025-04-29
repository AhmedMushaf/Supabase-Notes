# Supabase Notes Service

A minimal personal notes API using Supabase and Edge Functions.

---

## 📐 Schema Design – `notes`

```sql
CREATE TABLE notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  created_at timestamp with time zone DEFAULT now()
);
