# PRD: WBK CyberShield Interactive Bimtek Portal (2026)

## 1. Tujuan & Konteks Produk
- **Nama Aplikasi:** WBK CyberShield Interactive Bimtek Portal
- **Target Pengguna:** 5 Pegawai PT. Warna Bintang Kreasi (WBK — penyedia solusi Core Banking System WINCore dan layanan IT perbankan) + 1 Narasumber/Instruktur.
- **Profil Teknis Pengguna:** Pemahaman IT dasar hingga menengah (non-spesialis keamanan siber).
- **Objektif Utama:** Membangun aplikasi web pembelajaran interaktif mandiri (*self-contained client-side web app*) yang memetakan seluruh materi dan praktik sesuai jadwal Bimtek (08.30 – 16.00)[cite: 1]. Peserta dapat membaca materi yang dikontekstualisasikan dengan alur kerja vendor IT perbankan, mengerjakan 10 simulasi praktik langsung di browser tanpa instalasi tambahan, dan mencetak sertifikat kelulusan di akhir sesi.

## 2. Arsitektur & Stack Teknologi
- **Framework:** React 18+ dengan TypeScript (`Vite`).
- **Styling:** Tailwind CSS + `lucide-react` untuk ikon vektor.
- **Tipografi:** `Plus Jakarta Sans` (teks utama) dan `JetBrains Mono` (simulasi URL, header email, *passphrase*, dan kode/log).
- **State & Persistensi:** React Context / Custom Hook dengan penyimpanan otomatis ke `localStorage` (kunci: `wbk_cybershield_progress_v1`) agar progres belajar dan skor lab tidak hilang saat browser di-refresh.
- **Zero Backend Dependency:** Seluruh konten materi, skenario lab, dan mesin penilaian berjalan 100% di sisi klien (*browser*) sehingga kebal terhadap gangguan koneksi internet di ruang pelatihan.

## 3. Desain Antarmuka (UI/UX) & Mode Tampilan
1. **Navigasi Berbasis Rundown (Sidebar):**
   - **Sesi Pagi (08.30 – 12.00):** Modul 1 s.d. Modul 5[cite: 1].
   - **Sesi Siang (13.00 – 16.00):** Modul 6 s.d. Modul 10[cite: 1].
   - **Sesi Penutup (16.00):** Halaman Rekap Skor & Generator Sertifikat[cite: 1].
2. **Global Progress Header:** Menampilkan judul pelatihan, persentase penyelesaian modul secara *real-time* (`0% - 100%`), tombol ganti tema (*Light/Dark Mode* — default *Light High-Contrast* untuk proyektor), dan tombol **Mode Proyektor**.
3. **Mode Proyektor (Narasumber):** Saat diaktifkan, sidebar disembunyikan, ukuran font materi diperbesar (+25%), dan muncul tombol navigasi cepat (`Sebelumnya` / `Berikutnya`) untuk memudahkan narasumber mempresentasikan materi di layar utama.
4. **Struktur Halaman Tiap Modul:**
   - **Tab 1 — Materi & Studi Kasus:** Penjelasan terstruktur (bebas jargon rumit), kotak *"Analogi Sehari-hari"*, contoh kasus operasional WBK/WINCore, dan tabel perbandingan *"Lakukan (Do's) vs Hindari (Don'ts)"*.
   - **Tab 2 — Lab Praktik Interaktif:** Simulator praktis dengan sistem penilaian langsung dan umpan balik edukatif (*mengapa jawaban benar/salah*).

## 4. Spesifikasi 10 Modul & Lab Praktik Interaktif

### Blok Sesi Pagi (08.30 – 12.00)[cite: 1]
- **Modul 01 — Fundamental IT Security dan Prinsip Cybersecurity**[cite: 1]
  - *Materi:* Segitiga CIA (*Confidentiality, Integrity, Availability*) dalam layanan *core banking* & *support* WBK; peran manusia sebagai garis pertahanan pertama.
  - *Lab 01 (`Lab01CIA.tsx`):* **Klasifikasi Dampak CIA** — Peserta memetakan 4 insiden operasional (misal: *server tiket lumpuh 3 jam*, *backup database BPR terkirim ke alamat salah*, *file patch berubah checksum*) ke pilar CIA dan mitigasi utamanya.
- **Modul 02 — Pengenalan Ancaman dan Serangan Siber**[cite: 1]
  - *Materi:* *Supply Chain Attack* (menargetkan vendor untuk masuk ke bank klien), *Ransomware*, *Credential Stuffing*, dan *Trojan/Malicious Attachment*.
  - *Lab 02 (`Lab02AttackPath.tsx`):* **Radar Deteksi Jalur Serangan** — Diagram alur kerja harian (Terima Tiket -> Unduh Lampiran -> Koneksi VPN Klien -> Kirim Balasan) dengan 4 titik interaktif (*hotspots*) untuk mengungkap celah serangan dan cara memblokirnya.
- **Modul 03 — Phishing Awareness dan Social Engineering**[cite: 1]
  - *Materi:* Manipulasi psikologis (*Urgency, Fear, Authority*), *Spear Phishing* B2B, *Email Spoofing*, dan *Typosquatting* domain (`wbk.co.id` vs domain tiruan).
  - *Lab 03 (`Lab03PhishingSim.tsx`):* **Simulator Kotak Masuk & WhatsApp Jebakan** — Antarmuka mirip *Webmail* & *Chat* berisi 5 pesan campuran (3 jebakan mengatasnamakan IT BPR/manajemen WBK, 2 pesan sah) lengkap dengan fitur *hover URL preview* dan deteksi ekstensi ganda (`.pdf.exe`).
