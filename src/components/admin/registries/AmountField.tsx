import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface AmountFieldProps {
  label: string;
  value: string;
  saving: boolean;
  onSave: (value: string) => void;
}

const AmountField = ({ label, value, saving, onSave }: AmountFieldProps) => {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const isDirty = draft !== value;

  const handleSave = () => {
    const numeric = draft.replace(/\D/g, '');
    if (!numeric) return;
    onSave(numeric);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="mb-3 font-medium text-foreground">{label}</p>
      <div className="flex items-center gap-3">
        <Input
          type="number"
          min={0}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Сумма в рублях"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={!isDirty || saving}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name={saving ? 'Loader2' : 'Check'} size={16} className={saving ? 'animate-spin' : ''} />
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default AmountField;
