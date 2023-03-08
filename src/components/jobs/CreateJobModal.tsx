import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import useJobs from '@/hooks/useJobs';
import { Jobs, JobStatus } from '@/types/Jobs';

type Props = {
  show: boolean;
  handleClose: () => void;
  job: Jobs | null;
};
const CreateJobModal = ({ show, handleClose, job }: Props) => {
  const { createJob, deleteJob, updateJob } = useJobs();

  const [title, setTitle] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [status, setStatus] = useState<number>(0);
  const [recruiter, setRecruiter] = useState<boolean>(false);

  const [validated, setValidated] = useState<boolean>(false);

  const resetForm = () => {
    setTitle('');
    setCompany('');
    setComment('');
    setUrl('');
    setStatus(0);
    setRecruiter(false);
  };

  useEffect(() => {
    setValidated(false);
    if (job) {
      setTitle(job.title);
      setCompany(job.company);
      setComment(job.comment || '');
      setUrl(job.url || '');
      setStatus(job.status || 0);
      setRecruiter(job.recruiter || false);
    } else {
      resetForm();
    }
  }, [job]);

  const handleDeleteJob = async () => {
    if (!job) return;
    try {
      await deleteJob(job.id);
      closeModal();
    } catch (error) {
      // TODO: Handle error
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        const newJob = {
          title,
          company,
          comment,
          url,
          status,
          recruiter,
        };
        if (job) await updateJob({ ...newJob, id: job.id });
        else await createJob(newJob);

        closeModal();
      } catch (error) {
        // TODO: Handle error
        console.log(error);
      }
    }
  };

  const closeModal = () => {
    resetForm();
    setValidated(false);
    handleClose();
  };

  if (!show) return null;
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{job ? 'Update job' : 'Add a new job'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="createJob"
          onSubmit={handleSubmit}
          noValidate
          validated={validated}
        >
          <Form.Group className="mb-3" controlId="form.Title">
            <Form.Label>Title *</Form.Label>
            <Form.Control
              required
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="form.Company">
            <Form.Label>Company *</Form.Label>
            <Form.Control
              required
              type="text"
              value={company}
              onChange={({ target }) => setCompany(target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="form.Url">
            <Form.Label>Url to job post</Form.Label>
            <Form.Control
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="form.Comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="form.Status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              aria-label="Select a status"
              onChange={({ target }) => setStatus(parseInt(target.value))}
              value={status}
            >
              {Object.keys(JobStatus).map((status) => {
                const statusValue = Object.keys(JobStatus).indexOf(status);
                return (
                  <option key={status} value={statusValue}>
                    {status}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="form.Recruiter">
            <Form.Check
              type="switch"
              id="recruiter-switch"
              label="This is through a recruitment agency"
              checked={recruiter}
              onChange={({ target }) => setRecruiter(target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {job && (
          <Button variant="danger" onClick={handleDeleteJob}>
            Delete
          </Button>
        )}
        <Button variant="primary" type="submit" form="createJob">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateJobModal;
