import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const puppeteer = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  // TODO: get data from DB
  const { data, error } = await supabase.functions.invoke(
    'function-puppeteer',
    {
      body: {
        // for test purpose
        search: ['frontend', 'developer'],
        jobType: ['contract'],
        workType: ['fulltime'],
        location: ['remote'],
      },
    }
  );

  res.status(200).json({ data, error });
};

export default puppeteer;
