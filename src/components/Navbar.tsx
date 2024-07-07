import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import lumaAILogo from '../../public/luma-ai-logo.png';
import { cookies } from 'next/headers';

const Navbar = ({ userName }: { userName: string }) => {
  const router = useRouter();

  const handleLogout = () => {
    cookies().delete('token');
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
      <header className="flex justify-between items-center p-4 bg-neutral-900 sticky top-0 z-50">
        <div className="flex items-center">
          <Image src={lumaAILogo} alt="Luma AI Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-xl">Luma AI</h1>
        </div>
        <p className="text-white">{userName}</p>
        <button onClick={handleLogout} className="flex items-center text-neutral-400 hover:text-neutral-100">
          Logout
        </button>
      </header>
    </div>
  );
};

export default Navbar;
