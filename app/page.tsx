// app/page.tsx
import CodeSnippet from "./components/CodeSnippet";
import UploadForm from "./components/UploadForm";
import { sql } from "@vercel/postgres"; // <-- IMPORT driver database

// Tentukan tipe data untuk snippet dari database
interface Snippet {
  id: number;
  title: string;
  language: string;
  code: string;
}

// Memberitahu Next.js untuk selalu mengambil data terbaru
export const dynamic = 'force-dynamic';

export default async function Home() {

  // ====================================================
  // == INI BAGIAN PENTING: MENGAMBIL DATA DARI DATABASE ==
  // ====================================================

  // Kita tidak lagi pakai 'lib/snippets.js'

  const { rows } = await sql<Snippet>`
    SELECT id, title, language, code 
    FROM snippets 
    ORDER BY created_at DESC;
  `;

  const allSnippets = rows;

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-gray-900">
      {/* Header */}
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-white">
          Pustaka Kode Mahasiswa 📚
        </h1>
        <p className="text-lg text-gray-400">
          Kumpulan sintaks untuk disalin.
        </p>
      </div>

      {/* Form Upload */}
      <UploadForm />

      <hr className="w-full max-w-4xl border-t-2 border-gray-700 mb-12" />

      {/* Kontainer untuk semua snippet */}
      <div className="w-full max-w-4xl">

        {/* Sekarang kita loop data DARI DATABASE */}
          {allSnippets.map((snippet) => (
          <CodeSnippet
            key={snippet.id}
            id={snippet.id}  // <-- TAMBAHKAN DI BARIS INI
            title={snippet.title}
            language={snippet.language}
            code={snippet.code}
          />
        ))}

        {/* Pesan jika database masih kosong */}
        {allSnippets.length === 0 && (
           <p className="text-center text-gray-400">
             Belum ada snippet. Ayo upload yang pertama!
           </p>
        )}

      </div>
    </main>
  );
}