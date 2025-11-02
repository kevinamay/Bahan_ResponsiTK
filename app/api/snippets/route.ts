// app/api/snippets/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // <-- IMPORT driver database

// Fungsi ini berjalan di server
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, language, code } = data;

    // Validasi sederhana
    if (!title || !language || !code) {
      return NextResponse.json(
        { error: 'Judul, bahasa, dan kode tidak boleh kosong' },
        { status: 400 }
      );
    }

    // ===============================================
    // == INI BAGIAN PENTING: MENYIMPAN KE DATABASE ==
    // ===============================================

    // $1, $2, $3 adalah 'placeholder' aman
    const result = await sql`
      INSERT INTO snippets (title, language, code)
      VALUES (${title}, ${language}, ${code})
      RETURNING id;
    `;

    // Ambil ID dari snippet yang baru saja kita buat
    const newSnippetId = result.rows[0].id;

    console.log('Snippet baru TERSIMPAN ke DB, ID:', newSnippetId);

    // Kirim respons sukses kembali ke form
    return NextResponse.json(
      { 
        message: 'Snippet berhasil disimpan ke database!',
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