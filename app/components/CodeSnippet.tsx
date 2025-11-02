// app/components/CodeSnippet.tsx
'use client'; // <-- WAJIB: Komponen ini sekarang interaktif

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './CopyButton';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import ikon

// Tentukan tipe untuk props
interface CodeSnippetProps {
  id: number; // Kita butuh ID untuk Hapus/Edit
  title: string;
  language: string;
  code: string;
}

export default function CodeSnippet({ id, title, language, code }: CodeSnippetProps) {
  const router = useRouter();

  // State untuk beralih antara mode tampil dan edit
  const [isEditing, setIsEditing] = useState(false);

  // State untuk menampung data di form edit
  const [editTitle, setEditTitle] = useState(title);
  const [editLanguage, setEditLanguage] = useState(language);
  const [editCode, setEditCode] = useState(code.trim());
  const [isLoading, setIsLoading] = useState(false);

  // --- FUNGSI UNTUK HAPUS ---
  const handleDelete = async () => {
    // Konfirmasi sebelum hapus
    if (!confirm('Apakah Anda yakin ingin menghapus snippet ini?')) {
      return;
    }

    setIsLoading(true);
    try {
      await fetch(`/api/snippets/${id}`, {
        method: 'DELETE',
      });
      router.refresh(); // Refresh halaman untuk perbarui daftar
    } catch (error) {
      console.error('Gagal menghapus:', error);
      alert('Gagal menghapus snippet.');
      setIsLoading(false);
    }
    // tidak perlu setIsLoading(false) di sini karena halaman akan refresh
  };

  // --- FUNGSI UNTUK TOMBOL "UPLOAD" SETELAH EDIT ---
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/snippets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          language: editLanguage,
          code: editCode,
        }),
      });

      if (response.ok) {
        setIsEditing(false); // Kembali ke mode tampil
        router.refresh(); // Refresh halaman untuk perbarui daftar
      } else {
        alert('Gagal mengupdate snippet.');
      }
    } catch (error) {
      console.error('Gagal update:', error);
      alert('Gagal mengupdate snippet.');
    } finally {
      setIsLoading(false);
    }
  };

  // Tampilan akan berganti tergantung state 'isEditing'
  return (
    <div className="mb-8">
      {/* Judul Snippet */}
      <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>

      {isEditing ? (
        // ========================
        // ===    MODE EDIT     ===
        // ========================
        <form onSubmit={handleUpdate} className="w-full p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
          {/* Input Judul */}
          <div className="mb-4">
            <label htmlFor={`title-${id}`} className="block text-sm font-medium text-gray-300 mb-1">
              Judul Snippet
            </label>
            <input
              id={`title-${id}`}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Dropdown Bahasa */}
          <div className="mb-4">
            <label htmlFor={`language-${id}`} className="block text-sm font-medium text-gray-300 mb-1">
              Pilih Bahasa
            </label>
            <select
              id={`language-${id}`}
              value={editLanguage}
              onChange={(e) => setEditLanguage(e.target.value)}
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
            <label htmlFor={`code-${id}`} className="block text-sm font-medium text-gray-300 mb-1">
              Kode / Sintaks
            </label>
            <textarea
              id={`code-${id}`}
              value={editCode}
              onChange={(e) => setEditCode(e.target.value)}
              required
              rows={10}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-500"
            >
              {isLoading ? 'Menyimpan...' : 'Upload Perubahan'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)} // Tombol Batal
              className="px-4 py-2 font-bold text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
            >
              Batal
            </button>
          </div>
        </form>

      ) : (

        // ========================
        // ===    MODE TAMPIL   ===
        // ========================
        <div className="relative bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700">

          {/* Tombol Hapus & Edit (Pojok Kiri Atas) */}
          <div className="absolute top-2 left-2 z-10 flex gap-2">
            <button
              onClick={() => setIsEditing(true)} // Klik Edit -> masuk mode edit
              className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white transition-all"
              aria-label="Edit kode"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="p-2 rounded-md bg-red-700 hover:bg-red-600 text-white transition-all disabled:bg-gray-500"
              aria-label="Hapus kode"
            >
              <FaTrash />
            </button>
          </div>

          {/* Tombol Copy (Pojok Kanan Atas) */}
          <CopyButton codeToCopy={code.trim()} />

          {/* Blok Kode */}
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{ 
              margin: 0, 
              padding: '20px', 
              paddingTop: '50px' // Beri ruang lebih untuk tombol
            }}
            codeTagProps={{
              style: { fontFamily: '"Fira Code", monospace' }
            }}
            showLineNumbers
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}