- **Modul 04 — Password Security dan Access Management**[cite: 1]
  - *Materi:* Kelemahan password pendek rumit dibanding *Passphrase* panjang, prinsip *Least Privilege* pada akses VPN/server klien, serta keunggulan MFA berbasis aplikasi dibanding SMS.
  - *Lab 04 (`Lab04AuthLab.tsx`):* **Uji Entropi Passphrase & Simulasi MFA Fatigue** — (1) Meteran kekuatan *passphrase* lokal secara *real-time*; (2) Pop-up simulasi serangan notifikasi *push MFA* berulang di mana peserta harus memilih tindakan penolakan & pelaporan yang tepat.
- **Modul 05 — Data Protection dan Information Security**[cite: 1]
  - *Materi:* 4 tingkat klasifikasi data WBK (Publik, Internal, Rahasia, Sangat Rahasia), larangan menyimpan *dump* database klien tanpa enkripsi, dan pengiriman kredensial terpisah (*Out-of-Band*).
  - *Lab 05 (`Lab05DataHandling.tsx`):* **Simulator Pengamanan & Enkripsi Dokumen Klien** — Alur langkah demi langkah mengamankan file konfigurasi server sebelum dikirim ke rekan tim (enkripsi file, pemisahan saluran pengiriman kunci, dan pembersihan folder sementara).

### Blok Sesi Siang (13.00 – 16.00)[cite: 1]
- **Modul 06 — Endpoint Security dan Device Protection**[cite: 1]
  - *Materi:* Bahaya *software* bajakan (*infostealer* pencuri sesi VPN/browser), disiplin *OS/Browser Patching*, enkripsi disk, dan keamanan fisik (*screen lock* `Win + L`, larangan USB tak dikenal).
  - *Lab 06 (`Lab06EndpointAudit.tsx`):* **Audit Mandiri Kesehatan Laptop Kerja** — Daftar periksa diagnostik interaktif 8 poin kondisi aktual laptop peserta yang menghitung *Device Readiness Score* (0–100%) beserta rekomendasi perbaikan.
- **Modul 07 — Network Security dan Safe Internet Practices**[cite: 1]
  - *Materi:* Risiko Wi-Fi publik & *Evil Twin Attack*, aturan penggunaan VPN klien, validasi HTTPS, dan bahaya ekstensi browser berlebihan.
  - *Lab 07 (`Lab07UrlInspector.tsx`):* **Inspeksi URL & Struktur Domain** — Tantangan membedah 6 URL login/portal klien untuk membedakan domain resmi `wbk.co.id` dari teknik *subdomain spoofing* (contoh: `https://portal.wbk.co.id.auth-check.net`).
- **Modul 08 — Cybersecurity Incident Response dan Reporting**[cite: 1]
  - *Materi:* Mengenali gejala awal kompromi laptop, protokol 5 menit pertama (*Isolate, Preserve, Report*), serta budaya lapor cepat tanpa takut disalahkan (*no-blame reporting*).
  - *Lab 08 (`Lab08IncidentSim.tsx`):* **Simulator Krisis Tanggap Darurat** — Skenario bercabang (*branching scenario*): peserta memicu lampiran mencurigakan saat VPN ke salah satu BPR klien sedang aktif, lalu harus memilih urutan tindakan isolasi yang tepat.
- **Modul 09 — Email, Cloud, dan Digital Communication Security**[cite: 1]
  - *Materi:* Risiko tautan publik (*Anyone with the link*) di Google Drive/OneDrive, serta larangan mengirim IP server, *credential*, atau *screenshot* data nasabah di grup WhatsApp/Telegram.
  - *Lab 09 (`Lab09CloudChatAudit.tsx`):* **Konfigurasi Hak Akses Cloud & Audit Percakapan Grup** — (1) Memperbaiki 3 pengaturan berbagi file Cloud yang terlalu terbuka; (2) Menandai baris pesan berisiko pada simulasi percakapan grup kerja.
- **Modul 10 — Cybersecurity Best Practices dan Security Awareness Culture**[cite: 1]
  - *Materi:* Rangkuman 7 Kebiasaan Emas Keamanan Siber WBK dan tanggung jawab kolektif tim.
  - *Lab 10 (`Lab10FinalExam.tsx`):* **Evaluasi Akhir Terpadu** — 10 soal studi kasus lintas modul (nilai batas lulus: 80%).

### Blok Sesi Penutup (16.00)[cite: 1]
- **Sertifikat & Kartu Saku (`CertificateView.tsx`):**
  - Terbuka setelah peserta menyelesaikan evaluasi akhir (atau dapat diakses di halaman penutup dengan status kelulusan).
  - Peserta memasukkan **Nama Lengkap** dan **Divisi/Jabatan**, lalu dapat mencetak atau menyimpan PDF **Sertifikat Penyelesaian Bimtek Cybersecurity 2026** serta **Kartu Saku 7 Kebiasaan Emas WBK** menggunakan CSS `@media print`.

## 5. Kontrak Struktur Direktori & Kualitas Kode
- `src/types/training.ts`: Definisi interface TypeScript untuk modul, sub-bab materi, studi kasus, dan progres pengguna.
- `src/data/modulesData.ts`: Konten lengkap ke-10 modul dalam bahasa Indonesia yang natural, mendalam, dan spesifik pada industri IT perbankan/WBK (dilarang menggunakan teks dummy *Lorem Ipsum* atau ringkasan terlalu singkat).
- `src/components/labs/`: 10 komponen independen (`Lab01CIA.tsx` s.d. `Lab10FinalExam.tsx`) yang masing-masing mengembalikan skor (`0-100`) ke *state* global saat selesai.
- **Standar UI:** Tidak ada teks terpotong elipsis (`...`) pada kartu materi maupun opsi pilihan ganda; kontras warna memenuhi standar keterbacaan proyektor.