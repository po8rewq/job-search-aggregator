import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Modal from 'react-bootstrap/Modal';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/types/database.types';

const Login = () => {
  const router = useRouter();

  const redirectUrl = useMemo(() => {
    if (router.isReady) return `${window.location.origin}/app/jobs`;
    return '';
  }, [router.isReady]);

  const supabaseClient = useSupabaseClient<Database>();

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Body style={{ padding: '20px' }}>
          <Auth
            magicLink
            view="magic_link"
            supabaseClient={supabaseClient}
            appearance={{ theme: ThemeSupa }}
            // providers={['google', 'github', 'linkedin', 'twitter']}
            redirectTo={redirectUrl}
            showLinks={false}
          />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default Login;
