# Changelog

Semua perubahan penting pada proyek **Training IT Security Awareness and Cybersecurity Protection 2026** didokumentasikan dalam berkas ini. Format penulisan mengacu pada [Keep a Changelog](https://keepachangelog.com/id/1.0.0/) dan proyek ini mematuhi standar [Semantic Versioning](https://semver.org/).

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
