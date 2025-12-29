// ADD THIS INSIDE YOUR COMPONENT
const [searchQuery, setSearchQuery] = useState('');

const handleGlobalSearch = async (query: string) => {
  setSearchQuery(query);
  if (query.length < 2) {
    fetchVault(accessLevel); // Reset to current company view if search is empty
    return;
  }

  // Admin searches everything; Company keys search only their own data
  let baseQuery = supabase.from('assets').select('*').ilike('name', `%${query}%`);
  
  if (accessLevel !== 'admin') {
    baseQuery = baseQuery.eq('company_key', accessLevel);
  }

  const { data } = await baseQuery;
  if (data) setVaultFiles(data);
};
