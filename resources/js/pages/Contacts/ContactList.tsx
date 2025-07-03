import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Head, Link, usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserRoundCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contacts',
        href: '/contacts',
    },
];

export default function ContactList({ contacts = [] }: { contacts?: any[] }) {
  const flash = usePage().props.flash as { message?: string };
  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="My Page" />
        <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto"'>
          {flash.message && (
            <Alert>
              <UserRoundCheck />
              <AlertTitle>Notification!</AlertTitle>
              <AlertDescription>
                {flash.message}
              </AlertDescription>
            </Alert>
          )}
           <h1 className='text-2xl font-bold'>Contact list</h1>
           <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button asChild>
              <Link href={route('contacts.create')}>Add New</Link>
            </Button>
           </div>
            {contacts ?
            <table className='w-full table-auto text-left'>
             {contacts?.map((person: any, index: number) => (
               <tr key={index} className='border border-gray-600'>
                 <th className='text-md p-2'>{person.name}</th>
                 <td>{person.email}</td>
                 <td>{person.phone}</td>
                 <td>{person.note}</td>
               </tr>
             ))}
            </table>
             : 
             <p>No data has found</p>
             }
        </div>
      </AppLayout>
    </>
  );
}