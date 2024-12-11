import { useState, useEffect } from 'react';
import MatchService from '../service/matchService';

const useMatchData = (accountId: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await new MatchService().getAccounts(); 
        setData(response.data); 
      } catch (err) {
        setError('Erro ao buscar os dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accountId]); 

  return { data, loading, error };
};

export default useMatchData;
