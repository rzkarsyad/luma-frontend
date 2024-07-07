'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import lumaAILogo from '../../public/luma-ai-logo.svg';
import cookies from 'js-cookie';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        cookies.remove('jwt_token', { path: '/', domain: 'localhost' });
        cookies.remove('session_id', { path: '/', domain: 'localhost' });
        router.push('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-neutral-900 sticky top-0 z-50">
      <div className="flex items-center">
        <Image src={lumaAILogo} alt="Luma AI Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-xl">Luma AI</h1>
      </div>
      <button onClick={handleLogout} className="flex items-center text-neutral-400 hover:text-neutral-100">
        Logout
      </button>
    </header>
  );
};

export default Navbar;
