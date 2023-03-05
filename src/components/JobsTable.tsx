import Table from 'react-bootstrap/Table';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import Link from 'next/link';
import { Jobs, JobStatus } from '@/types/Jobs';
import Badge from 'react-bootstrap/Badge';

type Props = {
  jobs: Jobs[];
  handleEdit: (job: Jobs) => void;
};
const JobTable = ({ jobs, handleEdit }: Props) => {
  const getStatus = (value: number) => {
    const indexOfRole = Object.values(JobStatus).indexOf(
      value.toString() as unknown as JobStatus
    );
    const status = Object.keys(JobStatus)[indexOfRole];
    return (
      <Badge style={{ marginRight: '5px' }} bg="secondary" key={status}>
        {status}
      </Badge>
    );
  };

  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Added</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr
            key={job.id}
            onClick={() => handleEdit(job)}
            style={{ cursor: 'pointer' }}
          >
            <td>{job.title}</td>
            <td>{job.company}</td>
            <td>{new Date(job.created_at!).toDateString()}</td>
            <td>{getStatus(job.status)}</td>
            <td>
              {job.url && (
                <Link href={job.url} target="_blank">
                  <BoxArrowUpRight />
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default JobTable;
