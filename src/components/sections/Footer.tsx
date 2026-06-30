const LINKS = [
  { label: 'Маршрут', href: '#route' },
  { label: 'Стоянки', href: '#hubs' },
  { label: 'Стёпа Молодец', href: '#founder' },
  { label: 'Контакт', href: 'mailto:info@vdt-trail.ru' },
];

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-divider px-4 md:px-8 py-12">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-6">
        <div>
          <div className="font-display text-lg font-semibold text-foreground">
            Великий Дальневосточный Трейл
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
            Владивосток → Камчатка · ~6 000 км
          </div>
        </div>
        <nav className="flex gap-6">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          © 2026 ВДТ. Маршрут открытый.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
