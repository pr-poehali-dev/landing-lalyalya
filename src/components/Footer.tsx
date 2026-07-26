import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-8 md:text-left">
        <img src="/logo-opora.png" alt="ОПОРА РОССИИ" className="h-9 w-auto" />

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