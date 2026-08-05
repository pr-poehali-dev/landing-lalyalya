import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConsentTextProps {
  className?: string;
}

const ConsentText = ({ className }: ConsentTextProps) => {
  const [showOffer, setShowOffer] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <p className={className ?? 'text-xs leading-relaxed text-muted-foreground'}>
        Отправляя заявку, я подтверждаю, что ознакомлен(а) и согласен(а) с условиями{' '}
        <button
          type="button"
          onClick={() => setShowOffer(true)}
          className="font-semibold text-accent underline hover:opacity-80"
        >
          Договора-оферты
        </button>{' '}
        и{' '}
        <button
          type="button"
          onClick={() => setShowPrivacy(true)}
          className="font-semibold text-accent underline hover:opacity-80"
        >
          Политики конфиденциальности
        </button>
        , а также даю согласие на обработку моих персональных данных.
      </p>

      <Dialog open={showOffer} onOpenChange={setShowOffer}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Договор-оферта</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 leading-relaxed text-muted-foreground">
            <p>Тут будет нужный текст.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Политика конфиденциальности
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 leading-relaxed text-muted-foreground">
            <p>Тут будет нужный текст.</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConsentText;
