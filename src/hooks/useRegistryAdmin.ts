import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import type { RegistryType } from '@/hooks/useRegistry';

const API_URL = 'https://functions.poehali.dev/e33bd001-e6f6-4d72-ad0d-e1301a17de9d';

export const useRegistryAdmin = <T extends { id: number }>(
  type: RegistryType,
  password: string,
) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?type=${type}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      toast({ title: 'Не удалось загрузить данные', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [type]);

  const createItem = async (payload: Partial<T>) => {
    setSaving(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
        body: JSON.stringify({ type, ...payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка');
      await fetchItems();
      toast({ title: 'Запись добавлена' });
      return true;
    } catch (err) {
      toast({
        title: 'Не удалось добавить запись',
        description: err instanceof Error ? err.message : '',
        variant: 'destructive',
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateItem = async (id: number, payload: Partial<T>) => {
    setSaving(true);
    try {
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
        body: JSON.stringify({ type, id, ...payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка');
      await fetchItems();
      toast({ title: 'Изменения сохранены' });
      return true;
    } catch (err) {
      toast({
        title: 'Не удалось сохранить',
        description: err instanceof Error ? err.message : '',
        variant: 'destructive',
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: number) => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}?type=${type}&id=${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Password': password },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка');
      setItems((prev) => prev.filter((x) => x.id !== id));
      toast({ title: 'Запись удалена' });
      return true;
    } catch (err) {
      toast({
        title: 'Не удалось удалить',
        description: err instanceof Error ? err.message : '',
        variant: 'destructive',
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { items, loading, saving, fetchItems, createItem, updateItem, deleteItem };
};
