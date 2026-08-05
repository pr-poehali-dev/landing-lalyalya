import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ConsentCheckboxText } from '@/components/consent/ConsentCheckboxText';
import { ConsentDialogs } from '@/components/consent/ConsentDialogs';
import { PrivacyPolicyText } from '@/components/consent/PrivacyPolicyText';
import { OfferText } from '@/components/consent/OfferText';

interface ConsentTextProps {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const ConsentText = ({ className, onCheckedChange }: ConsentTextProps) => {
  const [showOffer, setShowOffer] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [offerChecked, setOfferChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const withCheckbox = onCheckedChange !== undefined;

  const updateOfferChecked = (v: boolean) => {
    setOfferChecked(v);
    onCheckedChange?.(v && privacyChecked);
  };

  const updatePrivacyChecked = (v: boolean) => {
    setPrivacyChecked(v);
    onCheckedChange?.(offerChecked && v);
  };

  return (
    <>
      {withCheckbox ? (
        <div className={className ?? 'mt-4 space-y-2'}>
          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={offerChecked}
              onCheckedChange={(v) => updateOfferChecked(v === true)}
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
              onCheckedChange={(v) => updatePrivacyChecked(v === true)}
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
        </div>
      ) : (
        <p className={className ?? 'text-xs leading-relaxed text-muted-foreground'}>
          <ConsentCheckboxText
            onOfferClick={() => setShowOffer(true)}
            onPrivacyClick={() => setShowPrivacy(true)}
          />
        </p>
      )}

      <ConsentDialogs
        showOffer={showOffer}
        onOfferOpenChange={setShowOffer}
        showPrivacy={showPrivacy}
        onPrivacyOpenChange={setShowPrivacy}
      />
    </>
  );
};

export { PrivacyPolicyText, OfferText };
export default ConsentText;