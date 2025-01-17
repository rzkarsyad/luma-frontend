'use client';
import React, { useState } from 'react';

interface ChatProps {
  token: string | null;
  sessionId: string | null;
}

function formatResponse(response: string): string {
  response = response.replace(/assistant:/gi, '');

  return response
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\* (.*?)(?=\n|\r|$)/g, '• $1')
    .replace(/\*/g, '')
    .replace(/\n/g, '<br>')
    .replace(/\r/g, '');
}

const Chat: React.FC<ChatProps> = ({ token, sessionId }) => {
  const [messages, setMessages] = useState<Array<{ type: string; content: string }>>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;
    setMessages([...messages, { type: 'human', content: input }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.luma.my.id/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'session_id': sessionId || '',
        },
        credentials: 'include',
        body: JSON.stringify({ query: input, session_id: sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      const formattedRecommendations = data.recommendations.map((rec: any) => formatResponse(rec.content.parts[0].text));

      setMessages((prevMessages) => [
        ...prevMessages,
        ...formattedRecommendations.map((rec: string) => ({ type: 'ai', content: rec }))
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'ai', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <div className="chat-container h-full self-center p-4 pb-20 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.type}`}>
            <div className="bubble" dangerouslySetInnerHTML={{ __html: message.content }} />
          </div>
        ))}
        {loading && (
          <div className="chat-bubble ai">
            <div className="bubble">Luma is thinking...</div>
          </div>
        )}
      </div>
      <div className="input-container fixed bottom-0 w-full flex content-center items-center self-center justify-center bg-neutral-900 p-4">
        <input
          type="text"
          className="input-field flex-1 p-4 rounded-full bg-neutral-800 border border-neutral-700 text-white mr-4 placeholder-neutral-500"
          placeholder="Ask Luma"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="send-button bg-neutral-500 hover:bg-neutral-300 text-black font-medium py-2 px-4 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
