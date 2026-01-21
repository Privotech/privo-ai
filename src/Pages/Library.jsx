import React, { useEffect, useState } from 'react';
import { listImages, generateImage } from '../Services/imagesService';
import ChatHistorySidebar from '../Components/ChatHistorySidebar';

export default function LibraryPage() {
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setError(null);
      const res = await listImages();
      if (res.ok) setImages(res.images || []);
      else setError(res.error || 'Failed to load images');
    } catch (e) {
      setError('Failed to load images');
    }
  };

  useEffect(() => { load(); }, []);

  const onGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const res = await generateImage(prompt.trim());
      if (res.ok && res.image) {
        setImages((prev) => [res.image, ...prev]);
        setPrompt('');
      } else {
        setError(res.error || 'Image generation failed');
      }
    } catch (e) {
      setError('Image generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <ChatHistorySidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Image Library</h1>
          <form onSubmit={onGenerate} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Describe an image to generate"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </form>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img._id} className="border border-gray-700 rounded overflow-hidden bg-gray-800">
                <img src={`data:image/png;base64,${img.data}`} alt={img.prompt} className="w-full h-auto" />
                <div className="p-2 text-sm text-gray-300">{img.prompt}</div>
              </div>
            ))}
            {images.length === 0 && (
              <div className="text-gray-400">No images yet. Generate one above.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}