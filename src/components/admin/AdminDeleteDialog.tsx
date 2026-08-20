import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Application } from '@/hooks/useAdminApplications';

interface AdminDeleteDialogProps {
  deleteItem: Application | null;
  onClose: () => void;
  onConfirm: () => void;
}

const AdminDeleteDialog = ({ deleteItem, onClose, onConfirm }: AdminDeleteDialogProps) => (
  <AlertDialog open={!!deleteItem} onOpenChange={(v) => !v && onClose()}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Удалить заявку?</AlertDialogTitle>
        <AlertDialogDescription>
          {deleteItem &&
            `Заявка «${deleteItem.first_name} ${deleteItem.last_name}» будет удалена без возможности восстановления.`}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Отмена</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
          Удалить
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default AdminDeleteDialog;
