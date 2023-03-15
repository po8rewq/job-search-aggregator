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
import SearchForm from '@/components/jobs/Search';
import useDebounce from '@/hooks/useDebounce';
import useSearchJobs from '@/hooks/useSearchJobs';

const ButtonContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
`;

const Jobs = () => {
  const { jobs, getJobs } = useJobs();
  const { searchJobs, jobs: jobResults } = useSearchJobs();
  const [searchText, setSearchText] = useState<string>('');
  const [reload, setReload] = useState<number>(0);
  const [selectedJob, setSelectedJob] = useState<Jobs | null>(null);
  const { debounce } = useDebounce();

  const [filters, setFilters] = useState<number[]>([0, 1, 2]);

  useEffect(() => {
    if (searchText.trim() === '') getJobs(filters);
    else searchJobs(searchText);
  }, [reload, filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const jobToDisplay = useMemo(() => {
    if (jobResults) return jobResults;
    return jobs;
  }, [jobs, jobResults]);

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

  const handleSearch = (search: string) => {
    const callApi = async () => {
      await searchJobs(search);
    };
    setSearchText(search);
    debounce(callApi, 400);
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
          <SearchForm handleSearch={handleSearch} />
          <Card className="overflow-auto">
            <Card.Body>
              <Card.Title>My jobs</Card.Title>
              <JobsTable jobs={jobToDisplay} handleEdit={handleEdit} />
            </Card.Body>
          </Card>
        </div>
      </AppContainer>
    </>
  );
};

export default Jobs;
