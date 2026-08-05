import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { OfferText } from '@/components/consent/OfferText';
import { PrivacyPolicyText } from '@/components/consent/PrivacyPolicyText';

interface ConsentDialogsProps {
  showOffer: boolean;
  onOfferOpenChange: (open: boolean) => void;
  showPrivacy: boolean;
  onPrivacyOpenChange: (open: boolean) => void;
}

export const ConsentDialogs = ({
  showOffer,
  onOfferOpenChange,
  showPrivacy,
  onPrivacyOpenChange,
}: ConsentDialogsProps) => (
  <>
    <Dialog open={showOffer} onOpenChange={onOfferOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Договор-оферта</DialogTitle>
        </DialogHeader>
        <OfferText />
      </DialogContent>
    </Dialog>

    <Dialog open={showPrivacy} onOpenChange={onPrivacyOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Политика конфиденциальности
          </DialogTitle>
        </DialogHeader>
        <PrivacyPolicyText />
      </DialogContent>
    </Dialog>
  </>
);

export default ConsentDialogs;
