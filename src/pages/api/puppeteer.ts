import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

// TODO: remove - this is test only
const puppeteer = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const { data, error } = await supabase.functions.invoke('function-puppeteer');

  res.status(200).json({ data, error });
};

export default puppeteer;
