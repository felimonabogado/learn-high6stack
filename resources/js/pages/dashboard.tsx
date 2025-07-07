import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {usePage} from '@inertiajs/react';
import { type SharedData } from '@/types';
import { User } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"

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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Card className='flex h-full'>
                            <CardHeader>
                                <CardTitle>Hello {user.name}</CardTitle>
                                <CardDescription>{user.email}</CardDescription>
                                <CardAction><User/></CardAction>
                            </CardHeader>
                            <CardContent>
                                <p>Welcome to your contact management system</p>
                            </CardContent>
                            <CardFooter>
                                <p>Here you can manage your contacts</p>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Calendar mode="single" defaultMonth={new Date()} className='mx-auto'/>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}