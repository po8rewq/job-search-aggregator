import { Database } from '@/types/database.types';
import { Jobs } from '@/types/Jobs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const useJobs = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const [jobs, setJobs] = useState<Jobs[]>([]);

  const getJobs = async () => {
    try {
      const { data, error } = await supabaseClient
        .from('jobs')
        .select('id, company, title, comment, url, status, recruiter')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      if (data) setJobs(data as Jobs[]);
    } catch (error) {
      setJobs([]);
      console.error(error);
      throw error;
    }
  };

  const createJob = async (newJob: Partial<Jobs>) => {
    // TODO: check if url already exists
    // const { data: existingJob, error: existingJobError } = await supabaseClient
    //   .from('jobs')
    //   .select('id')
    //   .eq('url', newJob.url)
    //   .eq('user_id', user!.id);

    const { error } = await supabaseClient.from('jobs').insert({
      title: newJob.title!,
      company: newJob.company!,
      comment: newJob.comment || null,
      url: newJob.url || null,
      status: newJob.status!,
      user_id: user!.id,
      recruiter: newJob.recruiter,
    });
    if (error) throw error;
  };

  const updateJob = async (newJob: Partial<Jobs>) => {
    // TODO: if url changes, check if it exists in another entry

    const { error } = await supabaseClient
      .from('jobs')
      .update({
        title: newJob.title,
        company: newJob.company,
        comment: newJob.comment,
        url: newJob.url,
        status: newJob.status,
        recruiter: newJob.recruiter,
      })
      .eq('id', newJob.id);
    if (error) throw error;
  };

  const deleteJob = async (jobId: string) => {
    const { error } = await supabaseClient
      .from('jobs')
      .delete()
      .eq('id', jobId);
    if (error) throw error;
  };

  return { jobs, getJobs, createJob, deleteJob, updateJob };
};

export default useJobs;
