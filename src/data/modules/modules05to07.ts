import { ModuleContent } from '../../types/training';

export const modules05to07: ModuleContent[] = [
  {
    id: 5,
    slug: 'data-protection-infosec',
    session: 'pagi',
    timeSlot: '11.30 - 12.00',
    title: 'Modul 05: Data Protection dan Information Security',
    tagline:
      'Menjaga kerahasiaan data BPR dan integritas informasi SaaSCore melalui klasifikasi data, enkripsi, dan pengiriman kredensial terpisah.',
    objectives: [
      'Mengelompokkan dokumen dan berkas kerja SaaS ke dalam 4 tingkat klasifikasi data secara tepat.',
      'Menerapkan larangan penyimpanan database dump klien tanpa enkripsi di laptop maupun media sementara.',
      'Mempraktikkan pengiriman kredensial terpisah (Out-of-Band) agar kebocoran satu kanal tidak membuka akses penuh.',
      'Membiasakan pemakaian data anonim (data masking) untuk keperluan uji coba serta pembersihan berkas setelah tiket selesai.'
    ],
    workflowDiagram: {
      title: 'Alur Penanganan Data Klien & Kredensial',
      subtitle:
        'Menjaga kerahasiaan database BPR melalui klasifikasi data, enkripsi AES-256, dan pengiriman Out-of-Band.',
      steps: [
        {
          step: 1,
          title: 'Klasifikasi Berkas',
          action: 'Tentukan level Publik, Internal, Rahasia, atau Sangat Rahasia termasuk cek isi PII pada log.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 2,
          title: 'Masking atau Enkripsi',
          action: 'Pakai data dummy untuk uji coba atau bungkus dump sementara dengan enkripsi AES-256.',
          tag: 'Gate: Tanpa Plaintext',
        },
        {
          step: 3,
          title: 'Sanitasi Log Debug',
          action: 'Sensor NIK, nomor rekening, dan string koneksi sebelum log diunggah ke tiket.',
          tag: 'Peran: Dev / Support',
        },
        {
          step: 4,
          title: 'Kirim Out-of-Band',
          action: 'Kirim file terenkripsi atau username di kanal pertama dan password pembuka lewat kanal terpisah.',
          tag: 'Gate: Dua Kanal',
        },
        {
          step: 5,
          title: 'Bersihkan Perangkat',
          action: 'Hapus berkas sementara dari Downloads dan kosongkan Recycle Bin setelah analisis tuntas.',
          tag: 'Gate: Tiket Selesai',
        },
      ],
    },
    sections: [
      {
        heading: 'Empat Tingkat Klasifikasi Data PT. Sigit Adi Aman Siber (SaaS)',
        paragraphs: [
          'Sebagai pengelola Core Banking System SaaSCore untuk BPR mitra, tim IT SaaS memegang kepercayaan tinggi atas data operasional dan finansial nasabah. Setiap dokumen atau berkas teknis wajib diberi perlakuan sesuai 4 tingkat klasifikasi berikut agar data sensitif tidak tersimpan atau terkirim sembarangan.'
        ],
        bullets: [
          'Publik: Materi resmi untuk konsumsi umum seperti brosur SaaSCore atau profil di situs sigitadi.id.',
          'Internal: Dokumen operasional tim SaaS seperti SOP internal, jadwal piket support, dan catatan rapat non-sensitif.',
          'Rahasia: Kontrak kerja sama BPR, topologi jaringan klien, source code SaaSCore, serta laporan bug berstruktur tabel.',
          'Sangat Rahasia: Database dump produksi BPR, data pribadi nasabah/PII (NIK, nama ibu kandung, mutasi saldo), kredensial server/VPN, dan API secret.'
        ]
      },
      {
        heading: 'Larangan Menyimpan Database Dump Klien Tanpa Enkripsi',
        paragraphs: [
          'Tim support dan developer sering mengekspor potongan tabel untuk menyelidiki selisih transaksi atau bug pada modul SaaSCore. Menyimpan file database dump (.sql, .bak, .dmp, atau CSV nasabah) dalam kondisi plaintext di folder Downloads atau Desktop adalah risiko kebocoran berat jika laptop hilang atau terkena pencuri file.'
        ],
        bullets: [
          'Dilarang menyimpan database dump produksi BPR dalam bentuk teks terbuka di laptop lokal maupun cloud pribadi.',
          'Terapkan data masking atau gunakan data dummy buatan sebelum memindahkan sampel uji ke lingkungan lokal atau QA.',
          'Jika salinan sementara benar-benar dibutuhkan atas izin resmi, bungkus dalam arsip terenkripsi AES-256 (seperti 7-Zip) dan terapkan prinsip Least Privilege.',
          'Segera hapus berkas sementara dan kosongkan Recycle Bin begitu analisis tiket atau UAT klien rampung.'
        ]
      },
      {
        heading: 'Pengiriman Kredensial Terpisah (Out-of-Band)',
        paragraphs: [
          'Mengirimkan alamat IP server, username, dan password di dalam satu email atau satu pesan chat yang sama membuat akun email menjadi titik kegagalan tunggal. Metode Out-of-Band memisahkan pengiriman informasi akses dan kata sandinya melalui dua jalur komunikasi yang berbeda.'
        ],
        bullets: [
          'Kanal pertama (misalnya email resmi @sigitadi.id atau sistem tiket): kirim alamat host, username, atau arsip .7z terenkripsi.',
          'Kanal kedua (misalnya panggilan suara atau pesan terpisah ke nomor terverifikasi): kirimkan password atau passphrase pembuka.',
          'Jangan ulangi detail IP atau nama akun pada pesan kedua agar pesan tersebut tidak bermakna jika terbaca pihak asing.',
          'Instruksikan penerima untuk langsung mengganti kata sandi sementara saat login pertama.'
        ]
      },
      {
        heading: 'Kewaspadaan terhadap Kenaikan Tingkat Sensitivitas Log',
        paragraphs: [
          'Sebuah file log error SaaSCore bisa berawal sebagai catatan teknis Internal, tetapi statusnya langsung naik menjadi Sangat Rahasia apabila memuat query SQL berisi NIK, nomor rekening, atau token otentikasi. Selalu periksa isi lampiran sebelum mengunggahnya ke papan tiket atau grup koordinasi.'
        ],
        bullets: [
          'Sensor atau potong baris payload yang mengandung identitas nasabah (PII) dan rahasia sesi sebelum log dibagikan.',
          'Simpan kredensial akses BPR hanya di Password Manager resmi perusahaan, bukan di file plaintext pada Desktop.',
          'Lakukan pemeriksaan folder Downloads setiap kali menutup tiket harian agar tidak ada sisa file klien yang tertinggal.'
        ]
      }
    ],
    analogy: {
      title: 'Brankas Terkunci dan Kode Kombinasi yang Dikirim Terpisah',
      body: 'Mengirim akses server klien ibarat mengirim brankas dokumen akta ke cabang bank di kota lain. Anda mengirim brankas terkunci lewat kurir resmi, lalu menelepon kepala cabang untuk menyampaikan kombinasi angkanya secara terpisah, sehingga pencegatan di satu jalur tidak membuka isi brankas.'
    },
    sasCases: [
      {
        title: '[Ilustrasi Skenario] Database Dump BPR Tertinggal di Folder Downloads',
        context:
          'Seorang staf implementasi SaaS mengekspor data nasabah dan kredit SaaSCore ke file .sql tanpa enkripsi di folder Downloads untuk memeriksa selisih migrasi saldo awal.',
        whatHappened:
          'Dua minggu berselang, laptop tersebut mengalami kerusakan layar dan dibawa ke tempat servis umum. Teknisi servis menemukan file database dump yang belum dihapus maupun dienkripsi berisi ribuan identitas dan saldo nasabah BPR.',
        lesson:
          'Data Sangat Rahasia tidak boleh disimpan plaintext di perangkat kerja. Pemakaian data masking untuk investigasi serta penghapusan berkas sementara segera setelah tiket ditutup wajib menjadi rutinitas.'
      },
      {
        title: '[Ilustrasi Skenario] Kredensial Admin dan File VPN Dikirim dalam Satu Email',
        context:
          'Seorang engineer menyiapkan akses pemeliharaan server uji SaaSCore untuk rekan baru guna mempercepat penanganan kendala modul pelaporan.',
        whatHappened:
          'File konfigurasi VPN, IP server, username, dan password dikirim sekaligus dalam satu email balasan. Saat email penerima sempat terbuka di komputer bersama yang lupa dikunci, pihak lain langsung memiliki paket akses penuh dalam satu layar.',
        lesson:
          'Pemisahan kanal pengiriman Out-of-Band memastikan kebocoran pada satu media komunikasi tidak otomatis menyerahkan kendali akses sistem.'
      }
    ],
    doDont: [
      {
        doIt: 'Berikan label dan perlakuan sesuai 4 tingkat klasifikasi data SaaS sebelum mengirim berkas.',
        dontIt: 'Memperlakukan dokumen kontrak, log transaksi, dan brosur produk dengan cara distribusi yang sama.',
        why: 'Salah mengklasifikasikan data Rahasia atau Sangat Rahasia memicu kebocoran informasi bernilai tinggi.'
      },
      {
        doIt: 'Gunakan data dummy atau lakukan data masking sebelum memakai sampel database BPR di lingkungan uji.',
        dontIt: 'Menyimpan file database dump produksi (.sql, .bak, CSV) tanpa enkripsi di Downloads atau Desktop.',
        why: 'File dump plaintext dapat langsung dibaca jika laptop hilang atau disusupi pencuri berkas.'
      },
      {
        doIt: 'Bungkus berkas sensitif sementara dengan enkripsi AES-256 dan hapus tuntas setelah tiket selesai.',
        dontIt: 'Menimbun arsip database klien berbulan-bulan di laptop sebagai cadangan kerja pribadi.',
        why: 'Penumpukan data lama memperbesar dampak insiden bila suatu saat laptop berpindah tangan.'
      },
      {
        doIt: 'Pisahkan pengiriman username/file terenkripsi dan password melalui dua kanal berbeda (Out-of-Band).',
        dontIt: 'Menuliskan host, username, dan password lengkap di dalam satu email atau satu pesan chat.',
        why: 'Satu akun pesan yang terkompromi tidak boleh langsung membuka pintu penuh ke server klien.'
      },
      {
        doIt: 'Saring baris berisi PII atau token dari log debug SaaSCore sebelum dilampirkan ke tiket.',
        dontIt: 'Mengunggah tangkapan layar atau log mentah berisi data nasabah ke kanal diskusi umum.',
        why: 'Isi log yang memuat identitas nasabah otomatis mengangkat klasifikasi berkas menjadi Sangat Rahasia.'
      }
    ],
    keyTakeaways: [
      'Klasifikasi Publik, Internal, Rahasia, dan Sangat Rahasia menentukan cara menyimpan serta membagikan informasi di SaaS.',
      'Database dump produksi BPR dilarang keras disimpan dalam kondisi plaintext; utamakan data masking dan enkripsi AES-256.',
      'Kredensial akses wajib dikirim secara Out-of-Band melalui dua kanal berbeda yang terverifikasi.',
      'Membersihkan file sementara di laptop adalah langkah penutup wajib setelah tiket dukungan selesai.'
    ],
    instructorGuide: {
      durationMinutes: 30,
      talkingPoints: [
        'Tekankan perbedaan tegas antara dokumen Internal (SOP kantor) dan Sangat Rahasia (dump database nasabah BPR) pada sistem SaaSCore.',
        'Peragakan sekilas bagaimana satu baris log debug dapat menaikkan status file menjadi Sangat Rahasia jika mencetak data PII.',
        'Minta peserta mengingat kembali kebiasaan di folder Downloads masing-masing saat melakukan troubleshooting harian.'
      ],
      discussionPrompt:
        'Jika BPR mitra meminta tim Anda mengecek ketidaksesuaian saldo kredit pada jam sibuk, langkah tercepat sekaligus aman apa yang Anda lakukan tanpa meninggalkan file dump plaintext di laptop?'
    },
    lab: {
      title: 'Lab 05: Simulator Pengamanan & Enkripsi Dokumen Klien',
      summary:
        'Eksplorasi kondisi aman dan berisiko dalam mengklasifikasikan dokumen SaaSCore, menangani database dump dengan enkripsi AES-256, serta mempraktikkan alur pengiriman kredensial Out-of-Band.',
      }
  },
  {
    id: 6,
    slug: 'endpoint-device-protection',
    session: 'siang',
    timeSlot: '13.00 - 13.40',
    title: 'Modul 06: Endpoint Security dan Device Protection',
    tagline:
      'Menjaga laptop kerja sebagai gerbang utama akses SaaSCore dari infostealer software bajakan, celah sistem tak terpatch, pencurian fisik, dan perangkat USB asing.',
    objectives: [
      'Memahami cara kerja infostealer pada software bajakan dalam mencuri sesi browser dan konfigurasi VPN klien.',
      'Menerapkan disiplin pembaruan OS dan browser secara tepat waktu untuk menutup celah keamanan.',
      'Memastikan enkripsi disk penuh (BitLocker atau FileVault) serta prinsip akun non-admin (UAC/Least Privilege) berjalan aktif.',
      'Membiasakan penguncian layar (Win + L) dan penolakan perangkat USB tak dikenal guna mencegah akses fisik maupun serangan BadUSB.'
    ],
    workflowDiagram: {
      title: 'Alur Pengamanan Endpoint & Perangkat Kerja',
      subtitle:
        'Menjaga laptop kerja sebagai gerbang menuju server BPR dari infostealer, celah OS, dan akses fisik.',
      steps: [
        {
          step: 1,
          title: 'Aplikasi Resmi',
          action: 'Instal hanya software berlisensi resmi tanpa crack, keygen, atau aktivator KMS.',
          tag: 'Gate: Bebas Bajakan',
        },
        {
          step: 2,
          title: 'Patch & UAC Aktif',
          action: 'Terapkan update OS dan browser pada hari rilis serta pertahankan UAC dan EDR aktif.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 3,
          title: 'Enkripsi Disk Penuh',
          action: 'Pastikan SSD terenkripsi penuh dan Recovery Key disimpan di brankas resmi terpisah.',
          tag: 'Gate: BitLocker / FileVault',
        },
        {
          step: 4,
          title: 'Tolak USB Asing',
          action: 'Jangan colokkan flashdisk tak dikenal ke laptop kerja; tukar file lewat cloud internal.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 5,
          title: 'Kunci Layar Instan',
          action: 'Kunci layar setiap kali beranjak dari meja dan atur auto-lock maksimal 5 menit.',
          tag: 'Gate: Win + L',
        },
      ],
    },
    sections: [
      {
        heading: 'Bahaya Software Bajakan dan Ancaman Infostealer',
        paragraphs: [
          'Memasang aplikasi bajakan, crack Office, aktivator KMS ilegal, atau klien SQL bajakan di laptop kerja membuka jalur masuk utama bagi malware jenis infostealer. Malware ini bekerja senyap selama beberapa detik saja tanpa memperlambat komputer, lalu mencuri kredensial yang tersimpan di perangkat sebelum menghapus jejaknya.'
        ],
        bullets: [
          'Infostealer menyasar cookie sesi aktif browser sehingga pelaku dapat membajak akun kerja tanpa perlu password atau kode MFA.',
          'File konfigurasi VPN menuju jaringan BPR, kunci SSH, dan password database di tools pengembang menjadi target utama pencurian.',
          'Aktivator bajakan sering meminta pengguna mematikan antivirus bawaan, yang langsung melumpuhkan pertahanan endpoint.',
          'Gunakan hanya perangkat lunak berlisensi resmi dari PT. Sigit Adi Aman Siber (SaaS) atau alternatif open-source resmi.'
        ]
      },
      {
        heading: 'Disiplin Patching OS, Browser, dan Hak Akun Terbatas (UAC)',
        paragraphs: [
          'Setiap pembaruan Windows, macOS, dan browser Chrome atau Edge membawa tambalan untuk celah keamanan yang baru dipublikasikan. Menunda restart laptop selama berminggu-minggu membuat laptop kerja rentan dieksploitasi hanya dengan membuka halaman web berbahaya.'
        ],
        bullets: [
          'Terapkan pembaruan OS dan browser pada hari yang sama saat notifikasi update tersedia, misalnya saat jam istirahat.',
          'Jalankan pekerjaan harian dengan akun standar yang mengaktifkan UAC (User Account Control) agar program asing tidak diam-diam mengubah sistem.',
          'Pastikan Windows Defender atau agen keamanan endpoint perusahaan selalu aktif dan terbarui definisinya.'
        ]
      },
      {
        heading: 'Enkripsi Disk Penuh dengan BitLocker dan FileVault',
        paragraphs: [
          'Password login sistem operasi hanya mengunci layar saat OS berjalan, bukan melindungi isi SSD jika laptop hilang atau dicuri saat kunjungan ke BPR. Dengan enkripsi disk penuh seperti BitLocker di Windows atau FileVault di macOS, seluruh sektor penyimpanan diacak sehingga SSD tidak dapat dibaca meskipun dilepas dan dipasang ke komputer lain.'
        ],
        bullets: [
          'Verifikasi bahwa status BitLocker atau FileVault pada laptop kerja SaaS selalu aktif melindungi drive sistem.',
          'Simpan Recovery Key secara terpisah di pengelola akun resmi perusahaan, bukan di dalam file teks di laptop yang sama.',
          'Kombinasikan enkripsi disk dengan kata sandi login perangkat yang kuat agar lapisan perlindungan tetap utuh.'
        ]
      },
      {
        heading: 'Keamanan Fisik, Screen Lock (Win + L), dan Larangan USB Asing',
        paragraphs: [
          'Ancaman endpoint juga datang dari akses fisik dalam hitungan detik, seperti meninggalkan layar menyala di ruang rapat BPR atau mencolokkan flashdisk asing. Selain membawa virus konvensional, perangkat keras BadUSB tampak seperti flashdisk biasa tetapi langsung menyamar sebagai keyboard otomatis yang mengetikkan skrip berbahaya.'
        ],
        bullets: [
          'Selalu tekan Win + L (Windows) atau Control + Command + Q (macOS) setiap kali meninggalkan meja, bahkan untuk satu menit.',
          'Aktifkan penguncian layar otomatis (idle lock) maksimal lima menit tanpa aktivitas.',
          'Tolak mencolokkan flashdisk temuan, suvenir tak jelas, atau USB pribadi yang belum dipindai ke slot USB laptop kerja.',
          'Gunakan repositori atau cloud internal terotorisasi untuk bertukar file antar-rekan tim SaaS.'
        ]
      }
    ],
    analogy: {
      title: 'Brankas Beton di Rumah dengan Pintu yang Selalu Dikunci',
      body: 'Laptop kerja Anda ibarat rumah penyimpan berkas nasabah. Memasang software bajakan sama seperti membiarkan tukang kunci palsu menggandakan kunci seluruh kamar, sedangkan BitLocker adalah brankas beton agar isi berkas tetap tak terbaca meski laptop dicuri. Menekan Win + L setiap berdiri sama seperti mengunci pintu depan saat keluar sebentar, dan menolak USB asing berarti tidak menancapkan kunci misterius dari trotoar ke pintu rumah.'
    },
    sasCases: [
      {
        title: '[Ilustrasi Skenario] Aktivator Office Bajakan Mencuri Sesi VPN dan Browser',
        context:
          'Setelah memasang ulang sistem operasi laptop kerjanya pada akhir pekan, seorang staf teknis mengunduh aktivator Office dari blog acak agar segera bisa membuka dokumen spesifikasi SaaSCore.',
        whatHappened:
          'Sesuai panduan di situs tersebut, ia mematikan Windows Defender sementara. Tidak muncul pesan error dan Office berjalan normal, namun infostealer di balik aktivator diam-diam menyalin cookie sesi browser, token repositori, dan profil VPN uji klien BPR ke server penyerang.',
        lesson:
          'Alasan kepraktisan sesaat memakai software bajakan bisa menyerahkan seluruh kunci akses kerja. Gunakan lisensi resmi perusahaan dan jangan pernah menonaktifkan perlindungan antivirus.'
      },
      {
        title: '[Ilustrasi Skenario] Tas Laptop Hilang di Perjalanan Pulang dari BPR Mitra',
        context:
          'Seorang implementator SaaSCore menaruh tas laptopnya di rak bagasi kereta api saat perjalanan kembali ke kantor pusat setelah pendampingan go-live.',
        whatHappened:
          'Saat kereta tiba di stasiun tujuan, tas tersebut raib. Karena laptop kerja sudah dilindungi BitLocker sejak penyerahan awal, pelaku tidak dapat membaca partisi SSD, sementara tim IT langsung mencabut sertifikat VPN dan merotasi seluruh kredensial akun terkait.',
        lesson:
          'Enkripsi disk penuh mengubah insiden hilangnya perangkat menjadi kejadian yang risikonya terkendali dan tidak berujung kebocoran data nasabah.'
      }
    ],
    doDont: [
      {
        doIt: 'Gunakan hanya aplikasi berlisensi resmi SaaS atau software open-source dari situs pengembang aslinya.',
        dontIt: 'Memasang software bajakan, crack, keygen, atau aktivator ilegal di laptop kerja.',
        why: 'Paket bajakan sering disisipi infostealer pencuri cookie sesi browser, password, dan profil VPN.'
      },
      {
        doIt: 'Lakukan update OS dan browser secara rutin segera setelah pembaruan keamanan dirilis.',
        dontIt: 'Menunda restart pembaruan keamanan berminggu-minggu demi menghindari jeda kerja sebentar.',
        why: 'Celah keamanan yang sudah diumumkan tambalannya langsung diburu secara otomatis oleh penyerang.'
      },
      {
        doIt: 'Pastikan BitLocker atau FileVault aktif dan simpan Recovery Key di tempat resmi yang terpisah.',
        dontIt: 'Membiarkan disk laptop tidak terenkripsi atau menaruh kunci pemulihan di Desktop laptop.',
        why: 'Tanpa enkripsi disk penuh, isi SSD dapat dibaca langsung lewat Live USB atau dilepas ke komputer lain.'
      },
      {
        doIt: 'Tekan Win + L (atau Ctrl + Cmd + Q) setiap kali bangkit dari kursi dan aktifkan auto-lock maksimal 5 menit.',
        dontIt: 'Meninggalkan sesi SaaSCore atau portal admin terbuka saat ke toilet atau berdiskusi di ruangan lain.',
        why: 'Beberapa detik tanpa pengawasan cukup bagi pihak tak berhak untuk melihat atau menyalin data di layar.'
      },
      {
        doIt: 'Bertukar berkas kerja melalui kanal internal resmi dan gunakan adaptor dinding untuk mengisi daya ponsel.',
        dontIt: 'Mencolokkan flashdisk temuan, hadiah tak dikenal, atau media USB eksternal sembarangan ke laptop kerja.',
        why: 'Perangkat USB asing berisiko membawa malware maupun serangan BadUSB yang mengetikkan perintah otomatis.'
      }
    ],
    keyTakeaways: [
      'Software bajakan adalah pembawa utama infostealer yang mencuri sesi aktif browser, kata sandi, dan konfigurasi VPN.',
      'Pembaruan OS dan browser tepat waktu serta UAC aktif menutup celah eksploitasi paling umum.',
      'BitLocker atau FileVault melindungi data SSD secara penuh apabila laptop hilang atau dicuri.',
      'Kebiasaan Win + L dan larangan USB tak dikenal mencegah kompromi cepat melalui akses fisik.'
    ],
    instructorGuide: {
      durationMinutes: 40,
      talkingPoints: [
        'Buka diskusi dengan menjelaskan kenapa infostealer jauh lebih berbahaya dibanding virus lama karena targetnya langsung cookie sesi MFA dan file .ovpn.',
        'Minta seluruh peserta mengecek cepat apakah BitLocker/FileVault di laptop masing-masing saat ini sudah menyala.',
        'Peragakan betapa cepatnya skenario BadUSB bekerja saat colok flashdisk agar aturan larangan USB asing terasa nyata.'
      ],
      discussionPrompt:
        'Apa aplikasi utilitas gratis atau bajakan yang paling sering dicari tim IT saat baru menerima laptop, dan alternatif resmi apa yang aman dipakai di PT. Sigit Adi Aman Siber?'
    },
    lab: {
      title: 'Lab 06: Audit Mandiri Kesehatan Laptop Kerja',
      summary:
        'Eksplorasi kondisi kesiapan endpoint kerja meliputi pemeriksaan enkripsi disk, status patching OS dan browser, identifikasi risiko software tidak resmi, serta kebiasaan layar kunci dan USB.',
      }
  },
  {
    id: 7,
    slug: 'network-safe-internet',
    session: 'siang',
    timeSlot: '13.40 - 14.20',
    title: 'Modul 07: Network Security dan Safe Internet Practices',
    tagline:
      'Mengamankan jalur koneksi kerja saat di kantor maupun perjalanan dinas melalui kewaspadaan Wi-Fi publik, disiplin VPN klien BPR, validasi HTTPS, dan kontrol ekstensi browser.',
    objectives: [
      'Mengenali risiko Wi-Fi publik dan serangan Evil Twin Attack saat bertugas di luar kantor.',
      'Menerapkan aturan penggunaan VPN klien BPR secara terbatas sesuai jadwal tiket dan langsung memutusnya setelah selesai.',
      'Memvalidasi koneksi SSL/TLS (HTTPS) serta membaca struktur domain untuk mendeteksi subdomain spoofing dan typosquatting.',
      'Mengevaluasi izin akses ekstensi browser guna mencegah kebocoran sesi melalui ekstensi berlebihan.'
    ],
    workflowDiagram: {
      title: 'Alur Koneksi Jaringan & Browsing Lapangan',
      subtitle:
        'Mengamankan koneksi saat pendampingan BPR di luar kantor dari Evil Twin, subdomain spoofing, dan ekstensi browser berisiko.',
      steps: [
        {
          step: 1,
          title: 'Pilih Jaringan Aman',
          action: 'Prioritaskan tethering hotspot pribadi WPA2/WPA3 dan matikan Auto-Connect Wi-Fi publik.',
          tag: 'Peran: Tim Lapangan',
        },
        {
          step: 2,
          title: 'Validasi HTTPS & Domain',
          action: 'Cek ikon HTTPS sekaligus pastikan domain utama di sebelah kiri garis miring pertama benar-benar resmi.',
          tag: 'Gate: Kanan ke Kiri',
        },
        {
          step: 3,
          title: 'Isolasi Profil Browser',
          action: 'Pisahkan profil browser kerja SaaSCore dari profil pribadi dan audit izin ekstensi browser.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 4,
          title: 'VPN Sesuai Tiket',
          action: 'Nyalakan VPN klien BPR hanya selama sesi maintenance atau investigasi resmi berlangsung.',
          tag: 'Gate: Terotorisasi',
        },
        {
          step: 5,
          title: 'Putus Segera',
          action: 'Klik Disconnect VPN klien seketika setelah pekerjaan di server BPR tuntas.',
          tag: 'Gate: Selesai Tugas',
        },
      ],
    },
    sections: [
      {
        heading: 'Risiko Wi-Fi Publik dan Serangan Evil Twin',
        paragraphs: [
          'Saat melakukan pendampingan SaaSCore ke BPR luar kota, staf sering bekerja dari hotel, kafe, atau bandara. Jaringan Wi-Fi umum bersifat tidak tepercaya karena berbagi segmen jaringan dengan orang asing dan rentan terhadap serangan Evil Twin, yaitu pemancar palsu yang meniru nama Wi-Fi resmi (misalnya Hotel_Guest_WiFi) untuk memancing login palsu atau menyadap lalu lintas.'
        ],
        bullets: [
          'Untuk akses sistem SaaS atau server BPR di luar kantor, prioritaskan tethering hotspot ponsel pribadi dengan sandi WPA2/WPA3.',
          'Matikan opsi Auto-Connect pada Wi-Fi publik agar laptop tidak tersambung diam-diam ke SSID tiruan.',
          'Jika terpaksa memakai Wi-Fi publik untuk riset umum, hindari login akun sensitif tanpa tunnel VPN yang sah.'
        ]
      },
      {
        heading: 'Aturan Disiplin Penggunaan VPN Klien BPR',
        paragraphs: [
          'VPN klien BPR menghubungkan laptop Anda langsung ke dalam lingkar jaringan internal bank untuk pemeliharaan SaaSCore. Membiarkan VPN tetap menyala di luar jam tugas atau memakainya sambil berselancar bebas dapat menjadikan laptop Anda jembatan risiko menuju infrastruktur bank.'
        ],
        bullets: [
          'Nyalakan VPN klien BPR hanya selama sesi pekerjaan terotorisasi sesuai tiket atau surat tugas berlangsung.',
          'Segera tekan Disconnect begitu pengecekan atau pemeliharaan server BPR selesai dilakukan.',
          'Dilarang membuka situs pribadi, streaming, atau mengunduh berkas non-kerja selama VPN klien BPR masih aktif.',
          'Jangan pernah meminjamkan atau menggandakan profil maupun sertifikat VPN ke perangkat rekan lain.'
        ]
      },
      {
        heading: 'Validasi HTTPS, Struktur Domain, dan Subdomain Spoofing',
        paragraphs: [
          'Awalan https:// dengan protokol SSL/TLS hanya menandakan jalur antara browser dan server terenkripsi, bukan bukti bahwa situs tersebut resmi karena situs phishing pun dapat memakai sertifikat HTTPS gratis. Penentu identitas pemilik asli berada pada domain utama tepat di sebelah kiri garis miring pertama jalur URL.'
        ],
        bullets: [
          'Baca domain dari kanan ke kiri sebelum garis miring pertama (/): pada portal.sigitadi.id.cek-sesi.com, pemilik aslinya adalah cek-sesi.com.',
          'Waspadai typosquatting (salah ketik mirip seperti sigitad1.id) dan huruf pengecoh pada tautan login.',
          'Jangan abaikan peringatan sertifikat tidak valid (NET::ERR_CERT_AUTHORITY_INVALID) dengan menekan tombol lanjut secara paksa.'
        ]
      },
      {
        heading: 'Bahaya Ekstensi Browser Berlebihan dan Extension Takeover',
        paragraphs: [
          'Ekstensi browser gratis seperti pengunduh media, tema, atau pemblokir iklan tak dikenal sering meminta izin membaca seluruh data di semua situs web. Izin seluas ini memungkinkan ekstensi browser membaca password, token sesi dasbor SaaSCore, hingga risiko extension takeover ketika ekstensi lama dibeli pihak jahat dan didorong pembaruan berbahaya.'
        ],
        bullets: [
          'Pasang hanya ekstensi browser kerja yang esensial dan telah diverifikasi keamanannya.',
          'Audit izin ekstensi browser secara berkala dan ubah akses situs menjadi "On click" atau "On specific sites" bila tersedia.',
          'Pisahkan profil browser khusus kerja dari profil browser pribadi agar data sesi perusahaan tetap terisolasi.'
        ]
      }
    ],
    analogy: {
      title: 'Memeriksa Alamat Sertifikat Gedung di Balik Spanduk Teras',
      body: 'Membuka situs hanya karena melihat gembok HTTPS tanpa membaca domain utamanya ibarat masuk ke bilik transaksi tertutup yang rapi hanya karena melihat spanduk "RESMI" di pagar depan. Gembok HTTPS hanya menjamin percakapan Anda tidak didengar orang luar bilik, tetapi struktur domain di sebelah kanan-lah yang memastikan gedung tersebut benar-benar milik bank asli dan bukan penipu.'
    },
    sasCases: [
      {
        title: '[Ilustrasi Skenario] Evil Twin Wi-Fi Hotel Menjebak dengan Halaman Verifikasi Palsu',
        context:
          'Seorang engineer SaaSCore menginap di hotel dekat kantor BPR mitra dan menyalakan Wi-Fi laptop untuk membaca catatan rilis terbaru.',
        whatHappened:
          'Laptop otomatis tersambung ke SSID terbuka bernama "GrandHotel_5G" dan langsung memunculkan jendela pop-up meminta login akun email kantor agar internet aktif. Curiga karena hotel biasanya hanya meminta nomor kamar, ia segera memutus Wi-Fi, mematikan auto-connect, dan beralih ke hotspot ponsel pribadinya.',
        lesson:
          'Mengenali perilaku ganjil captive portal dan memilih tethering pribadi saat di lapangan menggagalkan upaya pencurian akun lewat Evil Twin.'
      },
      {
        title: '[Ilustrasi Skenario] Subdomain Spoofing pada Tautan Pembaruan Akses',
        context:
          'Seorang staf QA menerima tautan verifikasi akun menuju alamat https://login.sigitadi.id.portal-validasi-akses.com/session.',
        whatHappened:
          'Sekilas terlihat nama sigitadi.id di bagian depan URL sehingga tampak meyakinkan. Sebelum mengisi kredensial, ia memeriksa bagian paling kanan sebelum garis miring pertama dan menyadari domain aslinya adalah portal-validasi-akses.com, lalu segera melaporkannya ke tim keamanan.',
        lesson:
          'Kebiasaan membaca domain utama dari kanan ke kiri sebelum garis miring pertama merupakan pertahanan cepat terhadap subdomain spoofing.'
      }
    ],
    doDont: [
      {
        doIt: 'Gunakan tethering hotspot ponsel pribadi berpassword WPA2/WPA3 untuk pekerjaan sensitif di luar kantor.',
        dontIt: 'Mengakses server BPR atau sistem internal SaaS langsung melalui Wi-Fi gratis di kafe atau lobi hotel.',
        why: 'Jaringan publik rentan penyadapan serta jebakan Evil Twin yang meniru nama Wi-Fi resmi.'
      },
      {
        doIt: 'Matikan fitur Auto-Connect Wi-Fi publik pada pengaturan jaringan laptop.',
        dontIt: 'Membiarkan laptop tersambung otomatis ke SSID terbuka yang namanya pernah tersimpan.',
        why: 'Penyerang dapat menyiarkan ulang SSID populer untuk menyambungkan laptop korban tanpa klik.'
      },
      {
        doIt: 'Aktifkan VPN klien BPR hanya saat mengerjakan tiket resmi dan segera putuskan setelah tuntas.',
        dontIt: 'Membiarkan VPN BPR menyala seharian sambil membuka situs hiburan atau mengunduh file pribadi.',
        why: 'Koneksi VPN yang terus aktif memperlebar jalur risiko dari laptop ke jaringan internal bank.'
      },
      {
        doIt: 'Validasi domain utama di sebelah kanan sebelum garis miring pertama selain memeriksa ikon HTTPS.',
        dontIt: 'Langsung login hanya karena melihat ikon gembok HTTPS dan nama sigitadi.id di awal alamat URL.',
        why: 'Sertifikat HTTPS bisa dipakai situs phishing dan subdomain palsu dapat menaruh nama resmi di depan.'
      },
      {
        doIt: 'Gunakan ekstensi browser seminimal mungkin dan pisahkan profil browser kerja dari profil pribadi.',
        dontIt: 'Memasang ekstensi browser acak dengan izin membaca semua website di browser yang dipakai membuka dasbor SaaSCore.',
        why: 'Ekstensi browser berizin luas dapat membaca input sensitif dan rentan disusupi lewat pembaruan pihak ketiga.'
      }
    ],
    keyTakeaways: [
      'Prioritaskan hotspot seluler pribadi dibanding Wi-Fi publik dan matikan auto-connect untuk mencegah Evil Twin Attack.',
      'VPN klien BPR bersifat sementara sesuai tiket; nyalakan saat perlu dan langsung matikan saat pekerjaan selesai.',
      'HTTPS mengenkripsi jalur, tetapi pemeriksaan domain utama adalah penentu keaslian situs.',
      'Batasi ekstensi browser dan pisahkan profil kerja guna menjaga keamanan sesi web.'
    ],
    instructorGuide: {
      durationMinutes: 40,
      talkingPoints: [
        'Luruskan mitos umum bahwa gembok HTTPS berarti situs dijamin asli dan aman dari phishing.',
        'Latih peserta membaca anatomi URL dari kanan ke kiri sebelum garis miring pertama menggunakan contoh subdomain spoofing.',
        'Tegaskan aturan lapangan: satu sesi VPN untuk satu tiket BPR, selesai kerja langsung disconnect.'
      ],
      discussionPrompt:
        'Saat Anda menginap di hotel di daerah dengan sinyal seluler lemah dan hanya Wi-Fi hotel yang stabil, urutan langkah aman apa yang harus Anda pastikan sebelum mengakses server uji BPR?'
    },
    lab: {
      title: 'Lab 07: Inspeksi URL & Struktur Domain',
      summary:
        'Eksplorasi berbagai contoh URL nyata dan pengecoh, membedakan subdomain sah dari subdomain spoofing, mengevaluasi status HTTPS serta izin ekstensi browser, dan memilih langkah jaringan lapangan yang aman.',
      }
  }
];
