# DESIGN.md - Training IT Security Awareness and Cybersecurity Protection 2026

## Identity & Audience

- **Product:** Portal Pembelajaran & Simulasi Keamanan Siber Interaktif (PT. Sigit Adi Aman Siber / SaaS, platform simulasi SaaSCore).
- **Audience:** Profesional IT dan tim operasional perbankan (BPR) dalam sesi pelatihan 1 hari penuh (08.30 - 16.15 WIB), termasuk tampilan proyektor kelas dan perangkat mobile peserta.
- **Character:** Otoritatif, tenang, terstruktur seperti dokumentasi operasi keamanan dan SOP teknis, bukan situs pemasaran SaaS generik.

## Design Read & Dials

> Reading this as: interactive technical training portal and lab workbench for banking IT staff, in a crisp navy-and-emerald operational style, dial `ENERGY 1 / RHYTHM 2 / MOTION 1`.

- **ENERGY 1 (Calm):** Permukaan datar yang bersih, batas tegas, fokus penuh pada keterbacaan materi dan kejelasan langkah lab.
- **RHYTHM 2 (Balanced):** Pola bagian yang konsisten dengan variasi struktural berbasis konten (panel tujuan, diagram alur langkah horizontal/vertikal, studi kasus dua kolom, tabel Do's vs Don'ts yang berubah menjadi kartu di mobile, dan CTA lab kontras tinggi).
- **MOTION 1 (Minimal):** Hanya transisi hover/focus/active yang ringkas dan fungsional. Tidak ada animasi dekoratif berulang atau loop tanpa pemicu.

## Color Palette (R-29: 2 Core + 1 Accent)

- **Core 1 - Deep Navy (`#0B1F3A` / `#091322`):** Identitas institusional, header aktif, lencana modul, dan permukaan mode gelap (`--saas-navy`).
- **Core 2 - Slate Neutrals (`#FFFFFF`, `#F8FAFC`, `#F1F5F9`, `#0F172A`, `#1E293B`, `#475569`, `#94A3B8`):** Latar belakang, kartu konten, garis pemisah, dan hierarki teks.
- **Accent - Operational Emerald (`#047857` light / `#10B981` dark):** Satu aksen terukur untuk indikator fokus (`:focus-visible`), progres eksplorasi, langkah aman, dan aksi primer lab.
- **Semantic Status (hanya untuk status nyata):** Rose (`rose-700` / `rose-400`) untuk kondisi berisiko dan error; Amber (`amber-700` / `amber-400`) untuk status belum yakin atau peringatan penyimpanan; Sky (`sky-900` / `sky-200`) untuk progres parsial.

## Typography (R-06)

- **Sans (`Plus Jakarta Sans`):** Dipilih karena proporsi x-height yang lega dan keterbacaan tinggi untuk paragraf materi berbahasa Indonesia, baik di layar ponsel maupun proyektor.
- **Mono (`JetBrains Mono`):** Digunakan khusus untuk kode modul (`MODUL 01`), slot waktu rundown, penghitung progres (`tabular-nums`), dan tag peran/gerbang teknis, bukan sebagai gaya terminal dekoratif.

## Hard Gates & Craft Locks

1. **Zero Em Dash (R-02):** Dilarang menggunakan karakter em dash (`\u2014`) di seluruh teks UI, kode, dan dokumentasi; gunakan koma, titik dua, tanda kurung, atau tanda hubung standar (`-`).
2. **Mobile & Touch Targets (R-03):** Zero horizontal overflow pada 375px ke atas; seluruh tombol dan kontrol interaktif memiliki ukuran sentuh minimal `44x44px` (`min-h-[44px]`, serta `min-w-[44px]` untuk tombol ikon).
3. **Single-Blur Dose Cap (R-10):** `backdrop-blur` hanya diizinkan pada 1 elemen (header tetap atas). Overlay modal/drawer menggunakan scrim solid (`bg-slate-950/75`), dan bilah proyektor menggunakan permukaan `/95` solid tanpa blur tambahan.
4. **WCAG AA Contrast (R-25):** Teks normal minimal 4.5:1 dan teks besar/batas UI non-teks minimal 3:1 pada Light Mode maupun Dark Mode. Hindari `text-slate-500` di atas permukaan `slate-100` atau latar berwarna lembut; gunakan `text-slate-600` (`#475569`) ke atas.
5. **Keyboard & Focus (R-32):** Indikator `:focus-visible` emerald selalu terlihat (`outline: 2px solid var(--saas-accent)`), tanpa `outline: none`. Drawer dan modal menerapkan focus trap (`Tab`/`Shift+Tab`), kunci scroll latar, serta penutupan via `Escape`; tablist dan radiogroup mendukung navigasi panah dan `Home`/`End`.
6. **Theme & Mode Parity (R-34):** Light Mode, Dark Mode, Projector Mode (`125%` skala root), dan Print A4 harus teruji utuh tanpa elemen rusak.
