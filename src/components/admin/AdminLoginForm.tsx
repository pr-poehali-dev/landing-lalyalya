import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AdminLoginFormProps {
  password: string;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string;
}

const AdminLoginForm = ({
  password,
  onPasswordChange,
  onSubmit,
  loading,
  error,
}: AdminLoginFormProps) => (
  <div className="flex min-h-screen items-center justify-center bg-background px-4">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
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
          onChange={(e) => onPasswordChange(e.target.value)}
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
      <a
        href="/"
        className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
      >
        <Icon name="ArrowLeft" size={16} />
        Вернуться на сайт
      </a>
    </form>
  </div>
);

export default AdminLoginForm;
