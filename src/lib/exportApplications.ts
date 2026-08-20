import * as XLSX from 'xlsx';

interface Application {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  photo_consent?: boolean;
  created_at: string | null;
}

const formatDate = (iso: string | null) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const exportApplicationsToExcel = (items: Application[]) => {
  const rows = items.map((a, i) => ({
    '#': i + 1,
    Имя: a.first_name,
    Фамилия: a.last_name,
    Телефон: a.phone,
    Почта: a.email,
    'Фото/видео': a.photo_consent ? 'Да' : 'Нет',
    'Дата заявки': formatDate(a.created_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [
    { wch: 4 },
    { wch: 18 },
    { wch: 18 },
    { wch: 16 },
    { wch: 26 },
    { wch: 12 },
    { wch: 18 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Заявки');

  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `Заявки на церемонию ${today}.xlsx`);
};
