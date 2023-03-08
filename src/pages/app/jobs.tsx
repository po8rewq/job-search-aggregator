import AppContainer from '@/components/AppContainer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import CreateJobModal from '@/components/jobs/CreateJobModal';
import useJobs from '@/hooks/useJobs';
import { Jobs } from '@/types/Jobs';
import JobsTable from '@/components/jobs/JobsTable';
import JobFilters from '@/components/jobs/JobFilters';

const ButtonContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
`;

const Jobs = () => {
  const { jobs, getJobs } = useJobs();
  const [reload, setReload] = useState<number>(0);
  const [selectedJob, setSelectedJob] = useState<Jobs | null>(null);

  const [filters, setFilters] = useState<number[]>([0, 1, 2]); // TODO:

  useEffect(() => {
    getJobs();
  }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => filters.includes(job.status));
  }, [jobs, filters]);

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const handleModalClose = () => {
    setSelectedJob(null);
    setShowCreateModal(false);
    setReload(reload + 1);
  };

  const handleEdit = (job: Jobs) => {
    setSelectedJob(job);
    setShowCreateModal(true);
  };

  const handleAddNew = () => {
    setSelectedJob(null);
    setShowCreateModal(true);
  };

  return (
    <>
      <CreateJobModal
        show={showCreateModal}
        handleClose={handleModalClose}
        job={selectedJob}
      />
      <AppContainer>
        <div className="dashboard">
          <ButtonContainer>
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={handleAddNew}
            >
              + Add a job
            </Button>
          </ButtonContainer>
          <JobFilters filters={filters} setFilters={setFilters} />
          <Card className="overflow-auto">
            <Card.Body>
              <Card.Title>My jobs</Card.Title>
              <JobsTable jobs={filteredJobs} handleEdit={handleEdit} />
            </Card.Body>
          </Card>
        </div>
      </AppContainer>
    </>
  );
};

export default Jobs;
