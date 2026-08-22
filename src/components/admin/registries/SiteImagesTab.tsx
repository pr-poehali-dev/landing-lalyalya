import { useSiteSettingsAdmin } from '@/hooks/useSiteSettings';
import ImageUploadField from './ImageUploadField';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface SiteImagesTabProps {
  password: string;
}

const SiteImagesTab = ({ password }: SiteImagesTabProps) => {
  const { items, toggles, loading, saving, updateSetting } = useSiteSettingsAdmin(password);

  const handleChange = async (key: string, value: string) => {
    const ok = await updateSetting(key, value);
    if (ok) {
      toast({ title: 'Фото обновлено' });
    } else {
      toast({ title: 'Не удалось сохранить фото', variant: 'destructive' });
    }
  };

  const handleToggle = async (key: string, checked: boolean) => {
    const ok = await updateSetting(key, checked ? 'true' : 'false');
    if (ok) {
      toast({ title: checked ? 'Окно включено' : 'Окно выключено' });
    } else {
      toast({ title: 'Не удалось сохранить настройку', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-12 text-center text-muted-foreground">
        Загружаем...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toggles.map((toggle) => (
        <div
          key={toggle.key}
          className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4"
        >
          <p className="font-medium text-foreground">{toggle.label}</p>
          <Switch
            checked={toggle.value !== 'false'}
            disabled={saving}
            onCheckedChange={(checked) => handleToggle(toggle.key, checked)}
          />
        </div>
      ))}

      {items.map((item) => (
        <div key={item.key} className="rounded-2xl border border-border bg-surface p-4">
          <p className="mb-3 font-medium text-foreground">{item.label}</p>
          <ImageUploadField
            value={item.value}
            onChange={(url) => handleChange(item.key, url)}
            password={password}
          />
          {saving && <p className="mt-2 text-xs text-muted-foreground">Сохраняем...</p>}
        </div>
      ))}
    </div>
  );
};

export default SiteImagesTab;
