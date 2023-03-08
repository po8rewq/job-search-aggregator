import { Job } from './types/Job.ts';

// TODO: validate input
export const makeLinkedInSearchUrl = (
  search: string[],
  searchJobType: string[],
  searchWorkType: string[],
  location: string
) => {
  let geoId = '';
  if (location === 'uk') geoId = '101165590';
  else if (location === 'france') geoId = '105015875';
  else if (location === 'us') geoId = '103644278';
  else if (location === 'germany') geoId = '101282230';
  else if (location === 'spain') geoId = '105646813';
  else if (location === 'italy') geoId = '103350119';
  else if (location === 'europe') geoId = '91000000';

  const jobTypes = searchJobType.map((e) => {
    switch (e) {
      case 'fulltime':
        return 'F';
      case 'contract':
        return 'C';
      case 'parttime':
        return 'P';
      default:
        return 'F';
    }
  });

  const workType = searchWorkType.map((e) => {
    switch (e) {
      case 'remote':
        return '2';
      case 'onsite':
        return '1';
      case 'hybrid':
        return '3';
      default:
        return '2';
    }
  });

  let url = 'https://www.linkedin.com/jobs/search/?';
  url += `geoId=${geoId}`;
  url += `&keywords=${search.join(
    '%20'
  )}&refresh=true&f_TPR=&f_JT=${jobTypes.join(
    '%2C'
  )}&f_TPR=r604800&f_WT=${workType.join('%2C')}`;
  // &position=1&pageNum=0 - TODO: pagination ?

  return url;
};

export const scrapLinkedInResults = async (page: any) => {
  const result = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('ul.jobs-search__results-list li')
    ).map((el) => {
      const a = el.querySelector('a');
      if (!a) return null;
      const cleanedTitle = a
        .querySelector('span.sr-only')
        ?.innerHTML.replace(/(\n      )/g, '')
        .trim();
      return {
        title: cleanedTitle,
        href: a.href,
        from: 'linkedin',
      };
    })
  );
  return result;
};
