import { Database } from '@/types/database.types';
import { Search } from '@/types/Search';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

const useSearches = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();

  const [searches, setSearches] = useState<Search[]>([]);

  const getSearches = async () => {
    try {
      const { data, error } = await supabaseClient
        .from('searches')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setSearches(data);
    } catch (error) {
      setSearches([]);
      throw error;
    }
  };

  const createSearch = async (newSearch: Partial<Search>) => {
    const { error } = await supabaseClient.from('searches').insert({
      jobType: newSearch.jobType!,
      workType: newSearch.workType!,
      website: newSearch.website!,
      location: newSearch.location!,
      active: true,
      user_id: user!.id,
      words: newSearch.words!,
    });
    if (error) throw error;
  };

  const updateSearch = async (search: Search) => {
    const { error } = await supabaseClient
      .from('searches')
      .update({
        jobType: search.jobType,
        workType: search.workType,
        website: search.website,
        location: search.location,
        words: search.words,
        active: search.active,
      })
      .eq('id', search.id);
    if (error) throw error;
  };

  const deleteSearch = async (searchId: number) => {
    try {
      const { error } = await supabaseClient
        .from('searches')
        .delete()
        .eq('id', searchId);
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  };

  return {
    searches,
    getSearches,
    createSearch,
    updateSearch,
    deleteSearch,
  };
};

export default useSearches;
