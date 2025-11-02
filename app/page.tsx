// app/page.tsx
import CodeSnippet from "./components/CodeSnippet";
import { allSnippets } from "../lib/snippets"; 
import UploadForm from "./components/UploadForm"; // 1. IMPORT DI SINI

export default function Home() {
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

      {/* 2. TAMBAHKAN KOMPONEN FORM DI SINI */}
      <UploadForm />

      {/* Garis pemisah (opsional) */}
      <hr className="w-full max-w-4xl border-t-2 border-gray-700 mb-12" />

      {/* Kontainer untuk semua snippet */}
      <div className="w-full max-w-4xl">

        {/* PENTING: Ini masih menampilkan data STATIS dari lib/snippets.js.
          Langkah selanjutnya adalah mengambil data dari database.
        */}
        {allSnippets.map((snippet) => (
          <CodeSnippet
            key={snippet.id}
            title={snippet.title}
            language={snippet.language}
            code={snippet.code}
          />
        ))}

      </div>
    </main>
  );
}