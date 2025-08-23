import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
  } from "@/components/ui/alert-dialog";
  import { Trash2 } from "lucide-react";
  
  interface ConfirmDeleteDialogProps {
    onConfirm: () => void;
    title?: string;
    description?: string;
  }
  
  export const DeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
    onConfirm,
    title = "Delete item?",
    description = "This action cannot be undone. This will permanently delete the item.",
  }) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="p-2 rounded-md bg-destructive/20 hover:bg-destructive/30 transition-colors flex items-center justify-center">
            <Trash2 className="h-4 w-4 text-destructive" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  