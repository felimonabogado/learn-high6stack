import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, UserRoundCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { QuickAction } from '@/components/custom-ui/quick-action';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Contacts',
    href: '/contacts',
  },
];


export default function ContactList({filters}: {filters: string}) {
  const flash = usePage().props.flash as { message?: string };
  const contacts = usePage().props.contacts as {
    data: any[];
    links: any[];
  };

  const { data, setData, get } = useForm({
    search: filters || '',
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    get(route('contacts', { search: data.search }));
  };

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
          <h1 className='text-2xl font-bold'>Contact List</h1>
          <div className="flex flex-wrap items-center place-content-between gap-2 md:flex-row">
            <Button asChild>
              <Link href={route('contacts.create')}>Add New</Link>
            </Button>
            <form action="" className='flex space-x-2' onSubmit={handleSearch}>
              <Input placeholder='search by name' name='search' value={data.search} onChange={(e) => setData('search', e.target.value)}/>
              <Button type='submit' className='cursor-pointer'><Search/></Button>
            </form>
          </div>
          {contacts.data?
            (
            <>
            <Table>
              <TableCaption>Contact Person List</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='font-bold'>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className='font-semibold'>Action</TableHead>
                </TableRow>
              </TableHeader>
                <TableBody>
                  {contacts.data?.map((person: any, index: number) => (
                  <TableRow >
                    <TableCell><Link href={route('contacts.show', person.id)}>{person.name}</Link></TableCell>
                    <TableCell><a href={`mailto:${person.email}`}>{person.email}</a></TableCell>
                    <TableCell><a href={`tel:${person.phone}`}>{person.phone}</a></TableCell>
                    <TableCell className='text-center'>
                      <QuickAction id={person.id} name={person.name} />
                    </TableCell>
                  </TableRow>
                  ))}
                  </TableBody>
                </Table>
                <Pagination>
                  <PaginationContent>
                    {contacts.links.map((link: any, index: number) => (
                      <PaginationItem key={index}>
                        {link.url ? (
                          <Link href={link.url}>
                            <PaginationLink
                              isActive={link.active}
                              dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                          </Link>
                        ) : (
                          <PaginationEllipsis />
                        )}
                      </PaginationItem>
                    ))}
                  </PaginationContent>
                </Pagination>
              </>  
                )
            :
            <p>No data has found</p>
          }

        </div>
      </AppLayout>
    </>
  );
}