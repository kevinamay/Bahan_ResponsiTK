// app/api/snippets/[id]/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// DELETE /api/snippets/[id]
export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }  // params is a Promise
) {
  try {
    const { id } = await context.params;        // <-- await di sini

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ada' }, { status: 400 });
    }

    await sql/*sql*/`
      DELETE FROM snippets
      WHERE id = ${Number(id)};
    `;

    return NextResponse.json({ message: 'Snippet berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Error saat menghapus:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan di server' }, { status: 500 });
  }
}

// PUT /api/snippets/[id]
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }  // params is a Promise
) {
  try {
    const { id } = await context.params;        // <-- await di sini
    const { title, language, code } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ada' }, { status: 400 });
    }
    if (!title || !language || !code) {
      return NextResponse.json(
        { error: 'Judul, bahasa, dan kode tidak boleh kosong' },
        { status: 400 }
      );
    }

    await sql/*sql*/`
      UPDATE snippets
      SET title = ${title}, language = ${language}, code = ${code}
      WHERE id = ${Number(id)};
    `;

    return NextResponse.json({ message: 'Snippet berhasil diupdate' }, { status: 200 });
  } catch (error) {
    console.error('Error saat update:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan di server' }, { status: 500 });
  }
}
