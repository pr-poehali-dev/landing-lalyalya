import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useSiteImage } from '@/hooks/useSiteSettings';

const ORG_LOGO_FALLBACK =
  'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/708717a5-e1d8-48dc-b066-c29ad7d4b1e6.png';

const AboutOrgDialog = () => {
  const [open, setOpen] = useState(false);
  const orgLogo = useSiteImage('org_logo', ORG_LOGO_FALLBACK);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 60_000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <img
            src={orgLogo}
            alt="ОПОРА РОССИИ — Приморское краевое отделение"
            className="mb-3 h-14 w-auto object-contain"
          />
          <DialogTitle className="sr-only">«ОПОРА РОССИИ»</DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            Общероссийская общественная организация малого и среднего
            предпринимательства. Объединяет тысячи предпринимателей по всей стране
            и помогает им развивать бизнес, защищать свои интересы и формировать
            будущее экономики регионов.
          </DialogDescription>
        </DialogHeader>

        <p className="leading-relaxed text-muted-foreground">
          Хотите узнать больше о деятельности организации? Познакомьтесь с ней
          поближе на официальном сайте Приморского краевого отделения.
        </p>

        <a
          href="https://primopora.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-accent px-7 py-3 text-base font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
        >
          Перейти на сайт
          <Icon name="ExternalLink" size={18} />
        </a>
      </DialogContent>
    </Dialog>
  );
};

export default AboutOrgDialog;