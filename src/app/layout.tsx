import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import SplashScreen from '@/components/SplashScreen';

export const metadata: Metadata = {
    title: 'Baagh Entertainment | Film Production Support Across India',
    description: 'Complete Film Production Support Across India. Premium Line Production, Location Management, Junior Artists, Equipment & Logistics.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <SplashScreen>
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                    </SplashScreen>
                </AuthProvider>
            </body>
        </html>
    );
}
