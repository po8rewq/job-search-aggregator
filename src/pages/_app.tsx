import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import SSRProvider from 'react-bootstrap/SSRProvider';

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
