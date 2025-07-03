import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert } from 'lucide-react';
import { use } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Register Contact Person',
        href: "/contacts/create",
    },
];

export default function RegisterContact({current_user}: { current_user?: any }) {

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    phone: '',
    email: '',
    note: '',
    user_id: current_user?.id || 0,
  });

  const handeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('contacts.store'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Register Contact" />
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Add New Contact Person</h1>
        <form onSubmit={handeSubmit}>
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
          <Button type="submit" className="cursor-pointer">Create</Button>
        </form>
      </div>
    </AppLayout>
  );
}