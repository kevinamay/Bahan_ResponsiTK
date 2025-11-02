// app/api/snippets/route.ts
import { NextResponse } from 'next/server';

// Ini adalah 'backend' kita.
// Fungsi ini akan berjalan di server (Vercel) setiap kali ada
// request POST ke /api/snippets
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Data yang kita terima dari form
    const { title, language, code } = data;

    // Validasi sederhana
    if (!title || !language || !code) {
      return NextResponse.json(
        { error: 'Judul, bahasa, dan kode tidak boleh kosong' },
        { status: 400 }
      );
    }

    // ===============================================
    // == DI SINILAH KITA AKAN MENYIMPAN KE DATABASE ==
    // ===============================================
    console.log('Menerima snippet baru:');
    console.log('Judul:', title);
    console.log('Bahasa:', language);

    // UNTUK SEKARANG, kita hanya pura-pura menyimpannya
    // dan mengembalikan data seolah-olah sukses.
    const newSnippetId = Math.floor(Math.random() * 10000); // ID palsu

    // Ini adalah respons yang dikirim kembali ke form
    return NextResponse.json(
      { 
        message: 'Snippet berhasil diterima (tapi belum disimpan)',
        id: newSnippetId 
      },
      { status: 201 } // 201 = Created
    );

  } catch (error) {
    console.error('Error di API route:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan di server' },
      { status: 500 }
    );
  }
}