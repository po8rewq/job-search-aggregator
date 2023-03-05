alter table "public"."jobs" drop column "description";

alter table "public"."jobs" add column "comment" text;

alter table "public"."jobs" add column "url" text;

alter table "public"."jobs" add column "user_id" uuid not null;

alter table "public"."jobs" add constraint "jobs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."jobs" validate constraint "jobs_user_id_fkey";

alter table "public"."jobs" alter column "company" set not null;

alter table "public"."jobs" alter column "status" set not null;

alter table "public"."jobs" alter column "status" set data type smallint using "status"::smallint;

create policy "user can manage their jobs"
on "public"."jobs"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));