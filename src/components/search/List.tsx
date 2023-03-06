import useSearches from '@/hooks/useSearches';
import { Search } from '@/types/Search';
import SearchCard from './SearchCard';

type Props = {
  items: Search[];
  reload: () => void;
};
const List = ({ items, reload }: Props) => {
  const { updateSearch, deleteSearch } = useSearches();

  const updateItem = async (item: Partial<Search>) => {
    await updateSearch(item as Search);
    reload();
  };

  const deleteItem = async (item?: Search | null) => {
    if (item) {
      await deleteSearch(item.id);
      reload();
    }
  };

  return (
    <>
      {items.map((item) => (
        <SearchCard
          key={item.id}
          item={item}
          onSave={updateItem}
          onDelete={deleteItem}
          reload={reload}
        />
      ))}
    </>
  );
};

export default List;
