import { Database } from './database.types';

export type Jobs = Database['public']['Tables']['jobs']['Row'];

export enum JobStatus {
  New = '0',
  Applied = '1',
  Rejected = '2',
  Old = '3',
  Interviewing = '4',
}
