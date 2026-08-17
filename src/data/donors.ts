export interface Donor {
  name: string;
  amount: number;
  role: string;
  bio: string;
  photo?: string;
}

export const GOAL_AMOUNT = 15000000;

export const DONORS: Donor[] = [
  {
    name: 'Черников Сергей',
    amount: 10000,
    role: 'Основатель школы «Хакни Нейросети»',
    bio: 'Основатель первой живой школы по работе с нейросетями во Владивостоке «Хакни Нейросети».',
    photo:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/d1d00fdb-4cf5-4f64-ae0e-9558a08cd751.jpg',
  },
  {
    name: 'Жилинский Юрий Станиславович',
    amount: 0,
    role: 'Руководитель проекта «Почётные Предприниматели Приморья»',
    bio: 'Заместитель Председателя Приморского краевого отделения ОПОРА РОССИИ, координатор федерального партийного проекта «Единой России» «Выбирай Своё» в Приморском крае.',
    photo:
      'https://cdn.poehali.dev/projects/20c40919-c53c-4803-af73-3c78a03661eb/bucket/80099460-5d14-4f3e-9d35-b1eb386b4abc.jpg',
  },
];

export const TOTAL_RAISED = 10000;

export const formatAmount = (n: number) => `${n.toLocaleString('ru-RU')} ₽`;