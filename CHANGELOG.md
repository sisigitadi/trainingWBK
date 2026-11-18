# Changelog

Semua perubahan penting pada proyek **Training IT Security Awareness and Cybersecurity Protection 2026** didokumentasikan dalam berkas ini. Format penulisan mengacu pada [Keep a Changelog](https://keepachangelog.com/id/1.0.0/) dan proyek ini mematuhi standar [Semantic Versioning](https://semver.org/).

---

## [2.3.0] - 2026-11-18

### Ditambahkan
- **Open Graph & Social Share Preview (`public/og-image.jpg`, `index.html`):**
  - Menambahkan kartu pratinjau berbagi tautan `public/og-image.jpg` beresolusi tepat 1200x630 px (baseline JPEG, ~92 KB, aman di bawah batas 300 KB WhatsApp) menampilkan logo perisai siber "SA", judul pelatihan, deskripsi ringkas, identitas narasumber, dan domain portal pada latar Navy `#0B1F3A` dengan aksen Emerald `#10B981`.
  - Menambahkan metadata SEO (`description`, `canonical`, `theme-color`), Open Graph (`og:type`, `og:locale`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:secure_url`, `og:image:type`, `og:image:width`, `og:image:height`, `og:image:alt`), serta Twitter Card (`summary_large_image`) menggunakan URL HTTPS absolut (`https://trainingwbk.sigitadi.id/`) untuk pratinjau optimal di WhatsApp, Telegram, LinkedIn, X, dan Facebook.

### Diubah & Diperbaiki
- **Modal Dialog Catatan Contoh Studi Kasus (`Layout.tsx`):**
  - Mengubah blok catatan inline **Catatan Contoh Studi Kasus (Entitas Rekaan)** menjadi tombol ikon Info di header yang membuka Modal Dialog aksesibel, sehingga area konten awal lebih bersih di layar desktop, ponsel, maupun Mode Proyektor dan tetap dapat dibuka kembali kapan saja.
- **Ekspansi Kamus Istilah Teknis & Perbaikan Balloon Tooltips (`glossary.ts`, `RichTermText.tsx`, `TermTooltip.tsx`, 10 Modul, 10 Lab, & Sesi Penutup):**
  - Memperluas kamus istilah teknis dan penerapan balloon tooltips secara menyeluruh (termasuk `server`, `database`, `dump`, `failover`, dan istilah teknis lainnya) ke seluruh 10 Modul materi, 10 Lab simulasi, dan Sesi Penutup.
  - Memperbaiki bug pencocokan teks pada istilah `KMS`, ekstensi berkas `.xlsm`/`.pdf.exe`, serta perlindungan URL agar tidak terpecah oleh tooltip, disertai penyempurnaan `TermTooltip`.
- **Sinkronisasi Dokumentasi (`README.md`, `REVISI.md`, `CHANGELOG.md`):**
  - Memperbarui deskripsi tata letak di `README.md` dan `REVISI.md` dari "Header & Footer Mengambang" menjadi "Header Mengambang" serta mencatat seluruh perubahan v2.3.0.

### Dihapus
- **Penghapusan Total Footer Mengambang (`Layout.tsx`):**
  - Menghapus seluruh komponen footer mengambang di bagian bawah layar agar tidak menutupi konten materi maupun simulasi lab saat digulir, disertai penyesuaian ruang padding bawah non-proyektor.

---

## [2.2.6] - 2026-11-18

### Diubah & Diperbaiki
- **Audit & Revisi Mode Proyektor (`Layout.tsx`, `MaterialView.tsx`):**
  - Menyembunyikan panel **Panduan Narasumber** secara otomatis ketika Mode Proyektor aktif agar skrip/catatan fasilitator tidak bocor ke layar peserta di ruang kelas.
  - Meringkas tombol aktivasi Mode Proyektor di header menjadi tombol ikon `Monitor` saja (`min-h-[44px] min-w-[44px]` pada mobile, `aria-pressed`, `aria-label`, dan `sr-only`).
  - Menyembunyikan baris tanggal/rundown sekunder saat Mode Proyektor aktif serta menyinkronkan `ResizeObserver` header agar ruang baca proyektor lebih lega.
  - Mengubah label statis di bilah kontrol bawah proyektor menjadi dropdown lompat cepat 21 slide (`01/21` s.d. `21/21`) dan menambahkan tombol toggle layar penuh (`Maximize2` / `Minimize2`) dengan auto-exit saat keluar Mode Proyektor.
- **Audit & Revisi Waktu Nyata (`src/lib/features.ts`, `Layout.tsx`, `rundown.ts`):**
  - Menyembunyikan dropdown simulasi `Waktu Nyata` dari UI produksi melalui feature flag `ENABLE_TIME_SIMULATION = false` di `src/lib/features.ts` agar jam kelas tidak berisiko tergeser ke jam simulasi palsu.
  - Menyelaraskan pesan fallback jam rundown di `src/lib/rundown.ts` dari `08.30 - 16.00` menjadi `08.30 - 16.15` sesuai akhir Sesi Penutup.

---

## [2.2.5] - 2026-11-18

### Diubah & Diperbaiki
- **Penyembunyian UI Cetak Handout (`src/lib/features.ts`, `Layout.tsx`, `ClosingSummaryView.tsx`):**
  - Menambahkan kendali terpusat `ENABLE_PRINT_HANDOUT = false` di `src/lib/features.ts` untuk menyembunyikan tombol `Cetak Handout` di header, sheet `<PrintableHandout />`, serta kartu CTA cetak handout pada Sesi Penutup tanpa menghapus kode sumber `PrintableHandout.tsx`.
  - Menyelaraskan teks pengantar Sesi Penutup agar hanya merujuk pada cetak Kartu Saku 7 Kebiasaan Emas selama handout disembunyikan.
- **Kontrol Ikon Ringkas Mode Narasumber (`Layout.tsx`):**
  - Menggabungkan badge teks `MODE NARASUMBER AKTIF` dan tombol `Kunci Mode` menjadi satu tombol ikon ringkas tanpa teks (`LockOpen | LogOut`) yang diskret saat presentasi di proyektor dan menghemat ruang header di desktop maupun ponsel.
  - Memenuhi standar aksesibilitas dengan `aria-label`, `<span className="sr-only">`, target sentuh minimum `44x44px` pada mobile, serta kontras WCAG AA terverifikasi di Mode Terang dan Mode Gelap.

---

## [2.2.4] - 2026-11-18

### Diubah & Diperbaiki
- **Pemindahan Pemicu Mode Narasumber ke Logo Header (`Layout.tsx`):**
  - Memindahkan pintasan aktivasi 9x klik (jeda maksimal 2,5 detik) dari tombol teks nama narasumber ke logo pelatihan di pojok kiri atas header.
  - Menghapus atribut `title` petunjuk eksplisit agar aktivasi Mode Narasumber tetap diskret bagi peserta.
  - Mengubah nama narasumber (`Sigit Adi Irianto, S.Kom.`) menjadi teks non-interaktif yang terpisah rapi dari tautan aktif `sigitadi.id`.
  - Membungkus logo dengan tombol semantik berukuran 44x44px (`h-11 w-11`, `touch-manipulation`, `select-none`, `draggable={false}`, dan `active:scale-95`) demi kenyamanan tap cepat di layar sentuh dan aksesibilitas keyboard (`Tab`, `Enter`/`Space`, focus ring emerald).
  - Mengeliminasi *dead control* saat Mode Narasumber aktif dengan mengubah wadah logo menjadi elemen non-interaktif berbingkai emerald, disertai reset otomatis hitungan klik ketika mode dikunci kembali.
  - Menyesuaikan tinggi minimum tombol `Kunci Mode` pada layar ponsel menjadi `44px` (`min-h-[44px] sm:min-h-[32px]`).
- **Sinkronisasi Dokumentasi (`README.md`, `REVISI.md`):**
  - Memperbarui panduan aktivasi Mode Narasumber agar merujuk pada 9x klik logo di header.

---

## [2.2.3] - 2026-11-17

### Diperbaiki (Fix Cetak PDF Presisi 12 Halaman)
- **Penyelesaian Isu Overflow Halaman (12 Halaman Presisi):**
  - Mengatasi masalah pecahnya lembar modul yang sebelumnya menyebabkan hasil cetak membengkak menjadi 21 halaman dengan nomor halaman hilang pada halaman genap.
  - Menata ulang layout vertikal lembar handout (`h-[272mm]` dengan `flex flex-col justify-between`), menjadikan Tujuan Pembelajaran dalam grid 2 kolom ringkas, dan mengoptimalkan spasi tabel Do's/Don'ts agar tiap modul menempati tepat 1 lembar A4 penuh tanpa overflow.
- **Konsistensi Footer & Nomor Halaman di Seluruh Lembar:**
  - Memastikan footer tersemat presisi di bagian bawah tiap halaman (bukan melayang di tengah konten).
  - Seluruh 12 halaman kini memiliki nomor halaman runtut (`Halaman 1 dari 12` s.d. `Halaman 12 dari 12`) yang sinkron 100% dengan total lembar cetak fisik.
- **Pembaruan Berkas PDF Master:**
  - Memperbarui `Training IT Security Awareness and Cybersecurity Protection 2026.pdf` dengan hasil cetak 12 halaman presisi dan seluruh tautan aktif (`trainingwbk.sigitadi.id` & `sigitadi.id`).

---

## [2.2.2] - 2026-11-17

### Diperbaiki & Ditingkatkan
- **Audit & Revisi Lembar Cetak Handout A4 (`PrintableHandout.tsx`):**
  - Mengganti label kolom metadata di lembar pertama menjadi **"Portal Pelatihan"** (menggantikan "Referensi") agar selaras dan merepresentasikan portal pembelajaran interaktif.
  - Mengubah angka tahun menjadi teks tautan aktif `trainingwbk.sigitadi.id` dengan URL `https://trainingwbk.sigitadi.id/` yang dapat diklik langsung.
  - Memberikan tautan aktif `https://sigitadi.id/` pada teks `sigitadi.id` di kolom identitas Narasumber.
  - Melengkapi teks nama kegiatan pada footer setiap lembar halaman menjadi **"Training IT Security Awareness and Cybersecurity Protection - sigitadi.id"** lengkap dengan nomor halaman (`Halaman 1 dari 12` hingga `Halaman 12 dari 12`).
- **Styling Print A4 (`index.css`):**
  - Mengatur ukuran font cetak menjadi `10pt` dan margin cetak optimal `10mm 12mm` agar tiap modul materi dan penutup tertata presisi pada 1 lembar A4 per modul.
- **Konfigurasi Custom Domain:**
  - Menambahkan berkas `public/CNAME` berisi `trainingwbk.sigitadi.id` untuk deployment terarah ke subdomain kustom.
- **Sinkronisasi Dokumentasi (`HANDOUT_PRESENTASI.md`, `README.md`, `REVISI.md`):**
  - Memperbarui tautan referensi dan lencana situs live menuju `https://trainingwbk.sigitadi.id/`.

---

## [2.2.1] - 2026-11-16

### Diperbaiki
- **Optimalisasi Header Mobile:** Menghilangkan kata awalan "Narasumber:" di header navigasi sehingga langsung menampilkan nama dan tautan: `Sigit Adi Irianto, S.Kom. - sigitadi.id`, menghemat ruang dan mencegah wrap berlebih di layar ponsel.
- **Pemberian Jarak Bebas Dinamis (Anti-Overlap):** Mengimplementasikan perhitungan tinggi header mengambang dinamis berbasis `ResizeObserver` (`paddingTop: ${topBarHeight + 16}px`) sehingga kartu `Catatan Contoh Studi Kasus (Entitas Rekaan)` tidak lagi tertutup oleh header rundown pada semua ukuran layar mobile (375px, 390px, dsb).

---

## [2.2.0] - 2026-11-16

### Ditambahkan
- **Branding Logo & Favicon:** Mengintegrasikan lambang perisai siber logam (*cyber shield emblem*) berinisial "SA" sebagai logo aplikasi di header, lembar cetak handout A4, kartu saku 7 Kebiasaan Emas, dan favicon browser (`index.html`).
- **Floating Header & Footer Mengambang:**
  - Header beralih menjadi `fixed inset-x-0 top-0 z-30` dengan efek kaca transparan (*translucent glassmorphism*) menggunakan `backdrop-blur-md bg-white/80 dark:bg-[#0B1F3A]/85`.
  - Footer beralih menjadi floating dock `fixed inset-x-0 bottom-0 z-20` dengan efek transparan serupa, padding ringkas (`py-2`), dan tetap menampilkan kredit `Develop with [heart] - sigitadi.id© - 2026`.
  - Penataan padding konten (`pt-24 sm:pt-28` dan `pb-16 sm:pb-20`) sehingga materi dan navigasi dapat terbaca maksimal tanpa terhalang atau terpotong saat digulir.
- **Tautan Aktif Narasumber:** Nama narasumber diperbarui menjadi **Sigit Adi Irianto, S.Kom. - sigitadi.id** dengan tautan `https://sigitadi.id/` aktif yang membuka di tab baru, sementara tombol teks narasumber tetap mempertahankan pintasan 9-klik untuk membuka Mode Narasumber.
- **CI/CD GitHub Actions Workflow:** Konfigurasi `.github/workflows/deploy.yml` untuk otomatis membangun (*build*) dan mempublikasikan (*deploy*) aplikasi ke GitHub Pages pada setiap push ke branch `main`.

---

## [2.1.0] - 2026-11-16

### Ditambahkan
- **Balloon Tips & Tooltips Interaktif (`TermTooltip` & `RichTermText`):**
  - Menggantikan kamus istilah statis per modul dan tombol header dengan tooltip balon interaktif berbasis React Portal.
  - Menampilkan badge kategori **ISTILAH TEKNIS**, nama lengkap istilah beserta akronimnya, **Penjelasan Praktis** dalam bahasa awam, dan **Konteks SaaSCore / Perbankan**.
  - Mendukung interaksi hover dengan garis bawah titik-titik (*dotted underline*), klik untuk menyematkan (*click-to-pin*), tombol Esc untuk menutup, dan *auto-clamping* agar tidak meluap keluar layar.
- **Riset Mendalam 50+ Istilah Teknis:**
  - Istilah perbankan/operasional: CIF, EOD, GL, SLIK OJK, UAT, Staging, SLA, Redaction/Masking, Escrow.
  - Istilah keamanan & ancaman: CIA Triad, Ransomware, Phishing, Spear Phishing, Whaling, Smishing, Vishing, Pretexting, Quishing, Evil Twin AP, MITM/AITM, BadUSB, Zero-Day Exploit, SIM Swapping.
  - Istilah perlindungan & tata kelola: MFA, Passphrase, Authenticator App, FIDO2/Passkey, BitLocker, FDE, RBAC, Least Privilege, Zero-Trust Architecture, Air Gap, WORM, RPO, RTO, IRP, IoC, SIEM, Clean Desk Policy, Shoulder Surfing, Shadow IT, DLP, Human Firewall.

### Dihapus
- Modal Kamus Istilah global (`GlossaryModal.tsx`) dan tombol "Kamus Istilah" di header.
- Blok tabel/kartu kamus istilah di akhir setiap modul materi dan lembar handout.
- Frasa `" di perusahaan peserta"` pada catatan disclaimer studi kasus entitas rekaan.

---

## [2.0.0] - 2026-11-16

### Ditambahkan
- **Header Pelatihan Resmi:** Mengganti label lama menjadi **Training IT Security Awareness and Cybersecurity Protection 2026** dengan identitas narasumber di bawahnya.
- **Tanggal, Jam Live, & Notifikasi Rundown (< 15 Menit):**
  - Jam dan tanggal berjalan real-time sinkron dengan 13 segmen rundown acara (08.30 - 16.15).
  - Peringatan banner otomatis ketika sisa waktu segmen tersisa 15 menit atau kurang menuju Rehat Kopi Pagi (09.50 - 10.05), ISHOMA (12.00 - 13.00), atau pergantian modul berikutnya.
- **Fitur Rahasia Narasumber (Klik 9x):**
  - Tampilan default peserta bersih dari kontrol instruktur.
  - Mengklik teks narasumber 9 kali membuka **Mode Narasumber Aktif** yang menampilkan tombol Cetak Handout, Mode Proyektor (+25% font & navigasi keyboard), Panduan Narasumber, dan tombol Buka Semua Penjelasan Kondisi di seluruh 10 lab.
- **Penegasan Entitas Rekaan (Hak Cipta & UU PDP):**
  - Penggantian nama dummy menjadi **PT. Sigit Adi Aman Siber (SaaS)** dan platform Core Banking System **SaaSCore**.
  - Penambahan kartu informasi resmi bahwa entitas tersebut adalah rekaan semata-mata untuk kemudahan belajar dan simulasi alur kerja nyata.

---

## [1.1.0] - 2026-11-16

### Diubah
- **Pembelajaran Eksploratif (Non-Ujian):** Menghilangkan penilaian skor kuis, passing grade, dan pencetakan sertifikat kelulusan agar berorientasi pada eksplorasi seluruh skenario insiden tanpa tekanan tes.
- **Pemadatan Materi & Penyesuaian Rundown:** Merampingkan seluruh teks modul menjadi penjelasan ringkas, terfokus, dan tepat waktu sesuai alokasi durasi setiap sesi pelatihan.
- **Handout A4 & Kartu Saku:** Menghadirkan lembar materi cetak presentasi format A4 dan Kartu Saku 7 Kebiasaan Emas siap cetak atau simpan PDF.

---

## [1.0.0] - 2026-11-16

### Rilis Perdana
- Rilis awal portal pembelajaran mandiri berbasis klien (*zero-backend*).
- 10 Modul Interaktif:
  - Modul 01: Fondasi Keamanan Siber & Lanskap Ancaman Perbankan
  - Modul 02: Rantai Serangan Siber & Studi Kasus Pembobolan Vendor
  - Modul 03: Social Engineering, Phishing, & Manipulasi Psikologis
  - Modul 04: Autentikasi Kuat, Manajemen Kredensial, & Akses Berbasis Peran
  - Modul 05: Perlindungan Data Sensitif, Kebijakan Meja Bersih, & UU PDP
  - Modul 06: Keamanan Perangkat Keras, Laptop Kerja, & Media Portabel
  - Modul 07: Keamanan Jaringan, Bekerja Remote, & Akses Publik
  - Modul 08: Respons Insiden Siber, Pelaporan Cepat, & Mitigasi Dampak
  - Modul 09: Keamanan Cloud, Komunikasi Tim, & Shadow IT
  - Modul 10: Budaya Sadar Keamanan & 7 Kebiasaan Emas Karyawan
- 10 Lab Simulasi Eksploratif:
  - Lab 01: Audit Triad CIA pada Alur SaaSCore
  - Lab 02: Visualisasi Rantai Serangan Siber
  - Lab 03: Inspeksi Email & Pesan Phishing Interaktif
  - Lab 04: Penguji Kekuatan Passphrase & Simulasi MFA
  - Lab 05: Klasifikasi Data Sensitif & Redaksi Dokumen
  - Lab 06: Audit Keamanan Endpoint & Checklist Laptop Kerja
  - Lab 07: Deteksi Jaringan Publik & Pemeriksa URL Palsu
  - Lab 08: Simulasi Alur Triase Respons Insiden Siber
  - Lab 09: Audit Kolaborasi Cloud & Deteksi Shadow IT
  - Lab 10: Review Studi Kasus Komprehensif
- Dukungan Tema Gelap & Terang dengan kontras tinggi WCAG AAA.
- Penyimpanan progres lokal (*LocalStorage*) tanpa dependensi server eksternal.
