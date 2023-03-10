import Login from '@/components/Login';
import { DEFAULT_PAGE } from '@/constants';
import { useUser } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const user = useUser();
  const router = useRouter();

  if (user) router.push(DEFAULT_PAGE);

  return (
    <>
      <Head>
        <title>Job search aggregator</title>
        <meta name="description" content="A job search aggregator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Login />
      </main>
    </>
  );
}
