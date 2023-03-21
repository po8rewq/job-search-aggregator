import Card from 'react-bootstrap/Card';
import styled from 'styled-components';

export const ButtonContainer = styled.div`
  button {
    margin-right: 5px;
  }
`;

export const CardBody = styled(Card.Body)<{ active: string }>`
  margin-top: 20px;
  ${({ active }) =>
    active === 'false' &&
    `
  cursor: pointer;
  input, select { cursor: pointer; }
`}
`;
