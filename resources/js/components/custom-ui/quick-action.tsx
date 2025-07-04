import { SquarePen } from 'lucide-react';
import { Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {Link, useForm} from '@inertiajs/react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function QuickAction({id, name} : {id: number, name: string} ) {
    const {processing, delete: destroy} = useForm();
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
        destroy(route('contacts.destroy', id));
        }
    }

    return (
        <div className="flex gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                     <Button className='text-white cursor-pointer bg-slate-600 hover:bg-slate-700' asChild>
                        <Link href={route('contacts.edit', id)}><SquarePen /></Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit {name}</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button disabled={processing} onClick={() => handleDelete(id, name)} className='bg-red-600 text-white cursor-pointer hover:bg-red-700'>
                        <Trash />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete {name}</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}