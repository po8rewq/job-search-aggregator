import { Database } from '@/types/database.types';
import { Jobs } from '@/types/Jobs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const useSearchJobs = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const [jobs, setJobs] = useState<Jobs[] | null>(null);

  const searchJobs = async (fts: string) => {
    if (!fts) {
      setJobs(null);
    } else {
      const arraySearch = fts.split(' ');
      const { data, error } = await supabaseClient
        .from('jobs')
        .select('id, company, title, comment, url, status, recruiter')
        .textSearch(
          'fts',
          `${arraySearch.map((word) => `${word.trim()}:*`).join(' & ')}`
        );
      if (error) throw error;
      setJobs(data as Jobs[]);
    }
  };

  return {
    jobs,
    searchJobs,
  };
};

export default useSearchJobs;
