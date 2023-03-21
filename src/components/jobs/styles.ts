import styled from 'styled-components';
import Table from 'react-bootstrap/Table';

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CustomTable = styled(Table).attrs({
  striped: true,
  hover: true,
  responsive: true,
})`
  thead tr th svg {
    cursor: pointer;
  }

  tbody tr td {
    cursor: pointer;
  }

  .title {
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }
`;

export const RecruiterAlert = styled.div`
  color: #ff9800;
`;
