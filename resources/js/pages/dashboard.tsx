import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {usePage, Link} from '@inertiajs/react';
import { type SharedData } from '@/types';
import { User } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface User {
    name: string;
    email: string;
}

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const user: User = {
        name: auth.user.name,
        email: auth.user.email,
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid grid-cols-4 p-4 gap-5">
                <div className="border rounded col-span-3">
                    <Card className='border-0 flex h-full justify-between'>
                        <CardHeader>
                            <CardTitle>Hello {user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                            <CardAction><Link href='/settings/profile'><User /></Link></CardAction>
                        </CardHeader>
                        <CardContent>
                            <p>Welcome to your contact management system.</p>
                            <p>Here you can manage your contacts</p>
                        </CardContent>
                        <CardFooter>
                            <p className='text-sm space-x-2'>
                                <Link href={route('contacts')} className='border rounded py-1 px-3 border-black dark:border-white'>View Contacts</Link>
                                <Link href={route('contacts.create')} className='border rounded py-1 px-3 border-white bg-black dark:bg-white text-white dark:text-black'>Add New</Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
                <div className='border rounded'>
                    <Calendar mode="single" defaultMonth={new Date()} className='mx-auto' />
                </div>
            </div>
        </AppLayout>
    );
}