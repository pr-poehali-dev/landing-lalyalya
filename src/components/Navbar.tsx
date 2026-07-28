import { useEffect, useState } from 'react';
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
  const [active, setActive] = useState('');

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

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
              className={`relative whitespace-nowrap text-sm font-medium transition after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-accent after:transition-all ${
                active === l.href
                  ? 'text-primary after:w-full'
                  : 'text-foreground/80 hover:text-primary after:w-0'
              }`}
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
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active === l.href
                  ? 'bg-surface text-primary'
                  : 'text-foreground/80 hover:bg-surface'
              }`}
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
