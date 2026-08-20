import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
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
import { useRegistryAdmin } from '@/hooks/useRegistryAdmin';
import type { RegistryType } from '@/hooks/useRegistry';
import RegistryList from './RegistryList';
import RegistryItemDialog, { type FieldConfig } from './RegistryItemDialog';

interface RegistryItemBase {
  id: number;
  [key: string]: string | number | null;
}

interface RegistryTabProps {
  type: RegistryType;
  password: string;
  fields: FieldConfig[];
  emptyItem: Record<string, string | number | null>;
  renderTitle: (item: RegistryItemBase) => string;
  renderSubtitle?: (item: RegistryItemBase) => string;
  addLabel: string;
  editLabel: string;
}

const RegistryTab = ({
  type,
  password,
  fields,
  emptyItem,
  renderTitle,
  renderSubtitle,
  addLabel,
  editLabel,
}: RegistryTabProps) => {
  const { items, loading, saving, fetchItems, createItem, updateItem, deleteItem } =
    useRegistryAdmin<RegistryItemBase>(type, password);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string | number | null>>({});
  const [deleteTarget, setDeleteTarget] = useState<RegistryItemBase | null>(null);

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const openCreate = () => {
    setEditingId(null);
    setFormValues(emptyItem);
    setFormOpen(true);
  };

  const openEdit = (item: RegistryItemBase) => {
    setEditingId(item.id);
    setFormValues(item);
    setFormOpen(true);
  };

  const handleSave = async () => {
    const ok = editingId
      ? await updateItem(editingId, formValues)
      : await createItem(formValues);
    if (ok) setFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const ok = await deleteItem(deleteTarget.id);
    if (ok) setDeleteTarget(null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Всего записей: <span className="font-semibold text-foreground">{items.length}</span>
        </p>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
        >
          <Icon name="Plus" size={16} />
          Добавить
        </button>
      </div>

      <RegistryList
        items={items}
        loading={loading}
        renderTitle={renderTitle}
        renderSubtitle={renderSubtitle}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      <RegistryItemDialog
        open={formOpen}
        title={editingId ? editLabel : addLabel}
        fields={fields}
        values={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        saving={saving}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget && `«${renderTitle(deleteTarget)}» будет удалена без возможности восстановления.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RegistryTab;