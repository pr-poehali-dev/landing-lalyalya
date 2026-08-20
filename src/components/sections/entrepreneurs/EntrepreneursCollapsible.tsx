import Icon from '@/components/ui/icon';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { EntrepreneurItem } from '@/types/registries';
import PersonCard from './PersonCard';

interface EntrepreneursCollapsibleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPersonClick: (person: EntrepreneurItem) => void;
  people: EntrepreneurItem[];
}

const EntrepreneursCollapsible = ({
  open,
  onOpenChange,
  onPersonClick,
  people,
}: EntrepreneursCollapsibleProps) => (
  <Collapsible open={open} onOpenChange={onOpenChange}>
    <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary-highlight px-6 py-5 text-left shadow-sm transition hover:border-primary/35 hover:shadow-md">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 flex-col overflow-hidden rounded-full border border-primary/10 transition group-hover:border-primary/20">
          <span className="flex-1 bg-white" />
          <span className="flex-1 bg-[#0039A6]" />
          <span className="flex-1 bg-[#D52B1E]" />
        </span>
        <div>
          <span className="block font-display text-xl font-bold text-primary">
            Почëтные Предприниматели Приморья
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={14} className="shrink-0" />
            {open ? 'Свернуть' : 'Нажмите, чтобы узнать больше'}
          </span>
        </div>
      </div>
      <Icon
        name={open ? 'ChevronUp' : 'ChevronDown'}
        size={22}
        className={`shrink-0 text-primary transition-transform group-hover:translate-y-0.5 ${open ? '' : 'animate-pulse'}`}
      />
    </CollapsibleTrigger>
    <CollapsibleContent className="mt-4 space-y-6">
      <div className="space-y-3 text-muted-foreground">
        <p>
          История края — это история людей, чьи решения, труд и предпринимательская
          энергия влияли на развитие территорий, городов, торговли, промышленности
          и культуры.
        </p>
        <p>Список предпринимателей, оставивших заметный след в истории Приморья:</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {people.map((person) => (
          <PersonCard key={person.id} person={person} onClick={onPersonClick} />
        ))}
      </div>

      <p className="border-t border-border pt-6 text-center italic text-muted-foreground">
        Раздел будет дополняться историями людей, которые своим делом формировали
        и продолжают формировать Приморье.
      </p>
    </CollapsibleContent>
  </Collapsible>
);

export default EntrepreneursCollapsible;