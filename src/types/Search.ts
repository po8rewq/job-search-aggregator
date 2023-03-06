import { Database } from './database.types';
import { SearchResult } from './SearchResult';

export type Search = Database['public']['Tables']['searches']['Row'];

export type SearchWithResults = Search & {
  jobResults: SearchResult[];
};
