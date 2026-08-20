import Icon from '@/components/ui/icon';
import AdminStats from '@/components/admin/AdminStats';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import AdminApplicationsTable from '@/components/admin/AdminApplicationsTable';
import AdminEditDialog from '@/components/admin/AdminEditDialog';
import AdminDeleteDialog from '@/components/admin/AdminDeleteDialog';
import { exportApplicationsToExcel } from '@/lib/exportApplications';
import { useAdminApplications } from '@/hooks/useAdminApplications';

const Admin = () => {
  const {
    password,
    setPassword,
    authed,
    items,
    loading,
    error,
    editItem,
    setEditItem,
    deleteItem,
    setDeleteItem,
    saving,
    fetchData,
    logout,
    saveEdit,
    confirmDelete,
  } = useAdminApplications();

  if (!authed) {
    return (
      <AdminLoginForm
        password={password}
        onPasswordChange={setPassword}
        onSubmit={() => fetchData(password)}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-primary">
              Заявки на участие
            </h1>
            <p className="mt-1 text-muted-foreground">
              Всего заявок: <span className="font-semibold">{items.length}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => exportApplicationsToExcel(items)}
              disabled={items.length === 0}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="Download" size={16} />
              Экспорт в Excel
            </button>
            <button
              onClick={() => fetchData(password)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Icon name="RefreshCw" size={16} />
              Обновить
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border-2 border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-surface"
            >
              <Icon name="LogOut" size={16} />
              Выйти
            </button>
          </div>
        </div>

        <AdminStats items={items} />

        <AdminApplicationsTable
          items={items}
          onEdit={setEditItem}
          onDelete={setDeleteItem}
        />
      </div>

      <AdminEditDialog
        editItem={editItem}
        onChange={setEditItem}
        onClose={() => setEditItem(null)}
        onSave={saveEdit}
        saving={saving}
      />

      <AdminDeleteDialog
        deleteItem={deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Admin;
