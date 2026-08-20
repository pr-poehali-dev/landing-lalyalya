import Icon from '@/components/ui/icon';

interface FaqAnswerProps {
  text: string;
}

const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const IS_URL = /^https?:\/\/[^\s]+$/;

const FaqAnswer = ({ text }: FaqAnswerProps) => {
  const paragraphs = text.split('\n\n');

  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph, i) => {
        const parts = paragraph.split(URL_REGEX);
        return (
          <p key={i}>
            {parts.map((part, j) =>
              IS_URL.test(part) ? (
                <a
                  key={j}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon name="Navigation" size={16} />
                  Открыть ссылку
                </a>
              ) : (
                <span key={j}>{part}</span>
              ),
            )}
          </p>
        );
      })}
    </div>
  );
};

export default FaqAnswer;