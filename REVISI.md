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
- Header diposisikan tetap di bagian atas layar (`fixed inset-x-0 top-0 z-30`) dengan efek visual kaca transparan (`backdrop-blur-md bg-white/95 dark:bg-[#0B1F3A]/95`) dan pelacakan tinggi dinamis berbasis `ResizeObserver`.
- Bilah footer mengambang di bagian bawah layar dihapus total agar tidak menutupi konten materi maupun lab simulasi saat digulir, disertai penyesuaian padding bawah non-proyektor.
- Kartu inline **Catatan Contoh Studi Kasus (Entitas Rekaan)** dipindahkan menjadi tombol ikon Info di header yang membuka Modal Dialog aksesibel, sehingga ruang konten di desktop, ponsel, dan Mode Proyektor tetap lega sekaligus dapat dibuka kembali kapan saja.

### 3. Balloon Tooltips Interaktif Menyeluruh
- Kamus istilah statis per modul dan tombol modal kamus di header dihilangkan.
- Kamus istilah teknis dan balloon tooltips diperluas secara menyeluruh (termasuk istilah seperti `server`, `database`, `dump`, `failover`, dan istilah keamanan siber serta operasional perbankan lainnya) ke seluruh 10 Modul materi, 10 Lab simulasi, dan Sesi Penutup.
- Memperbaiki bug pencocokan istilah (`KMS`, ekstensi berkas `.xlsm`/`.pdf.exe`, serta perlindungan URL agar tidak terpotong tooltip) dan penyempurnaan komponen `TermTooltip`.

### 4. Pacing Rundown dan Pengalaman Belajar
- Menampilkan waktu dan tanggal sinkron dengan 13 sesi rundown kegiatan secara ringkas di header tanpa banner peringatan hitung mundur.
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
- **Footer Bernomor Halaman & Judul Lengkap:** Memberikan footer standar di bagian paling bawah setiap lembar halaman (Halaman 1 Cover, Halaman 2 s.d. 11 Modul 01 s.d. 10, dan Halaman 12 Penutup) dengan nama program lengkap `Training IT Security Awareness and Cybersecurity Protection`, tautan aktif `sigitadi.id` (`https://sigitadi.id/`), serta nomor lembar `Halaman X dari 12`.
- **Presisi 12 Halaman Cetak (Zero Overflow):** Mengoptimalkan densitas vertikal tiap modul (`h-[272mm] flex flex-col justify-between`, grid tujuan pembelajaran 2-kolom, dan spasi tabel terukur) sehingga tepat menghasilkan 12 lembar halaman A4 (1 cover, 10 modul, 1 penutup). Masalah pembengkakan 21 halaman dengan nomor halaman hilang di lembar genap telah dieliminasi 100%.
- **Konfigurasi Custom Domain:** Menambahkan file `public/CNAME` untuk deployment otomatis ke `trainingwbk.sigitadi.id` melalui GitHub Actions.

