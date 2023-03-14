import Table from 'react-bootstrap/Table';
import {
  ArrowDownShort,
  ArrowDownUp,
  BoxArrowUpRight,
  ExclamationTriangleFill,
} from 'react-bootstrap-icons';
import Link from 'next/link';
import { Jobs, JobStatus } from '@/types/Jobs';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import styled from 'styled-components';
import { useMemo, useState } from 'react';

const CustomTable = styled(Table).attrs({
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

const RecruiterAlert = styled.div`
  color: #ff9800;
`;

type Props = {
  jobs: Jobs[];
  handleEdit: (job: Jobs) => void;
};
const JobTable = ({ jobs, handleEdit }: Props) => {
  const [sort, setSort] = useState<string>('');

  const getStatus = (value: number) => {
    const indexOfRole = Object.values(JobStatus).indexOf(
      value.toString() as unknown as JobStatus
    );
    const status = Object.keys(JobStatus)[indexOfRole];
    let bg = 'secondary'; // applied
    if (value === 3 || value === 4) bg = 'danger'; // rejected | old
    else if (value === 0 || value === 5) bg = 'success'; // new
    else if (value === 2) bg = 'info'; // interviewing
    return (
      <Badge style={{ marginRight: '5px' }} bg={bg} key={status}>
        {status}
      </Badge>
    );
  };

  const renderHeader = (title: string, sortName: string) => {
    return (
      <>
        {title}{' '}
        {sort === sortName ? (
          <ArrowDownShort onClick={() => setSort('')} />
        ) : (
          <ArrowDownUp onClick={() => setSort(sortName)} />
        )}
      </>
    );
  };

  const sortedJobs = useMemo(() => {
    return jobs.sort((a, b) => {
      if (sort === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sort === 'company') {
        return a.company.localeCompare(b.company);
      } else if (sort === 'date') {
        return new Date(a.created_at!).getTime() -
          new Date(b.created_at!).getTime()
          ? 1
          : -1;
      } else if (sort === 'status') {
        return a.status - b.status;
      } else {
        return 0;
      }
    });
  }, [jobs, sort]);

  const renderRecruiterAlert = () => {
    return (
      <OverlayTrigger
        placement="right"
        overlay={
          <Tooltip id={`tooltip-recruiter`}>
            This is through a recruitment agency.
          </Tooltip>
        }
      >
        <RecruiterAlert>
          <ExclamationTriangleFill />
        </RecruiterAlert>
      </OverlayTrigger>
    );
  };

  const formatUrl = (url: string) => {
    return url.startsWith('http') ? url : `http://${url}`;
  };

  return (
    <CustomTable>
      <thead>
        <tr>
          <th>{renderHeader('Title', 'title')}</th>
          <th>{renderHeader('Company', 'company')}</th>
          {/* <th>{renderHeader('Added on', 'date')}</th> */}
          <th>{renderHeader('Status', 'status')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedJobs.length === 0 && (
          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              No jobs found.
            </td>
          </tr>
        )}
        {sortedJobs.map((job) => (
          <tr key={job.id} onClick={() => handleEdit(job)}>
            <td className="title">
              {job.recruiter === true && renderRecruiterAlert()}
              {job.title}
            </td>
            <td>{job.company}</td>
            {/* <td>{new Date(job.created_at!).toDateString()}</td> */}
            <td>{getStatus(job.status)}</td>
            <td>
              {job.url && (
                <Link
                  href={formatUrl(job.url)}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BoxArrowUpRight />
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </CustomTable>
  );
};

export default JobTable;
