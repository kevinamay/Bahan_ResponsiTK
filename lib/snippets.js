// lib/snippets.js
export const allSnippets = [
  {
    id: 1,
    title: "Python: Fungsi Sederhana",
    language: "python",
    code: `
def sapa(nama):
    print(f"Halo, {nama}! Selamat datang.")

sapa("Budi")
    `
  },
  {
    id: 2,
    title: "JavaScript: Fetch API",
    language: "javascript",
    code: `
async function ambilData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
}

ambilData();
    `
  },
  {
    id: 3,
    title: "SQL: Membuat Tabel",
    language: "sql",
    code: `
CREATE TABLE Mahasiswa (
    ID INT PRIMARY KEY,
    Nama VARCHAR(100),
    NIM VARCHAR(20),
    Jurusan VARCHAR(50)
);
    `
  }
];