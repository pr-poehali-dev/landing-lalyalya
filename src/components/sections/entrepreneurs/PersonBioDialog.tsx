import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { EntrepreneurItem } from '@/types/registries';

interface PersonBioDialogProps {
  activePerson: EntrepreneurItem | null;
  onOpenChange: (open: boolean) => void;
}

const PersonBioDialog = ({ activePerson, onOpenChange }: PersonBioDialogProps) => (
  <Dialog open={!!activePerson} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
      <DialogHeader>
        <div className="mb-2 flex items-center gap-3">
          {activePerson?.photo ? (
            <img
              src={activePerson.photo}
              alt={activePerson.name}
              className="h-16 w-16 shrink-0 rounded-full border border-border object-cover"
            />
          ) : (
            <span className="h-16 w-16 shrink-0 rounded-full border border-border bg-muted" />
          )}
          <div>
            <DialogTitle className="text-left">{activePerson?.name}</DialogTitle>
            {activePerson?.title && (
              <p className="mt-0.5 text-sm font-semibold text-accent">
                {activePerson.title}
              </p>
            )}
          </div>
        </div>
        <DialogDescription asChild>
          <div className="space-y-3 text-left leading-relaxed">
            {activePerson?.bio
              ? activePerson.bio
                  .split('\n\n')
                  .map((paragraph, i) => <p key={i}>{paragraph}</p>)
              : <p>История этого предпринимателя скоро появится здесь.</p>}
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export default PersonBioDialog;