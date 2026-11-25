import type { ModuleContent } from '../../types/training';

export const modules01to04: ModuleContent[] = [
  {
    id: 1,
    slug: 'fundamental-security',
    session: 'pagi',
    timeSlot: '08.30 - 09.10',
    title: 'Modul 01: Fundamental IT Security dan Prinsip Cybersecurity',
    tagline:
      'Memahami bagaimana setiap konfigurasi, akses database, dan kebiasaan harian tim PT. Sigit Adi Aman Siber (SaaS) menjaga kepercayaan nasabah BPR pengguna SaaSCore.',
    objectives: [
      'Membedakan fokus IT Security operasional dan Cybersecurity di lingkungan vendor teknologi perbankan.',
      'Menguraikan tiga pilar segitiga CIA (Confidentiality, Integrity, Availability) pada layanan Core Banking System SaaSCore.',
      'Menjelaskan peran pegawai IT sebagai Human Firewall di garis pertahanan pertama layanan BPR.',
      'Mengklasifikasikan insiden teknis harian ke dalam dampak kerahasiaan, integritas, atau ketersediaan sistem.',
    ],
    workflowDiagram: {
      title: 'Alur Perubahan Aman di SaaSCore',
      subtitle:
        'Menjaga keseimbangan Confidentiality, Integrity, dan Availability setiap kali tim SaaS menangani permintaan klien BPR.',
      steps: [
        {
          step: 1,
          title: 'Tiket & Otorisasi',
          action: 'Terima tiket resmi dan pastikan persetujuan perubahan dari pihak BPR tercatat untuk Audit Trail.',
          tag: 'Gate: PIC BPR',
        },
        {
          step: 2,
          title: 'Uji Staging',
          action: 'Reproduksi bug dan uji skrip perbaikan di staging memakai data sintetis atau tersamarkan.',
          tag: 'Peran: Dev / Support',
        },
        {
          step: 3,
          title: 'Backup Pemulihan',
          action: 'Buat serta verifikasi titik pemulihan database sebelum menyentuh server produksi.',
          tag: 'Gate: Wajib',
        },
        {
          step: 4,
          title: 'Eksekusi Individual',
          action: 'Jalankan perubahan terotorisasi menggunakan akun personal, bukan akun admin bersama.',
          tag: 'Peran: Engineer',
        },
        {
          step: 5,
          title: 'Verifikasi CIA',
          action: 'Pastikan saldo akurat, data nasabah tertutup, dan modul teller maupun EOD berjalan normal.',
          tag: 'Gate: Layanan Siap',
        },
      ],
    },
    sections: [
      {
        heading: 'Keamanan Siber Dimulai dari Meja Kerja Vendor',
        paragraphs: [
          'PT. Sigit Adi Aman Siber (SaaS) mengemban kepercayaan tinggi sebagai pengembang dan pengelola Core Banking System SaaSCore untuk berbagai BPR dan lembaga keuangan mitra. Pelaku ancaman kerap mengincar vendor teknologi karena satu akses remote, skrip patch, atau perangkat kerja tim support yang lemah dapat menjadi jalan pintas menuju jaringan banyak bank sekaligus.',
        ],
        bullets: [
          'Kredensial VPN, SSH, dan RDP menuju server BPR mitra merupakan aset kritikal di laptop tim support.',
          'Kode sumber, skrip migrasi, dan paket pembaruan SaaSCore harus terjaga keasliannya sebelum dikirim ke klien.',
          'Salinan database uji coba maupun log transaksi tetap berpotensi memuat jejak informasi sensitif nasabah.',
        ],
      },
      {
        heading: 'Segitiga CIA dalam Operasional SaaSCore',
        paragraphs: [
          'Seluruh kontrol keamanan informasi bertumpu pada tiga pilar segitiga CIA: Confidentiality (kerahasiaan), Integrity (integritas), dan Availability (ketersediaan). Di lingkungan perbankan berbasis SaaSCore, gangguan pada salah satu pilar langsung berdampak pada kepercayaan nasabah, keakuratan pembukuan BPR, dan kepatuhan regulasi.',
        ],
        bullets: [
          'Confidentiality: Melindungi CIF (Customer Information File), NIK, nomor rekening, dan mutasi tabungan agar hanya diakses pihak berwenang.',
          'Integrity: Menjamin saldo rekening, perhitungan bunga deposito, dan jurnal akuntansi tidak berubah tanpa otorisasi sah.',
          'Availability: Memastikan modul teller, layanan digital, dan proses End of Day (EOD) berjalan lancar sesuai jam layanan bank.',
        ],
      },
      {
        heading: 'Dilema Kecepatan Support vs Prosedur Keamanan',
        paragraphs: [
          'Tim support dan implementator sering menghadapi tekanan tinggi saat antrean teller BPR padat atau proses tutup buku harian mengalami kendala. Dalam kondisi mendesak, jalan pintas seperti meminta salinan data produksi lewat chat atau menjalankan perintah SQL tanpa uji staging justru sering memicu insiden baru yang lebih sulit dipulihkan.',
        ],
        bullets: [
          'Setiap perubahan data produksi wajib tercatat dalam tiket resmi dengan persetujuan pihak berwenang di BPR.',
          'Gunakan akun individual agar Audit Trail mencatat pelaku dan waktu perubahan secara jelas tanpa akun admin bersama.',
          'Lakukan backup titik pemulihan sebelum mengeksekusi skrip perbaikan pada database operasional.',
        ],
      },
      {
        heading: 'Manusia sebagai Human Firewall',
        paragraphs: [
          'Firewall, antivirus, dan enkripsi hanyalah alat bantu yang bekerja mengikuti keputusan manusia di belakang layar. Membangun Human Firewall berarti membiasakan verifikasi sebelum bertindak, memisahkan lingkungan kerja secara disiplin, dan berani melapor cepat ketika menemukan kejanggalan sistem sekecil apa pun.',
        ],
        bullets: [
          'Berpikir sejenak sebelum membuka lampiran, mengunduh utilitas luar, atau menyetujui permintaan akses mendadak.',
          'Pisahkan secara tegas akun, kata sandi, dan data uji coba lokal dari lingkungan produksi BPR.',
          'Anggap ketelitian keamanan sebagai standar kualitas layanan tim SaaS, bukan beban tambahan.',
        ],
      },
    ],
    analogy: {
      title: 'Analogi Mobil Lapis Baja Pengangkut Uang Tunai',
      body: 'Layanan SaaSCore dan tim SaaS ibarat armada mobil lapis baja bank: Confidentiality adalah kaca gelap dan dinding baja yang menutup isi muatan, Integrity adalah segel bernomor seri agar nominal uang tidak selisih satu rupiah pun, sedangkan Availability adalah mesin prima agar mobil tiba sebelum loket buka. Sebagus apa pun mobilnya, semua percuma jika pengemudi meninggalkan kunci kontak tergantung di pintu.',
    },
    sasCases: [
      {
        title: '[Ilustrasi Skenario] Ekspor Data CIF ke Laptop Pribadi untuk Analisis SLIK',
        context:
          'Seorang implementator SaaS menangani tiket BPR terkait ketidaksesuaian format data identitas pada laporan SLIK OJK yang dihasilkan SaaSCore.',
        whatHappened:
          'Agar bisa memeriksa data dari rumah setelah jam kerja, ia mengekspor tabel CIF berisi nama, NIK, alamat, dan nomor rekening ribuan nasabah ke berkas CSV tanpa enkripsi, lalu menyalinnya ke flashdisk pribadi.',
        lesson:
          'Memindahkan data nasabah keluar dari perangkat kerja terkendali melanggar pilar Confidentiality dan membuka risiko kebocoran data apabila flashdisk hilang atau komputer rumah terinfeksi malware.',
      },
      {
        title: '[Ilustrasi Skenario] Koreksi Bunga Langsung di Database Produksi Jelang EOD',
        context:
          'Menjelang proses End of Day (EOD) di salah satu BPR mitra, ditemukan selisih pembulatan bunga pada beberapa kelompok rekening deposito.',
        whatHappened:
          'Karena khawatir EOD terlambat, engineer langsung menjalankan skrip SQL pembaruan di database produksi tanpa uji staging dan tanpa backup terbaru. Klausa kondisi yang terlalu luas menimpa kolom bunga ribuan rekening lain menjadi nol sehingga layanan teller pagi terhenti untuk rekonsiliasi manual.',
        lesson:
          'Kelalaian menjaga pilar Integrity melalui perubahan tanpa uji coba langsung merembet menjadi gangguan Availability layanan perbankan.',
      },
    ],
    doDont: [
      {
        doIt: 'Petakan dampak Confidentiality, Integrity, dan Availability sebelum mengeksekusi perbaikan di server klien.',
        dontIt: 'Langsung menjalankan skrip perbaikan darurat hanya agar pesan error cepat hilang dari layar.',
        why: 'Mencegah perbaikan satu gejala teknis memicu kerusakan integritas pembukuan atau matinya layanan teller BPR.',
      },
      {
        doIt: 'Gunakan data sintetis atau data yang sudah disamarkan saat mereproduksi bug SaaSCore di lingkungan lokal.',
        dontIt: 'Menyimpan salinan mentah database produksi nasabah di folder kerja atau media pribadi tanpa enkripsi.',
        why: 'Data produksi memuat informasi pribadi dan keuangan nasabah yang wajib dijaga kerahasiaannya.',
      },
      {
        doIt: 'Catat setiap perubahan konfigurasi atau koreksi data melalui tiket resmi dengan otorisasi BPR.',
        dontIt: 'Mengeksekusi perubahan saldo atau parameter produk hanya berdasarkan pesan chat informal.',
        why: 'Menjaga kejelasan Audit Trail saat pemeriksaan internal bank maupun audit regulator.',
      },
      {
        doIt: 'Gunakan akun login individual yang terikat pada masing-masing pegawai saat mengakses infrastruktur.',
        dontIt: 'Memakai satu akun administrator bersama untuk seluruh anggota tim implementasi.',
        why: 'Memastikan akuntabilitas setiap perintah yang dijalankan di sistem produksi maupun staging.',
      },
      {
        doIt: 'Lakukan backup terverifikasi dan uji di staging sebelum menyentuh lingkungan produksi klien.',
        dontIt: 'Menguji kueri pembaruan massal langsung pada database utama yang sedang melayani transaksi.',
        why: 'Memberi titik pemulihan aman jika logika skrip menimbulkan dampak yang tidak terduga.',
      },
    ],
    keyTakeaways: [
      'Keamanan di meja kerja tim PT. Sigit Adi Aman Siber (SaaS) berdampak langsung pada keamanan seluruh BPR pengguna SaaSCore.',
      'Setiap tindakan teknis harus menjaga keseimbangan tiga pilar CIA: kerahasiaan data, keakuratan transaksi, dan ketersediaan layanan.',
      'Kecepatan support tetap harus berjalan beriringan dengan otorisasi tiket, akun individual, backup, dan uji staging.',
      'Human Firewall terbentuk dari kebiasaan verifikasi dan keterbukaan melapor ketika melihat anomali.',
    ],
    instructorGuide: {
      durationMinutes: 40,
      talkingPoints: [
        'Buka sesi dengan menegaskan posisi strategis PT. Sigit Adi Aman Siber (SaaS) sebagai vendor tepercaya BPR: menjaga SaaSCore berarti menjaga kepercayaan nasabah bank.',
        'Gunakan analogi mobil lapis baja untuk menjelaskan perbedaan Confidentiality, Integrity, dan Availability secara cepat tanpa istilah berbelit.',
        'Bahas dua ilustrasi skenario secara interaktif: minta peserta menebak pilar CIA mana yang paling terdampak sebelum membuka pelajaran kasus.',
        'Tutup materi dengan menuntun peserta mencoba Lab 01 untuk mengeksplorasi dampak dan mitigasi tiap pilar CIA.',
      ],
      discussionPrompt:
        'Dalam rutinitas support atau implementasi SaaSCore di BPR, jalan pintas apa yang paling sering diminta klien saat kondisi darurat, dan bagaimana cara aman menolak atau menggantinya tanpa menghambat operasional?',
    },
    lab: {
      title: 'Lab 01: Klasifikasi Dampak CIA',
      summary:
        'Eksplorasi interaktif empat skenario operasional SaaSCore dan layanan support SaaS untuk memetakan dampak Confidentiality, Integrity, atau Availability beserta pilihan mitigasi aman dan berisiko.',
    },
  },
  {
    id: 2,
    slug: 'ancaman-serangan-siber',
    session: 'pagi',
    timeSlot: '09.10 - 09.50',
    title: 'Modul 02: Pengenalan Ancaman dan Serangan Siber',
    tagline:
      'Mengenali anatomi ancaman modern yang menargetkan vendor teknologi keuangan sebagai batu loncatan menuju sistem perbankan.',
    objectives: [
      'Menjelaskan konsep Supply Chain Attack dan alasan vendor Core Banking menjadi target bernilai tinggi.',
      'Menguraikan tahapan kerja Ransomware dari celah akses awal hingga penyanderaan server dan backup.',
      'Mengidentifikasi bahaya Credential Stuffing akibat penggunaan ulang kata sandi di situs eksternal.',
      'Mengenali penyamaran Trojan dan Malicious Attachment di alur kerja teknis pegawai IT.',
    ],
    workflowDiagram: {
      title: 'Alur Pencegahan Rantai Serangan Vendor',
      subtitle:
        'Memutus jalur masuk Supply Chain Attack, Ransomware, Credential Stuffing, dan Trojan di alur kerja harian SaaS.',
      steps: [
        {
          step: 1,
          title: 'Saring Dependensi',
          action: 'Gunakan pustaka open-source dan software berlisensi resmi tanpa crack atau aktivator.',
          tag: 'Peran: Developer',
        },
        {
          step: 2,
          title: 'Cek Checksum',
          action: 'Cocokkan nilai hash paket pembaruan SaaSCore sebelum dikirim ke server BPR.',
          tag: 'Gate: Rilis Aman',
        },
        {
          step: 3,
          title: 'Periksa Tiket Masuk',
          action: 'Tolak lampiran mencurigakan, ekstensi ganda, dan file makro dari pengirim tak terkonfirmasi.',
          tag: 'Peran: Support',
        },
        {
          step: 4,
          title: 'Akses VPN Terbatas',
          action: 'Aktifkan koneksi VPN klien hanya sesuai ruang lingkup tiket untuk menahan Lateral Movement.',
          tag: 'Gate: Least Privilege',
        },
        {
          step: 5,
          title: 'Isolasi Backup',
          action: 'Simpan salinan cadangan terpisah dari jaringan produksi agar kebal dari enkripsi Ransomware.',
          tag: 'Peran: Infra',
        },
      ],
    },
    sections: [
      {
        heading: 'Supply Chain Attack: Menargetkan Vendor untuk Masuk ke Banyak Bank',
        paragraphs: [
          'Pelaku kejahatan siber semakin sering melancarkan Supply Chain Attack dengan menyerang penyedia perangkat lunak seperti PT. Sigit Adi Aman Siber (SaaS) terlebih dahulu. Jika akses pemeliharaan vendor atau jalur distribusi pembaruan SaaSCore berhasil disusupi, penyerang berpotensi menjangkau banyak jaringan BPR mitra melalui kepercayaan teknis yang sudah ada.',
        ],
        bullets: [
          'Titik rawan meliputi akun VPN support ke klien, server build, dan repositori kode internal.',
          'Pustaka pihak ketiga atau dependensi open-source yang tidak diperiksa keasliannya dapat membawa kode sisipan.',
          'Menjaga keamanan internal SaaS berarti memutus jalur serangan berantai menuju seluruh BPR pengguna SaaSCore.',
        ],
      },
      {
        heading: 'Ransomware dan Ancaman Pemerasan Ganda',
        paragraphs: [
          'Ransomware modern tidak hanya mengunci berkas di satu komputer, tetapi menyebar diam-diam ke server jaringan untuk mencuri data sensitif terlebih dahulu sebelum mengenkripsi database dan salinan cadangan. Pola yang dikenal sebagai Double Extortion ini memaksa organisasi menghadapi lumpuhnya layanan sekaligus ancaman kebocoran data nasabah.',
        ],
        bullets: [
          'Sering bermula dari port remote access terbuka atau kredensial VPN tanpa autentikasi multifaktor.',
          'Penyerang melakukan Lateral Movement untuk mencari domain controller, server database, dan repositori backup.',
          'Salinan backup yang selalu terhubung online ke jaringan yang sama berisiko ikut terenkripsi.',
        ],
      },
      {
        heading: 'Credential Stuffing: Efek Domino Kata Sandi yang Sama',
        paragraphs: [
          'Ketika sebuah situs forum, toko daring, atau aplikasi publik mengalami kebocoran database pengguna, pasangan email dan kata sandi tersebut langsung tersebar di internet. Melalui teknik Credential Stuffing, skrip otomatis mencoba jutaan kombinasi bocoran itu secara beruntun ke portal webmail, VPN, atau sistem tiket SaaS.',
        ],
        bullets: [
          'Penggunaan ulang kata sandi antara akun pribadi dan akun kantor membuat kebocoran luar berdampak ke internal.',
          'Mendaftarkan alamat email domain sigitadi.id di layanan luar mempermudah pemetaan target oleh penyerang.',
          'Kredensial bocor tampak seperti login sah apabila portal belum dilindungi autentikasi multifaktor.',
        ],
      },
      {
        heading: 'Trojan dan Malicious Attachment di Perangkat Kerja',
        paragraphs: [
          'Di lingkungan pegawai IT, Trojan jarang menyamar sebagai hadiah undian, melainkan sebagai alat bantu kerja seperti utilitas SQL bajakan, aktivator lisensi, atau lampiran dokumen bermasalah berformat arsip ZIP. Begitu dijalankan, varian Infostealer langsung menyedot cookie sesi browser, kata sandi tersimpan, dan konfigurasi SSH secara senyap.',
        ],
        bullets: [
          'Program bajakan dan crack hampir selalu menyisipkan malware pencuri kredensial dan sesi VPN.',
          'Waspadai berkas dengan ekstensi ganda seperti bukti_mutasi.pdf.exe atau dokumen Office yang meminta pengaktifan makro.',
          'Gunakan hanya perangkat lunak resmi dan skrip yang telah diverifikasi tim infrastruktur SaaS.',
        ],
      },
    ],
    analogy: {
      title: 'Analogi Bengkel Pembuat Kunci Kompleks Perumahan',
      body: 'Jika kantor BPR adalah rumah dengan pagar tinggi dan gembok kokoh, maka PT. Sigit Adi Aman Siber adalah bengkel pembuat kunci yang menyimpan akses perawatan rutin. Pencuri yang cerdik tidak perlu memanjat pagar satu per satu; ia cukup menyusup ke bengkel kunci dan menyalin master key di meja teknisi agar seluruh rumah ikut terancam.',
    },
    sasCases: [
      {
        title: '[Ilustrasi Skenario] Client Database Bajakan Pencuri Sesi VPN',
        context:
          'Seorang developer membutuhkan aplikasi manajemen database dengan fitur ekspor cepat untuk menguji kueri modul kredit SaaSCore.',
        whatHappened:
          'Ia mengunduh versi bajakan beserta file aktivator dari blog tidak resmi alih-alih meminta lisensi resmi melalui tim infrastruktur SaaS. Aktivator tersebut menanamkan Trojan Infostealer yang mencuri cookie sesi browser, konfigurasi SSH, dan profil koneksi VPN klien yang tersimpan.',
        lesson:
          'Menggunakan software bajakan di laptop kerja membuka akses jaringan internal SaaS dan server BPR tanpa penyerang perlu membobol firewall.',
      },
      {
        title: '[Ilustrasi Skenario] Password Lama Membuka Portal Dokumentasi Teknis',
        context:
          'Portal dokumentasi teknis internal SaaS yang memuat catatan integrasi SaaSCore dapat diakses tim lapangan melalui internet.',
        whatHappened:
          'Salah satu staf memakai kata sandi yang sama dengan akun pribadinya di sebuah situs belajar online yang pernah mengalami kebocoran data. Pelaku menjalankan skrip Credential Stuffing hingga berhasil masuk ke portal dan mengunduh dokumen topologi jaringan BPR.',
        lesson:
          'Mendaur ulang kata sandi membuat ketahanan akun kerja ikut runtuh ketika layanan eksternal yang tidak terkait mengalami kebocoran.',
      },
    ],
    doDont: [
      {
        doIt: 'Gunakan perangkat lunak berlisensi resmi atau open-source yang sudah disetujui tim infrastruktur SaaS.',
        dontIt: 'Menginstal software bajakan, crack, keygen, atau skrip acak dari internet ke perangkat kerja.',
        why: 'Aktivator software bajakan merupakan jalur utama masuknya Trojan Infostealer pencuri token sesi dan VPN.',
      },
      {
        doIt: 'Gunakan kata sandi unik untuk setiap akun kantor dan pisahkan email kerja dari layanan publik pribadi.',
        dontIt: 'Memakai ulang kata sandi kantor atau email sigitadi.id di forum, toko online, atau aplikasi hiburan.',
        why: 'Mencegah serangan Credential Stuffing memanfaatkan kebocoran data dari situs pihak ketiga.',
      },
      {
        doIt: 'Periksa sumber pustaka kode, checksum paket rilis, dan integritas skrip sebelum dikirim ke server BPR.',
        dontIt: 'Memasukkan dependensi atau paket pembaruan ke alur distribusi klien tanpa verifikasi keaslian.',
        why: 'Memutus risiko Supply Chain Attack yang dapat menyebar ke seluruh jaringan BPR pengguna SaaSCore.',
      },
      {
        doIt: 'Pastikan salinan backup database terisolasi dan tidak dapat dimodifikasi langsung dari server produksi.',
        dontIt: 'Menyimpan seluruh backup pada folder bersama yang terhubung aktif terus-menerus ke jaringan kerja.',
        why: 'Mencegah Ransomware mengenkripsi data utama sekaligus seluruh salinan pemulihannya.',
      },
      {
        doIt: 'Aktifkan tampilan ekstensi file lengkap dan tolak lampiran arsip mencurigakan dari pengirim tak terkonfirmasi.',
        dontIt: 'Langsung mengeksekusi berkas di dalam ZIP berpassword hanya karena judulnya menyerupai tiket atau berita acara.',
        why: 'Ekstensi ganda dan arsip berpassword kerap dipakai untuk mengelabui pemindaian antivirus dan mata pengguna.',
      },
    ],
    keyTakeaways: [
      'Vendor Core Banking menjadi target utama Supply Chain Attack karena terhubung ke banyak BPR mitra sekaligus.',
      'Ransomware modern menggabungkan enkripsi sistem dengan pencurian data (Double Extortion) dan mengincar backup yang tidak terisolasi.',
      'Credential Stuffing berhasil hanya jika pegawai mendaur ulang kata sandi yang pernah bocor di layanan lain.',
      'Disiplin bebas software bajakan dan kewaspadaan terhadap lampiran adalah kunci mencegah infeksi Trojan.',
    ],
    instructorGuide: {
      durationMinutes: 40,
      talkingPoints: [
        'Tanyakan kepada peserta mengapa penyerang lebih tertarik membobol laptop staf SaaS daripada langsung membobol firewall BPR.',
        'Jelaskan keempat ancaman utama (Supply Chain, Ransomware, Credential Stuffing, Trojan) dengan fokus pada titik masuk paling umum di tim IT.',
        'Tekankan bahaya nyata software bajakan dan keygen sebagai pembawa Infostealer pencuri cookie sesi browser.',
        'Arahkan peserta membuka Lab 02 untuk menelusuri empat titik alur kerja tiket support dan membandingkan kontrol yang memutus serangan.',
      ],
      discussionPrompt:
        'Dari empat vektor ancaman di modul ini, titik mana dalam alur kerja harian tim SaaS yang paling berisiko membuka jalan ke jaringan BPR klien, dan kontrol sederhana apa yang bisa langsung diterapkan minggu ini?',
    },
    lab: {
      title: 'Lab 02: Pemetaan Jalur Serangan',
      summary:
        'Eksplorasi empat titik alur kerja harian support SaaSCore (terima tiket, unduh lampiran, koneksi VPN klien, hingga kirim balasan) untuk melihat bagaimana tiap kontrol memutus atau meloloskan jalur serangan.',
    },
  },
  {
    id: 3,
    slug: 'phishing-social-engineering',
    session: 'pagi',
    timeSlot: '10.05 - 10.50',
    title: 'Modul 03: Phishing Awareness dan Social Engineering',
    tagline:
      'Membongkar teknik manipulasi psikologis, Spear Phishing B2B, pemalsuan identitas, dan domain tiruan yang menyasar tim operasional SaaS.',
    objectives: [
      'Mengenali tiga pemicu psikologis utama dalam Social Engineering yaitu Urgency, Fear, dan Authority.',
      'Mengidentifikasi pola Spear Phishing B2B yang memanfaatkan konteks proyek SaaSCore dan mitra BPR.',
      'Memeriksa indikator Email Spoofing dan penyamaran akun WhatsApp di balik nama tampilan pengirim.',
      'Mendeteksi jebakan Typosquatting yang meniru domain resmi sigitadi.id melalui pemeriksaan Domain Utama.',
    ],
    workflowDiagram: {
      title: 'Alur Verifikasi Pesan & Tautan Masuk',
      subtitle:
        'Mematahkan manipulasi psikologis Social Engineering, Email Spoofing, dan jebakan domain tiruan sigitadi.id.',
      steps: [
        {
          step: 1,
          title: 'Tahan Emosi',
          action: 'Kenali pemicu Urgency, Fear, dan Authority sebelum mengklik atau membalas pesan mendadak.',
          tag: 'Gate: Jeda 5 Detik',
        },
        {
          step: 2,
          title: 'Cek Pengirim Utuh',
          action: 'Periksa alamat email aktual di balik Display Name dan kolom Reply-To.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 3,
          title: 'Baca Domain Utama',
          action: 'Arahkan kursor ke tautan dan baca domain tepat di kiri garis miring pertama untuk deteksi Typosquatting.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 4,
          title: 'Verifikasi Out-of-Band',
          action: 'Konfirmasi permintaan OTP, reset akses, atau data sensitif lewat telepon ke nomor resmi tersimpan.',
          tag: 'Gate: Kanal Resmi',
        },
        {
          step: 5,
          title: 'Tolak & Laporkan',
          action: 'Jangan masukkan kredensial; laporkan email atau WhatsApp tiruan agar tim lain terlindungi.',
          tag: 'Peran: Tim Keamanan',
        },
      ],
    },
    sections: [
      {
        heading: 'Manipulasi Psikologis: Urgency, Fear, dan Authority',
        paragraphs: [
          'Social Engineering menargetkan sisi psikologis manusia agar korban mengambil keputusan terburu-buru sebelum sempat berpikir logis. Pelaku memanfaatkan dorongan alami pegawai IT yang ingin sigap melayani klien, takut dimarahi atasan, dan patuh pada instruksi pimpinan.',
        ],
        bullets: [
          'Urgency: Mendesak tindakan segera dalam hitungan menit dengan alasan layanan teller atau transaksi sedang terhenti.',
          'Fear: Mengancam sanksi pelanggaran, penutupan akun otomatis hari ini, atau komplain resmi dari direksi BPR.',
          'Authority: Mengaku sebagai pimpinan PT. Sigit Adi Aman Siber, auditor, atau direktur bank agar staf enggan memverifikasi balik.',
        ],
      },
      {
        heading: 'Spear Phishing B2B di Lingkungan Vendor Core Banking',
        paragraphs: [
          'Berbeda dengan spam acak yang mudah dikenali, Spear Phishing B2B disusun secara khusus berdasarkan riset informasi publik perusahaan. Penyerang merangkai pesan menggunakan nama pegawai, produk SaaSCore, istilah UAT, migrasi data, atau nama BPR mitra agar terasa sangat akrab dan masuk akal.',
        ],
        bullets: [
          'Menggunakan jargon teknis perbankan seperti pelaporan SLIK, penyesuaian parameter bunga, atau berita acara UAT.',
          'Mengirim lampiran HTML atau arsip terenkripsi yang seolah berisi dokumen revisi proyek dari BPR mitra.',
          'Meminta korban login ulang melalui tautan tertentu untuk mengunduh berkas atau memverifikasi akses proyek.',
        ],
      },
      {
        heading: 'Email Spoofing dan Penyamaran WhatsApp',
        paragraphs: [
          'Pada sistem email, kolom Display Name dapat ditulis sesuka hati menjadi nama pimpinan atau staf bank, sementara alamat email sebenarnya di dalam tanda kurung berasal dari domain asing. Pola serupa juga marak di WhatsApp ketika pelaku memakai foto profil atasan pada nomor baru dengan alasan ponsel utama sedang bermasalah.',
        ],
        bullets: [
          'Selalu periksa alamat email lengkap setelah Display Name serta alamat Reply-To sebelum membalas atau mengklik isi pesan.',
          'Arahkan kursor (hover) pada tautan atau tombol di email untuk memeriksa URL tujuan sebenarnya sebelum mengklik.',
          'Lakukan Verifikasi Out-of-Band lewat panggilan suara ke nomor resmi tersimpan jika ada nomor baru meminta OTP atau akses.',
        ],
      },
      {
        heading: 'Typosquatting: Membedakan sigitadi.id dan Domain Tiruan',
        paragraphs: [
          'Typosquatting memanfaatkan kemiripan huruf dan kebiasaan membaca cepat untuk menipu korban agar membuka halaman login palsu, misalnya mengganti sigitadi.id menjadi sigitadi-support.id, s1gitadi.id, atau memakai subdomain mengecoh seperti sigitadi.id.login-verify.net. Begitu kredensial dan kode OTP dimasukkan, data langsung jatuh ke tangan penyerang.',
        ],
        bullets: [
          'Cara aman membaca URL adalah menemukan Domain Utama tepat di sebelah kiri garis miring pertama (/).',
          'Waspadai karakter mirip (homoglyph) seperti rn menggantikan m, angka 0 menggantikan o, atau huruf l kecil dan I besar.',
          'Akses portal kritikal seperti webmail, VPN, dan sistem tiket selalu melalui bookmark resmi, bukan tautan dari pesan masuk.',
        ],
      },
    ],
    analogy: {
      title: 'Analogi Petugas Listrik Gadungan yang Mengaku Darurat',
      body: 'Seseorang mengetuk pintu rumah mengenakan rompi mirip petugas listrik dan berteriak bahwa kabel depan akan terbakar dalam dua menit jika ia tidak segera memeriksa meteran di dalam. Karena panik melihat seragam yang tampak meyakinkan, pemilik rumah bisa lupa menelepon kantor resmi untuk memastikan surat tugasnya. Seragam itu adalah Display Name dan domain tiruan, sedangkan ancaman kebakaran dalam dua menit adalah pemicu Fear dan Urgency.',
    },
    sasCases: [
      {
        title: '[Ilustrasi Skenario] WhatsApp Nomor Baru Mengatasnamakan Pimpinan saat Piket',
        context:
          'Seorang staf support SaaS sedang menjalani jadwal piket pemantauan sistem ketika menerima pesan WhatsApp dari nomor tidak dikenal dengan foto profil pimpinan perusahaan.',
        whatHappened:
          'Pengirim mengaku nomor lamanya sedang diperbarui saat rapat bersama BPR dan meminta staf segera mengirimkan tautan reset akses serta kode OTP portal admin untuk keperluan demo mendadak. Sebelum mengirim apa pun, staf tersebut menelepon nomor kontak resmi sang pimpinan yang tersimpan di buku alamatnya dan memastikan pesan itu adalah penipuan.',
        lesson:
          'Pemicu Authority dan Urgency di aplikasi pesan instan wajib dipatahkan dengan Verifikasi Out-of-Band melalui kanal komunikasi resmi yang terpisah.',
      },
      {
        title: '[Ilustrasi Skenario] Email Pembaruan Profil VPN dari Domain Tiruan',
        context:
          'Beberapa pegawai SaaS menerima email bertajuk pemberitahuan penutupan akses VPN pada sore hari dengan logo perusahaan yang rapi.',
        whatHappened:
          'Pesan mengancam akses ke seluruh server BPR akan terputus otomatis bila pengguna tidak melakukan validasi ulang lewat tombol di email. Pemeriksaan alamat pengirim dan tujuan tombol menunjukkan domain portal-sigitadi.co-id.site bukan sigitadi.id, sehingga tim segera melaporkan email tersebut agar seluruh pegawai waspada.',
        lesson:
          'Kerapian logo dan tata bahasa tidak menjamin keaslian pesan; validasi Domain Utama dan kebiasaan menggunakan bookmark resmi adalah kunci pencegahan.',
      },
    ],
    doDont: [
      {
        doIt: 'Periksa Domain Utama URL tepat sebelum garis miring pertama dari kanan ke kiri sebelum memasukkan kredensial.',
        dontIt: 'Mengklik tombol login dari email atau pesan chat lalu langsung mengetik username dan kata sandi.',
        why: 'Menghindari jebakan Typosquatting dan subdomain palsu yang meniru tampilan portal sigitadi.id.',
      },
      {
        doIt: 'Terapkan Verifikasi Out-of-Band melalui telepon atau kanal internal resmi untuk permintaan akses, OTP, atau perubahan data sensitif.',
        dontIt: 'Menyetujui permintaan mendesak hanya karena pengirim memakai foto profil atau nama tampilan pimpinan.',
        why: 'Nama tampilan email dan nomor WhatsApp baru sangat mudah dipalsukan oleh pelaku Social Engineering.',
      },
      {
        doIt: 'Gunakan bookmark browser resmi untuk membuka webmail, portal tiket, Git, dan gateway VPN setiap hari.',
        dontIt: 'Membuka portal kritikal lewat tautan hasil pencarian mesin pencari atau tautan terusan di grup chat.',
        why: 'Bookmark memastikan Anda selalu mengakses domain asli perusahaan tanpa risiko salah ketik.',
      },
      {
        doIt: 'Berhenti sejenak untuk memeriksa fakta setiap kali pesan memancing emosi panik, takut, atau tergesa-gesa.',
        dontIt: 'Menuruti tenggat waktu buatan yang mendesak tanpa mengonfirmasi keabsahan permintaan.',
        why: 'Menghilangkan pengaruh taktik Urgency dan Fear yang dirancang untuk melumpuhkan kehati-hatian.',
      },
      {
        doIt: 'Laporkan pesan phishing atau peniruan identitas yang diterima kepada tim keamanan internal SaaS.',
        dontIt: 'Sekadar menghapus pesan mencurigakan tanpa memberi peringatan kepada rekan kerja lain.',
        why: 'Serangan Spear Phishing B2B sering dikirim serentak ke banyak staf sehingga laporan cepat melindungi seluruh tim.',
      },
    ],
    keyTakeaways: [
      'Social Engineering membidik emosi manusia lewat Urgency, Fear, dan Authority agar korban melewatkan langkah verifikasi.',
      'Spear Phishing B2B memakai konteks asli pekerjaan SaaSCore dan nama BPR mitra agar tampak meyakinkan.',
      'Pengecekan alamat email aktual dan Domain Utama URL menangkal Email Spoofing serta Typosquatting domain sigitadi.id.',
      'Permintaan kode OTP, kredensial, atau data sensitif wajib selalu dikonfirmasi melalui Verifikasi Out-of-Band.',
    ],
    instructorGuide: {
      durationMinutes: 45,
      talkingPoints: [
        'Tunjukkan bagaimana tiga pemicu psikologis (Urgency, Fear, Authority) sering muncul bersamaan dalam pesan WhatsApp maupun email kantor.',
        'Peragakan cara membaca URL dari kanan ke kiri sebelum garis miring pertama untuk membedakan sigitadi.id asli dengan subdomain palsu.',
        'Tekankan prinsip bahwa tidak ada alasan operasional yang mengharuskan staf mengirim kode OTP atau kata sandi kepada atasan sekalipun.',
        'Bimbing peserta mengerjakan Lab 03 untuk memeriksa setiap pesan kotak masuk dan WhatsApp guna memahami ciri aman serta jebakannya.',
      ],
      discussionPrompt:
        'Jika Anda menerima WhatsApp mendadak dari nomor baru yang mengaku pimpinan SaaS saat sedang piket di luar jam kerja, langkah verifikasi apa yang paling cepat namun tetap aman dilakukan?',
    },
    lab: {
      title: 'Lab 03: Simulator Kotak Masuk & WhatsApp Jebakan',
      summary:
        'Eksplorasi simulasi email kotak masuk dan pesan WhatsApp operasional BPR untuk membedakan komunikasi sah dari jebakan Email Spoofing, Typosquatting domain sigitadi.id, dan Social Engineering.',
    },
  },
  {
    id: 4,
    slug: 'password-access-management',
    session: 'pagi',
    timeSlot: '10.50 - 11.30',
    title: 'Modul 04: Password Security dan Access Management',
    tagline:
      'Membangun pertahanan gerbang identitas melalui Passphrase berentropi tinggi, prinsip Least Privilege, dan disiplin autentikasi multifaktor.',
    objectives: [
      'Menjelaskan mengapa panjang dan keacakan Passphrase lebih kuat terhadap peretasan dibanding kata sandi pendek penuh simbol.',
      'Mengelola kata sandi unik pada setiap layanan kerja menggunakan Password Manager secara aman.',
      'Menerapkan prinsip Least Privilege pada pemberian dan pembatasan akses VPN maupun server BPR.',
      'Membandingkan keamanan MFA berbasis aplikasi autentikator terhadap SMS OTP serta cara menghadapi MFA Fatigue.',
    ],
    workflowDiagram: {
      title: 'Alur Pengelolaan Identitas & Hak Akses',
      subtitle:
        'Membangun gerbang akses SaaSCore yang tahan brute-force, SIM Swapping, dan serangan MFA Fatigue.',
      steps: [
        {
          step: 1,
          title: 'Passphrase Unik',
          action: 'Buat passphrase minimal 16 karakter unik per akun dan simpan di Password Manager.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 2,
          title: 'Aktifkan MFA Aplikasi',
          action: 'Gunakan aplikasi autentikator TOTP atau security key FIDO2 sebagai pengganti SMS OTP.',
          tag: 'Gate: Wajib',
        },
        {
          step: 3,
          title: 'Akses Sesuai Peran',
          action: 'Pakai akun read-only untuk investigasi dan elevasi izin sementara sesuai jadwal tiket.',
          tag: 'Gate: Least Privilege',
        },
        {
          step: 4,
          title: 'Tangkal MFA Fatigue',
          action: 'Tekan Tolak pada notifikasi MFA asing, cabut sesi aktif, dan segera ganti passphrase.',
          tag: 'Peran: Semua Staf',
        },
        {
          step: 5,
          title: 'Cabut Pasca-Tugas',
          action: 'Tutup akses VPN dan jalankan offboarding akun segera setelah proyek atau penugasan selesai.',
          tag: 'Peran: Infra',
        },
      ],
    },
    sections: [
      {
        heading: 'Passphrase Panjang vs Password Pendek yang Rumit',
        paragraphs: [
          'Kata sandi pendek delapan karakter dengan substitusi huruf umum seperti Saas@2026 atau Bpr@1234 mudah ditebak oleh kamus serangan otomatis modern. Sebaliknya, Passphrase menggabungkan empat kata acak atau lebih dengan panjang minimal 16 karakter sehingga memiliki Entropi tinggi dan tetap mudah diingat manusia.',
        ],
        bullets: [
          'Panjang karakter menaikkan jumlah kombinasi tebakan jauh lebih besar daripada sekadar menambah satu dua simbol.',
          'Hindari memakai nama perusahaan, nama produk SaaSCore, tanggal lahir, atau pola papan ketik berurutan.',
          'Gunakan Password Manager agar setiap akun memiliki kata sandi acak yang berbeda dan Anda cukup mengingat satu passphrase utama.',
        ],
      },
      {
        heading: 'Prinsip Least Privilege pada Akses VPN dan Server Klien',
        paragraphs: [
          'Prinsip Least Privilege memastikan setiap pegawai hanya memperoleh hak akses minimal yang benar-benar dibutuhkan untuk menuntaskan tugasnya dan hanya selama periode penugasan berlangsung. Di lingkungan support SaaSCore, pembatasan ini mencegah kelalaian atau kompromi pada satu akun berdampak luas ke seluruh BPR mitra.',
        ],
        bullets: [
          'Pisahkan akun harian standar (read-only untuk investigasi log) dari akun elevasi administratif yang hanya dipakai saat perubahan terotorisasi.',
          'Berikan akses VPN server klien sesuai jadwal tiket atau proyek aktif, dan tutup koneksi segera setelah selesai.',
          'Cabut segera hak akses akun pegawai yang berpindah divisi, selesai magang, atau mengakhiri masa kerja.',
        ],
      },
      {
        heading: 'Keunggulan MFA Berbasis Aplikasi Dibanding SMS OTP',
        paragraphs: [
          'Multi-Factor Authentication (MFA) menambahkan lapisan bukti kepemilikan di luar kata sandi. MFA berbasis aplikasi autentikator (TOTP) atau security key fisik jauh lebih aman daripada SMS OTP karena tidak bergantung pada jaringan seluler yang rentan terhadap pembajakan kartu SIM (SIM Swapping) maupun pembacaan notifikasi di layar kunci ponsel.',
        ],
        bullets: [
          'Aplikasi autentikator (TOTP) menghasilkan kode dinamis secara lokal di perangkat dan tetap berjalan meski sinyal seluler lemah.',
          'Security key berbasis FIDO2 melakukan pencocokan kriptografis domain sehingga kebal terhadap situs login phishing tiruan.',
          'Nonaktifkan pratinjau isi pesan sensitif pada layar kunci ponsel agar kode verifikasi tidak terbaca orang di sekitar.',
        ],
      },
      {
        heading: 'Waspada Serangan MFA Fatigue dan Keamanan Sesi Login',
        paragraphs: [
          'Jika penyerang sudah mengantongi kata sandi pegawai, mereka kerap mengirim puluhan notifikasi persetujuan MFA berturut-turut (MFA Fatigue) pada tengah malam agar korban merasa kesal lalu menekan tombol setuju. Menekan setuju pada notifikasi login yang tidak dipicu sendiri berarti membuka pintu sistem secara langsung bagi pelaku.',
        ],
        bullets: [
          'Tolak (Deny) setiap permintaan persetujuan MFA yang muncul ketika Anda tidak sedang melakukan login.',
          'Notifikasi MFA tak terduga merupakan tanda pasti kata sandi utama sudah bocor dan wajib segera diganti.',
          'Tinjau rutin daftar sesi login aktif di email, Git, dan panel cloud serta cabut perangkat lama yang tidak terpakai.',
        ],
      },
    ],
    analogy: {
      title: 'Analogi Kunci Terpisah dan Kartu Akses Karyawan',
      body: 'Memakai satu kata sandi untuk semua sistem ibarat membawa satu kunci induk yang membuka pintu kantor, brankas rumah, dan semua ruang server BPR. Dengan Password Manager dan Passphrase unik, setiap pintu punya gembok berbeda; Least Privilege membatasi kartu akses agar staf hanya masuk ke ruangan tugasnya; dan MFA berbasis aplikasi adalah petugas jaga yang tetap memeriksa kartu fisik Anda meski kuncinya cocok.',
    },
    sasCases: [
      {
        title: '[Ilustrasi Skenario] Akses Admin Permanen dan Akun Bersama di Server BPR',
        context:
          'Usai proyek implementasi awal SaaSCore selesai, tim proyek tetap membiarkan satu akun admin bersama aktif pada server staging dan VPN klien.',
        whatHappened:
          'Beberapa bulan kemudian ditemukan perubahan parameter biaya administrasi yang tidak terjelaskan. Log audit hanya menampilkan satu nama akun bersama, dan belakangan diketahui dua mantan personel proyek luar masih menyimpan kata sandinya.',
        lesson:
          'Tanpa kepemilikan akun individual dan penerapan Least Privilege berbasis durasi tugas, organisasi kehilangan jejak audit sekaligus menyisakan akses bagi pihak tak berwenang.',
      },
      {
        title: '[Ilustrasi Skenario] Spam Notifikasi MFA Berulang pada Pukul 02.15 Dini Hari',
        context:
          'Seorang sysadmin SaaS yang memegang akses panel infrastruktur cloud menerima belasan permintaan persetujuan login berturut-turut di ponselnya pada dini hari.',
        whatHappened:
          'Meski hampir menekan setuju karena mengantuk dan terganggu getaran ponsel, ia ingat pola MFA Fatigue lalu menekan tombol Tolak, memutus semua sesi aktif, mengganti passphrase melalui Password Manager, dan melapor ke tim keamanan.',
        lesson:
          'Menolak notifikasi MFA asing dan segera merotasi kata sandi menghentikan penyerang sebelum sempat masuk ke infrastruktur produksi.',
      },
    ],
    doDont: [
      {
        doIt: 'Buat Passphrase panjang minimal 16 karakter dari kombinasi kata acak yang unik untuk setiap akun.',
        dontIt: 'Menggunakan password pendek dengan pola umum seperti Saas@2026 atau memakai kata sandi yang sama di berbagai portal.',
        why: 'Panjang passphrase meningkatkan Entropi secara drastis dan mencegah pembobolan berantai antarlayanan.',
      },
      {
        doIt: 'Kelola seluruh kredensial unik melalui Password Manager yang dilindungi satu passphrase utama yang kuat.',
        dontIt: 'Menyimpan daftar password server klien di file teks biasa, spreadsheet tanpa enkripsi, atau catatan tempel di monitor.',
        why: 'Berkas teks terbuka mudah terbaca orang sekitar maupun dicuri otomatis oleh malware.',
      },
      {
        doIt: 'Terapkan Least Privilege dengan hak akses minimum sesuai peran dan batas waktu koneksi VPN yang jelas.',
        dontIt: 'Memberikan hak administrator penuh secara permanen ke semua akun staf untuk menghindari repot meminta izin.',
        why: 'Membatasi dampak insiden apabila satu akun mengalami kesalahan operasional atau diambil alih pihak luar.',
      },
      {
        doIt: 'Aktifkan MFA berbasis aplikasi autentikator (TOTP) atau security key fisik pada seluruh portal kerja kritikal.',
        dontIt: 'Memilih SMS OTP atau mematikan MFA dengan alasan mempercepat proses login harian.',
        why: 'Aplikasi autentikator dan security key jauh lebih tahan terhadap SIM Swapping serta penyadapan jaringan seluler.',
      },
      {
        doIt: 'Segera tekan Tolak pada notifikasi MFA yang tidak Anda picu, lalu ganti passphrase akun terkait detik itu juga.',
        dontIt: 'Menekan Approve berulang kali hanya agar notifikasi berhenti mengganggu istirahat atau pekerjaan Anda.',
        why: 'Notifikasi tersebut membuktikan kata sandi Anda sudah diketahui penyerang dan mereka sedang mencoba melewati lapisan MFA.',
      },
    ],
    keyTakeaways: [
      'Panjang dan keacakan Passphrase menghasilkan Entropi jauh lebih tinggi daripada password pendek yang hanya mengandalkan simbol.',
      'Password Manager memungkinkan setiap akun SaaS dan portal BPR memiliki kata sandi unik tanpa membebani ingatan.',
      'Prinsip Least Privilege menuntut akun individual dengan hak akses minimum dan pencabutan akses saat tugas berakhir.',
      'Gunakan MFA berbasis aplikasi atau security key, dan hadapi MFA Fatigue dengan menolak prompt asing lalu segera mengganti kata sandi.',
    ],
    instructorGuide: {
      durationMinutes: 45,
      talkingPoints: [
        'Bandingkan langsung di layar bagaimana password pendek bersimbol lebih cepat ditebak dibanding passphrase empat kata acak.',
        'Jelaskan mengapa akses VPN dan hak database SaaSCore harus mengikuti tiket tugas (Least Privilege) dan bukan akses permanen untuk semua orang.',
        'Soroti perbedaan risiko SMS OTP dibanding aplikasi autentikator TOTP dan tekankan bahaya MFA Fatigue pada jam malam.',
        'Ajak peserta mencoba Lab 04 untuk melihat efek panjang passphrase terhadap entropi secara langsung dan mengeksplorasi simulasi MFA Fatigue.',
      ],
      discussionPrompt:
        'Apa kendala paling sering dirasakan tim saat beralih ke Password Manager dan aplikasi autentikator untuk akses VPN atau server BPR, dan bagaimana cara tim saling mendukung?',
    },
    lab: {
      title: 'Lab 04: Uji Entropi Passphrase & Simulasi MFA Fatigue',
      summary:
        'Eksplorasi interaktif perbandingan kekuatan entropi password pendek vs passphrase panjang serta simulasi pengambilan keputusan saat menghadapi notifikasi MFA Fatigue dan aturan Least Privilege.',
    },
  },
];
