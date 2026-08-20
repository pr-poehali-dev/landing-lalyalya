import { useState } from 'react';
import type { EntrepreneurItem } from '@/types/registries';
import { useRegistry } from '@/hooks/useRegistry';
import EntrepreneursCollapsible from './entrepreneurs/EntrepreneursCollapsible';
import PersonBioDialog from './entrepreneurs/PersonBioDialog';

const GreatEntrepreneurs = () => {
  const [open, setOpen] = useState(false);
  const [activePerson, setActivePerson] = useState<EntrepreneurItem | null>(null);
  const { items } = useRegistry<EntrepreneurItem>('entrepreneurs');

  return (
    <section className="bg-background pb-6 pt-2 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <EntrepreneursCollapsible
          open={open}
          onOpenChange={setOpen}
          onPersonClick={setActivePerson}
          people={items}
        />
      </div>

      <PersonBioDialog
        activePerson={activePerson}
        onOpenChange={(v) => !v && setActivePerson(null)}
      />
    </section>
  );
};

export default GreatEntrepreneurs;