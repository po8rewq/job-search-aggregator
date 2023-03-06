import { Database } from '@/types/database.types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const useSearch = () => {
  const supabaseClient = useSupabaseClient<Database>();

  const getSearchResults = async (searchId: number) => {
    const { data, error } = await supabaseClient
      .from('searches')
      .select('*, jobResults(*)')
      .eq('id', searchId)
      .single();
    if (error) throw error;
    return data;
  };

  return {
    getSearchResults,
  };
};
export default useSearch;
