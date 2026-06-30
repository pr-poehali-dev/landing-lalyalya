interface SectionHeadingProps {
  label: string;
  title?: string;
  body?: string;
  center?: boolean;
}

const SectionHeading = ({ label, title, body, center }: SectionHeadingProps) => {
  return (
    <div className={center ? 'text-center' : ''}>
      <p
        className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-primary mb-4 before:block before:w-[18px] before:h-px before:bg-primary ${
          center ? 'justify-center' : ''
        }`}
      >
        {label}
      </p>
      {title && (
        <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-bold leading-tight text-foreground mb-4">
          {title}
        </h2>
      )}
      {body && (
        <p className="text-base text-muted-foreground leading-relaxed max-w-[65ch] mx-auto">
          {body}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
