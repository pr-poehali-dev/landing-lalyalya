import { useState, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import { ApplicationOfferText } from '@/components/consent/ApplicationOfferText';
import { ApplicationPrivacyText } from '@/components/consent/ApplicationPrivacyText';
import { PhotoConsentText } from '@/components/consent/PhotoConsentText';

const API_URL = 'https://functions.poehali.dev/7a726f58-9eba-4464-b6e3-74a696e36f86';

interface ApplicationDialogProps {
  children: ReactNode;
}

const ApplicationDialog = ({ children }: ApplicationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [offerChecked, setOfferChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [photoConsentChecked, setPhotoConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showPhotoConsent, setShowPhotoConsent] = useState(false);

  const consent = offerChecked && privacyChecked;

  const reset = () => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setOfferChecked(false);
    setPrivacyChecked(false);
    setPhotoConsentChecked(false);
    setDone(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast({ title: 'Поставьте галочки согласия', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone,
          email,
          consent,
          photo_consent: photoConsentChecked,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка отправки');
      setDone(true);
    } catch (err) {
      toast({
        title: 'Не удалось отправить заявку',
        description: err instanceof Error ? err.message : 'Попробуйте ещё раз',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTimeout(reset, 200);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {done ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
              <Icon name="CheckCircle2" size={32} className="text-accent" />
            </span>
            <h3 className="font-display text-xl font-bold text-foreground">
              Заявка отправлена!
            </h3>
            <p className="mt-2 text-muted-foreground">
              Спасибо! Мы получили вашу заявку на участие в церемонии и свяжемся с вами.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-accent px-7 py-3 text-base font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Готово
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">
                Заявка на участие
              </DialogTitle>
              <DialogDescription>
                Заполните форму — мы свяжемся с вами по поводу церемонии.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Иван"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Петров"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 900 123-45-67"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Электронная почта</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mail@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox
                    checked={offerChecked}
                    onCheckedChange={(v) => setOfferChecked(v === true)}
                    className="mt-1 shrink-0"
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    Я ознакомлен(а) и согласен(а) с условиями{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowOffer(true);
                      }}
                      className="font-semibold text-accent underline hover:opacity-80"
                    >
                      Договора-оферты
                    </button>
                    .
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox
                    checked={privacyChecked}
                    onCheckedChange={(v) => setPrivacyChecked(v === true)}
                    className="mt-1 shrink-0"
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    Я ознакомлен(а) с{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPrivacy(true);
                      }}
                      className="font-semibold text-accent underline hover:opacity-80"
                    >
                      Политикой конфиденциальности
                    </button>{' '}
                    и даю согласие на обработку моих персональных данных.
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox
                    checked={photoConsentChecked}
                    onCheckedChange={(v) => setPhotoConsentChecked(v === true)}
                    className="mt-1 shrink-0"
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    Я даю согласие на фото- и видеосъёмку, а также на
                    публикацию и использование моего изображения в материалах
                    Приморского краевого отделения «ОПОРА РОССИИ», посвящённых
                    мероприятию и проекту памятника Почётным Предпринимателям
                    Приморского края.{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPhotoConsent(true);
                      }}
                      className="font-semibold text-accent underline hover:opacity-80"
                    >
                      Условия согласия
                    </button>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !consent}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Отправляем...' : 'Отправить заявку'}
                {!loading && <Icon name="ArrowRight" size={18} />}
              </button>
            </form>
          </>
        )}
      </DialogContent>

      <Dialog open={showOffer} onOpenChange={setShowOffer}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Договор-оферта
            </DialogTitle>
          </DialogHeader>
          <ApplicationOfferText />
        </DialogContent>
      </Dialog>

      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Политика конфиденциальности
            </DialogTitle>
          </DialogHeader>
          <ApplicationPrivacyText />
        </DialogContent>
      </Dialog>

      <Dialog open={showPhotoConsent} onOpenChange={setShowPhotoConsent}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Согласие на фото- и видеосъёмку
            </DialogTitle>
          </DialogHeader>
          <PhotoConsentText />
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default ApplicationDialog;