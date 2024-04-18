import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from '../components/nav';
import { Suspense } from 'react';
import Footer from '../components/footer';

export const metadata = {
  title: 'MARES',
  description: 'A unified entertainment recommendation system.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
