import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Custom Page',
        href: '/mypage',
    },
];

export default function MyPage({mydata}: { mydata?: any }) {
  const { sharedData } = usePage<SharedData>().props;
  let myword =  'Hello, world!';

  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="My Page" />
        <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto"'>
           <h1 className='text-2xl font-bold'>My Page {myword}</h1>
            {mydata ?
            <table className='w-full table-auto text-left'>
             {mydata.map((item: any, index: number) => (
               <tr key={index} className='border border-gray-600'>
                 <th className='text-md'>{item.name}</th>
                 <td>{item.age}</td>
               </tr>
             ))}
            </table>
             : 
             <p>No data has found</p>
             }
            <Link href="/">Go to Home</Link>
        </div>
      </AppLayout>
    </>
  );
}