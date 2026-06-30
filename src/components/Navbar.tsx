import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';
import { useTheme } from '@/hooks/use-theme';

const NAV_ITEMS = [
  { label: 'Маршрут', href: '#route' },
  { label: 'Способы передвижения', href: '#transport' },
  { label: 'Стоянки', href: '#camps' },
  { label: 'Об идейном вдохновителе', href: '#author' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/70 backdrop-blur-xl border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <a href="#top" aria-label="Великий Дальневосточный Трейл">
          <Logo />
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-foreground/75 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Переключить тему"
            className="w-10 h-10 flex items-center justify-center rounded-full text-foreground/80 hover:text-primary hover:bg-foreground/5 transition-colors"
          >
            <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
          </button>

          <a
            href="#join"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Присоединиться
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
