# PRD: Training IT Security Awareness and Cybersecurity Protection 2026

## 1. Tujuan & Konteks Produk

- **Nama Aplikasi:** Portal BimTek Training IT Security Awareness and Cybersecurity Protection 2026
- **Konteks Entitas Rekaan:** PT. Sigit Adi Aman Siber (SaaS), penyedia solusi Core Banking System **SaaSCore** untuk BPR mitra (digunakan sebagai contoh kasus simulasi agar pengalaman belajar terasa nyata), beserta 1 Narasumber/Instruktur (**Sigit Adi Irianto, S.Kom.** - sigitadi.id).
- **Profil Teknis Pengguna:** Staf dan profesional IT dasar hingga menengah (Developer, QA, Implementor, Support, Infrastruktur).
- **Objektif Utama:** Membangun aplikasi web pembelajaran eksploratif mandiri (*self-contained client-side web app*) tanpa ujian skor atau sertifikat kelulusan yang memetakan seluruh materi dan praktik sesuai jadwal Bimtek (08.30 - 16.15). Peserta membaca materi berbasis alur kerja vendor IT perbankan, meninjau diagram alur kerja tiap modul, serta mengeksplorasi 10 simulasi praktik langsung di browser tanpa instalasi tambahan.

## 2. Arsitektur & Stack Teknologi

- **Framework:** React 18+ dengan TypeScript (`Vite`).
- **Styling:** Tailwind CSS + `lucide-react` untuk ikon vektor.
- **Tipografi:** `Plus Jakarta Sans` (teks utama) dan `JetBrains Mono` (simulasi URL, header email, *passphrase*, dan kode/log).
- **State & Persistensi:**
  - `localStorage`: Progres eksplorasi modul dan tema (`ProgressContext`), serta preferensi buka/tutup sidebar desktop (`saas_desktop_sidebar_open_v1`).
  - `sessionStorage`: Status eksplorasi masing-masing lab (`saas_lab_state_v1_<moduleId>`) agar tidak hilang saat berpindah tab Materi <-> Lab.
- **Zero Backend Dependency:** Seluruh konten materi, skenario lab, dan glosarium balloon tooltip berjalan 100% di sisi klien (*browser*) sehingga kebal terhadap gangguan koneksi internet di ruang pelatihan.

## 3. Desain Antarmuka (UI/UX) & Mode Tampilan

1. **Navigasi Berbasis Rundown (Sidebar Lipat & Drawer Mobile):**
   - **Sesi Pagi (08.30 - 12.00):** Modul 01 s.d. Modul 05.
   - **Sesi Siang (13.00 - 16.00):** Modul 06 s.d. Modul 10.
   - **Sesi Penutup (16.00 - 16.15):** Halaman Rangkuman 7 Kebiasaan Emas & Kartu Saku (`ClosingSummaryView.tsx`).
   - Sidebar desktop dapat dibuka/tutup dengan persistensi `localStorage` dan pintasan keyboard (`Alt+B` atau `[`), sementara layar kecil menggunakan drawer aksesibel.
2. **Floating Header & Jam Rundown Real-time:** Menampilkan judul pelatihan, indikator eksplorasi modul, tombol buka/tutup sidebar, tombol ganti tema (*Light/Dark Mode* dengan kontras tinggi WCAG AA), modal catatan entitas rekaan, serta baris tanggal, jam berjalan, dan status sesi aktif dari 13 segmen rundown.
3. **Mode Narasumber & Mode Proyektor:** Aktivasi diskret 9x klik logo membuka Mode Narasumber (Panduan Narasumber, tombol buka seluruh penjelasan lab, dan ikon Mode Proyektor dengan font +25%, kontrol slide `01/21` s.d. `21/21`, serta layar penuh).
4. **Struktur Halaman Tiap Modul:**
   - **Tab 1 - Materi & Studi Kasus:** Tujuan pembelajaran, **Diagram Alur Kerja Operasional SaaSCore** (4-5 langkah berurutan), pembahasan terstruktur dengan *Balloon Tooltips* interaktif (`RichTermText`), kotak *"Analogi Sehari-hari"*, ilustrasi skenario operasional SaaS/SaaSCore, dan tabel perbandingan *"Lakukan (Do's) vs Hindari (Don'ts)"*.
   - **Tab 2 - Lab Praktik Interaktif:** Simulator eksploratif berbasis `LabShell` dengan umpan balik edukatif dan reset penuh tanpa sistem skor lulus/gagal.

## 4. Spesifikasi 10 Modul & Lab Praktik Interaktif

### Blok Sesi Pagi (08.30 - 12.00)

- **Modul 01: Fundamental IT Security dan Prinsip Cybersecurity**
  - *Materi & Alur Kerja:* Segitiga CIA (*Confidentiality, Integrity, Availability*) pada alur perubahan aman SaaSCore dan peran pegawai IT sebagai *Human Firewall*.
  - *Lab 01 (`Lab01CIA.tsx`):* **Klasifikasi Dampak CIA** (eksplorasi 4 skenario operasional SaaS/BPR untuk memetakan dampak CIA dan mitigasi aman).
- **Modul 02: Pengenalan Ancaman dan Serangan Siber**
  - *Materi & Alur Kerja:* *Supply Chain Attack*, *Ransomware* (*Double Extortion*), *Credential Stuffing*, dan *Trojan/Malicious Attachment* pada alur kerja vendor.
  - *Lab 02 (`Lab02AttackPath.tsx`):* **Pemetaan Jalur Serangan** (eksplorasi 4 titik pemeriksaan alur kerja harian support SaaSCore dan kontrol pemutus rantai serangan).
