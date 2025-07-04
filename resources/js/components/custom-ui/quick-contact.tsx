import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';

export function QuickContact({email, phone} : {email: string, phone: string} ) {
    return (
        <div className="flex gap-2">
            <a href={`mailto:${email}`} className="text-sm text-blue-600 hover:underline">
                <Phone />
            </a>
            <a href={`tel:${phone}`} className="text-sm text-blue-600 hover:underline">
                <Mail />
            </a>
        </div>
    );
}