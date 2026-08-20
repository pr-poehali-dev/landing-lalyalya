import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://functions.poehali.dev/e33bd001-e6f6-4d72-ad0d-e1301a17de9d';

export type RegistryType = 'entrepreneurs' | 'donors' | 'partners' | 'faq';

export const useRegistry = <T extends { id: number }>(type: RegistryType) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}?type=${type}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setError('Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refetch: fetchItems };
};
