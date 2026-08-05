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

const ConsentText = ({ className, checked, onCheckedChange }: ConsentTextProps) => {
  const [showOffer, setShowOffer] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const withCheckbox = onCheckedChange !== undefined;

  const text = (
    <span className={withCheckbox ? undefined : className ?? 'text-xs leading-relaxed text-muted-foreground'}>
      <ConsentCheckboxText
        onOfferClick={() => setShowOffer(true)}
        onPrivacyClick={() => setShowPrivacy(true)}
      />
    </span>
  );

  return (
    <>
      {withCheckbox ? (
        <label className={className ?? 'flex cursor-pointer items-start gap-3'}>
          <Checkbox
            checked={checked}
            onCheckedChange={(v) => onCheckedChange?.(v === true)}
            className="mt-1 shrink-0"
          />
          <span className="text-xs leading-relaxed text-muted-foreground">{text}</span>
        </label>
      ) : (
        <p className={className ?? 'text-xs leading-relaxed text-muted-foreground'}>{text}</p>
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
