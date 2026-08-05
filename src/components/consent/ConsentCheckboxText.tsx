interface ConsentCheckboxTextProps {
  onOfferClick: () => void;
  onPrivacyClick: () => void;
}

export const ConsentCheckboxText = ({
  onOfferClick,
  onPrivacyClick,
}: ConsentCheckboxTextProps) => (
  <span>
    Отправляя заявку, я подтверждаю, что ознакомлен(а) и согласен(а) с условиями{' '}
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onOfferClick();
      }}
      className="font-semibold text-accent underline hover:opacity-80"
    >
      Договора-оферты
    </button>{' '}
    и{' '}
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onPrivacyClick();
      }}
      className="font-semibold text-accent underline hover:opacity-80"
    >
      Политики конфиденциальности
    </button>
    , а также даю согласие на обработку моих персональных данных.
  </span>
);

export default ConsentCheckboxText;
