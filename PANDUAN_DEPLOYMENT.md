# Panduan Deployment Subdomain https://trainingwbk.sigitadi.id/

Dokumen ini menjelaskan langkah-langkah untuk membuat portal pelatihan live dan aktif di domain **`https://trainingwbk.sigitadi.id/`**.

---

## Status Saat Ini

1. **Aplikasi & Master PDF:**
   - Aplikasi web telah dibangun (*production build*) di folder `dist/` dan siap tayang.
   - Konfigurasi custom domain GitHub Pages telah diatur ke `trainingwbk.sigitadi.id`.
   - File master cetak PDF 12 halaman presisi telah diperbarui di `Training IT Security Awareness and Cybersecurity Protection 2026.pdf`.
2. **Subdomain DewaBiz:**
   - Subdomain `trainingwbk.sigitadi.id` saat ini terdaftar di server DewaBiz (`103.153.3.19` / `zilong.dewabiz.com`) dan menampilkan halaman placeholder default cPanel.

Terdapat **2 metode** untuk mengaktifkan portal pelatihan agar live di URL tersebut:

---

## Metode 1: Menghubungkan Subdomain ke GitHub Pages (Sangat Direkomendasikan)

Dengan metode ini, setiap kali ada pembaruan kode dan di-push ke git, website akan ter-deploy secara otomatis melalui CI/CD GitHub Actions tanpa perlu mengunggah berkas secara manual.

### Langkah-langkah:
1. Masuk ke **cPanel DewaBiz** (atau penyedia DNS/Cloudflare jika domain dikelola di sana).
2. Buka menu **Zone Editor** (atau **DNS Zone Management**).
3. Cari nama domain **`sigitadi.id`**, lalu klik **Manage**.
4. Cari record untuk `trainingwbk.sigitadi.id`:
   - Jika saat ini bertipe **A Record** (mengarah ke `103.153.3.19`):
     - Klik **Edit**, ubah tipe menjadi **CNAME**, dan ubah Record / Destination menjadi:
       ```text
       sisigitadi.github.io
       ```
   - Atau hapus A record `trainingwbk` dan tambahkan CNAME record baru:
     - **Name:** `trainingwbk.sigitadi.id` (atau cukup `trainingwbk`)
     - **Type:** `CNAME`
     - **Record / Target:** `sisigitadi.github.io`
     - **TTL:** 14400 (atau default)
5. Simpan perubahan.
6. Tunggu propagasi DNS (biasanya 2 hingga 15 menit). GitHub Pages akan secara otomatis menerbitkan sertifikat SSL HTTPS (Let's Encrypt) gratis dan website langsung aktif di `https://trainingwbk.sigitadi.id/`.

---

## Metode 2: Mengunggah Langsung ke Hosting DewaBiz (cPanel File Manager)

Jika Anda ingin situs web di-hosting langsung di server hosting DewaBiz Anda (`103.153.3.19`):

### Langkah-langkah:
1. Berkas zip deployment siap pakai telah disediakan di direktori proyek:
   - **`dist-deploy.zip`** (berisi seluruh bundel aset frontend, HTML, dan gambar).
2. Masuk ke **cPanel DewaBiz** -> buka **File Manager**.
3. Arahkan ke direktori root dokumen untuk subdomain `trainingwbk`:
   - Umumnya berada di: `public_html/trainingwbk` atau `domains/trainingwbk.sigitadi.id/public_html`.
4. Hapus berkas placeholder default (misalnya `index.html` bawaan cPanel).
5. Klik **Upload**, lalu pilih berkas **`dist-deploy.zip`**.
6. Setelah upload selesai, klik kanan berkas `dist-deploy.zip` di cPanel, lalu pilih **Extract** (ekstrak di direktori subdomain tersebut).
7. Pastikan berkas `index.html` dan folder `assets/` berada langsung di dalam folder root subdomain.
8. Buka browser dan refresh `https://trainingwbk.sigitadi.id/`.
