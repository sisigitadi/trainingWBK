export interface TooltipTerm {
  id: string;
  term: string;
  patterns: string[];
  meaning: string;
  context?: string;
}

export const TOOLTIP_TERMS: TooltipTerm[] = [
  // Modul 01 & Fundamental Perbankan
  {
    id: 'confidentiality',
    term: 'Confidentiality (Kerahasiaan)',
    patterns: ['Confidentiality (Kerahasiaan)', 'Confidentiality'],
    meaning:
      'Prinsip memastikan informasi sensitif hanya boleh dilihat dan diakses oleh pihak yang memiliki izin sah.',
    context:
      'Di SaaSCore, data identitas dan mutasi rekening nasabah BPR tidak boleh bocor ke pihak luar maupun perangkat pribadi.',
  },
  {
    id: 'integrity',
    term: 'Integrity (Integritas)',
    patterns: ['Integrity (Integritas)', 'Integrity'],
    meaning:
      'Prinsip menjaga keakuratan, keutuhan, dan keaslian data agar tidak diubah secara keliru atau tanpa otorisasi.',
    context:
      'Menjamin angka saldo tabungan, jadwal kredit, dan jurnal akuntansi BPR tetap tepat tanpa selisih.',
  },
  {
    id: 'availability',
    term: 'Availability (Ketersediaan)',
    patterns: ['Availability (Ketersediaan)', 'Availability'],
    meaning:
      'Prinsip memastikan sistem dan data selalu siap digunakan oleh pihak berwenang tepat saat dibutuhkan.',
    context:
      'Menjaga aplikasi SaaSCore, layanan teller, dan proses EOD BPR tidak lumpuh selama jam operasional.',
  },
  {
    id: 'cif',
    term: 'CIF (Customer Information File)',
    patterns: [
      'Customer Information File (CIF)',
      'CIF (Customer Information File)',
      'tabel CIF',
      'data CIF',
      'CIF',
    ],
    meaning:
      'Berkas atau tabel data induk yang menyimpan profil lengkap nasabah seperti nama, NIK, tanggal lahir, alamat, dan kontak.',
    context:
      'Tabel CIF di SaaSCore tergolong data sangat sensitif karena memuat identitas pribadi nasabah bank.',
  },
  {
    id: 'audit-trail',
    term: 'Audit Trail',
    patterns: ['audit trail', 'jejak audit'],
    meaning:
      'Rekaman jejak kronologis yang mencatat siapa melakukan tindakan apa, kapan, dan dari mana di dalam sistem.',
    context:
      'Dibutuhkan tim SaaS dan auditor BPR untuk menelusuri penyebab perubahan data atau insiden akses.',
  },
  {
    id: 'human-firewall',
    term: 'Human Firewall',
    patterns: ['Human Firewall'],
    meaning:
      'Ketahanan keamanan yang bersumber dari kewaspadaan dan kebiasaan kerja aman setiap pengguna atau pegawai.',
    context:
      'Pegawai IT SaaS menjadi benteng pertahanan pertama sebelum ancaman menyentuh server SaaSCore.',
  },
  {
    id: 'bpr',
    term: 'BPR (Bank Perekonomian Rakyat)',
    patterns: ['Bank Perekonomian Rakyat', 'BPR'],
    meaning:
      'Lembaga perbankan yang melayani tabungan, deposito, dan kredit usaha mikro/daerah di bawah pengawasan OJK.',
    context:
      'Menjadi fokus utama klien pengguna platform core banking SaaSCore.',
  },
  {
    id: 'slik-ojk',
    term: 'SLIK OJK',
    patterns: ['SLIK OJK', 'SLIK'],
    meaning:
      'Sistem Layanan Informasi Keuangan milik Otoritas Jasa Keuangan untuk pelaporan data debitur dan riwayat kredit bank.',
    context:
      'Laporan SLIK di SaaSCore memuat data identitas lengkap nasabah sehingga wajib dilindungi penuh.',
  },
  {
    id: 'general-ledger',
    term: 'General Ledger (GL)',
    patterns: ['General Ledger (GL)', 'General Ledger', 'jurnal GL', 'jurnal akuntansi'],
    meaning:
      'Buku besar akuntansi utama bank yang mencatat seluruh ringkasan transaksi keuangan, aset, kewajiban, dan laba rugi.',
    context:
      'Kesalahan pada jurnal GL di SaaSCore membuat pembukuan akhir hari bank tidak seimbang.',
  },
  {
    id: 'eod',
    term: 'EOD (End of Day)',
    patterns: ['End of Day (EOD)', 'End of Day', 'End-of-Day', 'EOD'],
    meaning:
      'Proses tutup buku harian sistem perbankan untuk menghitung bunga, memposting jurnal, dan menyiapkan saldo hari berikutnya.',
    context:
      'Gangguan pada jam EOD berdampak langsung pada kesiapan operasional loket teller keesokan paginya.',
  },
  {
    id: 'sla',
    term: 'SLA (Service Level Agreement)',
    patterns: ['Service Level Agreement', 'SLA'],
    meaning:
      'Komitmen batas waktu dan mutu layanan yang disepakati antara penyedia IT dan bank klien dalam menangani gangguan.',
    context:
      'Tekanan memenuhi SLA tidak boleh menjadi alasan mengambil jalan pintas yang melanggar keamanan.',
  },
  {
    id: 'staging',
    term: 'Lingkungan Staging & UAT',
    patterns: ['server staging', 'staging', 'UAT', 'development'],
    meaning:
      'Server tiruan atau uji coba terpisah tempat developer dan penguji mencoba perubahan sebelum dipasang ke server produksi nyata.',
    context:
      'Setiap patch SaaSCore harus lolos pengujian di staging atau UAT menggunakan data anonim terlebih dahulu.',
  },
  {
    id: 'failover',
    term: 'Failover',
    patterns: ['failover'],
    meaning:
      'Mekanisme pengalihan layanan secara otomatis atau terprosedur ke server cadangan ketika server utama mengalami gangguan.',
    context:
      'Menjaga Availability portal tiket atau layanan SaaSCore saat terjadi kegagalan perangkat keras.',
  },
  {
    id: 'otorisasi',
    term: 'Otorisasi & Maker-Checker',
    patterns: ['otorisasi ganda', 'otorisasi', 'terotorisasi', 'berotorisasi'],
    meaning:
      'Persetujuan resmi dari pihak berwenang; prinsip maker-checker mensyaratkan satu orang mengajukan perubahan dan pihak lain menyetujui.',
    context:
      'Mencegah perubahan saldo atau konfigurasi SaaSCore dilakukan sepihak tanpa pengawasan.',
  },
  {
    id: 'shared-account',
    term: 'Shared Account (Akun Bersama)',
    patterns: ['shared account', 'akun bersama'],
    meaning:
      'Satu akun login yang dipakai bergantian oleh beberapa orang sekaligus.',
    context:
      'Dihindari karena menghilangkan audit trail sehingga tidak terlacak siapa yang menjalankan perintah tertentu.',
  },

  // Modul 02: Ancaman & Serangan Siber
  {
    id: 'supply-chain',
    term: 'Supply Chain Attack',
    patterns: ['Supply Chain Attack', 'serangan supply chain'],
    meaning:
      'Serangan siber yang menyusupi vendor atau pemasok tepercaya terlebih dahulu untuk menjangkau organisasi klien di hilir.',
    context:
      'Jika akun atau paket rilis SaaS disusupi, dampaknya dapat menjalar ke banyak BPR pengguna SaaSCore.',
  },
  {
    id: 'ransomware',
    term: 'Ransomware',
    patterns: ['Ransomware'],
    meaning:
      'Perangkat lunak berbahaya yang mengunci dan mengenkripsi seluruh berkas atau server hingga korban membayar tebusan.',
    context:
      'Dapat melumpuhkan basis data transaksi SaaSCore dan menghentikan layanan teller BPR.',
  },
  {
    id: 'double-extortion',
    term: 'Double Extortion',
    patterns: ['Double Extortion'],
    meaning:
      'Taktik pemerasan ganda: penyerang mencuri salinan data terlebih dahulu sebelum mengunci sistem dengan ransomware.',
    context:
      'Meski bank punya backup, pelaku tetap mengancam menyebarkan data nasabah ke publik.',
  },
  {
    id: 'credential-stuffing',
    term: 'Credential Stuffing',
    patterns: ['Credential Stuffing'],
    meaning:
      'Teknik mencoba pasangan email dan kata sandi hasil kebocoran situs lain secara otomatis ke berbagai portal perusahaan.',
    context:
      'Berhasil menembus portal SaaS jika pegawai memakai kata sandi yang sama dengan akun pribadinya.',
  },
  {
    id: 'infostealer',
    term: 'Trojan & Infostealer',
    patterns: ['Trojan / Infostealer', 'Trojan Infostealer', 'infostealer', 'Trojan'],
    meaning:
      'Program berbahaya yang menyamar sebagai aplikasi normal untuk mencuri kata sandi tersimpan, cookie sesi login, dan file kunci akses.',
    context:
      'Sering bersembunyi di dalam aktivator atau software bajakan pada laptop kerja.',
  },
  {
    id: 'lateral-movement',
    term: 'Lateral Movement',
    patterns: ['Lateral Movement', 'pergerakan lateral'],
    meaning:
      'Pergerakan penyerang dari satu perangkat yang berhasil dikuasai menuju server atau komputer lain di dalam jaringan.',
    context:
      'Dapat terjadi saat satu laptop support yang terhubung VPN BPR berhasil dikendalikan pelaku.',
  },
  {
    id: 'checksum-sha256',
    term: 'Checksum, Hash & SHA-256',
    patterns: ['checksum SHA-256', 'hash SHA-256', 'nilai hash', 'SHA-256', 'checksum', 'hash'],
    meaning:
      'Sidik jari digital unik (nilai hash) sebuah berkas untuk memastikan isi file tidak berubah, rusak, atau disisipi malware sejak dibuat.',
    context:
      'Wajib dicocokkan sebelum memasang patch SaaSCore ke server klien BPR.',
  },
  {
    id: 'malware',
    term: 'Malware',
    patterns: ['malware'],
    meaning:
      'Singkatan dari malicious software, yaitu segala program berbahaya seperti virus, trojan, ransomware, atau spyware.',
    context:
      'Dapat masuk lewat lampiran email, software bajakan, atau USB tidak dikenal.',
  },
  {
    id: 'macro',
    term: 'Makro Berbahaya (.xlsm / .docm)',
    patterns: [
      'file macro',
      'dokumen macro',
      'file makro',
      'berkas makro',
      'bermakro',
      'macro',
      'makro',
      '.xlsm',
    ],
    meaning:
      'Skrip otomasi di dalam dokumen Office yang sering disalahgunakan penyerang untuk menjalankan perintah sistem secara otomatis saat dibuka.',
    context:
      'Lampiran faktur atau laporan selisih GL berformat .xlsm dari pengirim asing patut dicurigai.',
  },
  {
    id: 'backdoor',
    term: 'Backdoor',
    patterns: ['backdoor'],
    meaning:
      'Celah atau akun tersembunyi yang sengaja ditanam penyerang agar bisa masuk kembali ke sistem kapan saja melewati login resmi.',
    context:
      'Salah satu alasan mengapa membersihkan satu file saja tidak cukup setelah laptop terkompromi.',
  },
  {
    id: 'whitelisting',
    term: 'Whitelisting (Allowlisting)',
    patterns: ['whitelisting'],
    meaning:
      'Kebijakan keamanan yang hanya mengizinkan aplikasi, IP, atau pengirim resmi terdaftar untuk berjalan atau mengakses sistem.',
    context:
      'Membatasi akses database dan SSH server SaaSCore hanya dari alamat IP VPN yang diizinkan.',
  },

  // Modul 03: Phishing & Social Engineering
  {
    id: 'social-engineering',
    term: 'Social Engineering (Rekayasa Sosial)',
    patterns: ['Social Engineering', 'rekayasa sosial'],
    meaning:
      'Teknik memanipulasi psikologis manusia (rasa panik, takut, atau hormat pada atasan) agar mau membocorkan rahasia atau melakukan tindakan berisiko.',
    context:
      'Pelaku sering menyamar sebagai atasan SaaS atau staf IT BPR untuk meminta akses cepat.',
  },
  {
    id: 'spear-phishing',
    term: 'Spear Phishing B2B',
    patterns: ['Spear Phishing B2B', 'Spear Phishing', 'phishing'],
    meaning:
      'Penipuan lewat email atau pesan yang ditargetkan khusus ke pegawai perusahaan tertentu dengan membawa istilah pekerjaan yang terasa nyata.',
    context:
      'Menggunakan konteks proyek SaaSCore, tiket UAT, atau nama mitra BPR sebagai umpan.',
  },
  {
    id: 'email-spoofing',
    term: 'Email Spoofing',
    patterns: ['Email Spoofing', 'spoofing'],
    meaning:
      'Pemalsuan identitas pengirim email sehingga nama tampilan terlihat seperti pimpinan atau rekan resmi padahal berasal dari server asing.',
    context:
      'Periksa alamat email asli dan header Reply-To sebelum membalas atau mengklik tautan.',
  },
  {
    id: 'typosquatting',
    term: 'Typosquatting',
    patterns: ['Typosquatting'],
    meaning:
      'Pendaftaran alamat domain yang ejaannya dibuat nyaris identik dengan domain resmi untuk mengecoh mata pengguna.',
    context:
      'Misalnya s1gitadi.id atau sigitadi-support.com yang menyamar sebagai sigitadi.id.',
  },
  {
    id: 'root-domain',
    term: 'Domain Akar (Registrable Domain)',
    patterns: [
      'Domain Akar (Root Domain)',
      'Registrable Domain',
      'Domain Akar',
      'Root Domain',
      'domain utama',
    ],
    meaning:
      'Nama domain utama tepat di sebelah kiri tanda garis miring pertama (/) yang menentukan pemilik situs sebenarnya.',
    context:
      'Pada portal.sigitadi.id.auth-check.net, pemilik aslinya adalah auth-check.net, bukan sigitadi.id.',
  },
  {
    id: 'ekstensi-ganda',
    term: 'Ekstensi Ganda (.pdf.exe)',
    patterns: ['ekstensi ganda', '.pdf.exe'],
    meaning:
      'Trik menyamarkan file program berbahaya (.exe, .bat, .scr) dengan menambahkan akhiran dokumen populer seperti .pdf di depannya.',
    context:
      'File bernama Patch_SaaSCore.pdf.exe sebenarnya adalah program yang langsung mengeksekusi kode di Windows.',
  },
  {
    id: 'pretexting',
    term: 'Pretexting / Executive Fraud',
    patterns: ['Pretexting / Executive Fraud', 'pretexting', 'Executive Fraud'],
    meaning:
      'Skenario cerita karangan yang meyakinkan, misalnya mengaku direktur yang sedang rapat darurat agar korban melewati prosedur verifikasi.',
    context:
      'Permintaan transfer data atau reset password via nomor WhatsApp baru wajib diverifikasi lewat telepon resmi.',
  },
  {
    id: 'reply-to',
    term: 'Header Email & Reply-To',
    patterns: ['Reply-To', 'header email'],
    meaning:
      'Informasi teknis asal pengirim di balik layar email; alamat Reply-To bisa berbeda dari nama pengirim yang tampil di layar.',
    context:
      'Jika pengirim terlihat atas nama manajemen SaaS tetapi Reply-To mengarah ke domain gratis, itu indikasi kuat spoofing.',
  },
  {
    id: 'out-of-band',
    term: 'Out-of-Band (Jalur Terpisah)',
    patterns: ['Verifikasi Out-of-Band', 'Out-of-Band Delivery', 'Out-of-Band'],
    meaning:
      'Melakukan konfirmasi atau mengirim kunci pembuka lewat saluran komunikasi kedua yang terpisah dari saluran pertama.',
    context:
      'Mengirim file terenkripsi via email @sigitadi.id lalu mengirim password lewat telepon atau jalur terverifikasi lain.',
  },

  // Modul 04: Password & Access Management
  {
    id: 'passphrase',
    term: 'Passphrase',
    patterns: ['Passphrase'],
    meaning:
      'Kata sandi panjang (minimal 14-16 karakter) dari rangkaian beberapa kata acak yang mudah diingat manusia namun sangat sulit ditebak komputer.',
    context:
      'Standar pengganti kata sandi pendek untuk akun email, VPN, dan Password Manager pegawai SaaS.',
  },
  {
    id: 'entropi',
    term: 'Entropi Kata Sandi',
    patterns: ['Entropi'],
    meaning:
      'Ukuran tingkat keacakan dan luasnya kemungkinan kombinasi karakter yang menentukan kekuatan password terhadap tebakan otomatis.',
    context:
      'Passphrase empat kata acak memiliki entropi jauh lebih tinggi dibanding kata sandi 8 karakter yang rumit.',
  },
  {
    id: 'password-manager',
    term: 'Password Manager',
    patterns: ['Password Manager'],
    meaning:
      'Aplikasi brankas terenkripsi untuk membuat, menyimpan, dan mengisi kata sandi unik pada setiap akun secara aman.',
    context:
      'Memastikan staf SaaS tidak pernah memakai ulang password yang sama di berbagai portal.',
  },
  {
    id: 'least-privilege',
    term: 'Least Privilege (Hak Akses Minimum)',
    patterns: ['prinsip least privilege', 'Least Privilege'],
    meaning:
      'Prinsip memberikan hak akses paling minimal yang dibutuhkan untuk menjalankan tugas tertentu dan hanya selama tugas itu berlangsung.',
    context:
      'Staf tidak diberi akun admin penuh permanen pada database produksi SaaSCore bila hanya perlu melihat log.',
  },
  {
    id: 'mfa-totp',
    term: 'MFA & TOTP',
    patterns: [
      'Multi-Factor Authentication (MFA)',
      'Multi-Factor Authentication',
      'Time-based One-Time Password (TOTP)',
      'MFA berbasis aplikasi',
      'MFA & TOTP',
      'TOTP',
      'MFA',
    ],
    meaning:
      'Autentikasi berlapis (Multi-Factor Authentication) dengan kode acak yang berganti tiap 30 detik di aplikasi autentikator.',
    context:
      'Lebih aman daripada OTP SMS karena tidak rentan pembajakan nomor seluler (SIM Swapping).',
  },
  {
    id: 'mfa-fatigue',
    term: 'MFA Fatigue (Prompt Bombing)',
    patterns: ['MFA Fatigue (Prompt Bombing)', 'MFA Fatigue', 'Prompt Bombing', 'push bombing'],
    meaning:
      'Serangan membanjiri ponsel korban dengan notifikasi persetujuan login berulang-ulang agar korban kesal lalu menekan Setuju.',
    context:
      'Munculnya spam push MFA menandakan password Anda sudah bocor; wajib tolak, ganti passphrase, dan lapor tim IT.',
  },
  {
    id: 'brute-force',
    term: 'Brute-Force & Rule-Based Cracking',
    patterns: ['rule-based cracking', 'brute-force'],
    meaning:
      'Metode otomatis komputer mencoba jutaan hingga miliaran kombinasi kata sandi dan variasi pola umum (seperti Nama@Tahun!) dalam hitungan detik.',
    context:
      'Pola pendek seperti Saas@2026! mudah dipatahkan oleh rule-based cracking dibanding passphrase panjang.',
  },
  {
    id: 'sim-swapping',
    term: 'SIM Swapping',
    patterns: ['SIM Swapping'],
    meaning:
      'Pengambilalihan nomor HP korban ke kartu SIM baru milik pelaku sehingga seluruh telepon dan OTP SMS masuk ke ponsel penyerang.',
    context:
      'Alasan utama mengapa OTP SMS tidak disarankan untuk akses sensitif SaaSCore dan email kerja.',
  },
  {
    id: 'fido2',
    term: 'FIDO2 / Security Key Fisik',
    patterns: ['security key fisik', 'security key', 'FIDO2'],
    meaning:
      'Standar autentikasi berbasis kunci kriptografi fisik (USB/NFC) atau biometrik perangkat yang terikat ke domain resmi.',
    context:
      'Memberikan perlindungan paling kuat terhadap phishing karena tidak bisa tertipu oleh situs tiruan.',
  },
  {
    id: 'otp',
    term: 'OTP (One-Time Password)',
    patterns: ['SMS OTP', 'OTP SMS', 'OTP'],
    meaning:
      'Kode sandi sekali pakai yang dikirim untuk memverifikasi satu sesi login atau transaksi tertentu; versi SMS OTP rentan penyadapan SIM.',
    context:
      'Jangan pernah membagikan kode OTP kepada siapa pun, termasuk pihak yang mengaku tim IT atau atasan.',
  },

  // Modul 05: Data Protection & Infosec
  {
    id: 'klasifikasi-data',
    term: 'Klasifikasi Data',
    patterns: ['Klasifikasi Data'],
    meaning:
      'Pengelompokan dokumen dan informasi ke tingkat sensitivitas tertentu (Publik, Internal, Rahasia, Sangat Rahasia) untuk menentukan aturan pengamanannya.',
    context:
      'Di PT. Sigit Adi Aman Siber (SaaS), data nasabah BPR dan kredensial server produksi masuk kategori Sangat Rahasia.',
  },
  {
    id: 'database-dump',
    term: 'Database Dump (Salinan Ekspor DB)',
    patterns: [
      'Database Dump',
      'dump database',
      'dump DB',
      'file dump',
      'berkas dump',
      'dump',
    ],
    meaning:
      'Salinan lengkap struktur dan isi tabel basis data yang diekspor ke dalam satu berkas (.sql, .bak, atau .dmp).',
    context:
      'Dump produksi BPR memuat ribuan PII nasabah sehingga dilarang disimpan di laptop tanpa enkripsi penuh.',
  },
  {
    id: 'enkripsi-aes',
    term: 'Enkripsi AES-256',
    patterns: [
      'Enkripsi AES-256',
      'AES-256',
      'enkripsi disk penuh',
      'terenkripsi penuh',
      'terenkripsi',
      'mengenkripsi',
      'dienkripsi',
      'enkripsi',
    ],
    meaning:
      'Metode penyandian data berstandar kuat agar isi berkas atau penyimpanan tidak dapat dibaca tanpa kata sandi pembukanya.',
    context:
      'Digunakan saat mengamankan arsip konfigurasi SaaSCore atau mengaktifkan perlindungan penyimpanan laptop.',
  },
  {
    id: 'data-masking',
    term: 'Data Masking & Anonymization',
    patterns: ['Data Anonymization', 'Data Masking', 'anonimisasi', 'anonymized'],
    meaning:
      'Teknik mengganti atau menyamarkan kolom identitas asli (nama, NIK, nomor rekening) menjadi data acak dummy untuk pengujian.',
    context:
      'Wajib diterapkan saat developer atau QA menguji fitur SaaSCore menggunakan skenario mendekati data nyata.',
  },
  {
    id: 'pii',
    term: 'PII (Personally Identifiable Information)',
    patterns: ['Personally Identifiable Information', 'PII'],
    meaning:
      'Segala informasi yang dapat mengidentifikasi seseorang secara langsung atau tidak langsung, seperti NIK, nama lengkap, alamat, dan rekening.',
    context:
      'Dilindungi oleh UU PDP sehingga tim SaaS dilarang menyebarkannya ke luar lingkungan terkendali.',
  },
  {
    id: 'plaintext',
    term: 'Plaintext (Teks Terbuka Tanpa Sandi)',
    patterns: ['plaintext'],
    meaning:
      'Data atau kata sandi yang tersimpan apa adanya dalam bentuk teks biasa yang langsung dapat dibaca oleh siapa pun tanpa enkripsi.',
    context:
      'Menyimpan password VPN di file catatan Desktop adalah penyimpanan plaintext yang sangat berisiko.',
  },
  {
    id: 'sql-csv',
    term: 'SQL & Query UPDATE',
    patterns: ['query UPDATE', 'perintah SQL', 'SQL'],
    meaning:
      'Bahasa perintah basis data; query UPDATE berfungsi mengubah isi baris data secara langsung di dalam tabel.',
    context:
      'Menjalankan UPDATE langsung di database produksi SaaSCore tanpa backup dan staging berisiko merusak saldo massal.',
  },
  {
    id: 'csv',
    term: 'Berkas CSV',
    patterns: ['CSV'],
    meaning:
      'Format berkas teks sederhana (Comma-Separated Values) untuk menyimpan data tabel tanpa enkripsi bawaan.',
    context:
      'File CSV hasil ekspor CIF dapat dibuka langsung dengan Notepad atau Excel bila tidak dienkripsi.',
  },
  {
    id: 'secret-vault',
    term: 'Secret Vault & KMS',
    patterns: [
      'Key Management System',
      'Key Management Service',
      'brankas secret',
      'secret manager',
      'secret vault',
      'secret link',
      'vault KMS',
    ],
    meaning:
      'Layanan brankas terpusat dan sistem manajemen kunci untuk menyimpan kredensial server, token, dan kunci enkripsi secara aman dengan jejak audit.',
    context:
      'Menggantikan penyimpanan kredensial di dalam kode program, chat, atau file konfigurasi terbuka.',
  },
  {
    id: 'hardcoded',
    term: 'Hardcoded Credentials',
    patterns: ['hardcoded'],
    meaning:
      'Menulis kata sandi, kunci API, atau token rahasia secara langsung di dalam baris kode sumber aplikasi.',
    context:
      'Berbahaya karena siapa pun yang dapat membaca repositori kode langsung mengetahui password produksi.',
  },
  {
    id: 'backup',
    term: 'Backup & Titik Pemulihan',
    patterns: ['backup'],
    meaning:
      'Salinan cadangan data yang disimpan aman agar sistem dapat dipulihkan ke kondisi sebelum kesalahan atau serangan terjadi.',
    context:
      'Wajib dibuat sebelum perubahan skema atau pemeliharaan besar di SaaSCore.',
  },
  {
    id: 'kredensial',
    term: 'Kredensial',
    patterns: ['kredensial'],
    meaning:
      'Kombinasi identitas dan bukti akses seperti username, password, PIN, token API, atau file sertifikat login.',
    context:
      'Kredensial akses BPR merupakan aset kategori Sangat Rahasia di PT. Sigit Adi Aman Siber.',
  },

  // Modul 06: Endpoint Security
  {
    id: 'bitlocker-filevault',
    term: 'BitLocker / FileVault',
    patterns: [
      'BitLocker / FileVault',
      'BitLocker/FileVault',
      'BitLocker atau FileVault',
      'BitLocker',
      'FileVault',
    ],
    meaning:
      'Fitur enkripsi penyimpanan penuh bawaan Windows (BitLocker) dan macOS (FileVault) agar isi hardisk tidak bisa dibaca jika laptop dicuri.',
    context:
      'Wajib aktif di seluruh laptop kerja pegawai SaaS sebelum menangani dokumen atau akses SaaSCore.',
  },
  {
    id: 'patching',
    term: 'Patching OS & Browser',
    patterns: ['Patching OS & Browser', 'patch keamanan', 'patching', 'terpatch', 'patch'],
    meaning:
      'Memasang pembaruan resmi sistem operasi, aplikasi, atau browser untuk menutup celah keamanan yang sudah diketahui.',
    context:
      'Menunda update membuat laptop mudah ditembus melalui bug browser yang sudah ada penangkalnya.',
  },
  {
    id: 'uac',
    term: 'UAC (User Account Control)',
    patterns: ['User Account Control', 'UAC / Least Privilege', 'UAC/Least Privilege', 'UAC'],
    meaning:
      'Lapisan konfirmasi di Windows yang meminta izin sadar pengguna setiap kali ada program yang mencoba mengubah pengaturan inti sistem.',
    context:
      'Menahan program berbahaya agar tidak diam-diam memasang layanan di latar belakang.',
  },
  {
    id: 'screen-lock',
    term: 'Screen Lock (Win + L / Idle Lock)',
    patterns: [
      'Screen Lock (Win + L)',
      'Control + Command + Q',
      'Ctrl + Cmd + Q',
      'Ctrl+Cmd+Q',
      'screen lock',
      'auto-lock',
      'idle lock',
      'Win + L',
      'Win+L',
    ],
    meaning:
      'Mengunci layar komputer secara instan (Win + L di Windows atau Ctrl + Cmd + Q di Mac) maupun otomatis saat ditinggalkan.',
    context:
      'Mencegah orang di sekitar ruangan menyentuh sesi SaaSCore atau VPN yang sedang terbuka.',
  },
  {
    id: 'badusb',
    term: 'BadUSB / USB Baiting',
    patterns: ['BadUSB', 'USB baiting'],
    meaning:
      'Perangkat USB yang dimodifikasi agar dikenali komputer sebagai keyboard dan mengetikkan perintah serangan dalam hitungan detik.',
    context:
      'Alasan larangan mencolokkan flashdisk temuan atau suvenir tak dikenal ke laptop kerja SaaS.',
  },
  {
    id: 'edr',
    term: 'EDR (Endpoint Detection and Response)',
    patterns: ['Endpoint Detection and Response', 'EDR'],
    meaning:
      'Sistem pengamanan laptop modern yang tidak hanya memindai virus, tetapi juga memantau perilaku mencurigakan seperti eksekusi skrip aneh.',
    context:
      'Membantu tim keamanan SaaS mendeteksi dan mengisolasi laptop yang terinfeksi secara cepat.',
  },
  {
    id: 'root-admin',
    term: 'Akun Administrator / Root Access',
    patterns: ['root access', 'akun root', 'user root', 'Administrator'],
    meaning:
      'Hak akses tertinggi pada sistem operasi yang berkuasa mengubah, menghapus, atau memasang apa saja di perangkat atau server.',
    context:
      'Pekerjaan harian sebaiknya memakai akun standar agar malware tidak otomatis memperoleh kendali penuh.',
  },
  {
    id: 'zero-day',
    term: 'Zero-Day & Eksploitasi',
    patterns: ['zero-day', 'mengeksploitasi', 'dieksploitasi', 'eksploitasi'],
    meaning:
      'Celah kerentanan perangkat lunak yang belum sempat ditambal oleh pembuatnya sehingga rentan diserang atau dieksploitasi.',
    context:
      'Pembaruan otomatis dan prinsip akses minimum membantu mengurangi dampak jika celah baru muncul.',
  },

  // Modul 07: Network & Safe Internet
  {
    id: 'evil-twin',
    term: 'Evil Twin Attack',
    patterns: ['Evil Twin Attack', 'Evil Twin'],
    meaning:
      'Pembuatan hotspot Wi-Fi tiruan dengan nama jaringan (SSID) persis seperti Wi-Fi hotel, kafe, atau bandara resmi untuk menyadap lalu lintas data.',
    context:
      'Sangat berisiko saat pegawai mengakses sistem kantor dari jaringan publik tanpa pelindung.',
  },
  {
    id: 'captive-portal',
    term: 'Captive Portal',
    patterns: ['Captive Portal'],
    meaning:
      'Halaman login otomatis yang muncul ketika terhubung ke Wi-Fi publik sebelum pengguna diberi akses internet.',
    context:
      'Captive portal palsu sering meminta pengguna memasukkan email dan password kantor @sigitadi.id.',
  },
  {
    id: 'vpn-klien',
    term: 'VPN (Virtual Private Network) & Split Tunneling',
    patterns: ['VPN Klien BPR', 'split tunneling', 'SSL VPN', 'VPN'],
    meaning:
      'Terowongan jaringan terenkripsi untuk mengakses jaringan internal secara aman; split tunneling memisahkan jalur internet umum dan jalur VPN.',
    context:
      'VPN klien BPR hanya diaktifkan saat menangani tiket resmi dan segera diputus ketika pekerjaan selesai.',
  },
  {
    id: 'ssl-tls-https',
    term: 'SSL/TLS & HTTPS',
    patterns: ['SSL/TLS & HTTPS', 'sertifikat TLS', 'SSL/TLS', 'HTTPS', 'TLS', 'SSL'],
    meaning:
      'Protokol penyandian lalu lintas antara browser dan situs web; ikon gembok HTTPS hanya menjamin jalur terenkripsi, bukan keaslian pemilik situs.',
    context:
      'Situs penipuan tetap bisa memakai HTTPS gratis, sehingga nama domain utama tetap wajib diperiksa.',
  },
  {
    id: 'subdomain-spoofing',
    term: 'Subdomain Spoofing',
    patterns: ['Subdomain Spoofing', 'jebakan subdomain'],
    meaning:
      'Menyisipkan nama merek tepercaya sebagai awalan di sebelah kiri domain asli milik penyerang.',
    context:
      'Pada portal.sigitadi.id.auth-check.net, bagian portal.sigitadi.id hanyalah subdomain dari auth-check.net.',
  },
  {
    id: 'homoglyph',
    term: 'Homoglyph & Lookalike Domain',
    patterns: ['lookalike domain', 'homoglyph'],
    meaning:
      'Penggunaan huruf atau angka yang tampak hampir kembar secara visual, misalnya angka 1 menggantikan huruf i atau angka 0 menggantikan huruf o.',
    context:
      'Contoh: sigitad1.id tampak sekilas seperti sigitadi.id pada layar ponsel.',
  },
  {
    id: 'extension-takeover',
    term: 'Extension Takeover',
    patterns: ['Extension Takeover', 'ekstensi browser'],
    meaning:
      'Pengambilalihan ekstensi browser populer oleh pihak jahat untuk menyisipkan kode pencuri data melalui pembaruan otomatis.',
    context:
      'Batasi ekstensi di profil browser kerja SaaS hanya pada alat kerja yang benar-benar diperlukan dan terverifikasi.',
  },
  {
    id: 'mitm',
    term: 'Man-in-the-Middle / Adversary-in-the-Middle',
    patterns: ['adversary-in-the-middle', 'Man-in-the-Middle'],
    meaning:
      'Serangan di mana pelaku menyusup di tengah komunikasi antara pengguna dan server untuk menyadap atau mencuri sesi login beserta kode MFA.',
    context:
      'Dapat terjadi lewat tautan phishing proxy atau Wi-Fi publik tidak aman.',
  },
  {
    id: 'dns-tld',
    term: 'DNS, TLD & ccTLD',
    patterns: ['ccTLD', 'TLD', 'DNS'],
    meaning:
      'DNS menerjemahkan nama domain ke alamat IP server; TLD adalah akhiran tertinggi domain (seperti .com, .net, atau ccTLD negara .id).',
    context:
      'Memahami struktur TLD membantu mengenali domain palsu seperti sigitadi.co.id.evil.com.',
  },
  {
    id: 'ssid-wpa',
    term: 'SSID & WPA2 / WPA3',
    patterns: ['WPA2/WPA3', 'WPA2', 'WPA3', 'SSID'],
    meaning:
      'SSID adalah nama jaringan Wi-Fi yang tampil di layar; WPA2/WPA3 adalah standar enkripsi jaringan nirkabel.',
    context:
      'Wi-Fi publik tanpa password atau tanpa WPA2/WPA3 tidak mengenkripsi lalu lintas lokal.',
  },
  {
    id: 'cookie-session',
    term: 'Cookie Sesi & Session Hijacking',
    patterns: ['session hijacking', 'cookie browser', 'cookie sesi', 'cookie'],
    meaning:
      'Cookie sesi adalah tanda pengenal sementara agar Anda tetap login tanpa mengetik password ulang; pencurian cookie ini disebut session hijacking.',
    context:
      'Jika infostealer mencuri cookie sesi browser, penyerang bisa masuk ke portal tanpa tahu password maupun MFA Anda.',
  },
  {
    id: 'ssh-rdp',
    term: 'SSH & RDP',
    patterns: ['SSH', 'RDP'],
    meaning:
      'Protokol kendali server jarak jauh berbasis teks/terminal (SSH) dan berbasis tampilan layar desktop (RDP).',
    context:
      'Akses SSH dan RDP ke server SaaSCore hanya boleh dibuka melalui terowongan VPN yang sah.',
  },

  // Modul 08: Incident Response
  {
    id: 'ioc',
    term: 'IoC (Indicator of Compromise)',
    patterns: ['Indicator of Compromise (IoC)', 'Indicator of Compromise', 'IoC'],
    meaning:
      'Petunjuk atau gejala awal yang menandakan perangkat atau akun kemungkinan telah disusupi pihak luar.',
    context:
      'Contohnya jendela PowerShell berkedip singkat, lonjakan CPU/disk, atau notifikasi MFA tak dikenal.',
  },
  {
    id: 'isolate-preserve-report',
    term: 'Protokol Isolate - Preserve - Report',
    patterns: [
      'Isolate - Preserve - Report',
      'Isolate-Preserve-Report',
      'Isolate, Preserve, Report',
    ],
    meaning:
      'Tiga langkah darurat 5 menit pertama: putus jaringan (Isolate), biarkan bukti tetap utuh (Preserve), dan segera lapor (Report).',
    context:
      'Menahan penyebaran insiden dari satu laptop sebelum menjalar ke server klien SaaSCore.',
  },
  {
    id: 'volatile-memory',
    term: 'Volatile Memory (RAM)',
    patterns: ['Volatile Memory (RAM)', 'Volatile Memory', 'volatile', 'volatil', 'RAM'],
    meaning:
      'Memori kerja sementara komputer (RAM) yang bersifat volatil, artinya seluruh isinya langsung lenyap saat laptop dimatikan atau di-restart.',
    context:
      'Menyimpan jejak proses malware aktif atau koneksi jaringan penyerang untuk kebutuhan investigasi.',
  },
  {
    id: 'forensic-triage',
    term: 'Forensic Triage & Artefak Forensik',
    patterns: ['Forensic Triage', 'artefak forensik', 'forensik', 'artefak'],
    meaning:
      'Pemeriksaan cepat awal pada perangkat terdampak dan artefak bukti digitalnya untuk menilai jenis serangan, cakupan data, dan apakah akun/server perlu diputus.',
    context:
      'Dilakukan tim keamanan sebelum perangkat dibersihkan atau diinstal ulang.',
  },
  {
    id: 'rotasi-kredensial',
    term: 'Rotasi Kredensial',
    patterns: ['Rotasi Kredensial'],
    meaning:
      'Mengganti password, mencabut sesi login aktif, serta memperbarui token API dan kunci VPN secara serentak dari perangkat yang bersih.',
    context:
      'Memutus total jalur masuk penyerang setelah insiden terdeteksi.',
  },
  {
    id: 'no-blame',
    term: 'No-Blame Reporting',
    patterns: ['No-Blame Reporting', 'no-blame culture', 'no-blame'],
    meaning:
      'Budaya organisasi yang tidak menghukum staf ketika jujur melapor sejak menit awal melakukan kesalahan klik atau insiden.',
    context:
      'Keterbukaan dini jauh lebih menyelamatkan dibanding menyembunyikan insiden hingga data klien terdampak.',
  },
  {
    id: 'fileless-powershell',
    term: 'Fileless Malware & PowerShell',
    patterns: ['fileless malware', 'PowerShell'],
    meaning:
      'Skrip serangan yang berjalan langsung di memori (RAM) memakai alat bawaan sistem seperti PowerShell tanpa meninggalkan file aplikasi di disk.',
    context:
      'Jika laptop langsung di-restart, jejak skrip fileless di RAM ikut hilang.',
  },
  {
    id: 'keylogger',
    term: 'Keylogger',
    patterns: ['keylogger'],
    meaning:
      'Program pencuri informasi yang diam-diam merekam setiap tombol keyboard yang ditekan pengguna, termasuk password dan PIN.',
    context:
      'Salah satu alasan rotasi kredensial tidak boleh dilakukan dari perangkat yang sedang terinfeksi.',
  },

  // Modul 09: Cloud & Digital Communication
  {
    id: 'anyone-with-link',
    term: 'Tautan Publik (Anyone with the Link)',
    patterns: ['Anyone with the link'],
    meaning:
      'Opsi berbagi cloud yang membuat file dapat dibuka siapa saja yang memegang tautan tanpa perlu login atau verifikasi identitas.',
    context:
      'Sangat berisiko untuk dokumen proyek, topologi IP, atau cadangan rilis SaaSCore.',
  },
  {
    id: 'uu-pdp',
    term: 'Data Pribadi & UU PDP',
    patterns: ['Data Pribadi / UU PDP', 'Undang-Undang Pelindungan Data Pribadi', 'UU PDP'],
    meaning:
      'Undang-Undang Nomor 27 Tahun 2022 yang mengatur kewajiban menjaga kerahasiaan dan pemrosesan sah atas data pribadi warga.',
    context:
      'Setiap kebocoran CIF atau screenshot identitas nasabah memiliki konsekuensi hukum dan kepatuhan.',
  },
  {
    id: 'redaction',
    term: 'Redaction (Penyamaran / Sensor Data)',
    patterns: ['Redaction (Penyamaran Data)', 'redaction/blur', 'redaction'],
    meaning:
      'Menutup permanen atau menyensor bagian sensitif (NIK, nomor rekening, password) pada gambar atau log sebelum dibagikan.',
    context:
      'Wajib dilakukan saat melampirkan tangkapan layar error pada tiket bantuan.',
  },
  {
    id: 'bcc-cc',
    term: 'BCC vs CC Email',
    patterns: ['BCC vs CC', 'BCC', 'CC'],
    meaning:
      'CC menampilkan seluruh alamat email penerima ke semua orang, sedangkan BCC menyembunyikan daftar penerima satu sama lain.',
    context:
      'Gunakan BCC saat mengirim pengumuman pembaruan kepada beberapa mitra BPR sekaligus.',
  },
  {
    id: 'expiration-date',
    term: 'Expiration Date (Masa Berlaku Tautan)',
    patterns: ['expiration date', 'No Expiry'],
    meaning:
      'Pengaturan batas waktu otomatis sehingga izin berbagi file di cloud kedaluwarsa dengan sendirinya setelah proyek selesai.',
    context:
      'Mencegah dokumen sementara terus dapat diakses berbulan-bulan kemudian.',
  },

  // Modul 10 & Konsep Umum Tambahan
  {
    id: 'security-culture',
    term: 'Security Culture (Budaya Keamanan)',
    patterns: ['Security Culture'],
    meaning:
      'Kebiasaan kolektif seluruh anggota tim yang secara alami menerapkan langkah aman tanpa harus terus diawasi.',
    context:
      'Terlihat dari kebiasaan mengunci layar, memverifikasi tautan, dan saling mengingatkan dengan ramah.',
  },
  {
    id: 'defense-in-depth',
    term: 'Defense in Depth (Pertahanan Berlapis)',
    patterns: ['Defense in Depth', 'pertahanan berlapis'],
    meaning:
      'Strategi memasang beberapa lapis pengamanan berurutan agar kegagalan satu kontrol tetap tertahan oleh lapisan berikutnya.',
    context:
      'Contohnya kombinasi passphrase kuat, MFA aplikasi, enkripsi berkas, VPN disiplin, dan lapor cepat.',
  },
  {
    id: 'offboarding',
    term: 'Access Review & Offboarding',
    patterns: ['Access Review / Offboarding', 'access review', 'offboarding'],
    meaning:
      'Peninjauan berkala dan pencabutan hak akses sistem segera ketika proyek berakhir atau pegawai berganti peran/keluar.',
    context:
      'Mencegah akun lama tetap aktif tanpa pengawasan pada sistem BPR atau SaaSCore.',
  },
  {
    id: 'security-by-obscurity',
    term: 'Security by Obscurity',
    patterns: ['security by obscurity'],
    meaning:
      'Anggapan keliru bahwa sesuatu aman hanya karena lokasi atau tautannya dirasa tersembunyi atau belum diketahui orang lain.',
    context:
      'Menaruh file rahasia di link cloud publik tanpa login tetap tidak aman walau tautannya belum disebarkan.',
  },
  {
    id: 'token-api',
    term: 'Token API & API Secret',
    patterns: ['token API', 'API secret', 'API'],
    meaning:
      'API adalah jalur komunikasi antar-sistem perangkat lunak; token API atau API secret adalah kunci digital rahasia agar sistem saling mengenali secara sah.',
    context:
      'Kebocoran token API memungkinkan pihak luar mengakses layanan integrasi SaaSCore atas nama sistem resmi.',
  },
  {
    id: 'firewall',
    term: 'Firewall',
    patterns: ['firewall'],
    meaning:
      'Gerbang pengatur lalu lintas jaringan yang menyaring koneksi masuk dan keluar berdasarkan aturan keamanan tertentu.',
    context:
      'Firewall saja tidak cukup jika pegawai secara tidak sadar membuka lampiran jebakan atau membocorkan kredensial.',
  },
  {
    id: 'sandbox',
    term: 'Sandbox',
    patterns: ['sandbox'],
    meaning:
      'Lingkungan terisolasi yang aman untuk membuka atau menguji file mencurigakan tanpa memengaruhi sistem utama.',
    context:
      'Berguna bagi tim keamanan untuk memeriksa lampiran berbahaya tanpa mempertaruhkan laptop kerja.',
  },
  {
    id: 'user-experience',
    term: 'User Experience (UX)',
    patterns: ['user experience'],
    meaning:
      'Pengalaman, kemudahan, dan relevansi yang dirasakan pengguna saat berinteraksi dengan aplikasi atau materi pembelajaran.',
    context:
      'Contoh perusahaan dan sistem rekaan dibuat agar pengalaman belajar terasa akrab dengan rutinitas kerja nyata.',
  },
  {
    id: 'server-produksi',
    term: 'Server / Database Produksi',
    patterns: ['database produksi', 'server produksi'],
    meaning:
      'Lingkungan sistem aktif yang melayani transaksi nyata nasabah secara langsung pada hari kerja.',
    context:
      'Kesalahan kecil di server produksi SaaSCore berdampak langsung pada layanan nasabah dan pencatatan bank.',
  },

  // Ekspansi Istilah Inti: Infrastruktur, Server, Database & Core Banking
  {
    id: 'server',
    term: 'Server',
    patterns: ['server'],
    meaning:
      'Komputer khusus berkinerja tinggi yang berjalan terus-menerus untuk melayani aplikasi, menyimpan data, atau memproses permintaan banyak pengguna sekaligus.',
    context:
      'Di layanan SaaS, server menjalankan aplikasi SaaSCore, portal tiket, build rilis, maupun gerbang koneksi BPR.',
  },
  {
    id: 'database',
    term: 'Database (Basis Data / DB)',
    patterns: ['database', 'basis data', 'DB'],
    meaning:
      'Sistem penyimpanan terstruktur dalam bentuk tabel untuk mengelola data nasabah, rekening, transaksi, dan konfigurasi aplikasi secara cepat dan akurat.',
    context:
      'Basis data SaaSCore menyimpan data operasional BPR yang wajib dilindungi kerahasiaan dan keutuhannya.',
  },
  {
    id: 'core-banking',
    term: 'Core Banking System',
    patterns: ['Core Banking System', 'Core Banking'],
    meaning:
      'Sistem perangkat lunak inti perbankan yang memproses seluruh transaksi utama bank seperti tabungan, deposito, kredit, bunga, dan pembukuan harian.',
    context:
      'SaaSCore dalam materi ini adalah contoh platform Core Banking System yang digunakan oleh BPR mitra.',
  },
  {
    id: 'ojk',
    term: 'OJK (Otoritas Jasa Keuangan)',
    patterns: ['OJK'],
    meaning:
      'Lembaga independen negara yang mengatur dan mengawasi seluruh kegiatan sektor jasa keuangan, termasuk perbankan dan BPR di Indonesia.',
    context:
      'Kepatuhan keamanan data dan jejak audit SaaSCore berdampak langsung pada hasil pemeriksaan OJK terhadap BPR klien.',
  },
  {
    id: 'nik',
    term: 'NIK (Nomor Induk Kependudukan)',
    patterns: ['NIK'],
    meaning:
      'Nomor identitas tunggal penduduk Indonesia terdiri dari 16 digit yang termasuk data pribadi spesifik dan sensitif.',
    context:
      'NIK nasabah di tabel CIF atau tangkapan layar SaaSCore wajib dilindungi dan disamarkan sebelum dibagikan.',
  },
  {
    id: 'teller',
    term: 'Loket / Modul Teller',
    patterns: ['loket teller', 'modul teller', 'teller'],
    meaning:
      'Petugas maupun modul aplikasi perbankan di garda depan yang melayani transaksi setor tunai, tarik tunai, dan pemindahbukuan nasabah secara langsung.',
    context:
      'Gangguan ketersediaan SaaSCore pada jam kerja langsung menghentikan antrean layanan teller BPR.',
  },
  {
    id: 'pic',
    term: 'PIC (Person in Charge)',
    patterns: ['PIC'],
    meaning:
      'Pejabat atau staf penanggung jawab resmi yang ditunjuk untuk berkoordinasi, memverifikasi permintaan, dan mengambil keputusan atas suatu proyek atau tiket.',
    context:
      'Permintaan akses atau perubahan data BPR wajib dikonfirmasi ke kontak PIC resmi yang terdaftar.',
  },
  {
    id: 'sop',
    term: 'SOP (Standard Operating Procedure)',
    patterns: ['SOP'],
    meaning:
      'Dokumen panduan langkah kerja baku yang ditetapkan organisasi agar tugas operasional dan keamanan dijalankan secara konsisten.',
    context:
      'SOP internal PT. Sigit Adi Aman Siber termasuk dokumen klasifikasi Internal yang tidak dibagikan ke publik.',
  },
  {
    id: 'go-live',
    term: 'Go-Live',
    patterns: ['go-live'],
    meaning:
      'Tahap peluncuran resmi ketika sistem atau modul baru mulai diaktifkan dan digunakan untuk melayani transaksi nyata nasabah.',
    context:
      'Tekanan tenggat menjelang go-live di BPR tidak boleh membuat tim memotong prosedur enkripsi dan otorisasi.',
  },
  {
    id: 'maintenance',
    term: 'Maintenance (Pemeliharaan Sistem)',
    patterns: ['maintenance'],
    meaning:
      'Kegiatan perawatan terjadwal pada server, aplikasi, atau database seperti pemasangan patch, optimasi kinerja, dan pembaruan konfigurasi.',
    context:
      'Akses VPN selama jendela maintenance BPR hanya dibuka seperlunya dan segera diputus setelah selesai.',
  },
  {
    id: 'migrasi-data',
    term: 'Migrasi Data',
    patterns: ['migrasi data', 'migrasi'],
    meaning:
      'Proses pemindahan dan penyesuaian data rekening atau transaksi dari sistem lama ke sistem baru secara terstruktur.',
    context:
      'Berkas sementara hasil migrasi data BPR memuat data asli nasabah sehingga wajib dienkripsi dan dibersihkan setelah selesai.',
  },
  {
    id: 'change-request',
    term: 'Change Request (Permintaan Perubahan)',
    patterns: ['change request'],
    meaning:
      'Pengajuan formal tertulis yang mencatat rincian perubahan sistem atau data beserta persetujuan pejabat berwenang sebelum dieksekusi.',
    context:
      'Menjadi dasar audit trail agar koreksi saldo atau parameter SaaSCore tidak dilakukan sepihak lewat telepon atau chat.',
  },
  {
    id: 'qa-engineer',
    term: 'QA (Quality Assurance)',
    patterns: ['QA Engineer', 'QA'],
    meaning:
      'Tim penjamin mutu perangkat lunak yang menguji fitur, mencari bug, dan memastikan pembaruan aplikasi layak rilis sebelum dipakai klien.',
    context:
      'Tim QA wajib menguji fitur SaaSCore memakai data dummy atau data yang telah disamarkan, bukan data asli nasabah.',
  },
  {
    id: 'sysadmin',
    term: 'Sysadmin (System Administrator)',
    patterns: ['sysadmin'],
    meaning:
      'Administrator sistem yang bertanggung jawab mengelola, mengonfigurasi, dan menjaga ketersediaan serta keamanan server dan infrastruktur TI.',
    context:
      'Akun sysadmin memiliki hak akses tinggi sehingga wajib dilindungi passphrase kuat, MFA aplikasi, dan prinsip least privilege.',
  },

  // Infrastruktur, Jaringan & Web
  {
    id: 'domain',
    term: 'Domain',
    patterns: ['domain'],
    meaning:
      'Nama alamat unik yang mudah dibaca manusia di internet (seperti sigitadi.id) untuk mengidentifikasi pemilik situs web atau layanan email.',
    context:
      'Selalu periksa ejaan domain pengirim dan tautan untuk memastikan benar-benar milik sigitadi.id atau BPR resmi.',
  },
  {
    id: 'subdomain',
    term: 'Subdomain',
    patterns: ['subdomain'],
    meaning:
      'Bagian awalan di sebelah kiri domain utama yang dipisahkan tanda titik (misalnya portal.sigitadi.id) untuk memisahkan layanan di bawah satu pemilik domain.',
    context:
      'Penyerang dapat membuat subdomain bernama sigitadi.id di bawah domain miliknya sendiri untuk mengelabui mata pengguna.',
  },
  {
    id: 'url',
    term: 'URL (Uniform Resource Locator)',
    patterns: ['URL'],
    meaning:
      'Alamat lengkap sebuah halaman atau berkas di web yang terdiri dari protokol, domain, port opsional, dan jalur halaman (path).',
    context:
      'Periksa URL tujuan asli dengan mengarahkan kursor (hover) sebelum mengeklik tautan dari email atau chat.',
  },
  {
    id: 'url-path',
    term: 'Path URL',
    patterns: ['path halaman', 'path portal', 'path'],
    meaning:
      'Bagian alamat URL setelah tanda garis miring pertama (/) yang menunjukkan lokasi halaman atau menu spesifik di dalam server tujuan.',
    context:
      'Path seperti /login atau /sso dapat dibuat identik oleh situs palsu, sehingga keaslian tetap ditentukan oleh domain utama sebelum garis miring pertama.',
  },
  {
    id: 'http',
    term: 'HTTP (Hypertext Transfer Protocol)',
    patterns: ['HTTP'],
    meaning:
      'Protokol komunikasi web tanpa enkripsi (teks terbuka) sehingga data formulir dan kata sandi yang dikirim mudah disadap di jaringan.',
    context:
      'Jangan pernah memasukkan password atau data BPR di halaman http://; pastikan protokol selalu memakai HTTPS.',
  },
  {
    id: 'wifi',
    term: 'Wi-Fi',
    patterns: ['Wi-Fi'],
    meaning:
      'Teknologi jaringan lokal nirkabel yang menghubungkan laptop atau ponsel ke internet melalui gelombang radio.',
    context:
      'Wi-Fi publik di kafe, hotel, atau bandara bersifat tidak tepercaya karena rentan penyadapan dan serangan Evil Twin.',
  },
  {
    id: 'hotspot-tethering',
    term: 'Hotspot & Tethering Seluler',
    patterns: ['tethering hotspot', 'hotspot', 'tethering'],
    meaning:
      'Berbagi koneksi internet seluler dari ponsel pribadi ke laptop melalui jaringan pribadi terenkripsi WPA2/WPA3.',
    context:
      'Lebih aman daripada Wi-Fi publik saat staf SaaS perlu mengakses portal kerja atau server BPR di luar kantor.',
  },
  {
    id: 'auto-connect',
    term: 'Auto-Connect Wi-Fi',
    patterns: ['Auto-Connect'],
    meaning:
      'Fitur sistem operasi yang menyambungkan perangkat secara otomatis ke jaringan Wi-Fi yang pernah dikenal tanpa konfirmasi pengguna.',
    context:
      'Wajib dimatikan untuk Wi-Fi publik agar laptop tidak tersambung diam-diam ke hotspot tiruan Evil Twin.',
  },
  {
    id: 'lan',
    term: 'LAN (Local Area Network)',
    patterns: ['kabel LAN', 'LAN'],
    meaning:
      'Jaringan komputer lokal berkabel (Ethernet) yang menghubungkan perangkat dan server dalam satu area kantor atau ruang server.',
    context:
      'Pada tahap Isolate saat insiden, cabut kabel LAN selain mematikan Wi-Fi agar perangkat benar-benar offline.',
  },
  {
    id: 'cloud',
    term: 'Cloud (Komputasi / Penyimpanan Awan)',
    patterns: ['cloud'],
    meaning:
      'Layanan server dan penyimpanan berkas daring seperti Google Drive atau OneDrive yang dapat diakses dari mana saja melalui internet.',
    context:
      'File kerja SaaS hanya boleh disimpan di cloud korporat dengan izin Restricted, bukan cloud pribadi atau tautan publik.',
  },
  {
    id: 'endpoint',
    term: 'Endpoint (Perangkat Ujung)',
    patterns: ['endpoint security', 'endpoint'],
    meaning:
      'Perangkat komputasi milik pengguna akhir seperti laptop kerja, PC desktop, atau ponsel yang terhubung ke jaringan perusahaan.',
    context:
      'Laptop kerja tim SaaS adalah endpoint kritikal karena menjadi gerbang koneksi menuju infrastruktur BPR.',
  },
  {
    id: 'port-jaringan',
    term: 'Port Jaringan',
    patterns: ['port jaringan', 'nomor port', 'port'],
    meaning:
      'Nomor pintu logis pada server (seperti 443 untuk HTTPS, 5432 untuk PostgreSQL, 8443 untuk SSL VPN) yang mengarahkan lalu lintas ke layanan tertentu.',
    context:
      'Port database dan remote access tidak boleh dibuka langsung ke internet publik tanpa firewall dan VPN.',
  },
  {
    id: 'alamat-ip',
    term: 'Alamat IP (Internet Protocol)',
    patterns: ['alamat IP', 'IP sumber', 'IP server', 'IP'],
    meaning:
      'Deretan angka pengenal unik (seperti 10.24.8.15) yang dimiliki setiap komputer atau server agar dapat saling berkomunikasi di jaringan.',
    context:
      'Alamat IP server produksi BPR termasuk informasi sensitif yang dilarang dibagikan di grup chat umum.',
  },
  {
    id: 'host',
    term: 'Host',
    patterns: ['host'],
    meaning:
      'Nama domain atau alamat IP komputer tujuan yang menyediakan layanan tertentu di dalam jaringan.',
    context:
      'Pada akses VPN berbasis least privilege, koneksi staf dibatasi hanya ke host server yang sedang ditangani.',
  },
  {
    id: 'protokol',
    term: 'Protokol Jaringan',
    patterns: ['protokol'],
    meaning:
      'Aturan baku cara perangkat dan aplikasi bertukar data atau menjalankan prosedur kerja tertentu (seperti HTTPS, SSH, atau protokol tanggap insiden).',
    context:
      'Memilih protokol terenkripsi (HTTPS/SSH/VPN) melindungi data yang melintas di jaringan dari penyadapan.',
  },
  {
    id: 'tunnel',
    term: 'Tunnel (Terowongan Jaringan)',
    patterns: ['tunnel VPN', 'tunnel', 'terowongan'],
    meaning:
      'Jalur koneksi pribadi terenkripsi yang membungkus lalu lintas data agar aman melintasi jaringan publik menuju jaringan internal.',
    context:
      'Tunnel VPN ke jaringan BPR harus segera diputus setelah pekerjaan selesai agar tidak menjadi jembatan serangan.',
  },
  {
    id: 'segmen-jaringan',
    term: 'Segmen Jaringan',
    patterns: ['segmen jaringan', 'segmen'],
    meaning:
      'Bagian terpisah dalam jaringan komputer yang disekat untuk membatasi akses dan menahan pergerakan serangan antar-area sistem.',
    context:
      'Pemisahan segmen mencegah perangkat di jaringan tamu atau kantor menjangkau langsung server database produksi.',
  },
  {
    id: 'topologi-jaringan',
    term: 'Topologi Jaringan',
    patterns: ['topologi jaringan', 'topologi'],
    meaning:
      'Peta susunan dan hubungan antar-server, router, firewall, dan segmen jaringan suatu organisasi.',
    context:
      'Dokumen topologi jaringan BPR berklasifikasi Rahasia karena memetakan target vital jika jatuh ke tangan penyerang.',
  },
  {
    id: 'gateway',
    term: 'Gateway',
    patterns: ['gateway'],
    meaning:
      'Perangkat atau server gerbang utama yang menghubungkan jaringan internal dengan jaringan luar serta menyaring lalu lintas masuk/keluar.',
    context:
      'Gateway email dan gateway VPN perusahaan menjadi titik kontrol utama untuk memblokir domain palsu dan akses ilegal.',
  },
  {
    id: 'proxy',
    term: 'Proxy Server',
    patterns: ['proxy'],
    meaning:
      'Server perantara yang meneruskan permintaan koneksi antara pengguna dan server tujuan; dapat dipakai kantor untuk menyaring situs atau oleh penyerang untuk menyamarkan asal koneksi.',
    context:
      'Login mencurigakan dari proxy luar negeri atau log proxy email menjadi indikator penting dalam investigasi insiden.',
  },
  {
    id: 'mirror',
    term: 'Mirror (Situs Cermin Unduhan)',
    patterns: ['mirror'],
    meaning:
      'Server salinan alternatif yang menyediakan file unduhan serupa dengan server utama.',
    context:
      'Mirror pihak ketiga tidak resmi berisiko menyisipkan malware ke paket rilis SaaSCore; selalu unduh dari repositori resmi dan cek SHA-256.',
  },
  {
    id: 'domain-controller',
    term: 'Domain Controller',
    patterns: ['domain controller'],
    meaning:
      'Server pusat dalam jaringan kantor (Active Directory) yang mengelola autentikasi login, kebijakan keamanan, dan hak akses seluruh komputer pegawai.',
    context:
      'Menjadi incaran utama penyerang ransomware karena penguasaannya membuka kendali ke seluruh jaringan.',
  },
  {
    id: 'redirect',
    term: 'Redirect (Pengalihan URL)',
    patterns: ['redirect'],
    meaning:
      'Mekanisme otomatis server yang mengarahkan browser dari satu alamat URL ke alamat lain, misalnya memaksa koneksi http:// beralih ke https://.',
    context:
      'Redirect HTTPS otomatis melindungi pengguna dari pengiriman kata sandi lewat jalur tidak terenkripsi.',
  },
  {
    id: 'err-cert-invalid',
    term: 'NET::ERR_CERT_AUTHORITY_INVALID',
    patterns: ['NET::ERR_CERT_AUTHORITY_INVALID'],
    meaning:
      'Peringatan browser bahwa sertifikat keamanan HTTPS situs tidak dikeluarkan oleh otoritas tepercaya, kedaluwarsa, atau sedang dicegat pihak ketiga.',
    context:
      'Jangan pernah menekan tombol lanjut paksa karena dapat menandakan serangan Man-in-the-Middle atau Wi-Fi Evil Twin.',
  },
  {
    id: 'remote-access',
    term: 'Remote Access (Akses Jarak Jauh)',
    patterns: ['remote access', 'akses remote', 'remote'],
    meaning:
      'Kemampuan mengendalikan komputer atau server dari lokasi lain melalui jaringan (seperti VPN, SSH, RDP, atau aplikasi kendali jarak jauh).',
    context:
      'Akses remote ke server BPR wajib menggunakan akun individual ber-MFA dan dibatasi sesuai jadwal tiket.',
  },

  // Identitas, Autentikasi & Kontrol Akses
  {
    id: 'sso',
    term: 'SSO (Single Sign-On)',
    patterns: ['Single Sign-On', 'SSO'],
    meaning:
      'Sistem login terpadu yang memungkinkan pegawai masuk ke berbagai aplikasi kerja menggunakan satu akun identitas pusat yang terverifikasi.',
    context:
      'Karena satu akun SSO membuka banyak portal sekaligus, proteksi MFA dan kewaspadaan terhadap phishing SSO sangat krusial.',
  },
  {
    id: 'autentikasi',
    term: 'Autentikasi',
    patterns: ['autentikasi', 'otentikasi'],
    meaning:
      'Proses memverifikasi identitas pengguna atau sistem untuk memastikan pihak yang masuk benar-benar pemilik akun yang sah.',
    context:
      'Autentikasi kuat memadukan sesuatu yang Anda tahu (passphrase) dan sesuatu yang Anda miliki (MFA aplikasi/security key).',
  },
  {
    id: 'autentikator',
    term: 'Aplikasi Autentikator',
    patterns: ['aplikasi autentikator', 'autentikator'],
    meaning:
      'Aplikasi ponsel (seperti Google Authenticator atau Microsoft Authenticator) yang menghasilkan kode MFA acak tiap 30 detik secara lokal.',
    context:
      'Jauh lebih aman dibandingkan SMS OTP karena tidak melewati jaringan operator seluler.',
  },
  {
    id: 'hak-akses',
    term: 'Hak Akses (Access Privileges)',
    patterns: ['hak akses'],
    meaning:
      'Kewenangan spesifik yang diberikan kepada sebuah akun untuk melihat, mengubah, atau menghapus data dan konfigurasi sistem.',
    context:
      'Pemberian hak akses di SaaS wajib mengikuti prinsip least privilege dan dicabut segera saat proyek selesai.',
  },
  {
    id: 'sertifikat-digital',
    term: 'Sertifikat Digital (VPN / HTTPS)',
    patterns: ['sertifikat VPN', 'sertifikat HTTPS', 'sertifikat'],
    meaning:
      'Berkas kriptografi resmi yang memverifikasi keaslian identitas sebuah server situs web (HTTPS) atau perangkat/pengguna yang terhubung ke VPN.',
    context:
      'Jika laptop hilang, sertifikat VPN pada perangkat tersebut harus segera dicabut agar tidak bisa dipakai mengakses jaringan BPR.',
  },
  {
    id: 'cache',
    term: 'Cache',
    patterns: ['cache'],
    meaning:
      'Penyimpanan sementara di disk atau browser agar aplikasi memuat data dan sesi lebih cepat tanpa meminta ulang ke server.',
    context:
      'Cache browser atau perangkat dapat menyimpan sisa token login yang rentan dicuri jika disk laptop tidak terenkripsi.',
  },
  {
    id: 'token-sesi',
    term: 'Token Sesi & Token Akses',
    patterns: [
      'token otentikasi',
      'token repositori',
      'token SaaSCore',
      'token akses',
      'token sesi',
      'token VPN',
      'cache token',
      'token',
    ],
    meaning:
      'Kode pengenal digital sementara yang membuktikan pengguna sudah berhasil login sehingga sesi tetap aktif tanpa mengetik password berulang kali.',
    context:
      'Jika infostealer mencuri token sesi atau token VPN, penyerang bisa langsung membajak akses tanpa melewati MFA lagi.',
  },

  // Keamanan Siber, Ancaman & Forensik
  {
    id: 'segitiga-cia',
    term: 'Segitiga CIA (CIA Triad)',
    patterns: ['segitiga CIA', 'CIA Triad', 'pilar CIA'],
    meaning:
      'Kerangka dasar keamanan informasi yang terdiri dari tiga pilar utama: Confidentiality (kerahasiaan), Integrity (keutuhan), dan Availability (ketersediaan).',
    context:
      'Menjadi tolok ukur utama untuk menilai dampak setiap insiden teknis di lingkungan SaaSCore dan BPR.',
  },
  {
    id: 'antivirus',
    term: 'Antivirus & Microsoft Defender',
    patterns: ['Windows Defender', 'Microsoft Defender', 'antivirus'],
    meaning:
      'Perangkat lunak keamanan yang memindai, mendeteksi, dan memblokir file atau program berbahaya pada komputer secara otomatis.',
    context:
      'Jangan pernah mematikan Windows Defender atau antivirus demi memasang aktivator maupun aplikasi tidak resmi.',
  },
  {
    id: 'aktivator-kms',
    term: 'Aktivator KMS Ilegal (Windows / Office)',
    patterns: ['aktivator KMS', 'KMS activator'],
    meaning:
      'Alat pembajak lisensi Windows atau Office yang meniru server Key Management Service secara ilegal dan sangat sering disisipi malware infostealer.',
    context:
      'Penggunaan aktivator KMS ilegal di laptop kerja SaaS merupakan pintu masuk utama pencurian sesi VPN dan password browser.',
  },
  {
    id: 'crack-keygen',
    term: 'Crack, Keygen & Aktivator Bajakan',
    patterns: ['aktivator', 'keygen', 'crack'],
    meaning:
      'Program pemecah lisensi atau pembangkit serial ilegal untuk membajak perangkat lunak berbayar yang kerap membawa trojan pencuri kredensial.',
    context:
      'Seluruh laptop operasional PT. Sigit Adi Aman Siber wajib bebas dari crack, keygen, dan aktivator tidak resmi.',
  },
  {
    id: 'kompromi',
    term: 'Kompromi (Sistem Terkompromi)',
    patterns: ['terkompromi', 'kompromi'],
    meaning:
      'Kondisi ketika perangkat, akun, atau jaringan telah berhasil disusupi, dikendalikan, atau diambil datanya oleh pihak tidak berwenang.',
    context:
      'Perangkat yang dicurigai terkompromi wajib segera diisolasi dari jaringan dan tidak boleh dipakai mengganti password.',
  },
  {
    id: 'anomali',
    term: 'Anomali Sistem',
    patterns: ['anomali'],
    meaning:
      'Perilaku tidak wajar pada perangkat, akun, atau jaringan yang menyimpang dari pola operasional normal, seperti kipas mendadak kencang atau login dini hari.',
    context:
      'Melaporkan anomali sejak menit awal membantu tim keamanan menghentikan serangan sebelum melebar ke klien.',
  },
  {
    id: 'mitigasi',
    term: 'Mitigasi Risiko',
    patterns: ['mitigasi'],
    meaning:
      'Langkah pencegahan atau penanganan terukur untuk mengurangi kemungkinan terjadinya insiden atau memperkecil dampaknya.',
    context:
      'Contoh mitigasi di SaaS meliputi enkripsi AES-256, pemisahan jalur Out-of-Band, dan failover layanan.',
  },
  {
    id: 'eskalasi',
    term: 'Eskalasi Insiden',
    patterns: ['eskalasi'],
    meaning:
      'Proses meneruskan penanganan gangguan atau insiden keamanan ke tingkat tim atau pejabat yang lebih berwenang secara cepat dan terstruktur.',
    context:
      'Eskalasi dini dalam 5 menit pertama membatasi dampak kebocoran sebelum menjalar ke server BPR.',
  },
  {
    id: 'payload',
    term: 'Payload',
    patterns: ['payload'],
    meaning:
      'Muatan kode inti berbahaya di dalam malware atau lampiran jebakan yang menjalankan aksi perusakan, enkripsi, atau pencurian data.',
    context:
      'Payload infostealer sering bersembunyi di balik dokumen makro atau aktivator software bajakan.',
  },
  {
    id: 'persistence',
    term: 'Persistence (Mekanisme Bertahan Malware)',
    patterns: ['persistence'],
    meaning:
      'Teknik malware menanamkan diri di registry atau jadwal tugas sistem agar otomatis aktif kembali meskipun komputer di-restart.',
    context:
      'Alasan mengapa sekadar me-restart laptop yang terinfeksi tidak menghilangkan serangan dan justru menghapus bukti di RAM.',
  },
  {
    id: 'malicious-attachment',
    term: 'Malicious Attachment (Lampiran Berbahaya)',
    patterns: ['Malicious Attachment'],
    meaning:
      'Berkas lampiran email atau pesan (seperti .xlsm bermakro, .pdf.exe, atau ZIP berpassword) yang sengaja dirancang membawa malware.',
    context:
      'Tolak lampiran mencurigakan dari pengirim tak terverifikasi dan aktifkan tampilan ekstensi file lengkap.',
  },
  {
    id: 'adware',
    term: 'Adware',
    patterns: ['adware'],
    meaning:
      'Perangkat lunak tidak diinginkan yang memunculkan iklan secara agresif sekaligus sering memantau aktivitas penjelajahan browser pengguna.',
    context:
      'Sering ikut terpasang bersama utilitas gratis atau paket unduhan dari situs tidak resmi.',
  },
  {
    id: 'spam',
    term: 'Spam',
    patterns: ['spam'],
    meaning:
      'Pesan massal yang dikirim secara acak dan tidak diminta, sering menjadi saluran penyebaran penipuan atau lampiran berbahaya.',
    context:
      'Berbeda dengan spam acak, Spear Phishing B2B disusun khusus memakai konteks kerja SaaSCore dan nama BPR.',
  },
  {
    id: 'vektor-serangan',
    term: 'Vektor Serangan',
    patterns: ['vektor serangan', 'vektor ancaman', 'vektor'],
    meaning:
      'Jalur atau celah masuk yang dimanfaatkan penyerang untuk menyusup ke dalam perangkat, akun, atau jaringan target.',
    context:
      'Contoh vektor utama di tim IT meliputi email phishing, software bajakan, koneksi VPN berlebih, dan USB asing.',
  },
  {
    id: 'kriptografi',
    term: 'Kriptografi',
    patterns: ['kriptografis', 'kriptografi'],
    meaning:
      'Ilmu dan teknik matematis pengamanan informasi melalui penyandian (enkripsi), verifikasi keaslian (hash/sertifikat), dan perlindungan kunci.',
    context:
      'Menjadi fondasi keamanan BitLocker, AES-256, SHA-256, HTTPS, dan kunci fisik FIDO2.',
  },
  {
    id: 'zipcrypto',
    term: 'ZipCrypto',
    patterns: ['ZipCrypto'],
    meaning:
      'Algoritma enkripsi arsip ZIP generasi lama yang memiliki kelemahan kriptografi serius dan mudah dipecahkan komputer modern.',
    context:
      'Saat mengenkripsi dokumen klien dengan 7-Zip, selalu pilih metode AES-256 dan hindari ZipCrypto.',
  },
  {
    id: 'dlp',
    term: 'DLP (Data Loss Prevention)',
    patterns: ['DLP'],
    meaning:
      'Sistem dan kebijakan keamanan yang memantau serta mencegah pengiriman atau kebocoran data sensitif keluar dari lingkungan perusahaan.',
    context:
      'Menggunakan email pribadi gratis membuat pengiriman dokumen lepas dari pengawasan DLP perusahaan.',
  },
  {
    id: 'end-to-end',
    term: 'Enkripsi End-to-End',
    patterns: ['end-to-end'],
    meaning:
      'Penyandian komunikasi dari pengirim langsung hingga penerima akhir sehingga server perantara tidak dapat membaca isi pesannya.',
    context:
      'Email standar umumnya tidak terenkripsi end-to-end, sehingga lampiran data sensitif wajib dienkripsi terpisah (AES-256).',
  },
  {
    id: 'sanitasi-log',
    term: 'Sanitasi Data / Log',
    patterns: ['sanitasi log', 'sanitasi'],
    meaning:
      'Proses membersihkan atau menghapus informasi rahasia (password, string koneksi, NIK, nomor rekening) dari berkas log sebelum dibagikan.',
    context:
      'Wajib dilakukan sebelum melampirkan log error SaaSCore ke portal tiket atau email koordinasi.',
  },
  {
    id: 'display-name',
    term: 'Display Name (Nama Tampilan)',
    patterns: ['Display Name'],
    meaning:
      'Label nama pengirim yang tampil di kotak masuk email atau aplikasi chat dan dapat ditulis bebas oleh siapa saja tanpa verifikasi.',
    context:
      'Selalu periksa alamat email aktual di balik Display Name untuk mendeteksi Email Spoofing.',
  },
  {
    id: 'hover',
    term: 'Hover (Arahkan Kursor)',
    patterns: ['hover'],
    meaning:
      'Menggerakkan kursor tetikus di atas tautan tanpa mengeklik untuk menampilkan alamat URL tujuan yang sebenarnya.',
    context:
      'Kebiasaan cepat untuk membongkar tautan teks resmi yang diam-diam mengarah ke domain tiruan.',
  },
  {
    id: 'bookmark',
    term: 'Bookmark Browser',
    patterns: ['bookmark'],
    meaning:
      'Penanda alamat situs web resmi yang disimpan langsung di browser agar dapat dibuka kembali tanpa mengetik ulang atau mengeklik tautan luar.',
    context:
      'Gunakan bookmark resmi untuk membuka webmail, portal tiket, Git, dan gateway VPN sigitadi.id.',
  },
  {
    id: 'webmail',
    term: 'Webmail',
    patterns: ['webmail'],
    meaning:
      'Layanan email korporat yang diakses langsung melalui browser web tanpa aplikasi desktop khusus.',
    context:
      'Pastikan login webmail @sigitadi.id selalu memakai HTTPS valid, bookmark resmi, dan MFA aktif.',
  },
  {
    id: 'auto-complete',
    term: 'Auto-Complete Email',
    patterns: ['auto-complete'],
    meaning:
      'Fitur saran otomatis aplikasi email yang melengkapi alamat penerima berdasarkan beberapa huruf awal yang diketik.',
    context:
      'Sering memicu kesalahan kirim dokumen rahasia ke BPR lain atau alamat pribadi bila tidak dicek ulang 3 detik sebelum Send.',
  },
  {
    id: 'reply-all',
    term: 'Reply All',
    patterns: ['Reply All'],
    meaning:
      'Tombol balas email yang mengirimkan jawaban ke seluruh alamat yang tercantum di kolom To dan CC sekaligus.',
    context:
      'Menaruh banyak BPR di kolom CC memicu risiko balasan sensitif dari satu bank terbaca oleh seluruh bank lain.',
  },
  {
    id: 'restricted-cloud',
    term: 'Mode Restricted (Akses Terbatas Cloud)',
    patterns: ['mode Restricted', 'Restricted'],
    meaning:
      'Pengaturan izin berbagi cloud yang membatasi pembukaan file hanya untuk akun email tertentu yang didaftarkan secara eksplisit.',
    context:
      'Standar wajib berbagi dokumen proyek SaaSCore di Google Drive atau OneDrive sebagai pengganti tautan publik.',
  },

  // Endpoint, Pengembangan & Format Berkas
  {
    id: 'log-sistem',
    term: 'Log Sistem / Error / Audit',
    patterns: [
      'log diagnostik',
      'log transaksi',
      'log error',
      'log akses',
      'log sistem',
      'log lokal',
      'log audit',
      'log',
    ],
    meaning:
      'Berkas catatan otomatis yang merekam aktivitas sistem, pesan kesalahan aplikasi, atau riwayat akses pengguna untuk analisis dan audit.',
    context:
      'Log error SaaSCore bisa naik status menjadi Sangat Rahasia jika mencetak NIK, rekening, atau token otentikasi.',
  },
  {
    id: 'skrip',
    term: 'Skrip (Script)',
    patterns: ['skrip'],
    meaning:
      'Rangkaian perintah kode otomatis (seperti SQL, PowerShell, atau shell script) yang dieksekusi komputer secara berurutan.',
    context:
      'Skrip perbaikan database wajib diuji di staging terlebih dahulu, dan skrip asing dari internet dilarang dijalankan di laptop kerja.',
  },
  {
    id: 'repositori-git',
    term: 'Repositori & Git',
    patterns: ['repositori', 'Git'],
    meaning:
      'Tempat penyimpanan terpusat kode sumber dan paket rilis aplikasi (dikelola dengan sistem kontrol versi seperti Git) beserta riwayat perubahannya.',
    context:
      'Repositori kode SaaSCore wajib bebas dari password hardcoded dan hanya diakses lewat akun resmi ber-MFA.',
  },
  {
    id: 'bug-troubleshooting',
    term: 'Bug & Troubleshooting',
    patterns: ['troubleshooting', 'bug'],
    meaning:
      'Bug adalah cacat atau kesalahan logika pada perangkat lunak; troubleshooting adalah proses sistematis menelusuri dan memperbaiki gangguan tersebut.',
    context:
      'Saat troubleshooting gangguan BPR, hindari jalan pintas seperti menyimpan dump plaintext atau menonaktifkan keamanan.',
  },
  {
    id: 'open-source-dependensi',
    term: 'Open-Source & Dependensi',
    patterns: ['open-source', 'dependensi'],
    meaning:
      'Perangkat lunak berkode terbuka (open-source) atau pustaka kode pihak ketiga (dependensi) yang dipakai sebagai komponen pembangun aplikasi.',
    context:
      'Dependensi harus berasal dari sumber resmi dan diperiksa keasliannya agar tidak menjadi jalur Supply Chain Attack.',
  },
  {
    id: 'kueri',
    term: 'Kueri (Query)',
    patterns: ['kueri', 'query'],
    meaning:
      'Perintah terstruktur yang dikirim ke database untuk mengambil, menyaring, menambah, atau mengubah baris data tertentu.',
    context:
      'Kueri pembaruan massal pada database SaaSCore tidak boleh dijalankan langsung di produksi tanpa backup dan uji staging.',
  },
  {
    id: 'source-code',
    term: 'Source Code (Kode Sumber)',
    patterns: ['source code', 'kode sumber'],
    meaning:
      'Kumpulan instruksi bahasa pemrograman yang membentuk logika dan fungsi sebuah aplikasi sebelum dijalankan oleh server.',
    context:
      'Source code SaaSCore berklasifikasi Rahasia dan dilarang dibagikan ke publik atau disisipi kredensial produksi.',
  },
  {
    id: 'schema-db',
    term: 'Schema Database',
    patterns: ['schema'],
    meaning:
      'Struktur rancangan logis di dalam database yang mengatur penamaan tabel, kolom, tipe data, dan relasi antar-tabel.',
    context:
      'Informasi nama schema beserta kredensial produksi BPR berklasifikasi Sangat Rahasia.',
  },
  {
    id: 'string-koneksi',
    term: 'String Koneksi (Connection String)',
    patterns: ['string koneksi'],
    meaning:
      'Baris teks konfigurasi yang memuat alamat host, port, nama database, username, dan password agar aplikasi bisa tersambung ke database.',
    context:
      'String koneksi yang terbawa dalam log error mentah dapat membuka akses langsung ke database BPR jika bocor.',
  },
  {
    id: 'data-dummy',
    term: 'Data Dummy & Data Sintetis',
    patterns: ['data dummy', 'data sintetis'],
    meaning:
      'Data tiruan buatan yang strukturnya menyerupai data asli namun tidak memuat identitas atau transaksi nasabah sebenarnya.',
    context:
      'Standar aman untuk mereproduksi bug dan pengujian QA SaaSCore tanpa memaparkan data pribadi nasabah.',
  },
  {
    id: 'usb',
    term: 'USB (Universal Serial Bus)',
    patterns: ['USB'],
    meaning:
      'Antarmuka colokan standar komputer untuk menghubungkan flashdisk, keyboard, atau perangkat eksternal lainnya.',
    context:
      'Port USB laptop kerja tidak boleh dicolokkan flashdisk asing karena berisiko membawa malware maupun serangan BadUSB.',
  },
  {
    id: 'ssd',
    term: 'SSD (Solid State Drive)',
    patterns: ['SSD'],
    meaning:
      'Media penyimpanan data utama modern pada laptop dan server berbasis chip memori yang cepat dan tahan guncangan.',
    context:
      'Tanpa enkripsi disk penuh (BitLocker/FileVault), SSD dari laptop yang dicuri dapat dilepas dan dibaca di komputer lain.',
  },
  {
    id: 'recovery-key',
    term: 'Recovery Key (Kunci Pemulihan)',
    patterns: ['Recovery Key'],
    meaning:
      'Kode cadangan khusus untuk membuka kembali akses drive terenkripsi BitLocker atau FileVault apabila terjadi gangguan sistem atau lupa sandi.',
    context:
      'Wajib dicadangkan terpisah di akun resmi perusahaan, bukan disimpan sebagai file teks di laptop yang sama.',
  },
  {
    id: 'live-usb',
    term: 'Live USB',
    patterns: ['Live USB'],
    meaning:
      'Sistem operasi portabel yang dijalankan langsung dari flashdisk untuk menyalakan komputer dan membaca isi hardisk tanpa melewati login OS utama.',
    context:
      'Membuktikan mengapa password login Windows saja tidak melindungi data jika BitLocker tidak diaktifkan.',
  },
  {
    id: 'real-time-protection',
    term: 'Real-Time Protection',
    patterns: ['real-time protection', 'real-time'],
    meaning:
      'Fitur pemindaian aktif terus-menerus oleh antivirus/EDR yang langsung memeriksa berkas dan proses seketika saat dijalankan.',
    context:
      'Mematikan real-time protection meski sebentar memberi waktu cukup bagi infostealer mencuri sesi browser dan VPN.',
  },
  {
    id: 'exclusion-antivirus',
    term: 'Exclusion (Pengecualian Antivirus)',
    patterns: ['exclusions', 'exclusion'],
    meaning:
      'Daftar folder atau berkas yang sengaja dilewati agar tidak dipindai oleh antivirus.',
    context:
      'Menambahkan folder Downloads atau proyek ke exclusion secara sembarangan membuka celah bebas bagi malware.',
  },
  {
    id: 'partisi',
    term: 'Partisi Disk',
    patterns: ['partisi'],
    meaning:
      'Pembagian logis ruang penyimpanan hardisk atau SSD menjadi beberapa drive terpisah (seperti Drive C: dan Drive D:).',
    context:
      'Memasang aplikasi bajakan di Drive D: tidak mengisolasi malware karena prosesnya tetap bisa membaca profil browser di Drive C:.',
  },
  {
    id: 'registry',
    term: 'Windows Registry',
    patterns: ['registry'],
    meaning:
      'Basis data konfigurasi inti sistem operasi Windows yang menyimpan pengaturan perangkat keras, aplikasi, dan program yang berjalan otomatis saat boot.',
    context:
      'Sering dimanfaatkan malware untuk persistence dan menjadi salah satu artefak penting saat investigasi forensik.',
  },
  {
    id: 'cpu',
    term: 'CPU (Central Processing Unit)',
    patterns: ['CPU'],
    meaning:
      'Prosesor utama komputer yang menjalankan seluruh instruksi aplikasi dan sistem operasi.',
    context:
      'Lonjakan penggunaan CPU dan putaran kipas tiba-tiba saat laptop diam bisa menjadi gejala awal (IoC) skrip malware aktif.',
  },
  {
    id: 'cli-terminal',
    term: 'CLI, CMD & Terminal',
    patterns: ['Linux CLI', 'CLI', 'CMD', 'terminal'],
    meaning:
      'Antarmuka baris perintah berbasis teks (Command-Line Interface) untuk menjalankan perintah sistem atau mengelola server secara langsung.',
    context:
      'Jendela CMD atau terminal yang tiba-tiba berkedip singkat tanpa Anda buka merupakan indikator kuat eksekusi skrip mencurigakan.',
  },
  {
    id: 'local-storage',
    term: 'localStorage Browser',
    patterns: ['localStorage'],
    meaning:
      'Area penyimpanan lokal permanen di dalam browser web agar situs dapat mengingat data atau preferensi pengguna antar-sesi.',
    context:
      'Simulasi passphrase di Lab 04 tidak pernah menyimpan input ke localStorage agar frasa latihan hilang saat halaman ditutup.',
  },
  {
    id: 'ekstensi-file',
    term: 'Ekstensi Berkas (File Extension)',
    patterns: ['ekstensi file', 'ekstensi berkas', 'ekstensi'],
    meaning:
      'Akhiran setelah tanda titik terakhir pada nama file (seperti .pdf, .xlsx, .exe) yang menentukan jenis berkas dan cara sistem membukanya.',
    context:
      'Aktifkan tampilan ekstensi file lengkap di Windows agar penyamaran ekstensi ganda (.pdf.exe) langsung terlihat.',
  },
  {
    id: 'arsip-zip-7z',
    term: 'Arsip ZIP & 7-Zip (.7z)',
    patterns: ['7-Zip', '7z', 'ZIP'],
    meaning:
      'Format pengemasan dan kompresi satu atau beberapa berkas; 7-Zip mendukung enkripsi kuat AES-256 termasuk penyandian nama file di dalamnya.',
    context:
      'Gunakan 7-Zip AES-256 untuk mengirim berkas sensitif sementara, dan waspadai ZIP berpassword dari pengirim asing.',
  },
  {
    id: 'format-json',
    term: 'Berkas JSON (.json)',
    patterns: ['JSON', '.json'],
    meaning:
      'Format teks terstruktur (JavaScript Object Notation) yang umum dipakai menyimpan konfigurasi aplikasi dan pertukaran data API tanpa enkripsi bawaan.',
    context:
      'File konfigurasi .json berisi kredensial database BPR berklasifikasi Sangat Rahasia dan dilarang dikirim plaintext.',
  },
  {
    id: 'format-ovpn',
    term: 'Profil OpenVPN (.ovpn)',
    patterns: ['.ovpn'],
    meaning:
      'Berkas konfigurasi klien VPN yang memuat alamat server gerbang, port, serta sering menyertakan kunci atau sertifikat akses jaringan internal.',
    context:
      'File .ovpn klien BPR dilarang dibagikan di grup chat atau ditaruh bersama password di Desktop.',
  },
  {
    id: 'format-dump-ext',
    term: 'Berkas Ekspor Database (.sql / .bak / .dmp)',
    patterns: ['.sql', '.bak', '.dmp'],
    meaning:
      'Ekstensi berkas cadangan atau ekspor basis data yang umumnya menyimpan struktur tabel beserta isi data nasabah secara lengkap.',
    context:
      'Dilarang menyimpan file .sql, .bak, atau .dmp produksi BPR dalam bentuk plaintext di laptop lokal.',
  },
  {
    id: 'format-exe',
    term: 'Berkas Eksekusi Windows (.exe)',
    patterns: ['.exe'],
    meaning:
      'Format program executable di sistem operasi Windows yang langsung menjalankan instruksi kode begitu diklik dua kali.',
    context:
      'Dokumen laporan atau jadwal tidak pernah berakhiran .exe; lampiran .exe dari email hampir pasti berbahaya.',
  },
  {
    id: 'format-html',
    term: 'Berkas HTML',
    patterns: ['HTML'],
    meaning:
      'Bahasa markup halaman web; lampiran email berformat .html sering dipakai penyerang menampilkan formulir login palsu secara lokal di browser.',
    context:
      'Jangan pernah mengetik kredensial kantor pada halaman login yang dibuka dari lampiran HTML.',
  },
  {
    id: 'format-pdf',
    term: 'Berkas PDF',
    patterns: ['PDF'],
    meaning:
      'Format dokumen portabel (Portable Document Format) untuk menampilkan teks dan tata letak tetap lintas perangkat.',
    context:
      'Meski umum dipakai untuk laporan resmi, tetap pastikan berkas benar-benar berakhiran .pdf (bukan .pdf.exe) dan lindungi PDF sensitif dengan enkripsi.',
  },
];
