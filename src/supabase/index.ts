import { createClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { PolicyDefinition } from '../types';

export function initializeLocalClient() {
  return createClient(
    import.meta.env.VITE_SUPABASE_API_URL,
    import.meta.env.VITE_SUPABASE_SERVICE_KEY
  );
}

async function getPolicies() {
  const supabase = initializeLocalClient();
  return supabase.from('policies').select('id, table_name, operation');
}

export function usePolicyQuery() {
  return useQuery<PolicyDefinition[]>(['policies'], async () => {
    const result = await getPolicies();
    return result.data ?? [];
  });
}

async function getRoles() {
  const supabase = initializeLocalClient();
  return supabase.from('roles').select('*');
}

export function useRolesQuery() {
  return useQuery(['roles'], async () => {
    const result = await getRoles();
    return result.data;
  });
}
