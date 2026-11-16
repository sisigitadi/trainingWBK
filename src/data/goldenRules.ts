import type { GoldenRule } from '../types/training';

export const GOLDEN_RULES: GoldenRule[] = [
  {
    id: 1,
    title: 'Passphrase Unik dan MFA Aplikasi',
    rule: 'Gunakan passphrase minimal 16 karakter yang unik untuk setiap akun kerja (email SaaS, portal tiket, server SaaSCore, dan VPN BPR), serta aktifkan MFA berbasis aplikasi autentikator.',
    reason:
      'Passphrase panjang jauh lebih tahan terhadap serangan brute-force maupun credential stuffing, sedangkan MFA aplikasi mencegah pengambilalihan akun meski kata sandi bocor.',
  },
  {
    id: 2,
    title: 'Verifikasi Phishing dan Domain Resmi sigitadi.id',
    rule: 'Periksa alamat pengirim secara utuh dan arahkan kursor ke setiap tautan untuk memastikan domain utama benar-benar sigitadi.id atau domain resmi BPR klien sebelum mengeklik atau memasukkan kredensial.',
    reason:
      'Penyerang kerap memakai teknik typosquatting dan subdomain palsu disertai tekanan urgensi palsu untuk mencuri akun vendor IT sebagai pintu masuk ke jaringan perbankan.',
  },
  {
    id: 3,
    title: 'Klasifikasi Data dan Enkripsi Dump Database',
    rule: 'Klasifikasikan setiap dokumen kerja, dilarang keras menyimpan dump database atau backup SaaSCore nasabah BPR di laptop tanpa enkripsi penuh, dan segera hapus berkas sementara setelah tiket selesai.',
    reason:
      'Data nasabah dan konfigurasi core banking termasuk kategori Rahasia hingga Sangat Rahasia; kebocoran satu file dump tanpa enkripsi berdampak langsung pada kepatuhan dan reputasi BPR klien.',
  },
  {
    id: 4,
    title: 'Endpoint Bersih Tanpa Software Bajakan',
    rule: 'Gunakan hanya perangkat lunak berlisensi resmi, rutin perbarui sistem operasi dan browser, aktifkan enkripsi disk penuh, kunci layar (Win + L) saat meninggalkan meja, dan tolak USB tak dikenal.',
    reason:
      'Aktivator atau software bajakan sering membawa infostealer yang mencuri cookie sesi login, token VPN klien, dan kata sandi tersimpan dari browser secara diam-diam.',
  },
  {
    id: 5,
    title: 'Jaringan Aman dan Disiplin VPN Klien',
    rule: 'Hindari akses sistem produksi SaaSCore atau portal internal melalui Wi-Fi publik tanpa pelindung, putuskan koneksi VPN BPR segera setelah pekerjaan remote selesai, dan periksa validitas HTTPS serta ekstensi browser.',
    reason:
      'Koneksi VPN yang dibiarkan menyala terus-menerus memperluas jangkauan pergerakan penyerang jika laptop terkompromi, sedangkan Wi-Fi publik rentan penyadapan Evil Twin.',
  },
  {
    id: 6,
    title: 'Komunikasi Aman Tanpa Kredensial di Chat atau Cloud Publik',
    rule: 'Dilarang mengirim password, PIN, token, IP server produksi, atau tangkapan layar data nasabah di grup WhatsApp/Telegram; kirim kunci enkripsi lewat jalur terpisah (Out-of-Band) dan batasi akses cloud hanya ke akun spesifik.',
    reason:
      'Riwayat obrolan grup dan tautan cloud terbuka ("Anyone with the link") sangat mudah diteruskan, tersinkron ke perangkat pribadi, atau terindeks pihak luar.',
  },
  {
    id: 7,
    title: 'Lapor Cepat 5 Menit Pertama Tanpa Takut Disalahkan',
    rule: 'Jika tidak sengaja mengeklik tautan mencurigakan, menjalankan lampiran asing, atau melihat aktivitas ganjil, segera putuskan jaringan (Isolate), jangan matikan paksa atau hapus bukti (Preserve), dan lapor ke tim IT Security SaaS dalam 5 menit pertama (Report).',
    reason:
      'Kecepatan pelaporan tanpa rasa takut disalahkan (no-blame culture) menentukan apakah insiden dapat dihentikan di satu laptop sebelum menjalar ke server SaaSCore milik BPR klien.',
  },
];