- **Modul 03: Phishing Awareness dan Social Engineering**
  - *Materi & Alur Kerja:* Manipulasi psikologis (*Urgency, Fear, Authority*), *Spear Phishing* B2B, *Email Spoofing*, dan *Typosquatting* domain (`sigitadi.id` vs domain tiruan).
  - *Lab 03 (`Lab03PhishingSim.tsx`):* **Simulator Kotak Masuk & WhatsApp Jebakan** (inspeksi 5 pesan campuran dengan *hover URL preview* dan deteksi ekstensi ganda).
- **Modul 04: Password Security dan Access Management**
  - *Materi & Alur Kerja:* *Passphrase* panjang (minimal 16 karakter), *Password Manager*, prinsip *Least Privilege*, serta MFA aplikasi vs SMS dan penolakan *MFA Fatigue*.
  - *Lab 04 (`Lab04AuthLab.tsx`):* **Uji Entropi Passphrase & Simulasi MFA Fatigue** (analisis kekuatan kata sandi termasuk deteksi kata kamus/pola tahun serta simulasi keputusan prompt MFA).
- **Modul 05: Data Protection dan Information Security**
  - *Materi & Alur Kerja:* 4 tingkat klasifikasi data SaaS (Publik, Internal, Rahasia, Sangat Rahasia), larangan *dump* database plaintext, enkripsi AES-256, dan pengiriman kredensial *Out-of-Band*.
  - *Lab 05 (`Lab05DataHandling.tsx`):* **Simulator Pengamanan & Enkripsi Dokumen Klien** (klasifikasi berkas, pratinjau masking data dummy, enkripsi AES-256, dan alur *Out-of-Band*).

### Blok Sesi Siang (13.00 - 16.00)

- **Modul 06: Endpoint Security dan Device Protection**
  - *Materi & Alur Kerja:* Bahaya *software* bajakan (*infostealer*), disiplin *OS/Browser Patching*, UAC/EDR, enkripsi disk penuh (BitLocker/FileVault), *screen lock* (`Win + L`), dan larangan USB asing.
  - *Lab 06 (`Lab06EndpointAudit.tsx`):* **Audit Mandiri Kesehatan Laptop Kerja** (daftar periksa diagnostik 8 poin kondisi aktual laptop kerja beserta rekomendasi perbaikan).
- **Modul 07: Network Security dan Safe Internet Practices**
  - *Materi & Alur Kerja:* Risiko Wi-Fi publik & *Evil Twin Attack*, disiplin VPN klien BPR sesuai tiket, validasi HTTPS/domain kanan-ke-kiri, dan audit ekstensi browser.
  - *Lab 07 (`Lab07UrlInspector.tsx`):* **Inspeksi URL & Struktur Domain** (membedah contoh URL resmi `sigitadi.id` vs *subdomain spoofing* dan langkah jaringan lapangan aman).
- **Modul 08: Cybersecurity Incident Response dan Reporting**
  - *Materi & Alur Kerja:* Gejala awal kompromi (*IoC*), protokol 5 menit pertama (*Isolate, Preserve, Report*), serta budaya lapor cepat tanpa takut disalahkan (*no-blame reporting*).
  - *Lab 08 (`Lab08IncidentSim.tsx`):* **Simulator Krisis Tanggap Darurat** (skenario bertahap 5 menit pertama saat gejala kompromi muncul ketika VPN BPR aktif).
- **Modul 09: Email, Cloud, dan Digital Communication Security**
  - *Materi & Alur Kerja:* Risiko tautan publik (*Anyone with the link*) di cloud, *redaction* data pribadi (UU PDP), larangan mengirim IP/kredensial di WhatsApp/Telegram, dan disiplin BCC email.
  - *Lab 09 (`Lab09CloudChatAudit.tsx`):* **Konfigurasi Hak Akses Cloud & Audit Percakapan Grup** (mengamankan izin folder cloud dan mengevaluasi pesan chat grup proyek).
- **Modul 10: Cybersecurity Best Practices dan Security Awareness Culture**
  - *Materi & Alur Kerja:* Rangkuman 7 Kebiasaan Emas Keamanan Siber SaaS, tanggung jawab lintas peran, dan siklus audit mandiri.
  - *Lab 10 (`Lab10CaseReview.tsx`):* **Simulasi Diskusi Kasus Terpadu Lintas Modul** (10 situasi insiden lintas modul untuk diskusi kelas tanpa nilai batas lulus).

### Blok Sesi Penutup (16.00 - 16.15)

- **Rangkuman & Kartu Saku (`ClosingSummaryView.tsx`):**
  - Ringkasan progres eksplorasi modul, rangkuman **7 Kebiasaan Emas Keamanan Siber SaaS**, dan fitur cetak/simpan PDF **Kartu Saku 7 Kebiasaan Emas** melalui CSS `@media print`.

## 5. Kontrak Struktur Direktori & Kualitas Kode

- `src/types/training.ts`: Definisi interface TypeScript (`ModuleContent`, `WorkflowDiagramSpec`, `WorkflowStep`, `GoldenRule`, `LabProps`).
- `src/data/modulesData.ts` & `src/data/modules/*`: Konten lengkap 10 modul dalam bahasa Indonesia yang natural dan selaras dengan alur operasional SaaS/SaaSCore.
- `src/components/labs/`: 10 komponen simulasi eksploratif independen (`Lab01CIA.tsx` s.d. `Lab10CaseReview.tsx`) yang berbagi hook `useLabExploration`.
- **Standar UI:** Nol *em dash*, target sentuh minimum 44x44px, kontras warna memenuhi WCAG AA pada tema terang dan gelap, dan bebas horizontal overflow di desktop maupun mobile.