### 7. Open Graph & Social Share Preview (v2.3.0)
- **Kartu Pratinjau 1200x630 (`public/og-image.jpg`):** Menghasilkan aset kartu pratinjau beresolusi tepat 1200x630 px dalam format baseline JPEG (< 200 KB, aman di bawah batas 300 KB WhatsApp) yang memadukan logo perisai siber "SA", judul program, deskripsi ringkas, identitas narasumber, dan domain `trainingwbk.sigitadi.id` pada latar Navy `#0B1F3A` dengan aksen Emerald `#10B981`.
- **Metadata Open Graph & Twitter Card (`index.html`):** Menambahkan tag `description`, `canonical`, `theme-color`, seluruh tag `og:*` (`og:type`, `og:locale`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:secure_url`, `og:image:type`, `og:image:width`, `og:image:height`, `og:image:alt`), serta `twitter:card="summary_large_image"` dengan URL HTTPS absolut (`https://trainingwbk.sigitadi.id/`) untuk kompatibilitas pratinjau di WhatsApp, Telegram, LinkedIn, X, dan Facebook.

### 8. Diagram Alur Kerja SaaSCore, Sidebar Lipat, & Konsistensi Lab
- **10 Diagram Alur Kerja SaaSCore:** Setiap modul dilengkapi `workflowDiagram` berisi judul, 1 kalimat ringkasan, dan 5 langkah operasional terstruktur lengkap dengan peran/gerbang kontrol.
- **Sidebar Desktop Buka/Tutup:** Menambahkan tombol toggle daftar modul di header desktop (`Alt+B` atau `[`) yang tersimpan di `localStorage` (`saas_desktop_sidebar_open_v1`) serta breadcrumb ringkas saat sidebar dilipat.
- **Pemurnian Header & Kepatuhan UI:** Menghapus banner peringatan kuning hitung mundur 15 menit, membatasi `backdrop-blur` hanya pada header utama, menaikkan target sentuh ke minimum 44px, serta memperkuat fokus keyboard pada drawer dan modal.
- **Keselarasan Salinan & Lab Interaktif:** Menyeragamkan panjang passphrase minimal 16 karakter, menghilangkan backtick literal dan penomoran heading tak konsisten, memperluas cakupan `tooltipTerms.ts`, serta menyelaraskan perilaku Reset, persistensi tab `sessionStorage`, dan perbaikan deteksi pola di Lab 01 s.d. Lab 10.

### 9. Audit & Revisi Kejernihan Istilah Teknis (v2.4.1)
- **Eliminasi Istilah Ambigu di Simulasi:** Mengganti `"titik hotspot"`, `"Hotspot"`, `"Radar Deteksi Jalur Serangan"`, dan `"RADAR ANCAMAN"` pada `Lab02AttackPath.tsx` menjadi `"titik pemeriksaan"`, `"Perlu Dicek"`, `"Pemetaan Jalur Serangan"`, dan `"VEKTOR ANCAMAN"`, serta mengganti `"segmen URL"` di `Lab07UrlInspector.tsx` menjadi `"bagian URL"`.
- **Pemisahan Konteks Fisik, Browser, & Jaringan:** Mengganti `"port USB"` / `"port laptop kerja"` menjadi `"slot USB"` / `"slot USB laptop kerja"` (Lab 06 & Modul 06) dan memperjelas `"ekstensi"` menjadi `"ekstensi browser"` (Modul 07, Modul 08, & Lab 10).
- **Pengetatan Pola Kamus Tooltip (`tooltipTerms.ts`):** Mempersempit pola pencocokan `segmen-jaringan`, `protokol`, dan `ekstensi-file` agar tidak salah memicu tooltip pada SOP insiden, ekstensi browser, maupun ekstensi domain (TLD).

### 10. Normalisasi Terjemahan Kaku Istilah Teknis (v2.4.2)
- **Kamus Tooltip & Istilah Jaringan/Kredensial:** Mengganti `"Domain Akar"` menjadi `"Domain Utama (Registrable Domain)"`, `"terowongan"` menjadi `"tunnel VPN"`, `"Situs Cermin"` menjadi `"Mirror Server (Situs Unduhan Alternatif)"`, `"Perangkat Ujung"` menjadi `"Endpoint (Perangkat Kerja Pengguna)"`, dan `"teks polos"` menjadi `"plaintext"`.
- **Keselarasan Materi, Lab, & Handout:** Menyeragamkan `"pengelola kata sandi"` menjadi `"Password Manager"`, `"peramban web"` menjadi `"browser web"`, `"Kebersihan Sesi"` menjadi `"Keamanan Sesi Login"`, `"Kebersihan Endpoint"` / `"Alur Kebersihan Endpoint"` menjadi `"keamanan endpoint"` / `"Alur Pengamanan Endpoint"`, `"Hujan Notifikasi MFA"` menjadi `"Spam Notifikasi MFA Berulang"`, serta `"data/bukti volatil di RAM"` menjadi `"data/bukti di memori RAM (volatile)"`.
