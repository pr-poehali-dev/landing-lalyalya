import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number';
  placeholder?: string;
}

interface RegistryItemDialogProps {
  open: boolean;
  title: string;
  fields: FieldConfig[];
  values: Record<string, string | number | null>;
  onChange: (key: string, value: string | number) => void;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
}

const RegistryItemDialog = ({
  open,
  title,
  fields,
  values,
  onChange,
  onClose,
  onSave,
  saving,
}: RegistryItemDialogProps) => (
  <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
    <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>{field.label}</Label>
            {field.type === 'textarea' ? (
              <Textarea
                id={field.key}
                rows={8}
                value={(values[field.key] as string) ?? ''}
                placeholder={field.placeholder}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            ) : (
              <Input
                id={field.key}
                type={field.type === 'number' ? 'number' : 'text'}
                value={(values[field.key] as string | number) ?? ''}
                placeholder={field.placeholder}
                onChange={(e) =>
                  onChange(
                    field.key,
                    field.type === 'number' ? Number(e.target.value) : e.target.value,
                  )
                }
              />
            )}
          </div>
        ))}
      </div>
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

export default RegistryItemDialog;
