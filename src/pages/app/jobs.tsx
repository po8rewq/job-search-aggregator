import AppContainer from '@/components/AppContainer';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CreateJobModal from '@/components/CreateJobModal';
import useJobs from '@/hooks/useJobs';
import { Jobs } from '@/types/Jobs';
import JobsTable from '@/components/JobsTable';

const ButtonContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
`;

const Jobs = () => {
  const { jobs, getJobs } = useJobs();
  const [reload, setReload] = useState<number>(0);
  const [selectedJob, setSelectedJob] = useState<Jobs | null>(null);

  useEffect(() => {
    getJobs();
  }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const handleModalClose = () => {
    setReload(reload + 1);
    setSelectedJob(null);
    setShowCreateModal(false);
  };

  const handleEdit = (job: Jobs) => {
    setSelectedJob(job);
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
        <ButtonContainer>
          <Button className="ms-auto" onClick={() => setShowCreateModal(true)}>
            + Add a job
          </Button>
        </ButtonContainer>
        <JobsTable jobs={jobs} handleEdit={handleEdit} />
      </AppContainer>
    </>
  );
};

export default Jobs;
