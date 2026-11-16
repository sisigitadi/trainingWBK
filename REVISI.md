# Catatan Revisi & Ringkasan Pembaruan

Dokumen ini memuat catatan audit teknis dan pembaruan fitur pada aplikasi web **Training IT Security Awareness and Cybersecurity Protection 2026**.

## Ringkasan Pembaruan Terkini

### 1. Identitas, Logo, dan Favicon
- Menggunakan logo perisai siber logam berinisial "SA" sebagai ikon aplikasi di `public/logo.jpg`, favicon di `index.html`, header navigasi, lembar cetak handout, serta kartu saku.
- Format identitas narasumber diperbarui menjadi **Sigit Adi Irianto, S.Kom. - sigitadi.id** dengan tautan aktif ke `https://sigitadi.id/`.
- Fitur aktivasi rahasia Mode Narasumber tetap aktif melalui 9 kali klik cepat pada tombol nama narasumber.

### 2. Header dan Footer Mengambang (Floating & Translucent)
- Header diposisikan tetap di bagian atas layar (`fixed inset-x-0 top-0 z-30`) dan footer di bagian bawah (`fixed inset-x-0 bottom-0 z-20`).
- Menggunakan efek visual kaca transparan (`backdrop-blur-md bg-white/80 dark:bg-[#0B1F3A]/85`) dengan perataan kontainer yang rapi.
- Padding atas (`pt-24 sm:pt-28`) dan bawah (`pb-16 sm:pb-20`) disesuaikan agar konten materi terbaca utuh tanpa terpotong.

### 3. Balloon Tooltips Interaktif
- Kamus istilah statis per modul dan tombol modal di header dihilangkan.
- Istilah teknis diberi garis bawah titik-titik dan memunculkan balon penjelasan interaktif saat kursor diarahkan (*hover*), mencakup lebih dari 50 istilah keamanan siber dan operasional perbankan.

### 4. Pacing Rundown dan Pengalaman Belajar
- Menampilkan waktu dan tanggal sinkron dengan 13 sesi rundown kegiatan, dilengkapi notifikasi otomatis saat jeda tersisa 15 menit atau kurang.
- Menghilangkan mekanisme skor dan sertifikat agar peserta berfokus pada eksplorasi seluruh skenario insiden.
