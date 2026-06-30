interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <svg
        width="34"
        height="24"
        viewBox="0 0 34 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <path
          d="M1 22L9 9L14 15L21 3L33 22"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/80"
        />
        <circle cx="21" cy="3" r="2.6" className="fill-primary" />
      </svg>
      <span className="font-display text-2xl font-semibold tracking-wide leading-none">
        ВДТ
      </span>
    </div>
  );
};

export default Logo;
