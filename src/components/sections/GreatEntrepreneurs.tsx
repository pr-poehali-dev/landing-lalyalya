import { useState } from 'react';
import type { Person } from '@/data/entrepreneurs';
import EntrepreneursCollapsible from './entrepreneurs/EntrepreneursCollapsible';
import PersonBioDialog from './entrepreneurs/PersonBioDialog';

const GreatEntrepreneurs = () => {
  const [open, setOpen] = useState(false);
  const [activePerson, setActivePerson] = useState<Person | null>(null);

  return (
    <section className="bg-background pb-6 pt-2 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <EntrepreneursCollapsible
          open={open}
          onOpenChange={setOpen}
          onPersonClick={setActivePerson}
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
