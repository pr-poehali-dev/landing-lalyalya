import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Application } from '@/hooks/useAdminApplications';

interface AdminApplicationsTableProps {
  items: Application[];
  onEdit: (item: Application) => void;
  onDelete: (item: Application) => void;
}

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

const AdminApplicationsTable = ({ items, onEdit, onDelete }: AdminApplicationsTableProps) => {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-12 text-center text-muted-foreground">
        Пока нет ни одной заявки.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Фамилия</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Почта</TableHead>
            <TableHead>Фото/видео</TableHead>
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
              <TableCell>
                {a.photo_consent ? (
                  <span className="inline-flex items-center gap-1 text-accent">
                    <Icon name="Check" size={16} />
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Icon name="X" size={16} />
                  </span>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {formatDate(a.created_at)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => onEdit({ ...a })}
                    title="Редактировать"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent/10 hover:text-accent"
                  >
                    <Icon name="Pencil" size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(a)}
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
  );
};

export default AdminApplicationsTable;
