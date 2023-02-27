import { Job } from './types/Job';

// TODO: validate input
export const makeLinkedInSearchUrl = (
  search: string[],
  searchJobType: string[],
  searchWorkType: string[],
  location: string[]
) => {
  const geoId = '101165590'; // UK
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

  const url = `https://www.linkedin.com/jobs/search/?geoId=${geoId}&keywords=${search.join(
    '%20'
  )}&refresh=true&f_TPR=&f_JT=${jobTypes.join(
    '%2C'
  )}&f_TPR=r604800&f_WT=${workType.join('%2C')}`;
  // &position=1&pageNum=0 - TODO: pagination

  return url;
};

export const scrapLinkedInResults = async (page): Job[] => {
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
