import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { XLg } from 'react-bootstrap-icons';

type Props = {
  handleSearch: (search: string) => void;
};
const Search = ({ handleSearch }: Props) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearchText(newSearch);
    handleSearch(newSearch.trim());
  };

  const handleClear = () => {
    setSearchText('');
    handleSearch('');
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Card style={{ paddingTop: '15px' }}>
      <Card.Body style={{ padding: '0 20px' }}>
        <Form onSubmit={onSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleOnChange}
            />
            <Button variant="outline-secondary" onClick={handleClear}>
              <XLg />
            </Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Search;
