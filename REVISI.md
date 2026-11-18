# Catatan Revisi & Ringkasan Pembaruan

Dokumen ini memuat catatan audit teknis dan pembaruan fitur pada aplikasi web **Training IT Security Awareness and Cybersecurity Protection 2026**.

## Ringkasan Pembaruan Terkini

### 1. Identitas, Logo, dan Favicon
- Menggunakan logo perisai siber logam berinisial "SA" sebagai ikon aplikasi di `public/logo.jpg`, favicon di `index.html`, header navigasi, lembar cetak handout, serta kartu saku.
- Format identitas narasumber diperbarui menjadi **Sigit Adi Irianto, S.Kom. - sigitadi.id** dengan tautan aktif ke `https://sigitadi.id/`.
- Fitur aktivasi rahasia Mode Narasumber dipindahkan ke logo pelatihan di pojok kiri atas header (9 kali klik berturut-turut dalam jendela 2,5 detik) tanpa tooltip pembocor, dengan target sentuh 44x44px dan dukungan navigasi keyboard.
- Status aktif dan tombol keluar Mode Narasumber dilebur menjadi satu tombol ikon ringkas tanpa teks (`LockOpen | LogOut`) yang diskret saat layar dibagikan ke proyektor namun tetap aksesibel (`aria-label` dan `sr-only`).
- Tombol dan kartu CTA **Cetak Handout** serta dropdown simulasi **Waktu Nyata** disembunyikan dari antarmuka produksi melalui feature flag `ENABLE_PRINT_HANDOUT = false` dan `ENABLE_TIME_SIMULATION = false` di `src/lib/features.ts`; jam akhir status rundown diselaraskan ke `08.30 - 16.15`.
- **Penyempurnaan Mode Proyektor:** Tombol header diringkas menjadi ikon `Monitor` saja, baris rundown sekunder disembunyikan saat proyeksi agar area baca lega, panel Panduan Narasumber disembunyikan otomatis saat proyeksi agar catatan fasilitator tidak tampil di layar kelas, dan bilah bawah dilengkapi dropdown lompat cepat antar-slide (`01/21` s.d. `21/21`) serta tombol toggle layar penuh (*Fullscreen*).

### 2. Header Mengambang (Floating & Translucent), Penghapusan Footer, & Modal Catatan Kasus
- Header diposisikan tetap di bagian atas layar (`fixed inset-x-0 top-0 z-30`) dengan efek visual kaca transparan (`backdrop-blur-md bg-white/80 dark:bg-[#0B1F3A]/85`) dan pelacakan tinggi dinamis berbasis `ResizeObserver`.
- Bilah footer mengambang di bagian bawah layar dihapus total agar tidak menutupi konten materi maupun lab simulasi saat digulir, disertai penyesuaian padding bawah non-proyektor.
- Kartu inline **Catatan Contoh Studi Kasus (Entitas Rekaan)** dipindahkan menjadi tombol ikon Info di header yang membuka Modal Dialog aksesibel, sehingga ruang konten di desktop, ponsel, dan Mode Proyektor tetap lega sekaligus dapat dibuka kembali kapan saja.

### 3. Balloon Tooltips Interaktif Menyeluruh
- Kamus istilah statis per modul dan tombol modal kamus di header dihilangkan.
- Kamus istilah teknis dan balloon tooltips diperluas secara menyeluruh (termasuk istilah seperti `server`, `database`, `dump`, `failover`, dan istilah keamanan siber serta operasional perbankan lainnya) ke seluruh 10 Modul materi, 10 Lab simulasi, dan Sesi Penutup.
- Memperbaiki bug pencocokan istilah (`KMS`, ekstensi berkas `.xlsm`/`.pdf.exe`, serta perlindungan URL agar tidak terpotong tooltip) dan penyempurnaan komponen `TermTooltip`.

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

### 7. Open Graph & Social Share Preview (v2.3.0)
- **Kartu Pratinjau 1200x630 (`public/og-image.jpg`):** Menghasilkan aset kartu pratinjau beresolusi tepat 1200x630 px dalam format baseline JPEG (< 200 KB, aman di bawah batas 300 KB WhatsApp) yang memadukan logo perisai siber "SA", judul program, deskripsi ringkas, identitas narasumber, dan domain `trainingwbk.sigitadi.id` pada latar Navy `#0B1F3A` dengan aksen Emerald `#10B981`.
- **Metadata Open Graph & Twitter Card (`index.html`):** Menambahkan tag `description`, `canonical`, `theme-color`, seluruh tag `og:*` (`og:type`, `og:locale`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:secure_url`, `og:image:type`, `og:image:width`, `og:image:height`, `og:image:alt`), serta `twitter:card="summary_large_image"` dengan URL HTTPS absolut (`https://trainingwbk.sigitadi.id/`) untuk kompatibilitas pratinjau di WhatsApp, Telegram, LinkedIn, X, dan Facebook.
