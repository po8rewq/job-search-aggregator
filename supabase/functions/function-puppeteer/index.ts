// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'std/server';
import puppeteer from 'puppeteer';
import { createClient } from 'supabase-js';
import dayjs from 'dayjs';

import {
  makeLinkedInSearchUrl,
  scrapLinkedInResults,
} from '../_shared/linkedin.ts';

serve(async (req: Request) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const date = dayjs().subtract(1, 'day').endOf('day');

    const { data, error } = await supabaseClient
      .from('searches')
      .select('*')
      .eq('active', true)
      .or('executed_at.is.null,executed_at.gt.' + date.toISOString())
      .limit(1); // 1 result for now

    if (error) throw error;

    if (!data || data.length == 0) {
      return new Response('', {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${Deno.env.get(
        'PUPPETEER_BROWSERLESS_IO_KEY'
      )}`,
    });

    const page = await browser.newPage();

    const promises = data.map(async (search) => {
      if (search.website == 'linkedin') {
        const url = makeLinkedInSearchUrl(
          search.words.split(','),
          [search.jobType],
          [search.workType],
          [search.location]
        );

        await page.goto(url);
        const jobs = await scrapLinkedInResults(page);

        if (jobs) {
          // TODO: insert only if url doesn't exists
          await supabaseClient.from('jobResults').insert(
            jobs.map((job) => {
              return {
                searchId: search.id,
                title: job.title,
                url: job.href,
                website: 'linkedin',
                user_id: search.user_id,
              };
            })
          );
        }

        // update search executed_at
        await supabaseClient
          .from('searches')
          .update({ executed_at: new Date() })
          .eq('id', search.id);
      } else {
        console.log(search.website + ' not implemented yet');
        return Promise.resolve();
      }
    });

    await Promise.all(promises);

    await browser.disconnect();

    return new Response('', {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
