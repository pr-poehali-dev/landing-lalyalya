import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://functions.poehali.dev/e33bd001-e6f6-4d72-ad0d-e1301a17de9d';

export interface SiteSettingItem {
  key: string;
  label: string;
  value: string;
}

export const useSiteImage = (key: string, fallback: string) => {
  const [url, setUrl] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}?type=settings`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const found = (data.items || []).find((item: SiteSettingItem) => item.key === key);
        if (found?.value) setUrl(found.value);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [key]);

  return url;
};

export const useSiteSettingsAdmin = (password: string) => {
  const [items, setItems] = useState<SiteSettingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?type=settings`);
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const updateSetting = async (key: string, value: string) => {
    setSaving(true);
    try {
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
        body: JSON.stringify({ type: 'settings', key, value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка');
      await fetchItems();
      return true;
    } catch {
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { items, loading, saving, updateSetting };
};
