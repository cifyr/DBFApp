import AppShell from '@/components/AppShell';
import { homeContent } from '@/data/homeContent';
import './globals.css';

export const metadata = {
    title: homeContent.brand.pageTitle,
    description: homeContent.brand.metaDescription,
    icons: {
        icon: '/images/favicon.ico',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppShell>{children}</AppShell>
            </body>
        </html>
    );
}
