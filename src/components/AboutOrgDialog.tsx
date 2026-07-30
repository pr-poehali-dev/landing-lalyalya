import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const AboutOrgDialog = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 60_000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Icon name="Landmark" size={26} />
          </span>
          <DialogTitle className="font-display text-2xl font-bold text-primary">
            «ОПОРА РОССИИ»
          </DialogTitle>
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
