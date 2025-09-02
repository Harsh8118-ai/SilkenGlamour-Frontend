import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function ChatBox() {
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, loading]);

    const splitIntoChunks = (text) => {
        const sentences = text
            .split(/(?<=[.?!])\s+/)
            .map(s => s.trim())
            .filter(s => s.length > 0);

        const chunks = [];
        let buffer = '';

        for (let sentence of sentences) {
            if (sentence.length > 60) {
                if (buffer) {
                    chunks.push(buffer.trim());
                    buffer = '';
                }
                chunks.push(sentence);
            } else {
                buffer += sentence + ' ';
                if (buffer.length > 80) {
                    chunks.push(buffer.trim());
                    buffer = '';
                }
            }
        }

        if (buffer) chunks.push(buffer.trim());
        return chunks;
    };

    const simulateTyping = async (chunks) => {
        for (let i = 0; i < chunks.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
            setChatHistory(prev => [...prev, { role: 'Assistant', content: chunks[i] }]);
        }
    };

    const handleSend = async () => {
        if (!userInput.trim()) return;

        const updatedHistory = [...chatHistory, { role: 'User', content: userInput }];
        setChatHistory(updatedHistory);
        setUserInput('');
        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/chatbox`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chatHistory: updatedHistory }),
            });

            const data = await response.json();
            const chunks = splitIntoChunks(data.answer);
            await simulateTyping(chunks);

        } catch (error) {
            setChatHistory(prev => [...prev, { role: 'Assistant', content: 'Something went wrong. Please try again later.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const renderMessages = () => {
        const grouped = [];

        for (let i = 0; i < chatHistory.length; i++) {
            const current = chatHistory[i];
            const prev = chatHistory[i - 1];

            const showLabel = !prev || prev.role !== current.role;
            grouped.push({
                ...current,
                showLabel,
                key: i,
            });
        }

        return grouped.map(({ role, content, showLabel, key }) => (
            <div key={key} className={`w-full ${role === 'User' ? 'text-right' : 'text-left'}`}>
                {showLabel && (
                    <p className="text-xs text-gray-400 mb-1">{role === 'User' ? 'You' : 'Assistant'}</p>
                )}
                <div
                    className={`inline-block px-4 py-2 rounded-2xl text-sm max-w-[70%] mb-1 ${
                        role === 'User'
                            ? 'bg-blue-500 text-white ml-auto'
                            : 'bg-gray-100 text-gray-900'
                    }`}
                >
                    {content}
                </div>
            </div>
        ));
    };
    return (
  <div className="flex flex-col h-screen w-full bg-[#FFF8EF] px-4 sm:px-10 py-6">
    <div className="text-2xl font-bold mb-4 text-[#6B3F1D]">SilkenGlamour Assistant</div>

    <Card className="flex-1 overflow-y-auto p-4 rounded-xl border border-[#FFE6B0] bg-[#FFFCF7] shadow-inner">
      {renderMessages()}
      {loading && <p className="text-sm text-[#C0884F] mt-2">Typing...</p>}
      <div ref={chatEndRef} />
    </Card>

    <div className="mt-4 flex items-center gap-2">
      <Input
        placeholder="Type your message..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 h-12 rounded-full px-4 border border-[#FFE6B0] bg-white placeholder:text-[#B28762] text-[#6B3F1D]"
      />
      <Button
        onClick={handleSend}
        disabled={loading}
        className="rounded-full h-12 px-6 bg-[#C0884F] hover:bg-[#b07a42] text-white font-semibold"
      >
        Send
      </Button>
    </div>
  </div>
);
}
