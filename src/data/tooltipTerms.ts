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
    patterns: ['Customer Information File (CIF)', 'CIF (Customer Information File)', 'tabel CIF', 'data CIF', 'CIF'],
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
    patterns: ['General Ledger (GL)', 'General Ledger', 'jurnal GL'],
    meaning:
      'Buku besar akuntansi utama bank yang mencatat seluruh ringkasan transaksi keuangan, aset, kewajiban, dan laba rugi.',
    context:
      'Kesalahan pada jurnal GL di SaaSCore membuat pembukuan akhir hari bank tidak seimbang.',
  },
  {
    id: 'eod',
    term: 'EOD (End of Day)',
    patterns: ['End of Day (EOD)', 'End of Day', 'EOD'],
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
    patterns: ['otorisasi ganda', 'otorisasi'],
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
    patterns: ['Supply Chain Attack'],
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
    patterns: ['Trojan / Infostealer', 'infostealer', 'Trojan'],
    meaning:
      'Program berbahaya yang menyamar sebagai aplikasi normal untuk mencuri kata sandi tersimpan, cookie sesi login, dan file kunci akses.',
    context:
      'Sering bersembunyi di dalam aktivator atau software bajakan pada laptop kerja.',
  },
  {
    id: 'lateral-movement',
    term: 'Lateral Movement',
    patterns: ['Lateral Movement'],
    meaning:
      'Pergerakan penyerang dari satu perangkat yang berhasil dikuasai menuju server atau komputer lain di dalam jaringan.',
    context:
      'Dapat terjadi saat satu laptop support yang terhubung VPN BPR berhasil dikendalikan pelaku.',
  },
  {
    id: 'checksum-sha256',
    term: 'Checksum & SHA-256',
    patterns: ['checksum SHA-256', 'SHA-256', 'checksum'],
    meaning:
      'Sidik jari digital unik sebuah berkas untuk memastikan isi file tidak berubah, rusak, atau disisipi malware sejak dibuat.',
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
    term: 'Macro Berbahaya (.xlsm / .docm)',
    patterns: ['file macro', 'dokumen macro', 'macro', '.xlsm'],
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
    term: 'Social Engineering',
    patterns: ['Social Engineering'],
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
    patterns: ['Email Spoofing'],
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
    patterns: ['Domain Akar (Root Domain)', 'Registrable Domain', 'Domain Akar', 'Root Domain', 'domain utama'],
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
    patterns: ['Least Privilege', 'prinsip least privilege'],
    meaning:
      'Prinsip memberikan hak akses paling minimal yang dibutuhkan untuk menjalankan tugas tertentu dan hanya selama tugas itu berlangsung.',
    context:
      'Staf tidak diberi akun admin penuh permanen pada database produksi SaaSCore bila hanya perlu melihat log.',
  },
  {
    id: 'mfa-totp',
    term: 'MFA & TOTP',
    patterns: ['MFA & TOTP', 'Time-based One-Time Password (TOTP)', 'TOTP', 'MFA berbasis aplikasi', 'MFA'],
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
    patterns: ['FIDO2'],
    meaning:
      'Standar autentikasi berbasis kunci kriptografi fisik (USB/NFC) atau biometrik perangkat yang terikat ke domain resmi.',
    context:
      'Memberikan perlindungan paling kuat terhadap phishing karena tidak bisa tertipu oleh situs tiruan.',
  },
  {
    id: 'otp',
    term: 'OTP (One-Time Password)',
    patterns: ['OTP'],
    meaning:
      'Kode sandi sekali pakai yang dikirim untuk memverifikasi satu sesi login atau transaksi tertentu.',
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
    term: 'Database Dump',
    patterns: ['Database Dump', 'dump database'],
    meaning:
      'Salinan lengkap struktur dan isi tabel basis data yang diekspor ke dalam satu berkas (.sql atau .bak).',
    context:
      'Dump produksi BPR memuat ribuan PII nasabah sehingga dilarang disimpan di laptop tanpa enkripsi penuh.',
  },
  {
    id: 'enkripsi-aes',
    term: 'Enkripsi AES-256',
    patterns: ['Enkripsi AES-256', 'AES-256', 'enkripsi disk penuh', 'terenkripsi penuh', 'enkripsi'],
    meaning:
      'Metode penyandian data berstandar kuat agar isi berkas atau penyimpanan tidak dapat dibaca tanpa kata sandi pembukanya.',
    context:
      'Digunakan saat mengamankan arsip konfigurasi SaaSCore atau mengaktifkan perlindungan penyimpanan laptop.',
  },
  {
    id: 'data-masking',
    term: 'Data Masking & Anonymization',
    patterns: ['Data Anonymization', 'Data Masking', 'data masking', 'anonymized'],
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
    patterns: ['secret vault', 'KMS'],
    meaning:
      'Layanan brankas terpusat dan sistem manajemen kunci (Key Management System) untuk menyimpan kredensial server, token, dan kunci enkripsi.',
    context:
      'Menggantikan penyimpanan kredensial di dalam kode program atau file konfigurasi terbuka.',
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
    patterns: ['BitLocker / FileVault', 'BitLocker atau FileVault', 'BitLocker', 'FileVault'],
    meaning:
      'Fitur enkripsi penyimpanan penuh bawaan Windows (BitLocker) dan macOS (FileVault) agar isi hardisk tidak bisa dibaca jika laptop dicuri.',
    context:
      'Wajib aktif di seluruh laptop kerja pegawai SaaS sebelum menangani dokumen atau akses SaaSCore.',
  },
  {
    id: 'patching',
    term: 'Patching OS & Browser',
    patterns: ['Patching OS & Browser', 'patch keamanan', 'patching', 'patch'],
    meaning:
      'Memasang pembaruan resmi sistem operasi, aplikasi, atau browser untuk menutup celah keamanan yang sudah diketahui.',
    context:
      'Menunda update membuat laptop mudah ditembus melalui bug browser yang sudah ada penangkalnya.',
  },
  {
    id: 'uac',
    term: 'UAC (User Account Control)',
    patterns: ['User Account Control', 'UAC / Least Privilege', 'UAC'],
    meaning:
      'Lapisan konfirmasi di Windows yang meminta izin sadar pengguna setiap kali ada program yang mencoba mengubah pengaturan inti sistem.',
    context:
      'Menahan program berbahaya agar tidak diam-diam memasang layanan di latar belakang.',
  },
  {
    id: 'screen-lock',
    term: 'Screen Lock (Win + L / Idle Lock)',
    patterns: ['Screen Lock (Win + L)', 'screen lock', 'Win + L', 'idle lock'],
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
    patterns: ['root access', 'Administrator'],
    meaning:
      'Hak akses tertinggi pada sistem operasi yang berkuasa mengubah, menghapus, atau memasang apa saja di perangkat.',
    context:
      'Pekerjaan harian sebaiknya memakai akun standar agar malware tidak otomatis memperoleh kendali penuh.',
  },
  {
    id: 'zero-day',
    term: 'Zero-Day & Eksploitasi',
    patterns: ['zero-day', 'eksploitasi'],
    meaning:
      'Celah kerentanan perangkat lunak yang belum sempat ditambal oleh pembuatnya sehingga rentan diserang.',
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
    patterns: ['SSL/TLS & HTTPS', 'sertifikat TLS', 'HTTPS', 'TLS', 'SSL'],
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
    patterns: ['session hijacking', 'cookie sesi'],
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
    patterns: ['Isolate-Preserve-Report', 'Isolate, Preserve, Report'],
    meaning:
      'Tiga langkah darurat 5 menit pertama: putus jaringan (Isolate), biarkan bukti tetap utuh (Preserve), dan segera lapor (Report).',
    context:
      'Menahan penyebaran insiden dari satu laptop sebelum menjalar ke server klien SaaSCore.',
  },
  {
    id: 'volatile-memory',
    term: 'Volatile Memory (RAM)',
    patterns: ['Volatile Memory (RAM)', 'Volatile Memory', 'RAM'],
    meaning:
      'Memori kerja sementara komputer yang isinya langsung lenyap saat laptop dimatikan atau di-restart.',
    context:
      'Menyimpan jejak proses malware aktif atau koneksi jaringan penyerang untuk kebutuhan investigasi.',
  },
  {
    id: 'forensic-triage',
    term: 'Forensic Triage',
    patterns: ['Forensic Triage'],
    meaning:
      'Pemeriksaan cepat awal pada perangkat terdampak untuk menilai jenis serangan, cakupan data, dan apakah akun/server perlu diputus.',
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
    patterns: ['No-Blame Reporting', 'no-blame reporting', 'no-blame culture'],
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
    patterns: ['Anyone with the link', 'Anyone with the Link'],
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
    patterns: ['BCC vs CC', 'BCC'],
    meaning:
      'CC menampilkan seluruh alamat email penerima ke semua orang, sedangkan BCC menyembunyikan daftar penerima satu sama lain.',
    context:
      'Gunakan BCC saat mengirim pengumuman pembaruan kepada beberapa mitra BPR sekaligus.',
  },
  {
    id: 'expiration-date',
    term: 'Expiration Date (Masa Berlaku Tautan)',
    patterns: ['expiration date'],
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
    patterns: ['Defense in Depth'],
    meaning:
      'Strategi memasang beberapa lapis pengamanan berurutan agar kegagalan satu kontrol tetap tertahan oleh lapisan berikutnya.',
    context:
      'Contohnya kombinasi passphrase kuat, MFA aplikasi, enkripsi berkas, VPN disiplin, dan lapor cepat.',
  },
  {
    id: 'offboarding',
    term: 'Access Review & Offboarding',
    patterns: ['Access Review / Offboarding', 'offboarding'],
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
    term: 'Token & API',
    patterns: ['token API', 'API', 'token'],
    meaning:
      'API adalah jalur komunikasi antar-sistem perangkat lunak; token adalah kunci digital akses agar sistem saling mengenali secara sah.',
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
];
