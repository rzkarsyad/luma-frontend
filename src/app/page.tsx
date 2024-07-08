import React from 'react';
import Image from 'next/image';
import lumaAILogo from '../../public/luma-ai-logo.svg';
import googleLogo from '../../public/google-icon.svg';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white">
      <Image src={lumaAILogo} alt="Luma AI Logo" className="mb-8 w-20 h-20" />
      <h1 className="text-5xl mb-4">Luma AI</h1>
      <p className="w-80 text-center mb-8 text-neutral-400">
        Your AI Suggestions to Improve Your Home’s Energy Efficiency
      </p>
      <a
        href="https://luma-backend-production.up.railway.app/auth/google/login"
        className="inline-flex items-center bg-neutral-200 hover:bg-neutral-300 text-black font-medium py-2 px-4 rounded"
      >
        <Image src={googleLogo} alt="Google Icon" width={20} height={20} className="mr-2" />
        Sign in with Google
      </a>
    </div>
  );
};

export default Login;
