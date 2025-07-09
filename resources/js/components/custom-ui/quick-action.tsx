import { useState } from "react";
import { SquarePen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function QuickAction({ id, name }: { id: number; name: string }) {
    const { processing, delete: destroy } = useForm();
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        destroy(route("contacts.destroy", id));
        setOpen(false);
    };

    return (
        <div className="flex gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button className="text-white cursor-pointer bg-slate-600 hover:bg-slate-700" asChild>
                        <Link href={route("contacts.edit", id)}>
                            <SquarePen />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit {name}</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        disabled={processing}
                        onClick={() => setOpen(true)}
                        className="bg-red-600 text-white cursor-pointer hover:bg-red-700"
                    >
                        <Trash />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete {name}</p>
                </TooltipContent>
            </Tooltip>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete {name}?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={processing}
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}