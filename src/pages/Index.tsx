import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const BOOKING_URL = 'https://functions.poehali.dev/11057bad-445f-408a-9321-cb13b8603f12';

const HERO_IMAGE =
  'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/75ddd54e-31c1-4eef-b079-f3ee728a5ec9.jpg';

const FEATURES = [
  {
    icon: 'KeyRound',
    title: 'Заселение 24/7 без ключей',
    text: 'Умный замок открывается кодом на телефоне. Прилетаете в 3 ночи? Всё будет готово.',
  },
  {
    icon: 'FileText',
    title: 'Документы для командировки',
    text: 'Договор, акт, чек — всё с печатью. Принимается в любой бухгалтерии.',
  },
  {
    icon: 'Bath',
    title: 'Как дома, только лучше',
    text: 'Полная кухня, стиральная машина, кофемашина, Smart TV, уборка включена.',
  },
  {
    icon: 'Waves',
    title: 'Вид на море или в центре',
    text: 'Квартиры у Амурского залива, в центре и у вокзала — выберите локацию.',
  },
  {
    icon: 'Wallet',
    title: 'На 30–40% дешевле отеля',
    text: 'Те же удобства, своя кухня, никакой комиссии агрегаторов.',
  },
  {
    icon: 'MessageCircle',
    title: 'Поддержка за 5 минут',
    text: 'Пишите в WhatsApp, Telegram или звоните — ответим быстрее ресепшена.',
  },
];

const APARTMENTS = [
  {
    image:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/bd1da464-6eba-4c91-b1d8-d67cebf71efb.jpg',
    title: 'Студия у моря',
    address: 'ул. Набережная, 12 · Амурский залив',
    beds: '1 спальное место',
    area: '32 м²',
    amenities: ['Кухня', 'Smart TV', 'Вид на залив', 'Умный замок'],
    price: 'от 3 200 ₽/ночь',
  },
  {
    image:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/aa20563f-f97c-42d2-bff6-f94430f4ab4a.jpg',
    title: 'Апартаменты в центре',
    address: 'ул. Светланская, 45 · Центр города',
    beds: '4 спальных места',
    area: '54 м²',
    amenities: ['Полная кухня', 'Стиральная машина', 'Кофемашина', 'Парковка'],
    price: 'от 4 800 ₽/ночь',
  },
  {
    image:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/files/f0fdb2e7-3a6b-41bb-b126-a3937d95a032.jpg',
    title: 'Семейные апартаменты',
    address: 'ул. Морская, 8 · У вокзала',
    beds: '6 спальных мест',
    area: '78 м²',
    amenities: ['2 спальни', 'Панорамный вид', 'Посудомойка', 'Уборка включена'],
    price: 'от 6 500 ₽/ночь',
  },
];

const REVIEWS = [
  {
    text: 'Прилетели поздно ночью, заселились по коду без всякого ресепшена. Квартира — точь-в-точь как на фото, вид на залив шикарный. Вернёмся снова!',
    name: 'Анна Ковалёва',
    meta: 'Москва · отпуск с семьёй',
  },
  {
    text: 'Был в командировке, нужны были документы для бухгалтерии — выдали договор и чек с печатью без вопросов. Дешевле отеля, а удобств больше.',
    name: 'Дмитрий Соколов',
    meta: 'Новосибирск · командировка',
  },
  {
    text: 'Отвечали в Telegram за пару минут на любой вопрос. Кофемашина, стиралка, своя кухня — жили как дома. Однозначно рекомендую.',
    name: 'Елена Морозова',
    meta: 'Хабаровск · рабочая поездка',
  },
];

const FAQ = [
  {
    q: 'Как происходит заселение?',
    a: 'Мы пришлём код от умного замка за 1 час до заезда. Войдёте сами в любое время.',
  },
  {
    q: 'Можно получить документы для командировки?',
    a: 'Да, всегда. Договор, акт, чек — сообщите при бронировании.',
  },
  {
    q: 'Что если мне что-то не понравится?',
    a: 'Напишите в мессенджер в течение 30 минут — решим вопрос или предложим замену.',
  },
  {
    q: 'Можно заехать рано утром или поздно ночью?',
    a: 'Да, бесконтактное заселение работает 24/7.',
  },
  {
    q: 'Как вы отличаетесь от Avito и Sutochno?',
    a: 'Без комиссии агрегаторов, единая поддержка, гарантированное качество.',
  },
];

