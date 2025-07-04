import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

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

export default function ViewContact({ current_user, person }: EditContactProps) {
    return (
        <AppLayout breadcrumbs={[{title: person.name, href: `/contacts/${person.id}`}]}>
            <Head title={person.name} />
           <h1>{person.name}</h1>
           <h2>{person.email}</h2>
           <h2>{person.phone}</h2>
           <h2>{person.note}</h2>
        </AppLayout>
    );
}
