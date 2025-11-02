// app/components/UploadForm.tsx
'use client'; 

import { useState } from 'react';
// 1. IMPORT 'useRouter'
import { useRouter } from 'next/navigation';

export default function UploadForm() {
  // 2. INISIALISASI ROUTER
  const router = useRouter(); 

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setMessage('Mengupload...');

    try {
      const response = await fetch('/api/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, language, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Upload berhasil! (ID: ${data.id})`);
        setTitle('');
        setLanguage('javascript');
        setCode('');

        // 3. INI KUNCINYA!
        // Memerintahkan Next.js untuk mengambil data ulang
        router.refresh(); 

      } else {
        setMessage(`Gagal: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saat upload:', error);
      setMessage('Error: Gagal terhubung ke server.');
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 mx-auto mb-12 bg-gray-800 rounded-lg shadow-md border border-gray-700">
      <h3 className="text-2xl font-semibold mb-4 text-white">
        Upload Snippet Anda
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Input Judul */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Judul Snippet (Misal: "Java: Class Sederhana")
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dropdown Bahasa */}
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">
            Pilih Bahasa
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="typescript">TypeScript</option>
            <option value="bash">Bash/Shell</option>
          </select>
        </div>

        {/* Editor Kode (Textarea) */}
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-1">
            Tulis Kode / Sintaks Anda
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            rows={10}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tulis kode Anda di sini..."
          />
        </div>

        {/* Tombol Upload */}
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Upload
        </button>

        {/* Pesan Status */}
        {message && (
          <p className="mt-4 text-center text-sm text-gray-400">{message}</p>
        )}
      </form>
    </div>
  );
}