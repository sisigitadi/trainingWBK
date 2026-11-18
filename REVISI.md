# Catatan Revisi & Ringkasan Pembaruan

Dokumen ini memuat catatan audit teknis dan pembaruan fitur pada aplikasi web **Training IT Security Awareness and Cybersecurity Protection 2026**.

## Ringkasan Pembaruan Terkini

### 1. Identitas, Logo, dan Favicon
- Menggunakan logo perisai siber logam berinisial "SA" sebagai ikon aplikasi di `public/logo.jpg`, favicon di `index.html`, header navigasi, lembar cetak handout, serta kartu saku.
- Format identitas narasumber diperbarui menjadi **Sigit Adi Irianto, S.Kom. - sigitadi.id** dengan tautan aktif ke `https://sigitadi.id/`.
- Fitur aktivasi rahasia Mode Narasumber dipindahkan ke logo pelatihan di pojok kiri atas header (9 kali klik berturut-turut dalam jendela 2,5 detik) tanpa tooltip pembocor, dengan target sentuh 44x44px dan dukungan navigasi keyboard.
- Status aktif dan tombol keluar Mode Narasumber dilebur menjadi satu tombol ikon ringkas tanpa teks (`LockOpen | LogOut`) yang diskret saat layar dibagikan ke proyektor namun tetap aksesibel (`aria-label` dan `sr-only`).
- Tombol dan kartu CTA **Cetak Handout** disembunyikan dari antarmuka melalui feature flag `ENABLE_PRINT_HANDOUT = false` di `src/lib/features.ts` dengan tetap menjaga komponen `PrintableHandout.tsx` utuh di kode sumber.

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

### 5. Optimalisasi Tampilan Layar Ponsel (Mobile Viewport) & Deployment
- Menghapus awalan "Narasumber:" di header sehingga tampilan langsung ringkas: `Sigit Adi Irianto, S.Kom. - sigitadi.id`.
- Menerapkan pelacakan tinggi floating header secara dinamis berbasis `ResizeObserver` (`paddingTop: ${topBarHeight + 16}px`), menghilangkan isu tumpang tindih (*overlap*) kartu disclaimer pada layar ponsel.
- Pipeline CI/CD GitHub Actions aktif dan terintegrasi otomatis dengan GitHub Pages:
  - Repositori: `https://github.com/sisigitadi/trainingWBK`
  - URL Live: `https://trainingwbk.sigitadi.id/` (Fallback: `https://sisigitadi.github.io/trainingWBK/`)

### 6. Audit & Revisi Cetak Handout Presentasi (A4) & Custom Domain
- **Label Metadata Portal Pelatihan:** Menyesuaikan label kolom metadata menjadi **"Portal Pelatihan"** sehingga mempertegas fungsi situs web sebagai platform pembelajaran interaktif.
- **Tautan Aktif Portal Pelatihan:** Mengubah angka tahun menjadi teks tautan aktif `trainingwbk.sigitadi.id` dengan target URL `https://trainingwbk.sigitadi.id/` yang dapat diklik langsung baik di web maupun saat diekspor ke PDF.
- **Tautan Aktif Narasumber:** Mengintegrasikan tautan aktif `https://sigitadi.id/` pada teks `sigitadi.id` di kolom identitas narasumber.
- **Footer Bernomor Halaman & Judul Lengkap:** Memberikan footer standar di bagian paling bawah setiap lembar halaman (Halaman 1 Cover, Halaman 2–11 Modul 01–10, dan Halaman 12 Penutup) dengan nama program lengkap `Training IT Security Awareness and Cybersecurity Protection`, tautan aktif `sigitadi.id` (`https://sigitadi.id/`), serta nomor lembar `Halaman X dari 12`.
- **Presisi 12 Halaman Cetak (Zero Overflow):** Mengoptimalkan densitas vertikal tiap modul (`h-[272mm] flex flex-col justify-between`, grid tujuan pembelajaran 2-kolom, dan spasi tabel terukur) sehingga tepat menghasilkan 12 lembar halaman A4 (1 cover, 10 modul, 1 penutup). Masalah pembengkakan 21 halaman dengan nomor halaman hilang di lembar genap telah dieliminasi 100%.
- **Konfigurasi Custom Domain:** Menambahkan file `public/CNAME` untuk deployment otomatis ke `trainingwbk.sigitadi.id` melalui GitHub Actions.
