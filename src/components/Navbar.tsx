import { useState } from 'react';
import Icon from '@/components/ui/icon';

const LINKS = [
  { label: 'О проекте', href: '#project' },
  { label: 'Церемония', href: '#ceremony' },
  { label: 'Памятный знак', href: '#monument' },
  { label: 'Капсула времени', href: '#capsule' },
  { label: 'Место', href: '#location' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Организаторы', href: '#organizers' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <a href="#top" className="flex shrink-0 items-center">
          <img src="/logo-opora.png" alt="ОПОРА РОССИИ" className="h-9 w-auto md:h-11" />
        </a>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap text-sm font-medium text-foreground/80 transition hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#support"
          className="hidden shrink-0 whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90 lg:inline-block"
        >
          Поддержать проект
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-primary lg:hidden"
          aria-label="Меню"
        >
          <Icon name={open ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-4 py-3 lg:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#support"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-semibold text-accent-foreground"
          >
            Поддержать проект
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;