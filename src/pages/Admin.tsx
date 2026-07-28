import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

const API_URL = 'https://functions.poehali.dev/7a726f58-9eba-4464-b6e3-74a696e36f86';
const STORAGE_KEY = 'ceremony_admin_password';

interface Application {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  created_at: string | null;
}

const Admin = () => {
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

  const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchData(password);
          }}
          className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-sm"
        >
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <Icon name="Lock" size={24} className="text-accent" />
          </span>
          <h1 className="mb-1 font-display text-2xl font-bold text-primary">
            Кабинет заявок
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Введите пароль для доступа к заявкам на участие.
          </p>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
            />
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-6 w-full rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Проверяем...' : 'Войти'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-primary">
              Заявки на участие
            </h1>
            <p className="mt-1 text-muted-foreground">
              Всего заявок: <span className="font-semibold">{items.length}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fetchData(password)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Icon name="RefreshCw" size={16} />
              Обновить
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border-2 border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-surface"
            >
              <Icon name="LogOut" size={16} />
              Выйти
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-12 text-center text-muted-foreground">
            Пока нет ни одной заявки.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Фамилия</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Почта</TableHead>
                  <TableHead>Дата заявки</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((a, i) => (
                  <TableRow key={a.id}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    <TableCell className="font-medium">{a.first_name}</TableCell>
                    <TableCell className="font-medium">{a.last_name}</TableCell>
                    <TableCell>
                      <a href={`tel:${a.phone}`} className="text-accent hover:underline">
                        {a.phone}
                      </a>
                    </TableCell>
                    <TableCell>
                      <a href={`mailto:${a.email}`} className="text-accent hover:underline">
                        {a.email}
                      </a>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {formatDate(a.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setEditItem({ ...a })}
                          title="Редактировать"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent/10 hover:text-accent"
                        >
                          <Icon name="Pencil" size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteItem(a)}
                          title="Удалить"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={!!editItem} onOpenChange={(v) => !v && setEditItem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Редактировать заявку
            </DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-first">Имя</Label>
                <Input
                  id="edit-first"
                  value={editItem.first_name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, first_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-last">Фамилия</Label>
                <Input
                  id="edit-last"
                  value={editItem.last_name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, last_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Телефон</Label>
                <Input
                  id="edit-phone"
                  value={editItem.phone}
                  onChange={(e) =>
                    setEditItem({ ...editItem, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Почта</Label>
                <Input
                  id="edit-email"
                  value={editItem.email}
                  onChange={(e) =>
                    setEditItem({ ...editItem, email: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <button
              onClick={() => setEditItem(null)}
              className="rounded-full border-2 border-border px-6 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-surface"
            >
              Отмена
            </button>
            <button
              onClick={saveEdit}
              disabled={saving}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {saving ? 'Сохраняем...' : 'Сохранить'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteItem} onOpenChange={(v) => !v && setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить заявку?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteItem &&
                `Заявка «${deleteItem.first_name} ${deleteItem.last_name}» будет удалена без возможности восстановления.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;