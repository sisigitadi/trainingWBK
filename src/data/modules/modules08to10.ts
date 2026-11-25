import type { ModuleContent } from '../../types/training';

export const modules08to10: ModuleContent[] = [
  {
    id: 8,
    slug: 'incident-response-reporting',
    session: 'siang',
    timeSlot: '14.20 - 14.55',
    title: 'Modul 08: Cybersecurity Incident Response dan Reporting',
    tagline:
      'Bertindak cepat dan terstruktur pada lima menit pertama saat insiden siber terjadi untuk melindungi SaaS dan BPR klien.',
    objectives: [
      'Mengenali gejala awal kompromi (Indicator of Compromise) pada laptop kerja, email sigitadi.id, dan akses VPN klien.',
      'Menjalankan protokol lima menit pertama (Isolate, Preserve, Report) tanpa merusak bukti digital.',
      'Memahami alasan teknis mengapa laptop terinfeksi tidak boleh langsung di-restart atau dibersihkan sendiri.',
      'Menerapkan budaya no-blame reporting dengan melapor cepat sebelum dampak meluas ke server SaaSCore.'
    ],
    workflowDiagram: {
      title: 'Protokol Tanggap Insiden 5 Menit Pertama',
      subtitle:
        'Menahan penyebaran kompromi perangkat sebelum menjalar ke email sigitadi.id dan jaringan BPR klien.',
      steps: [
        {
          step: 1,
          title: 'Deteksi Gejala IoC',
          action: 'Waspadai kipas CPU tinggi mendadak, kilatan PowerShell, ekstensi browser asing, atau MFA tak dikenal.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 2,
          title: 'Isolate Jaringan',
          action: 'Matikan Wi-Fi, cabut kabel LAN, dan putuskan VPN klien BPR seketika.',
          tag: 'Gate: Detik Pertama',
        },
        {
          step: 3,
          title: 'Preserve Bukti',
          action: 'Biarkan laptop menyala offline agar memori RAM utuh, lalu foto layar dan catat waktu kejadian.',
          tag: 'Gate: Jangan Restart',
        },
        {
          step: 4,
          title: 'Report < 5 Menit',
          action: 'Hubungi tim IT Security SaaS lewat kanal resmi dengan kronologi jujur dalam budaya no-blame.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 5,
          title: 'Rotasi dari Perangkat Bersih',
          action: 'Ganti passphrase dan cabut sesi token aktif hanya dari perangkat lain yang dipastikan aman.',
          tag: 'Peran: Security / Korban',
        },
      ],
    },
    sections: [
      {
        heading: 'Mengenali Gejala Awal Kompromi Laptop dan Akun',
        paragraphs: [
          'Serangan terhadap vendor perbankan seperti PT. Sigit Adi Aman Siber (SaaS) umumnya berjalan senyap agar penyerang bisa mencuri token VPN atau kredensial SaaSCore tanpa terdeteksi. Mengenali gejala awal atau Indicator of Compromise (IoC) pada perangkat kerja menjadi garis pertahanan pertama sebelum akses melebar ke jaringan BPR.'
        ],
        bullets: [
          'Lonjakan CPU dan kipas laptop secara tiba-tiba saat tidak ada proses berat atau query database.',
          'Jendela terminal atau PowerShell berkedip terbuka lalu hilang, atau aplikasi remote aktif tanpa izin.',
          'Notifikasi persetujuan MFA muncul mendadak di ponsel padahal Anda tidak sedang login.',
          'Ekstensi browser asing terpasang sendiri atau folder kerja tiba-tiba terkunci dengan catatan tebusan.'
        ]
      },
      {
        heading: 'Protokol 5 Menit Pertama: Isolate, Preserve, Report',
        paragraphs: [
          'Lima menit pertama setelah salah klik tautan berbahaya atau melihat anomali adalah jendela waktu paling kritis untuk menahan penyebaran serangan. Alih-alih panik atau bertanya di grup chat umum, ikuti protokol baku SaaS: Isolate, Preserve, dan Report.'
        ],
        bullets: [
          'Isolate: Putuskan Wi-Fi, cabut kabel LAN, dan matikan koneksi VPN klien BPR seketika.',
          'Preserve: Biarkan laptop tetap menyala dalam mode offline, foto layar yang mencurigakan, dan catat jam kejadian.',
          'Report: Hubungi tim IT Security atau Lead operasional lewat jalur resmi dengan kronologi singkat dan jujur.'
        ]
      },
      {
        heading: 'Mengapa Tidak Langsung Restart atau Hapus Jejak?',
        paragraphs: [
          'Mematikan paksa laptop atau menjalankan aplikasi pembersih disk saat panik justru menghancurkan bukti di memori sementara (RAM). Tim keamanan membutuhkan data di memori RAM tersebut untuk melakukan forensic triage, menentukan apakah kredensial SaaSCore bocor, dan melakukan rotasi kredensial secara tepat sasaran.'
        ],
        bullets: [
          'Isi memori RAM (proses malware dan koneksi IP penyerang) hilang seketika saat laptop di-restart.',
          'Riwayat browser dan log lokal membantu melacak file atau URL pemicu kompromi.',
          'Jika perlu mengganti password segera, lakukan dari ponsel atau perangkat lain yang dipastikan bersih.'
        ]
      },
      {
        heading: 'Budaya Lapor Cepat Tanpa Takut Disalahkan (No-Blame Reporting)',
        paragraphs: [
          'Rasa takut dimarahi sering membuat staf menyembunyikan salah klik hingga berjam-jam, memberi waktu bagi penyerang untuk masuk ke lingkungan BPR. SaaS menerapkan prinsip no-blame reporting: pelapor yang cepat dan jujur dilindungi serta diapresiasi karena membantu menghentikan insiden lebih awal.'
        ],
        bullets: [
          'Pelaporan dalam 5 menit memungkinkan pencabutan sesi VPN dan reset akses sebelum disalahgunakan.',
          'Evaluasi pasca-insiden fokus pada perbaikan kontrol teknis, bukan menghukum kesalahan manusia yang jujur.',
          'Sertakan daftar akun klien dan akses aktif saat melapor agar tim dapat langsung memantau log server.'
        ]
      }
    ],
    analogy: {
      title: 'Analogi Kebocoran Gas di Dapur Kantor',
      body: 'Saat mencium bau gas bocor di dapur, Anda langsung menutup katup regulator (Isolate), tidak mengutak-atik sakelar listrik sambil membiarkan posisi kebocoran terlihat (Preserve), lalu segera memanggil petugas gedung (Report). Menunda melapor karena takut ditegur justru berisiko membakar seluruh ruangan.'
    },
    sasCases: [
      {
        title: '[Ilustrasi Skenario] Implementor Mengklik Lampiran Palsu Sebelum Maintenance BPR',
        context:
          'Seorang implementor SaaS menerima email tagihan perjalanan dinas palsu berisi file ZIP berpassword menjelang jadwal maintenance SaaSCore.',
        whatHappened:
          'Saat file dijalankan, jendela PowerShell berkedip singkat. Ia langsung mematikan Wi-Fi, tidak me-restart laptop, memotret layar, dan menelepon tim IT Security dalam empat menit.',
        lesson:
          'Respon cepat memungkinkan tim mencabut sesi VPN dan melakukan rotasi kredensial sebelum data keluar dari perangkat, sehingga server BPR tetap aman.'
      },
      {
        title: '[Ilustrasi Skenario] Menunda Laporan Notifikasi MFA Misterius di Malam Hari',
        context:
          'Staf support menerima tiga permintaan persetujuan MFA pada malam hari ketika laptop kerjanya sudah mati.',
        whatHappened:
          'Ia menekan tombol tolak lalu tidur dengan rencana melapor besok siang. Keesokan paginya ditemukan upaya login berulang memakai token sesi lama pada portal proyek.',
        lesson:
          'Munculnya prompt MFA tanpa aktivitas login membuktikan password sudah bocor dan wajib dilaporkan malam itu juga untuk reset akses segera.'
      }
    ],
    doDont: [
      {
        doIt: 'Putuskan Wi-Fi, kabel LAN, dan VPN klien BPR dalam hitungan detik saat gejala kompromi muncul.',
        dontIt: 'Membiarkan laptop tetap online sambil mencari tahu sendiri penyebab anomali.',
        why: 'Jaringan yang masih terhubung memberi jalan bagi malware mengirim data keluar atau menjalar ke server BPR.'
      },
      {
        doIt: 'Biarkan laptop menyala secara offline dan foto layar untuk dokumentasi awal.',
        dontIt: 'Langsung melakukan restart paksa, shutdown, atau membersihkan riwayat browser.',
        why: 'Restart menghapus bukti di memori RAM (volatile) yang dibutuhkan untuk forensic triage.'
      },
      {
        doIt: 'Laporkan salah klik atau anomali dalam 5 menit pertama lewat jalur darurat resmi SaaS.',
        dontIt: 'Menyembunyikan insiden hingga keesokan hari karena takut disalahkan atasan.',
        why: 'Penundaan memperbesar dampak ke klien; budaya no-blame melindungi pelapor yang jujur dan cepat.'
      },
      {
        doIt: 'Gunakan perangkat lain yang bersih untuk melaporkan insiden dan mengganti password.',
        dontIt: 'Mengetikkan password baru email sigitadi.id atau VPN dari laptop yang dicurigai terinfeksi.',
        why: 'Keylogger atau pencuri sesi di perangkat terkompromi akan langsung merekam kata sandi baru tersebut.'
      },
      {
        doIt: 'Laporkan setiap notifikasi MFA tak dikenal meski sudah Anda tekan Tolak (Deny).',
        dontIt: 'Mengabaikan prompt MFA misterius karena mengira penolakan saja sudah cukup aman.',
        why: 'Prompt MFA tak diminta menandakan password utama sudah diketahui pihak lain dan perlu rotasi kredensial.'
      }
    ],
    keyTakeaways: [
      'Waspadai gejala dini kompromi seperti lonjakan CPU, kilatan terminal, ekstensi browser asing, dan prompt MFA tak dikenal.',
      'Jalankan urutan 5 menit pertama: Isolate (putus jaringan), Preserve (tahan perangkat tetap menyala offline), dan Report (lapor resmi).',
      'Jangan pernah me-restart paksa atau mengganti password dari laptop yang sedang dicurigai terinfeksi.',
      'Budaya no-blame reporting menjadikan staf yang melapor cepat sebagai penyelamat operasional SaaS dan BPR.'
    ],
    instructorGuide: {
      durationMinutes: 35,
      talkingPoints: [
        'Tunjukkan contoh gejala kompromi nyata yang sering dianggap sepele (kilatan CMD dan prompt MFA malam hari).',
        'Tekankan urutan Isolate-Preserve-Report dan jelaskan secara sederhana mengapa tidak boleh langsung shutdown.',
        'Tegaskan komitmen manajemen PT. Sigit Adi Aman Siber terhadap no-blame reporting untuk kesalahan tidak disengaja.'
      ],
      discussionPrompt:
        'Jika pukul 21.00 WIB Anda sadar baru saja memasukkan password sigitadi.id di situs palsu saat VPN BPR menyala, apa 3 hal pertama yang Anda lakukan secara berurutan?'
    },
    lab: {
      title: 'Lab 08: Simulator Krisis Tanggap Darurat',
      summary:
        'Eksplorasi kondisi aman dan berisiko pada skenario krisis 5 menit pertama ketika laptop kerja menunjukkan gejala kompromi saat terhubung ke BPR.'
    }
  },
  {
    id: 9,
    slug: 'email-cloud-communication',
    session: 'siang',
    timeSlot: '14.55 - 15.30',
    title: 'Modul 09: Email, Cloud, dan Digital Communication Security',
    tagline:
      'Mengamankan email korporat, hak akses cloud, serta percakapan grup tim agar kredensial SaaSCore dan data pribadi nasabah BPR tidak bocor.',
    objectives: [
      'Memahami risiko kebocoran dari tautan publik ("Anyone with the link") pada Google Drive dan OneDrive.',
      'Mengonfigurasi izin berbagi dokumen cloud berbasis prinsip least privilege dan batas waktu akses.',
      'Menerapkan larangan mengirim IP server, kredensial, dan screenshot data nasabah BPR di WhatsApp atau Telegram.',
      'Menggunakan jalur terpisah (out-of-band), redaction, dan pemeriksaan penerima email secara disiplin.'
    ],
    workflowDiagram: {
      title: 'Alur Kolaborasi Cloud & Komunikasi Tim',
      subtitle:
        'Mencegah kebocoran kredensial SaaSCore dan data pribadi nasabah di Google Drive, OneDrive, email, dan chat grup.',
      steps: [
        {
          step: 1,
          title: 'Setel Cloud Restricted',
          action: 'Hindari Anyone with the link; batasi akses ke email spesifik dengan expiration date.',
          tag: 'Peran: Pemilik Folder',
        },
        {
          step: 2,
          title: 'Redaction Screenshot',
          action: 'Sensor nama, NIK, nomor rekening, dan saldo nasabah sebelum berbagi gambar error.',
          tag: 'Gate: Kepatuhan UU PDP',
        },
        {
          step: 3,
          title: 'Hindari Chat Kredensial',
          action: 'Jangan kirim IP server atau password di WhatsApp atau Telegram; pakai vault atau secret link.',
          tag: 'Gate: Tanpa IP/Password',
        },
        {
          step: 4,
          title: 'Cek Penerima Email',
          action: 'Verifikasi domain penerima 3 detik sebelum kirim dan gunakan BCC untuk siaran multi-BPR.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 5,
          title: 'Audit Pasca-UAT',
          action: 'Tinjau ulang dan cabut izin folder cloud eksternal segera setelah UAT berakhir.',
          tag: 'Gate: Proyek Selesai',
        },
      ],
    },
    sections: [
      {
        heading: 'Risiko Tautan Publik ("Anyone with the Link") di Cloud',
        paragraphs: [
          'Membagikan folder proyek dengan opsi "Anyone with the link" terasa praktis saat berkoordinasi dengan BPR, tetapi artinya siapa pun yang memperoleh URL tersebut dapat membukanya tanpa login. Tautan terbuka sangat mudah bocor lewat penerusan pesan, riwayat browser, atau tetap aktif berbulan-bulan setelah proyek selesai.'
        ],
        bullets: [
          'Setel akses ke mode Restricted dan cantumkan alamat email penerima secara spesifik (prinsip least privilege).',
          'Pasang tanggal kedaluwarsa (expiration date) untuk setiap akses dokumen eksternal.',
          'Nonaktifkan opsi download dan copy jika penerima eksternal cukup membaca secara daring.',
          'Lakukan audit izin folder proyek secara rutin begitu fase UAT atau implementasi selesai.'
        ]
      },
      {
        heading: 'Larangan Kredensial dan Data Nasabah di WhatsApp/Telegram',
        paragraphs: [
          'Mengirim pasangan IP server, username, dan password SaaSCore ke grup WhatsApp atau Telegram sama saja menyebar kredensial ke galeri ponsel dan backup cloud pribadi seluruh anggota grup. Selain itu, membagikan screenshot error yang masih menampilkan nama, NIK, atau saldo nasabah BPR melanggar perlindungan Data Pribadi (UU PDP).'
        ],
        bullets: [
          'Dilarang keras menulis IP/host server beserta username dan password dalam pesan chat atau grup mana pun.',
          'Dilarang mengirim screenshot data nasabah asli (NIK, rekening, saldo, mutasi) ke aplikasi chat.',
          'Lakukan penyamaran (redaction/blur) pada seluruh identitas nasabah sebelum membagikan tangkapan layar bug.',
          'Selalu logout dari WhatsApp Web setelah memakai komputer bersama dan aktifkan kunci aplikasi chat.'
        ]
      },
      {
        heading: 'Disiplin Email Bisnis dan Jalur Pengiriman Aman',
        paragraphs: [
          'Kesalahan memilih saran auto-complete pada aplikasi email dapat mengirim dokumen sensitif ke BPR lain atau alamat pribadi yang namanya mirip. Untuk siaran ke banyak klien sekaligus, mencantumkan semua email di kolom To atau CC membuka daftar klien SaaS serta memicu risiko Reply All.'
        ],
        bullets: [
          'Periksa ulang alamat lengkap dan domain penerima selama tiga detik sebelum menekan tombol Send.',
          'Gunakan kolom BCC atau kirim email terpisah saat menghubungi beberapa BPR klien secara bersamaan.',
          'Enkripsi lampiran sensitif dan kirimkan kata sandi pembukanya via jalur berbeda (Out-of-Band Delivery).',
          'Gunakan brankas kredensial resmi atau secret link sekali baca untuk berbagi password sementara.'
        ]
      }
    ],
    analogy: {
      title: 'Analogi Papan Pengumuman Pos Satpam vs Amplop Tersegel',
      body: 'Memasang tautan "Anyone with the link" atau mengirim password di grup chat seperti menempelkan kunci brankas di papan pengumuman pos satpam. Berbagi berbasis akun email spesifik dan pengiriman password terpisah seperti menyerahkan amplop tersegel hanya kepada penerima yang terverifikasi.'
    },
    sasCases: [
      {
        title: '[Ilustrasi Skenario] Folder UAT SaaSCore Masih Terbuka Publik Pasca-Proyek',
        context:
          'Menjelang UAT, staf membagikan folder panduan dan konfigurasi uji di Google Drive dengan izin "Anyone with the link" agar pihak BPR mudah mengunduh.',
        whatHappened:
          'Dua bulan setelah UAT selesai, tautan tersebut ditemukan masih dapat dibuka oleh akun Gmail pribadi tanpa autentikasi sigitadi.id.',
        lesson:
          'Dokumen teknis proyek wajib memakai mode Restricted dengan batas waktu akses dan dicabut segera setelah UAT tuntas.'
      },
      {
        title: '[Ilustrasi Skenario] Screenshot Error Database Nasabah Dibagikan di Grup WhatsApp',
        context:
          'Saat gangguan proses akhir hari (EOD) di BPR, staf memotret layar error database SaaSCore yang menampilkan nama dan saldo nasabah lalu mengirimnya ke grup WhatsApp bersama password akses darurat.',
        whatHappened:
          'Gambar dan kredensial tersebut otomatis tersinkron ke cloud pribadi anggota grup dan tertinggal meski salah satu staf kemudian pindah kerja.',
        lesson:
          'Identitas nasabah wajib disamarkan (redaction) dan kredensial tidak boleh masuk ke chat; gunakan vault resmi serta segera rotasi password darurat setelah EOD pulih.'
      }
    ],
    doDont: [
      {
        doIt: 'Setel folder cloud ke mode Restricted dan beri akses hanya ke alamat email yang berwenang.',
        dontIt: 'Memilih opsi "Anyone with the link" untuk dokumen konfigurasi, topologi, atau UAT BPR.',
        why: 'Tautan publik memungkinkan siapa saja mengakses isi folder tanpa login atau jejak audit akun.'
      },
      {
        doIt: 'Lakukan redaction (sensor/blur) pada nama, NIK, nomor rekening, dan saldo sebelum berbagi screenshot.',
        dontIt: 'Mengirim tangkapan layar aplikasi SaaSCore yang menampilkan data pribadi nasabah secara utuh.',
        why: 'Melindungi privasi nasabah sesuai perjanjian kerahasiaan dan ketentuan Data Pribadi / UU PDP.'
      },
      {
        doIt: 'Gunakan pengelola kredensial resmi atau secret link sekali pakai untuk berbagi password sementara.',
        dontIt: 'Mengetik IP server, username, dan password secara langsung di grup WhatsApp atau Telegram.',
        why: 'Riwayat chat tersimpan permanen di perangkat pribadi anggota grup dan rawan dicadangkan tanpa kontrol kantor.'
      },
      {
        doIt: 'Gunakan kolom BCC saat mengirim pengumuman teknis ke banyak BPR berbeda.',
        dontIt: 'Menaruh puluhan email pejabat BPR yang berbeda dalam kolom To atau CC.',
        why: 'Menjaga kerahasiaan daftar klien SaaS dan mencegah insiden Reply All lintas BPR.'
      },
      {
        doIt: 'Kirim file terenkripsi melalui email dan kirimkan password pembukanya lewat saluran berbeda.',
        dontIt: 'Menuliskan password pembuka ZIP/PDF di badan email yang sama dengan file lampiran.',
        why: 'Pemisahan jalur (Out-of-Band) memastikan penyerang yang menyadap email tidak langsung mendapat kuncinya.'
      }
    ],
    keyTakeaways: [
      'Hindari tautan publik ("Anyone with the link"); terapkan izin email spesifik, batas waktu, dan audit akses berkala.',
      'Dilarang keras mengirim IP server, kredensial, atau screenshot data nasabah asli melalui WhatsApp maupun Telegram.',
      'Selalu lakukan redaction pada data pribadi nasabah sebelum membagikan tangkapan layar kendala teknis.',
      'Periksa alamat penerima email dengan teliti, pakai BCC untuk siaran multi-BPR, dan pisahkan jalur pengiriman password.'
    ],
    instructorGuide: {
      durationMinutes: 35,
      talkingPoints: [
        'Tunjukkan perbedaan setting "Restricted" vs "Anyone with the link" di Google Drive/OneDrive secara singkat.',
        'Bahaskan risiko nyata grup WhatsApp proyek yang penuh screenshot error nasabah dan IP+password server.',
        'Perkenalkan kebiasaan sensor cepat (redaction) dan pengiriman kata sandi lewat vault/out-of-band.'
      ],
      discussionPrompt:
        'Saat BPR minta bantuan mendesak pukul 17.00 dan butuh screenshot error plus akun uji sementara, bagaimana cara mengirim keduanya dengan aman tanpa memperlambat penanganan?'
    },
    lab: {
      title: 'Lab 09: Konfigurasi Hak Akses Cloud & Audit Percakapan Grup',
      summary:
        'Eksplorasi pengaturan izin berbagi folder cloud yang aman dan audit kondisi aman vs berisiko pada percakapan grup teknis proyek.'
    }
  },
  {
    id: 10,
    slug: 'best-practices-security-culture',
    session: 'siang',
    timeSlot: '15.30 - 16.00',
    title: 'Modul 10: Cybersecurity Best Practices dan Security Awareness Culture',
    tagline:
      'Menyatukan seluruh materi ke dalam 7 Kebiasaan Emas Keamanan Siber SaaS dan membangun budaya kerja aman secara kolektif.',
    objectives: [
      'Memahami dan menginternalisasi 7 Kebiasaan Emas Keamanan Siber PT. Sigit Adi Aman Siber (SaaS).',
      'Menghubungkan peran Developer, Implementor, Support, QA, dan Infrastruktur dalam menjaga keamanan SaaSCore.',
      'Membangun budaya saling mengingatkan secara sehat dan suportif saat melihat potensi celah keamanan.',
      'Menyusun langkah aksi konkret 24 jam dan 7 hari pertama setelah BimTek selesai.'
    ],
    workflowDiagram: {
      title: 'Siklus Budaya Keamanan Harian SaaS',
      subtitle:
        'Mengubah 7 Kebiasaan Emas menjadi refleks kolektif lintas peran dalam menjaga kepercayaan BPR mitra.',
      steps: [
        {
          step: 1,
          title: '7 Kebiasaan Emas',
          action: 'Jalankan ketujuh standar harian secara konsisten bahkan saat tenggat go-live ketat.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 2,
          title: 'Akuntabilitas Lintas Peran',
          action: 'Terapkan data dummy, akun personal, disiplin VPN, dan access review berkala.',
          tag: 'Peran: Dev, QA, Support, Infra',
        },
        {
          step: 3,
          title: 'Saling Mengingatkan',
          action: 'Tegur rekan secara sopan dan pribadi saat melihat layar terbuka atau risiko pengiriman data.',
          tag: 'Gate: Konstruktif',
        },
        {
          step: 4,
          title: 'Jaga Budaya No-Blame',
          action: 'Apresiasi pelaporan dini agar kesalahan manusia terhenti sebelum berdampak ke BPR.',
          tag: 'Peran: Lead & Tim',
        },
        {
          step: 5,
          title: 'Audit Mandiri Berkala',
          action: 'Periksa MFA, BitLocker, folder Downloads, izin cloud, dan ekstensi browser secara rutin.',
          tag: 'Gate: Hari-1 / Mingguan / Bulanan',
        },
      ],
    },
    sections: [
      {
        heading: 'Dari Materi BimTek Menjadi Budaya Kerja Harian',
        paragraphs: [
          'Keamanan siber tidak cukup hanya dipahami dalam satu hari pelatihan; nilainya baru terasa saat menjadi kebiasaan otomatis ketika tim bekerja di bawah tekanan tenggat go-live BPR. Sebagai pengembang dan pengelola SaaSCore, kepercayaan seluruh klien perbankan bergantung pada konsistensi setiap individu di PT. Sigit Adi Aman Siber (SaaS).'
        ],
        bullets: [
          'Keamanan bukan hanya tugas tim IT Security, melainkan standar profesionalisme seluruh pegawai SaaS.',
          'Kondisi mendesak menjelang akhir bulan justru menjadi momen terpenting untuk tetap patuh prosedur.',
          'Budaya kerja aman (Security Culture) mengutamakan pencegahan sejak awal, bukan perbaikan setelah kebocoran.'
        ]
      },
      {
        heading: 'Rangkuman 7 Kebiasaan Emas Keamanan Siber SaaS',
        paragraphs: [
          'Seluruh materi dari Modul 1 hingga Modul 9 dirangkum menjadi 7 Kebiasaan Emas agar mudah diingat dan langsung dipraktikkan setiap hari. Ketujuh kebiasaan ini membentuk lapisan pertahanan berlapis (Defense in Depth) yang melindungi akun, perangkat, jaringan, dan data BPR klien.'
        ],
        bullets: [
          '1. Passphrase Unik & MFA: Gunakan passphrase minimal 16 karakter yang unik tiap akun serta wajib aktifkan MFA.',
          '2. Verifikasi Phishing & Domain sigitadi.id: Periksa pengirim utuh dan arahkan kursor ke URL sebelum klik atau login.',
          '3. Klasifikasi Data & Enkripsi Dump DB: Lindungi data klien dan enkripsi dump SaaSCore sebelum disimpan atau dikirim.',
          '4. Endpoint Bersih Tanpa Bajakan: Tolak software crack, rutin patch OS/browser, aktifkan BitLocker/FileVault, dan Win + L.',
          '5. Jaringan Aman & Disiplin VPN: Hindari Wi-Fi publik tanpa pelindung dan putuskan VPN klien segera setelah selesai.',
          '6. Komunikasi & Cloud Tertutup: Hindari "Anyone with the link" dan dilarang kirim IP, password, atau data nasabah di chat.',
          '7. Lapor Cepat 5 Menit Pertama: Terapkan Isolate-Preserve-Report tanpa takut disalahkan (no-blame reporting).'
        ]
      },
      {
        heading: 'Tanggung Jawab Kolektif Lintas Peran di SaaS',
        paragraphs: [
          'Setiap divisi di SaaS memegang mata rantai keamanan yang saling terhubung dalam layanan SaaSCore. Kebiasaan saling mengingatkan secara sopan saat ada rekan yang lupa mengunci layar atau hampir mengirim kredensial di chat akan memperkuat ketahanan tim secara bersama-sama.'
        ],
        bullets: [
          'Developer & QA: Tidak menaruh password di kode (hardcoded) dan memakai data anonymization saat pengujian.',
          'Implementor & Support: Memakai akun personal (bukan shared account) dan selalu memutus VPN klien usai sesi kerja.',
          'Infra & Tim Inti: Menjalankan access review rutin serta mencabut akses begitu proyek selesai atau staf berpindah tugas.'
        ]
      },
      {
        heading: 'Langkah Aksi Pribadi Setelah Pelatihan',
        paragraphs: [
          'Perubahan budaya selalu dimulai dari tindakan kecil pada perangkat dan akun kita masing-masing hari ini. Lakukan audit mandiri berkala agar celah lama dari proyek terdahulu tidak tertinggal menjadi pintu masuk serangan.'
        ],
        bullets: [
          'Hari ke-1: Verifikasi MFA di seluruh akun sigitadi.id, periksa password manager, dan biasakan Win + L.',
          'Minggu ke-1: Bersihkan folder cloud dari tautan publik lama, hapus dump DB kedaluwarsa, dan cek update OS/browser.',
          'Bulanan: Lakukan audit mandiri ekstensi browser dan izin akses dokumen proyek yang sudah selesai.'
        ]
      }
    ],
    analogy: {
      title: 'Analogi Daftar Periksa Keselamatan Kru Penerbangan',
      body: 'Pesawat terbang aman bukan hanya karena kecanggihan mesinnya, melainkan karena teknisi, pramugari, dan pilot menjalankan checklist yang sama dengan disiplin setiap hari. Di SaaS, 7 Kebiasaan Emas adalah checklist keselamatan harian agar setiap layanan SaaSCore mendarat aman di BPR.'
    },
    sasCases: [
      {
        title: '[Ilustrasi Skenario] Saling Mengingatkan Saat Tekanan Go-Live Akhir Bulan',
        context:
          'Menjelang go-live modul SaaSCore, seorang rekan tim hampir mengirim file konfigurasi database tanpa enkripsi ke grup WhatsApp agar lebih cepat dicek.',
        whatHappened:
          'Rekannya langsung mengingatkan secara sopan lewat telepon agar file ditaruh di folder cloud Restricted dan kata sandi dikirim terpisah. Proses tetap selesai tepat waktu tanpa risiko kebocoran.',
        lesson:
          'Kecepatan kerja dan keamanan dapat berjalan beriringan saat tim terbiasa saling mengingatkan dengan cara yang konstruktif.'
      },
      {
        title: '[Ilustrasi Skenario] Audit Mandiri Bulanan Menutup Celah Sisa Proyek BPR',
        context:
          'Setelah menyelesaikan pendampingan migrasi data di beberapa BPR, tim implementasi SaaS menjadwalkan sesi bersih-bersih digital selama 30 menit di akhir bulan.',
        whatHappened:
          'Tim menemukan sisa file backup sementara di folder Downloads, satu tautan folder UAT yang belum dicabut, dan akun uji coba staging yang masih aktif, lalu langsung membersihkannya.',
        lesson:
          'Audit mandiri berkala mencegah akumulasi sisa akses dan file proyek yang sering terlupakan setelah masa sibuk berakhir.'
      }
    ],
    doDont: [
      {
        doIt: 'Terapkan 7 Kebiasaan Emas secara konsisten baik saat kondisi santai maupun saat tenggat ketat.',
        dontIt: 'Memotong prosedur keamanan dengan alasan pekerjaan sedang darurat atau mendesak.',
        why: 'Kesalahan fatal dan serangan siber justru paling sering berhasil terjadi ketika tim sedang terburu-buru.'
      },
      {
        doIt: 'Ingatkan rekan secara sopan dan pribadi jika melihat layar ditinggal terbuka atau kebiasaan berisiko.',
        dontIt: 'Membiarkan celah keamanan di depan mata karena merasa sungkan atau bukan tugas divisi Anda.',
        why: 'Keamanan adalah tanggung jawab kolektif; satu perangkat yang bocor dapat berdampak ke seluruh tim.'
      },
      {
        doIt: 'Gunakan data dummy atau data yang sudah disamarkan (anonymized) untuk pengujian pengembangan.',
        dontIt: 'Memakai salinan database nasabah BPR asli di laptop kerja atau server uji terbuka.',
        why: 'Mengurangi paparan data pribadi asli meminimalkan risiko kebocoran di lingkungan pengembangan.'
      },
      {
        doIt: 'Lakukan pencabutan akses dan rotasi kredensial segera saat ada rotasi PIC BPR atau offboarding staf.',
        dontIt: 'Menggunakan akun admin bersama yang kata sandinya tidak pernah diganti meski anggota tim berubah.',
        why: 'Akun personal dan access review menjaga jejak audit tetap jelas serta menutup akses pihak yang sudah tidak bertugas.'
      },
      {
        doIt: 'Apresiasi rekan yang cepat dan jujur melapor ketika mengalami salah klik atau anomali keamanan.',
        dontIt: 'Menyalahkan atau menertawakan rekan yang melapor cepat saat terjadi kesalahan.',
        why: 'Dukungan sosial menjaga budaya no-blame tetap hidup sehingga insiden selalu terdeteksi sejak dini.'
      }
    ],
    keyTakeaways: [
      '7 Kebiasaan Emas Keamanan Siber SaaS menyatukan seluruh praktik inti mulai dari Passphrase & MFA hingga Lapor Cepat 5 Menit Pertama.',
      'Keamanan data nasabah BPR dan integritas SaaSCore adalah tanggung jawab kolektif lintas peran di PT. Sigit Adi Aman Siber.',
      'Budaya saling mengingatkan yang sehat dan no-blame reporting jauh lebih kuat daripada sekadar aturan tertulis.',
      'Mulai audit mandiri 24 jam pertama pada MFA, enkripsi disk, kebersihan software, serta izin folder cloud.'
    ],
    instructorGuide: {
      durationMinutes: 30,
      talkingPoints: [
        'Tinjau ulang 7 Kebiasaan Emas secara cepat dan kaitkan langsung dengan tantangan harian peserta di proyek SaaSCore.',
        'Dorong komitmen tim untuk saling mengingatkan secara suportif tanpa mempermalukan rekan kerja.',
        'Pandu kelas masuk ke Lab 10 sebagai simulasi diskusi kasus terpadu lintas modul tanpa tekanan nilai.'
      ],
      discussionPrompt:
        'Dari 7 Kebiasaan Emas Keamanan Siber SaaS, kebiasaan nomor berapa yang paling menantang diterapkan di tim Anda saat ini, dan satu perubahan kecil apa yang bisa dimulai besok pagi?'
    },
    lab: {
      title: 'Lab 10: Simulasi Diskusi Kasus Terpadu Lintas Modul',
      summary:
        'Eksplorasi 10 situasi insiden lintas modul secara interaktif untuk didiskusikan bersama di kelas tanpa sistem nilai atau batas lulus.'
    }
  }
];
