import Icon from '@/components/ui/icon';
import type { Person } from '@/data/entrepreneurs';

interface PersonCardProps {
  person: Person;
  onClick: (person: Person) => void;
}

const PersonCard = ({ person, onClick }: PersonCardProps) => (
  <button
    type="button"
    onClick={() => onClick(person)}
    aria-label={`История: ${person.name}`}
    className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left shadow-sm transition hover:border-primary/40 hover:shadow-md"
  >
    {person.photo ? (
      <img
        src={person.photo}
        alt={person.name}
        className="h-10 w-10 shrink-0 rounded-full border border-border object-cover"
      />
    ) : (
      <span className="h-10 w-10 shrink-0 rounded-full border border-border bg-muted" />
    )}
    <span className="flex-1 text-sm font-medium text-foreground">{person.name}</span>
    <Icon
      name="MousePointerClick"
      size={20}
      className="shrink-0 animate-pulse text-[#D52B1E]"
    />
  </button>
);

export default PersonCard;
