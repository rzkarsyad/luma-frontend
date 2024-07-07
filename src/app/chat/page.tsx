import React from 'react';
import Chat from '../../components/Chat';
import { cookies } from 'next/headers';

const ChatPage = () => {
  const token = cookies().get('jwt_token')?.value || null;
  const sessionId = cookies().get('session_id')?.value || null;

  return <Chat token={token} sessionId={sessionId} />;
};

export default ChatPage;