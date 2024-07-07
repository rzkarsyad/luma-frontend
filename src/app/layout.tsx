'use client';
import React from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import '../app/globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <html lang="en">
      <Head>
        <title>Luma AI</title>
      </Head>
      <body className="flex flex-col min-h-screen bg-neutral-900 text-white">
        {pathname === '/chat' && <Navbar />}
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
