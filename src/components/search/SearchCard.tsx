import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
  CheckLg,
  PauseFill,
  PencilSquare,
  PlayFill,
  Trash,
  XLg,
} from 'react-bootstrap-icons';
import { useEffect, useReducer, useState } from 'react';
import { Search } from '@/types/Search';
import useSearches from '@/hooks/useSearches';
import Link from 'next/link';
import { ButtonContainer, CardBody } from './styles';

const initialState = {
  location: 'uk',
  jobType: 'contract',
  workType: 'remote',
  website: 'linkedin',
  words: '',
};
const reducer = (
  state: {
    location: string;
    jobType: string;
    workType: string;
    website: string;
    words: string;
  },
  action: { type: keyof typeof initialState | 'init'; value: any }
) => {
  if (action.type === 'init') {
    if (action.value) return action.value;
    return initialState;
  }
  return { ...state, [action.type]: action.value };
};

type SearchCardProps = {
  item: Search | null;
  onSave: (item: Partial<Search>) => void;
  onDelete: (item?: Search | null) => void;
  reload: () => void;
};
const SearchCard = ({ item, onSave, onDelete, reload }: SearchCardProps) => {
  const [{ location, jobType, workType, website, words }, dispatch] =
    useReducer(reducer, initialState);

  const [validated, setValidated] = useState<boolean>(false);
  const [readOnly, setReadyOnly] = useState<boolean>(true);

  const { updateSearch } = useSearches();

  useEffect(() => {
    setReadyOnly(!!item);
    setValidated(false);
  }, [item]);

  useEffect(() => {
    dispatch({ type: 'init', value: item });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('test');
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const newItem = {
          ...item,
          location,
          jobType,
          workType,
          website,
          words,
        };
        await onSave(newItem);
        setReadyOnly(true);
      } catch (error) {
        // TODO: handle error
        console.log(error);
      }
    }
    setValidated(true);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (readOnly || !item) onDelete(item);
    else {
      // reset form
      if (item) {
        dispatch({ type: 'init', value: item });
      }
      setReadyOnly(true);
    }
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setReadyOnly(false);
  };

  const handlePause = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (item) {
      try {
        await updateSearch({ ...item, active: !item.active });
        reload();
      } catch (error) {
        // TODO: handle error
      }
    }
  };

  const handleClick = (e: any) => {
    if (!readOnly) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Card>
      <CardBody active={!readOnly ? 'true' : 'false'}>
        <Link href={`/app/search/${item?.id}`}>
          <Form noValidate validated={validated} onSubmit={submitForm}>
            <Row>
              <Col>
                <Form.Control
                  id="words"
                  placeholder="frontend, developer"
                  value={words}
                  onChange={({ target }) =>
                    dispatch({ type: 'words', value: target.value })
                  }
                  plaintext={readOnly}
                  readOnly={readOnly}
                  required
                  onClick={handleClick}
                />
              </Col>
              <Form.Group as={Col} controlId="location">
                <Form.Select
                  value={location}
                  onChange={({ target }) =>
                    dispatch({ type: 'location', value: target.value })
                  }
                  disabled={readOnly}
                  required
                  onClick={handleClick}
                >
                  <option value="europe">Europe</option>
                  <option value="france">France</option>
                  <option value="germany">Germany</option>
                  <option value="italy">Italy</option>
                  <option value="spain">Spain</option>
                  <option value="uk">United Kingdom</option>
                  <option value="us">United States</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="jobType">
                <Form.Select
                  value={jobType}
                  onChange={({ target }) =>
                    dispatch({ type: 'jobType', value: target.value })
                  }
                  disabled={readOnly}
                  required
                  onClick={handleClick}
                >
                  <option value="contract">Contract</option>
                  <option value="fulltime">Full time</option>
                  <option value="parttime">Part time</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="workType">
                <Form.Select
                  value={workType}
                  onChange={({ target }) =>
                    dispatch({ type: 'workType', value: target.value })
                  }
                  disabled={readOnly}
                  required
                  onClick={handleClick}
                >
                  <option value="remote">Remote</option>
                  <option value="onsite">On site</option>
                  <option value="hybrid">Hybrid</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="website">
                <Form.Select
                  value={website}
                  onChange={({ target }) =>
                    dispatch({ type: 'website', value: target.value })
                  }
                  disabled={readOnly}
                  required
                  onClick={handleClick}
                >
                  <option value="linkedin">LinkedIn</option>
                </Form.Select>
              </Form.Group>
              <Col>
                {readOnly ? (
                  <ButtonContainer>
                    <Button onClick={handleEdit}>
                      <PencilSquare />
                    </Button>
                    <Button onClick={handlePause}>
                      {item?.active ? <PauseFill /> : <PlayFill />}
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                      <Trash />
                    </Button>
                  </ButtonContainer>
                ) : (
                  <ButtonContainer>
                    <Button
                      variant="success"
                      type="submit"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <CheckLg />
                    </Button>
                    <Button variant="warning" onClick={handleDelete}>
                      <XLg />
                    </Button>
                  </ButtonContainer>
                )}
              </Col>
            </Row>
          </Form>
        </Link>
      </CardBody>
    </Card>
  );
};

export default SearchCard;
