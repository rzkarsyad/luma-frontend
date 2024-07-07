import React from 'react';
import Chat from '../../components/Chat';
import { cookies } from 'next/headers';

const ChatPage = () => {
  const token = cookies().get('jwt_token')?.value || null;
  const sessionId = cookies().get('session_id')?.value || null;

  if (!token) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return null;
  }

  return <Chat token={token} sessionId={sessionId} />;
};

export default ChatPage;