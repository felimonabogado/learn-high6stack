import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
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
                        <CardAction>Person</CardAction>
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
                        <Button className="text-white cursor-pointer bg-slate-600 hover:bg-slate-700" asChild>
                            <Link href={route('contacts.edit', person.id)}>Edit</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
