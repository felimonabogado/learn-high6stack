import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserRoundCheck } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Contacts',
    href: '/contacts',
  },
];

export default function ContactList({ contacts = [] }: { contacts?: any[] }) {
  const flash = usePage().props.flash as { message?: string };

  const {processing, delete: destroy} = useForm();

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      destroy(route('contacts.destroy', id));
    }
  }

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
            <Table>
              <TableCaption>Contact Person List</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='font-bold'>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className='text-center font-semibold'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts?.map((person: any, index: number) => (
                <TableRow>
                  <TableCell>{person.name}</TableCell>
                  <TableCell><a href={`mailto:${person.email}`}>{person.email}</a></TableCell>
                  <TableCell><a href={`tel:${person.phone}`}>{person.phone}</a></TableCell>
                  <TableCell>{person.note}</TableCell>
                  <TableCell className='text-center space-x-2'>
                    <Button className='text-white cursor-pointer bg-slate-600 hover:bg-slate-700' asChild>
                      <Link href={route('contacts.edit', person.id)}>Edit</Link>
                    </Button>
                    <Button disabled={processing} onClick={() => handleDelete(person.id, person.name)} className='bg-red-600 text-white cursor-pointer hover:bg-red-700'>Delete</Button>
                  </TableCell>
                </TableRow>
                 ))}
              </TableBody>
            </Table>
            :
            <p>No data has found</p>
          }

        </div>
      </AppLayout>
    </>
  );
}