import AppContainer from '@/components/AppContainer';
import ResultsTable from '@/components/search/ResultsTable';
import { SearchWithResults } from '@/types/Search';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';

type Props = {
  searchResults: SearchWithResults;
};
const SearchResult = ({ searchResults }: Props) => {
  return (
    <AppContainer>
      <Card>
        <Card.Body style={{ marginTop: '20px' }}>
          <Link href="/app/search">{'< '}Back to the job searches</Link>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Search Result</Card.Title>
          <ResultsTable results={searchResults?.jobResults || []} />
        </Card.Body>
      </Card>
    </AppContainer>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data, error } = await supabase
    .from('searches')
    .select('*, jobResults(*)')
    .eq('id', ctx.params?.id)
    .single();

  if (!data || error)
    return {
      notFound: true,
    };

  return {
    props: {
      SearchResult: data,
    },
  };
};

export default SearchResult;
