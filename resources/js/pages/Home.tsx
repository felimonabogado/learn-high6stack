import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import AppLogo from '@/components/app-logo';

export default function Home() {
    const { auth } = usePage<SharedData>().props;

    return(
        <>
            <Head title="Welcome"/>
            <div className="relative">
                <header className="absolute top-0 w-full px-6 py-8 z-100">
                    <nav className="flex items-center justify-end gap-4">
                        <AppLogo/>
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-white px-5 py-1.5 text-sm hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="h-screen flex justify-end bg-[url('/image/cms-bg.jpg')] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-black/60 before:z-0">
                    <div className='w-[50%] text-whites z-10 h-auto content-center space-y-5 pr-24'>
                        <h2 className='text-2xl font-bold'>Welcome to</h2>
                        <h1 className='text-5xl font-bold'>Contact Management System</h1>
                        <h3 className='text-2xl'>Create organize and manage your connections.</h3>
                        <div className='space-x-3'>
                             {auth.user ? (
                                <Button asChild>
                                    <Link href={route('dashboard')}>Go to Dashboard</Link>
                                </Button>
                             ) : (
                            <>
                                <Button asChild>
                                    <Link href={route('register')}>Lets Get Started</Link>
                                </Button>
                                <Button asChild className='bg-transparent border border-white hover:bg-white hover:text-black text-white'>
                                    <Link href={route('login')}>I have an Account</Link>
                                </Button>
                            </>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}