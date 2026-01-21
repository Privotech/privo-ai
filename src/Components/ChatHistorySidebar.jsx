import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { listChats, createChat, deleteChat } from '../Services/chatsService';
import useAuth from '../Hooks/useAuth';

const ChatHistorySidebar = () => {
  const [chats, setChats] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signout } = useAuth();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await listChats();
        if (mounted && res.ok) setChats(res.chats || []);
      } catch { }
    })();
    return () => { mounted = false; };
  }, []);

  const handleNewChat = async () => {
    try {
      const res = await createChat('New Chat');
      if (res.ok) {
        navigate(`/chat/${res.chat._id}`);
      }
    } catch { }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteChat(id);
      setChats((prev) => prev.filter((c) => c._id !== id));
      if (location.pathname.startsWith(`/chat/${id}`)) {
        navigate('/chat');
      }
    } catch { }
    finally {
      setDeletingId(null);
      setOpenMenuId(null);
    }
  };

  return (
    <div className="w-64 bg-gray-950 text-gray-200 h-screen p-4 flex flex-col border-r border-gray-800">
      <div className="text-2xl font-bold mb-6">
        <Link to="/chat" className="hover:text-white">PrivoAI</Link>
      </div>
      <button onClick={handleNewChat} className="mb-6 inline-flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm hover:bg-gray-800">+ New chat</button>
      <nav className="flex-grow">
        <h2 className="text-xs font-semibold text-gray-400 mb-3">Your chats</h2>
        <ul>
          {chats.map((chat) => (
            <li key={chat._id} className="mb-2 group relative" onMouseLeave={() => setOpenMenuId(null)}>
              <Link to={`/chat/${chat._id}`} className="block p-2 rounded hover:bg-gray-800 pr-10">
                {chat.title}
              </Link>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-200 px-2 py-1"
                onClick={(e) => { e.preventDefault(); setOpenMenuId(openMenuId === chat._id ? null : chat._id); }}
                aria-label="Chat options"
              >
                ⋮
              </button>
              {openMenuId === chat._id && (
                <div className="absolute right-2 top-full mt-1 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
                  <button
                    className="block w-full text-left px-3 py-2 hover:bg-gray-800 disabled:opacity-50"
                    disabled={deletingId === chat._id}
                    onClick={(e) => { e.preventDefault(); if (window.confirm('Delete this chat?')) handleDelete(chat._id); }}
                  >
                    {deletingId === chat._id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto border-t border-gray-800 p-3 space-y-2">
        <Link to="/settings" className="block px-3 py-2 rounded hover:bg-gray-800">Settings</Link>
        <Link to="/profile" className="block px-3 py-2 rounded hover:bg-gray-800">Profile</Link>
        <Link to="/upgrade" className="block px-3 py-2 rounded hover:bg-gray-800">Upgrade</Link>
        <Link to="/shortcuts" className="block px-3 py-2 rounded hover:bg-gray-800">Shortcuts</Link>
        <Link to="/help" className="block px-3 py-2 rounded hover:bg-gray-800">Help</Link>
        <Link to="/library" className="block px-3 py-2 rounded hover:bg-gray-800">Library</Link>
        <button onClick={signout} className="w-full text-left px-3 py-2 rounded hover:bg-gray-800">Logout</button>
      </div>
    </div>
  );
};

export default ChatHistorySidebar;
