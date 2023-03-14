alter table "public"."jobs" add column "fts" tsvector generated always as (to_tsvector('english'::regconfig, ((company || ' '::text) || title))) stored;

CREATE INDEX books_fts ON public.jobs USING gin (fts);


