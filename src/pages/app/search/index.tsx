import AppContainer from '@/components/AppContainer';
import List from '@/components/search/List';
import SearchCard from '@/components/search/SearchCard';
import useSearches from '@/hooks/useSearches';
import { Search } from '@/types/Search';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const Search = () => {
  const [newField, setNewField] = useState(false);
  const { createSearch, getSearches, searches } = useSearches();
  const [reload, setReload] = useState<number>(0);

  useEffect(() => {
    getSearches();
  }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps

  const createNewSearch = async (item: Partial<Search>) => {
    try {
      await createSearch(item);
      setNewField(false);
      await getSearches();
    } catch (error) {
      // TODO: handle error
      console.log(error);
    }
  };

  const cancelCreation = () => {
    setNewField(false);
  };

  return (
    <AppContainer>
      <div style={{ marginBottom: '10px', display: 'flex' }}>
        <Button
          variant="outline-primary"
          onClick={() => setNewField(true)}
          className="ms-auto"
        >
          + Add a new search
        </Button>
      </div>
      {newField === true && (
        <SearchCard
          item={null}
          onSave={createNewSearch}
          onDelete={cancelCreation}
          reload={() => setReload(reload + 1)} // might be the time to use RxJS
        />
      )}
      <List items={searches} reload={() => setReload(reload + 1)} />
    </AppContainer>
  );
};

export default Search;
