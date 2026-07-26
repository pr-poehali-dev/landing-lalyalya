import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-8 md:text-left">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <Icon name="Landmark" size={18} className="text-primary-foreground" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-extrabold tracking-tight text-primary">
              ОПОРА РОССИИ
            </span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Приморское краевое отделение
            </span>
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2026 Приморское краевое отделение «ОПОРЫ РОССИИ». Все права защищены.
        </p>

        <a
          href="mailto:pko@primopora.ru"
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Icon name="Mail" size={16} />
          pko@primopora.ru
        </a>
      </div>
    </footer>
  );
};

export default Footer;
