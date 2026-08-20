import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import RegistryTab from './RegistryTab';

interface AdminRegistriesProps {
  password: string;
}

const AdminRegistries = ({ password }: AdminRegistriesProps) => {
  return (
    <div className="rounded-2xl border border-border bg-background p-4 shadow-sm md:p-6">
      <h2 className="mb-4 font-display text-xl font-bold text-primary">
        Реестры сайта
      </h2>
      <Tabs defaultValue="entrepreneurs">
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="entrepreneurs">Предприниматели</TabsTrigger>
          <TabsTrigger value="donors">Список неравнодушных</TabsTrigger>
          <TabsTrigger value="partners">Партнёры</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="entrepreneurs">
          <RegistryTab
            type="entrepreneurs"
            password={password}
            fields={[
              { key: 'name', label: 'Имя', type: 'text' },
              { key: 'title', label: 'Титул (необязательно)', type: 'text' },
              { key: 'photo', label: 'Ссылка на фото (необязательно)', type: 'text' },
              { key: 'bio', label: 'Биография', type: 'textarea' },
            ]}
            emptyItem={{ name: '', title: '', photo: '', bio: '' }}
            renderTitle={(item) => String(item.name)}
            renderSubtitle={(item) => (item.title ? String(item.title) : '')}
            addLabel="Новый предприниматель"
            editLabel="Редактировать предпринимателя"
          />
        </TabsContent>

        <TabsContent value="donors">
          <RegistryTab
            type="donors"
            password={password}
            fields={[
              { key: 'name', label: 'Имя', type: 'text' },
              { key: 'amount', label: 'Сумма (₽)', type: 'number' },
              { key: 'role', label: 'Роль / должность', type: 'text' },
              { key: 'bio', label: 'Описание', type: 'textarea' },
              { key: 'photo', label: 'Ссылка на фото (необязательно)', type: 'text' },
            ]}
            emptyItem={{ name: '', amount: 0, role: '', bio: '', photo: '' }}
            renderTitle={(item) => String(item.name)}
            renderSubtitle={(item) => `${Number(item.amount || 0).toLocaleString('ru-RU')} ₽`}
            addLabel="Новая запись"
            editLabel="Редактировать запись"
          />
        </TabsContent>

        <TabsContent value="partners">
          <RegistryTab
            type="partners"
            password={password}
            fields={[
              { key: 'name', label: 'Название', type: 'text' },
              { key: 'logo', label: 'Ссылка на логотип', type: 'text' },
            ]}
            emptyItem={{ name: '', logo: '' }}
            renderTitle={(item) => String(item.name)}
            addLabel="Новый партнёр"
            editLabel="Редактировать партнёра"
          />
        </TabsContent>

        <TabsContent value="faq">
          <RegistryTab
            type="faq"
            password={password}
            fields={[
              { key: 'question', label: 'Вопрос', type: 'text' },
              { key: 'answer', label: 'Ответ', type: 'textarea' },
            ]}
            emptyItem={{ question: '', answer: '' }}
            renderTitle={(item) => String(item.question)}
            addLabel="Новый вопрос"
            editLabel="Редактировать вопрос"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRegistries;