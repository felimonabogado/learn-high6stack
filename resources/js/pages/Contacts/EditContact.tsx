import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert } from 'lucide-react';

interface Person {
  id: number;
  name: string;
  email: string;
  phone: string;
  note?: string;
}

interface EditContactProps {
  current_user?: any;
  person: Person;
}

export default function EditContact({ current_user, person }: EditContactProps) {

  const { data, setData, put, errors } = useForm({
    name: person.name,
    phone: person.phone,
    email: person.email,
    note: person.note || '',
    user_id: current_user?.id || 0,
  });

  const handeUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('contacts.update', person.id));
  };

  return (
    <AppLayout breadcrumbs={[{title: 'Update Contact', href: `/contacts/${person.id}/edit`}]}>
      <Head title="Update Contact" />
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Update {person.name}</h1>
        <form onSubmit={handeUpdate}>
          {Object.keys(errors).length > 0 && (
            <Alert className="mb-4">
              <CircleAlert className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                <ul>
                  {Object.entries(errors).map(([key, message]) => (
                    <li key={key}>{message}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className='gap-1.5 mb-4'>
              <Label htmlFor="name" className="block mb-2">Name</Label>
              <Input type="text" name="name" placeholder="Enter Name" value={data.name} onChange={(e) => setData('name', e.target.value)}/>
          </div>
          <div className='gap-1.5 mb-4'>
              <Label htmlFor="email" className="block mb-2">Email</Label>
              <Input type="email" name="email" placeholder="Enter Email" value={data.email} onChange={(e) => setData('email', e.target.value)}/>
          </div>
          <div className='gap-1.5 mb-4'>
              <Label htmlFor="phone" className="block mb-2">Phone</Label>
              <Input type="tel" name="phone" placeholder="Enter Contact Number" value={data.phone} onChange={(e) => setData('phone', e.target.value)}/>
          </div>
           <div className='gap-1.5 mb-4'>
              <Label htmlFor="note" className="block mb-2">Notes (Optional)</Label>
              <Textarea name="note" placeholder="Additional Notes" value={data.note} onChange={(e) => setData('note', e.target.value)} className="h-24 resize-none"/>
          </div>
          <Button type="submit" className="cursor-pointer">Update</Button>
        </form>
      </div>
    </AppLayout>
  );
}