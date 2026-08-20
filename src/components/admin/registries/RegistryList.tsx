import Icon from '@/components/ui/icon';

interface RegistryListProps<T> {
  items: T[];
  loading: boolean;
  renderTitle: (item: T) => string;
  renderSubtitle?: (item: T) => string;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

const RegistryList = <T extends { id: number }>({
  items,
  loading,
  renderTitle,
  renderSubtitle,
  onEdit,
  onDelete,
}: RegistryListProps<T>) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-12 text-center text-muted-foreground">
        Загружаем...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-12 text-center text-muted-foreground">
        Записей пока нет.
      </div>
    );
  }

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-4 p-4">
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{renderTitle(item)}</p>
            {renderSubtitle && (
              <p className="truncate text-sm text-muted-foreground">{renderSubtitle(item)}</p>
            )}
          </div>
          <div className="flex shrink-0 gap-1">
            <button
              onClick={() => onEdit(item)}
              title="Редактировать"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent/10 hover:text-accent"
            >
              <Icon name="Pencil" size={16} />
            </button>
            <button
              onClick={() => onDelete(item)}
              title="Удалить"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-red-600"
            >
              <Icon name="Trash2" size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegistryList;
