import { Database } from './database.types';

export type Jobs = Database['public']['Tables']['jobs']['Row'];

export enum JobStatus {
  New = '0',
  Applied = '1',
  Interviewing = '2',
  Rejected = '3',
  Old = '4',
}
