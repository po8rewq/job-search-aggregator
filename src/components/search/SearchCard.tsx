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
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Search } from '@/types/Search';
import useSearches from '@/hooks/useSearches';

const ButtonContainer = styled.div`
  button {
    margin-right: 5px;
  }
`;

type SearchCardProps = {
  item: Search | null;
  onSave: (item: Partial<Search>) => void;
  onDelete: (item?: Search | null) => void;
  reload: () => void;
};
const SearchCard = ({ item, onSave, onDelete, reload }: SearchCardProps) => {
  const [location, setLocation] = useState<string>('uk');
  const [jobType, setJobType] = useState<string>('contract');
  const [workType, setWorkType] = useState<string>('remote');
  const [website, setWebsite] = useState<string>('linkedin');
  const [words, setWords] = useState<string>('');

  const [validated, setValidated] = useState<boolean>(false);
  const [readOnly, setReadyOnly] = useState<boolean>(true);

  const { updateSearch } = useSearches();

  useEffect(() => {
    setReadyOnly(!!item);
    setValidated(false);
  }, [item]);

  useEffect(() => {
    setLocation(item?.location || 'uk');
    setJobType(item?.jobType || 'contract');
    setWorkType(item?.workType || 'remote');
    setWebsite(item?.website || 'linkedin');
    setWords(item?.words || '');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        setLocation(item.location!);
        setJobType(item.jobType!);
        setWorkType(item.workType!);
        setWebsite(item.website!);
        setWords(item.words!);
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

  return (
    <Card>
      <Card.Body style={{ marginTop: '20px' }}>
        <Form noValidate validated={validated} onSubmit={submitForm}>
          <Row>
            <Col>
              <Form.Control
                id="words"
                placeholder="frontend, developer"
                value={words}
                onChange={({ target }) => setWords(target.value)}
                plaintext={readOnly}
                readOnly={readOnly}
                required
              />
            </Col>
            <Form.Group as={Col} controlId="location">
              <Form.Select
                value={location}
                onChange={({ target }) => setLocation(target.value)}
                disabled={readOnly}
                required
              >
                <option value="uk">United Kingdom</option>
                <option value="europe">Europe</option>
                <option value="france">France</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="jobType">
              <Form.Select
                value={jobType}
                onChange={({ target }) => setJobType(target.value)}
                disabled={readOnly}
                required
              >
                <option value="contract">Contract</option>
                <option value="fulltime">Full time</option>
                <option value="parttime">Part time</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="workType">
              <Form.Select
                value={workType}
                onChange={({ target }) => setWorkType(target.value)}
                disabled={readOnly}
                required
              >
                <option value="remote">Remote</option>
                <option value="onsite">On site</option>
                <option value="hybrid">Hybrid</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="website">
              <Form.Select
                value={website}
                onChange={({ target }) => setWebsite(target.value)}
                disabled={readOnly}
                required
              >
                <option>LinkedIn</option>
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
                  <Button variant="success" type="submit">
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
      </Card.Body>
    </Card>
  );
};

export default SearchCard;
