import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { JobStatus } from '@/types/Jobs';
import { useEffect, useState } from 'react';

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

type Props = {
  filters: number[];
  setFilters: (filters: number[]) => void;
};
const JobFilters = ({ filters, setFilters }: Props) => {
  const handleFilterChange =
    (status: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked && !filters.includes(status)) {
        setFilters([...filters, status]);
      } else if (!e.target.checked && filters.includes(status)) {
        setFilters(filters.filter((f) => f !== status));
      }
    };

  return (
    <FiltersContainer>
      {Object.keys(JobStatus).map((status) => {
        const statusValue = Object.keys(JobStatus).indexOf(status);
        return (
          <Form.Check
            key={status}
            type="checkbox"
            label={status}
            inline
            id={`filter-${statusValue}`}
            checked={filters.includes(statusValue)}
            onChange={handleFilterChange(statusValue)}
          />
        );
      })}
    </FiltersContainer>
  );
};
export default JobFilters;
