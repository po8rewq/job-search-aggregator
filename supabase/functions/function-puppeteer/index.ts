// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import puppeteer from 'https://deno.land/x/puppeteer@16.2.0/mod.ts';

import {
  makeLinkedInSearchUrl,
  scrapLinkedInResults,
} from '../_shared/linkedin.ts';

serve(async (req: Request) => {
  const { search, jobType, workType, location } = await req.json();

  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${Deno.env.get(
        'PUPPETEER_BROWSERLESS_IO_KEY'
      )}`,
    });

    const page = await browser.newPage();

    const url = makeLinkedInSearchUrl(search, jobType, workType, location);

    await page.goto(url);

    const jobs = await scrapLinkedInResults(page);

    await browser.disconnect();

    return new Response(JSON.stringify(jobs), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
