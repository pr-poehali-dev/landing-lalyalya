import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { Application } from '@/hooks/useAdminApplications';

interface AdminEditDialogProps {
  editItem: Application | null;
  onChange: (item: Application) => void;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
}

const AdminEditDialog = ({ editItem, onChange, onClose, onSave, saving }: AdminEditDialogProps) => (
  <Dialog open={!!editItem} onOpenChange={(v) => !v && onClose()}>
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
              onChange={(e) => onChange({ ...editItem, first_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-last">Фамилия</Label>
            <Input
              id="edit-last"
              value={editItem.last_name}
              onChange={(e) => onChange({ ...editItem, last_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-phone">Телефон</Label>
            <Input
              id="edit-phone"
              value={editItem.phone}
              onChange={(e) => onChange({ ...editItem, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-email">Почта</Label>
            <Input
              id="edit-email"
              value={editItem.email}
              onChange={(e) => onChange({ ...editItem, email: e.target.value })}
            />
          </div>
        </div>
      )}
      <DialogFooter>
        <button
          onClick={onClose}
          className="rounded-full border-2 border-border px-6 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-surface"
        >
          Отмена
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {saving ? 'Сохраняем...' : 'Сохранить'}
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default AdminEditDialog;
