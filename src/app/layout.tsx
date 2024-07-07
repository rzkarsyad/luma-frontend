'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import cookies from 'js-cookie';
import '../app/globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = cookies.get('token');
    const sessionId = cookies.get('session_id');
    
    if (token) {
      fetchUserData(token);
    }

    async function fetchUserData(token: string) {
      try {
        const response = await fetch('http://localhost:8080/auth/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>Luma AI</title>
      </Head>
      <body className="flex flex-col min-h-screen bg-neutral-900 text-white">
        {pathname === '/chat' && <Navbar userName={userName} />}
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
};

export default Layout;