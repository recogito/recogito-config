import {createClient, SupabaseClient, } from '@supabase/supabase-js'
import {useQuery} from "@tanstack/react-query";

export function initializeLocalClient() {
  return createClient('http://localhost:54321', import.meta.env.VITE_SERVICE_KEY);
}

export type PoliciesResponse = ReturnType<typeof getPolicies>;

function getPolicies(): PoliciesResponse {
  const supabase: SupabaseClient = initializeLocalClient();

  return supabase.from('policies').select('id, table_name, operation');
}

export function usePolicyQuery() {
  return useQuery(['policies'], async () => {
    return getPolicies().then((result) => result.data);
  })
}

function getRoles(): RolesResponse {
  const supabase: SupabaseClient = initializeLocalClient();

  return supabase.from('roles').select('*');
}

export type RolesResponse = ReturnType<typeof getRoles>;

export function useRolesQuery() {
  return useQuery(['roles'], async () => {
    return getRoles().then((result) => result.data);
  })
}