const NAV_LINKS = [
  { label: 'Преимущества', href: '#why' },
  { label: 'Квартиры', href: '#catalog' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Вопросы', href: '#faq' },
];

const GUESTS_OPTIONS = ['1', '2', '3–4', '5+'];
const PURPOSE_OPTIONS = [
  'Туризм',
  'Командировка — нужны документы',
  'Другое',
];

const Index = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    purpose: 'Туризм',
  });
  const [loading, setLoading] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackLoading, setCallbackLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) {
      toast({
        title: 'Укажите телефон',
        description: 'Оставьте номер — и мы перезвоним.',
        variant: 'destructive',
      });
      return;
    }
    setCallbackLoading(true);
    try {
      const res = await fetch(BOOKING_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Заявка на звонок',
          phone: callbackPhone,
          purpose: 'Перезвоните мне',
        }),
      });
      if (!res.ok) throw new Error('fail');
      toast({
        title: 'Заявка принята!',
        description: 'Перезвоним вам в ближайшее время.',
      });
      setCallbackPhone('');
    } catch {
      toast({
        title: 'Не удалось отправить',
        description: 'Попробуйте ещё раз или напишите нам в Telegram.',
        variant: 'destructive',
      });
    } finally {
      setCallbackLoading(false);
    }
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({
        title: 'Заполните имя и контакт',
        description: 'Укажите, как к вам обращаться и куда перезвонить.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(BOOKING_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('fail');
      toast({
        title: 'Заявка отправлена!',
        description: 'Перезвоним за 5 минут и подберём лучший вариант.',
      });
      setForm({
        name: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '2',
        purpose: 'Туризм',
      });
    } catch {
      toast({
        title: 'Не удалось отправить',
        description: 'Попробуйте ещё раз или напишите нам в Telegram.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0D1B2A]/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#" className="font-display text-lg font-extrabold text-white">
            Квартиры у моря
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-200 transition hover:text-[#C9A84C]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="rounded-full bg-[#C9A84C] px-5 py-2 font-display text-sm font-semibold text-[#0D1B2A] transition hover:bg-[#d8b95e]"
            >
              Забронировать
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
            aria-label="Меню"
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>

        {menuOpen && (
          <nav className="animate-fade-in border-t border-white/10 bg-[#0D1B2A] px-6 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-gray-200 transition hover:bg-white/10 hover:text-[#C9A84C]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-xl bg-[#C9A84C] px-3 py-3 text-center font-display text-base font-semibold text-[#0D1B2A] transition hover:bg-[#d8b95e]"
              >
                Забронировать
              </a>
            </div>
          </nav>
        )}
      </header>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0D1B2A]">
        <img
          src={HERO_IMAGE}
          alt="Панорамная квартира с видом на море во Владивостоке"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/50 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:px-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Квартиры у моря во Владивостоке — заселение за 5 минут без ожидания
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
              Апартаменты с дизайнерским ремонтом, видом на Амурский залив и
              умным замком. Заселяйтесь в любое время — ключи не нужны.
            </p>

            <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#C9A84C] px-8 py-4 font-display text-base font-semibold text-[#0D1B2A] transition hover:scale-105 hover:bg-[#d8b95e]">
              → Выбрать квартиру и забронировать
            </button>

            <ul className="mt-8 flex flex-col gap-3 text-gray-200 sm:flex-row sm:flex-wrap sm:gap-6">
              {[
                'Без комиссии агрегаторов',
                'Договор и чек для бухгалтерии',
                'Ответим за 5 минут',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A84C] text-xs font-bold text-[#0D1B2A]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="why" className="bg-[#F8F9FA] py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-[#0D1B2A] md:text-5xl">
              Почему 847 гостей выбрали нас вместо отеля
            </h2>
            <p className="mt-5 text-lg text-gray-600 md:text-xl">
              Отели берут деньги за завтрак, который вам не нужен. Агрегаторы
              добавляют 15–20% комиссии. Мы — нет.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-[#C9A84C] text-[#C9A84C]">
                  <Icon name={feature.icon} size={28} className="icon-animated" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-[#0D1B2A]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="bg-[#0D1B2A] py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Выберите свою квартиру
            </h2>
            <p className="mt-5 text-lg text-gray-300 md:text-xl">
              От уютной студии у моря до просторных апартаментов для семьи
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {APARTMENTS.map((apt) => (
              <div
                key={apt.title}
                className="flex flex-col overflow-hidden rounded-2xl bg-[#1A2C3D] shadow-lg transition hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={apt.image}
                    alt={apt.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-white">
                    {apt.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">{apt.address}</p>

                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-300">
                    <span className="flex items-center gap-2">
                      <Icon name="BedDouble" size={18} className="text-[#C9A84C] icon-animated" />
                      {apt.beds}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon name="Maximize" size={18} className="text-[#C9A84C] icon-animated" />
                      {apt.area}
                    </span>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {apt.amenities.map((a) => (
                      <li
                        key={a}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 font-display text-2xl font-bold text-[#C9A84C]">
                    {apt.price}
                  </div>

                  <button className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C9A84C] px-6 py-3 font-display text-sm font-semibold text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-[#0D1B2A]">
                    Смотреть и бронировать →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-[#F8F9FA] py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-[#0D1B2A] md:text-5xl">
              Что говорят наши гости
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
              >
                <div className="flex gap-1 text-[#C9A84C]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={18}
                      className="fill-[#C9A84C] icon-animated"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <p className="mt-5 flex-1 text-gray-700">«{review.text}»</p>
                <div className="mt-6">
                  <div className="font-bold text-[#0D1B2A]">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="bg-[#0D1B2A] py-20 md:py-28">
        <div className="mx-auto w-full max-w-2xl px-6 md:px-10">
          <div className="text-center">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Забронировать квартиру — это 2 минуты
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Оставьте заявку — перезвоним за 5 минут и подберём лучший вариант
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-3xl bg-white p-7 shadow-2xl md:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Ваше имя</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Как к вам обращаться"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-[#0D1B2A] outline-none transition focus:border-[#C9A84C]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Телефон или Telegram
                </span>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="+7 999 123-45-67"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-[#0D1B2A] outline-none transition focus:border-[#C9A84C]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Дата заезда</span>
                <input
                  type="date"
                  value={form.checkIn}
                  onChange={(e) => update('checkIn', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-[#0D1B2A] outline-none transition focus:border-[#C9A84C]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Дата выезда</span>
                <input
                  type="date"
                  value={form.checkOut}
                  onChange={(e) => update('checkOut', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-[#0D1B2A] outline-none transition focus:border-[#C9A84C]"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-medium text-gray-700">
                Количество гостей
              </span>
              <select
                value={form.guests}
                onChange={(e) => update('guests', e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[#0D1B2A] outline-none transition focus:border-[#C9A84C]"
              >
                {GUESTS_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-5">
              <span className="text-sm font-medium text-gray-700">Цель поездки</span>
              <div className="mt-2 flex flex-col gap-2">
                {PURPOSE_OPTIONS.map((p) => (
                  <label
                    key={p}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 transition hover:border-[#C9A84C]"
                  >
                    <input
                      type="radio"
                      name="purpose"
                      value={p}
                      checked={form.purpose === p}
                      onChange={(e) => update('purpose', e.target.value)}
                      className="h-4 w-4 accent-[#C9A84C]"
                    />
                    <span className="text-[#0D1B2A]">{p}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-7 w-full rounded-xl bg-[#C9A84C] py-4 font-display text-base font-semibold text-[#0D1B2A] transition hover:bg-[#d8b95e] disabled:opacity-60"
            >
              {loading ? 'Отправляем…' : '→ Отправить заявку и получить подтверждение'}
            </button>

            <p className="mt-4 text-center text-sm text-gray-400">
              🔒 Не передаём данные третьим лицам
            </p>
          </form>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-gray-200 sm:flex-row sm:gap-8">
            <a
              href="https://t.me/username"
              className="flex items-center gap-2 transition hover:text-[#C9A84C]"
            >
              <Icon name="Send" size={20} className="text-[#C9A84C] icon-animated" />
              Telegram @username
            </a>
            <a
              href="tel:+74232000000"
              className="flex items-center gap-2 transition hover:text-[#C9A84C]"
            >
              <Icon name="Phone" size={20} className="text-[#C9A84C] icon-animated" />
              +7 (423) 200-00-00
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#F8F9FA] py-20 md:py-28">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-10">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-[#0D1B2A] md:text-4xl">
            Ещё сомневаетесь? Вот ответы на частые вопросы
          </h2>

          <Accordion type="single" collapsible className="mt-10">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="mb-3 rounded-2xl border border-gray-200 bg-white px-5"
              >
                <AccordionTrigger className="text-left font-display text-lg font-semibold text-[#0D1B2A] hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#0D1B2A] py-20 md:py-24">
        <div className="mx-auto w-full max-w-3xl px-6 text-center md:px-10">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
            Приезжайте во Владивосток — мы уже готовим ключ
          </h2>
          <form
            onSubmit={handleCallback}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="tel"
              value={callbackPhone}
              onChange={(e) => setCallbackPhone(e.target.value)}
              placeholder="+7 999 123-45-67"
              className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-gray-400 outline-none transition focus:border-[#C9A84C]"
            />
            <button
              type="submit"
              disabled={callbackLoading}
              className="rounded-xl bg-[#C9A84C] px-8 py-4 font-display text-base font-semibold text-[#0D1B2A] transition hover:bg-[#d8b95e] disabled:opacity-60"
            >
              {callbackLoading ? 'Отправляем…' : 'Перезвоните мне →'}
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-[#0D1B2A] border-t border-white/10 py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-3 md:px-10">
          <div>
            <div className="font-display text-xl font-extrabold text-white">
              Квартиры у моря
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Апартаменты с дизайнерским ремонтом и видом на Амурский залив
              во Владивостоке.
            </p>
          </div>

          <div className="text-sm text-gray-300">
            <div className="mb-3 font-semibold text-white">Контакты</div>
            <p className="flex items-center gap-2">
              <Icon name="MapPin" size={16} className="text-[#C9A84C] icon-animated" />
              г. Владивосток, ул. Светланская, 45
            </p>
            <p className="mt-2 flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-[#C9A84C] icon-animated" />
              <a href="tel:+74232000000" className="hover:text-[#C9A84C]">
                +7 (423) 200-00-00
              </a>
            </p>
            <p className="mt-2 flex items-center gap-2">
              <Icon name="Send" size={16} className="text-[#C9A84C] icon-animated" />
              <a href="https://t.me/username" className="hover:text-[#C9A84C]">
                Telegram @username
              </a>
            </p>
            <p className="mt-2 flex items-center gap-2">
              <Icon name="Mail" size={16} className="text-[#C9A84C] icon-animated" />
              <a href="mailto:hello@example.ru" className="hover:text-[#C9A84C]">
                hello@example.ru
              </a>
            </p>
          </div>

          <div className="text-sm text-gray-300">
            <div className="mb-3 font-semibold text-white">Режим работы</div>
            <p className="flex items-center gap-2">
              <Icon name="Clock" size={16} className="text-[#C9A84C] icon-animated" />
              Поддержка 24/7, заселение круглосуточно
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a href="#" className="hover:text-[#C9A84C]">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-[#C9A84C]">
                Публичная оферта
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl px-6 text-sm text-gray-500 md:px-10">
          © {new Date().getFullYear()} Квартиры у моря. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default Index;