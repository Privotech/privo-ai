import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatHistorySidebar from '../Components/ChatHistorySidebar';
import Button from '../Components/Button';
import Loader from '../Components/Loader';
import { getChat, sendMessage as sendMessageApi, createChat as createChatApi } from '../Services/chatsService';
import { generateImage as generateImageApi } from '../Services/imagesService';

const MessageContent = ({ text }) => {
  const blocks = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  const renderInline = (segment) => {
    const parts = segment.split(/(`[^`]+`)/g);
    return parts.map((p, i) => {
      if (p.startsWith('`') && p.endsWith('`')) {
        const content = p.slice(1, -1);
        return (
          <code key={`inline-${i}`} className="bg-gray-800 text-gray-100 px-1 rounded font-mono">
            {content}
          </code>
        );
      }
      return <span key={`text-${i}`}>{p}</span>;
    });
  };

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const start = match.index;
    const lang = match[1] || '';
    const code = match[2] || '';

    const before = text.slice(lastIndex, start);
    if (before) {
      blocks.push(
        <div key={`before-${start}`} style={{ whiteSpace: 'pre-wrap' }}>
          {renderInline(before)}
        </div>
      );
    }

    blocks.push(
      <pre key={`code-${start}`} className="bg-gray-900 border border-gray-700 rounded-lg p-3 overflow-auto text-sm my-2">
        <code className="font-mono">{code}</code>
      </pre>
    );

    lastIndex = codeBlockRegex.lastIndex;
  }

  const after = text.slice(lastIndex);
  if (after) {
    blocks.push(
      <div key={`after-${lastIndex}`} style={{ whiteSpace: 'pre-wrap' }}>
        {renderInline(after)}
      </div>
    );
  }

  return <div className="text-gray-100">{blocks}</div>;
};

const ChatMessage = ({ text, sender }) => {
  const isUser = sender === 'user';
  const speak = () => {
    if (!('speechSynthesis' in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };
  return (
    
    <div className={`w-full ${isUser ? 'justify-end' : 'justify-start'} flex`}>
      <div
        className={`flex gap-4 items-start w-full max-w-3xl ${
          isUser ? 'flex-row-reverse' : ''
        }`}
      >
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
            isUser ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
          }`}
        >
          {isUser ? 'U' : 'AI'}
        </div>
        <div
          className={`rounded-xl border p-4 text-sm leading-relaxed break-words ${
            isUser ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-gray-800 border-gray-700 text-gray-100'
          }`}
          style={{ maxWidth: '48rem' }}
        >
          <MessageContent text={text} />
          {!isUser && (
            <button onClick={speak} className="mt-2 text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 border border-gray-600">
              🔊 Listen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);
  const navigate = useNavigate();
  const { id: chatIdParam } = useParams();
  const [chatId, setChatId] = useState(chatIdParam || null);

  const [loading, setLoading] = useState(false);
  const [recognizing, setRecognizing] = useState(false);
  const recognitionRef = useRef(null);
  const speechBaseRef = useRef('');

  const initRecognition = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.continuous = true;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      let transcript = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      const base = speechBaseRef.current || '';
      const combined = base ? `${base} ${transcript}` : transcript;
      setInput(combined);
    };
    rec.onend = () => setRecognizing(false);
    rec.onerror = () => setRecognizing(false);
    return rec;
  };

  const toggleMic = () => {
    if (recognizing) {
      try { recognitionRef.current?.stop(); } catch {}
      setRecognizing(false);
      return;
    }
    const rec = recognitionRef.current || initRecognition();
    if (!rec) return;
    recognitionRef.current = rec;
    speechBaseRef.current = input;
    try {
      rec.start();
      setRecognizing(true);
    } catch {}
  };

  const ChatImageMessage = ({ data, prompt }) => {
    return (
      <div className="w-full justify-start flex">
        <div className="flex gap-4 items-start w-full max-w-3xl">
          <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold bg-emerald-600 text-white">AI</div>
          <div className="rounded-xl border p-4 text-sm bg-gray-800 border-gray-700 text-gray-100">
            <img src={`data:image/png;base64,${data}`} alt={prompt} className="max-w-full h-auto rounded" />
            <div className="mt-2 text-xs text-gray-300">{prompt}</div>
          </div>
        </div>
      </div>
    );
  };

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || loading) return;

    // Determine target chat ID, creating one if needed
    let targetId = chatId || chatIdParam || null;
    if (!targetId) {
      try {
        const res = await createChatApi('New Chat');
        if (res.ok) {
          targetId = res.chat._id;
          setChatId(targetId);
          navigate(`/chat/${targetId}`, { replace: true });
        }
      } catch (e) { /* noop */ }
    }

    // Slash command: /image <prompt>
    if (message.startsWith('/image ')) {
      const prompt = message.slice(7).trim();
      if (!prompt) return;
      const nextHistory = [...messages, { text: message, sender: 'user' }];
      setMessages(nextHistory);
      setInput('');
      setLoading(true);
      try {
        const res = await generateImageApi(prompt);
        if (res.ok && res.image) {
          setMessages((prev) => [...prev, { type: 'image', data: res.image.data, prompt: res.image.prompt, sender: 'ai' }]);
        } else {
          setMessages((prev) => [...prev, { text: res.error || 'Image generation failed', sender: 'ai' }]);
        }
      } catch (err) {
        setMessages((prev) => [...prev, { text: 'Error generating image.', sender: 'ai' }]);
      } finally {
        setLoading(false);
      }
      return;
    }

    const nextHistory = [...messages, { text: message, sender: 'user' }];
    setMessages(nextHistory);
    setInput('');
    setLoading(true);

    try {
      const { ok, reply } = await sendMessageApi(targetId, message);
      setMessages((prev) => [...prev, { text: reply || 'No response', sender: 'ai' }]);
    } catch (err) {
      setMessages((prev) => [...prev, { text: 'Error contacting AI service.', sender: 'ai' }]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = async () => {
    try {
      const res = await createChatApi('New Chat');
      if (res.ok) {
        setMessages([]);
        setInput('');
        setChatId(res.chat._id);
        navigate(`/chat/${res.chat._id}`);
      }
    } catch {}
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    async function load() {
      if (!chatIdParam) return;
      try {
        const res = await getChat(chatIdParam);
        if (res.ok && res.chat) {
          const loaded = (res.chat.messages || []).map((m) => ({
            text: m.content,
            sender: m.role === 'user' ? 'user' : 'ai',
          }));
          setMessages(loaded);
          setChatId(res.chat._id);
        }
      } catch (e) {}
    }
    load();
  }, [chatIdParam]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <ChatHistorySidebar />

      <div className="flex-1 flex flex-col">
        {/* Main chat area */}
        <main className="flex-1 overflow-y-auto" ref={chatRef}>
          <div className="mx-auto max-w-3xl px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-lg font-semibold text-gray-200">Chat</h1>
              <Button onClick={startNewChat} className="bg-gray-800 hover:bg-black">New Chat</Button>
            </div>

            {/* Empty state suggestions */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-6">What's on the agenda today?</h2>
                <div className="flex items-center gap-2 w-full max-w-2xl rounded-full bg-gray-800 border border-gray-700 px-4 py-3">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Ask anything"
                    rows={1}
                    className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 resize-none focus:outline-none"
                    style={{ minHeight: '32px' }}
                  />
                  <Button onClick={sendMessage} className="rounded-full px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500">Send</Button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((m, idx) => (
                m.type === 'image' ? (
                  <ChatImageMessage key={idx} data={m.data} prompt={m.prompt} />
                ) : (
                  <ChatMessage key={idx} text={m.text} sender={m.sender} />
                )
              ))}
              {loading && (
                <div className="w-full justify-start flex">
                  <div className="flex gap-4 items-start w-full max-w-3xl">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold bg-emerald-600 text-white">AI</div>
                    <div className="rounded-xl border p-4 text-sm bg-gray-800 border-gray-700 text-gray-100">
                      <Loader />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Input area */}
        {messages.length > 0 && (
          <div className="border-t bg-gray-900 border-gray-800">
            <div className="mx-auto max-w-3xl px-4 py-4">
              <div className="rounded-full border border-gray-700 bg-gray-800 p-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Send a message (Shift+Enter for newline)"
                  rows={1}
                  className="w-full resize-none bg-transparent px-2 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none"
                  style={{ minHeight: '44px' }}
                />
                <div className="flex items-center justify-between px-2 pb-1">
                  <div className="text-xs text-gray-400">AI may make mistakes. Check important info.</div>
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMic} className={`px-3 py-1.5 text-sm rounded ${recognizing ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'} border border-gray-600`}>{recognizing ? 'Stop' : '🎙️ Speak'}</button>
                    <Button onClick={sendMessage} className="px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-500">Send</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      </div>
    </div>
  );
};

export default ChatPage;
