
// Mock Supabase client for disconnected mode
export const supabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
        maybeSingle: () => Promise.resolve({ data: null, error: null })
      }),
      order: () => Promise.resolve({ data: [], error: null })
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null })
  }),
  rpc: () => Promise.resolve({ data: null, error: null })
};
