import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import SSRProvider from 'react-bootstrap/SSRProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/style.css'; // TMP TODO:
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </SessionContextProvider>
  );
}
