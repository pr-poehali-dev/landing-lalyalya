import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

const API_URL = 'https://functions.poehali.dev/7a726f58-9eba-4464-b6e3-74a696e36f86';
const STORAGE_KEY = 'ceremony_admin_password';

export interface Application {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  photo_consent?: boolean;
  created_at: string | null;
}

export const useAdminApplications = () => {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editItem, setEditItem] = useState<Application | null>(null);
  const [deleteItem, setDeleteItem] = useState<Application | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async (pwd: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, { headers: { 'X-Admin-Password': pwd } });
      if (res.status === 401) {
        setError('Неверный пароль');
        setAuthed(false);
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      const data = await res.json();
      setItems(data.items || []);
      setAuthed(true);
      localStorage.setItem(STORAGE_KEY, pwd);
    } catch {
      setError('Не удалось загрузить заявки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      fetchData(saved);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword('');
    setItems([]);
  };

  const saveEdit = async () => {
    if (!editItem) return;
    if (!editItem.first_name.trim() || !editItem.last_name.trim() ||
        !editItem.phone.trim() || !editItem.email.trim()) {
      toast({ title: 'Заполните все поля', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
        body: JSON.stringify(editItem),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка');
      setItems((prev) => prev.map((x) => (x.id === editItem.id ? editItem : x)));
      setEditItem(null);
      toast({ title: 'Изменения сохранены' });
    } catch (err) {
      toast({
        title: 'Не удалось сохранить',
        description: err instanceof Error ? err.message : '',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}?id=${deleteItem.id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Password': password },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка');
      setItems((prev) => prev.filter((x) => x.id !== deleteItem.id));
      setDeleteItem(null);
      toast({ title: 'Заявка удалена' });
    } catch (err) {
      toast({
        title: 'Не удалось удалить',
        description: err instanceof Error ? err.message : '',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    password,
    setPassword,
    authed,
    items,
    loading,
    error,
    editItem,
    setEditItem,
    deleteItem,
    setDeleteItem,
    saving,
    fetchData,
    logout,
    saveEdit,
    confirmDelete,
  };
};
