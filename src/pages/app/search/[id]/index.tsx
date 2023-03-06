import AppContainer from '@/components/AppContainer';
import ResultsTable from '@/components/search/ResultsTable';
import useSearch from '@/hooks/useSearch';
import { SearchWithResults } from '@/types/Search';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

const SearchResult = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getSearchResults } = useSearch();
  const [searchResults, setSearchResults] = useState<SearchWithResults | null>(
    null
  );

  useEffect(() => {
    const getResults = async () => {
      const data = await getSearchResults(parseInt(id as string));
      setSearchResults(data as SearchWithResults);
    };
    if (id) getResults();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

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

export default SearchResult;
