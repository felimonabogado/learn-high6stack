import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { User } from 'lucide-react';
import { QuickAction } from '@/components/custom-ui/quick-action';

interface Person {
  id: number;
  name: string;
  email: string;
  phone: string;
  note?: string;
}

interface ViewContactProps {
  person: Person;
}

export default function ViewContact({person }: ViewContactProps) {
    return (
        <AppLayout breadcrumbs={[{ title: person.name, href: `/contacts/${person.id}` }]}>
            <Head title={person.name} />
            <div className="flex items-center justify-center min-h-[60vh] w-full p-4">
                <Card className="w-sm h-max">
                    <CardHeader>
                        <CardTitle>{person.name}</CardTitle>
                        <CardDescription>{person.note}</CardDescription>
                        <CardAction><User/></CardAction>
                    </CardHeader>
                    <CardContent>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <a href={`tel:${person.phone}`} className="flex gap-2 text-sm">
                                    <Phone />
                                    {person.phone}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${person.email}`} className="flex gap-2 text-sm">
                                    <Mail />
                                    {person.email}
                                </a>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <QuickAction id={person.id} name={person.name} />
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
