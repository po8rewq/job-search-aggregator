import {
  makeLinkedInSearchUrl,
  scrapLinkedInResults,
} from '../_shared/linkedin.ts';

export const scrapFactory = (website: string) => {
  if (website === 'linkedin') {
    return {
      makeUrl: makeLinkedInSearchUrl,
      scrap: scrapLinkedInResults,
    };
  } else {
    throw new Error('Website not implemented yet');
  }
};
