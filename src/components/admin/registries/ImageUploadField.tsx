import { useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const UPLOAD_URL = 'https://functions.poehali.dev/9c978323-b1ba-4e9d-a112-e70e343bc890';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  password: string;
  placeholder?: string;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1] || '');
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const ImageUploadField = ({ value, onChange, password, placeholder }: ImageUploadFieldProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Можно загружать только изображения', variant: 'destructive' });
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast({ title: 'Файл слишком большой (максимум 8 МБ)', variant: 'destructive' });
      return;
    }

    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
        body: JSON.stringify({
          file_data: base64,
          file_name: file.name,
          content_type: file.type,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка загрузки');
      onChange(data.url);
      toast({ title: 'Фото загружено' });
    } catch (err) {
      toast({
        title: 'Не удалось загрузить фото',
        description: err instanceof Error ? err.message : '',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {value ? (
          <img
            src={value}
            alt="Превью"
            className="h-14 w-14 shrink-0 rounded-lg border border-border object-cover"
          />
        ) : (
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
            <Icon name="Image" size={20} />
          </span>
        )}
        <Input
          value={value}
          placeholder={placeholder || 'Ссылка на фото или загрузите файл'}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-4 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
      >
        <Icon name={uploading ? 'Loader2' : 'Upload'} size={14} className={uploading ? 'animate-spin' : ''} />
        {uploading ? 'Загружаем...' : 'Загрузить с компьютера'}
      </button>
    </div>
  );
};

export default ImageUploadField;
