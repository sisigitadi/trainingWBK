import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  MessageSquareText,
} from 'lucide-react';
import type { LabProps } from '../../types/training';
import { computeLabProgress, useLabSessionState } from '../../lib/useLabExploration';
import { useProgress } from '../../state/ProgressContext';
import { Callout, FeedbackBox, LabShell, RichTermText } from '../ui';

interface CaseOption {
  id: string;
  label: string;
  status: 'safe' | 'risk';
  fieldImpact: string;
  whyAndAction: string;
}

interface CrossModuleCase {
  id: number;
  moduleRef: string;
  topic: string;
  scenario: string;
  discussionTip: string;
  options: CaseOption[];
}

const CROSS_MODULE_CASES: CrossModuleCase[] = [
  {
    id: 1,
    moduleRef: 'MODUL 01: FUNDAMENTAL & CIA TRIAD',
    topic: 'Permintaan Ubah Saldo Deposito Langsung di Database Produksi',
    scenario:
      'Seorang staf BPR menelepon dan meminta Anda mengubah saldo bunga deposito nasabah langsung lewat query UPDATE di database produksi SaaSCore tanpa tiket perubahan karena antrean sedang padat. Mari eksplorasi dampak tiap pilihan tindakan:',
    discussionTip:
      'Diskusikan bagaimana prinsip Integrity dan Audit Trail menjaga kepercayaan antara BPR klien dan PT. Sigit Adi Aman Siber (SaaS).',
    options: [
      {
        id: 'c1-a',
        label: 'Tolak perubahan langsung di database produksi dan arahkan koreksi melalui mekanisme aplikasi resmi atau change request berotorisasi',
        status: 'safe',
        fieldImpact:
          'Setiap perubahan data perbankan tercatat dalam jejak audit resmi dan melewati verifikasi otorisasi berjenjang.',
        whyAndAction:
          'Menjaga Integritas (Integrity) data akuntansi SaaSCore dan melindungi staf SaaS dari tanggung jawab atas perubahan tanpa persetujuan formal.',
      },
      {
        id: 'c1-b',
        label: 'Lakukan query UPDATE langsung asalkan staf BPR mengirim persetujuan lewat pesan WhatsApp',
        status: 'risk',
        fieldImpact:
          'Pesan chat bukan kontrol perubahan resmi, rawan salah hitung jurnal, dan memutus jejak audit aplikasi SaaSCore.',
        whyAndAction:
          'Mengapa berisiko: jika terjadi selisih pembukuan saat audit OJK atau internal BPR, perubahan manual sulit dipertanggungjawabkan.',
      },
      {
        id: 'c1-c',
        label: 'Ekspor tabel deposito ke laptop pribadi terlebih dahulu untuk dihitung ulang lalu diunggah kembali',
        status: 'risk',
        fieldImpact:
          'Data nasabah asli berpindah ke perangkat pribadi tanpa kontrol enkripsi dan perlindungan data pribadi.',
        whyAndAction:
          'Mengapa berisiko: melanggar prinsip Kerahasiaan (Confidentiality) serta ketentuan UU PDP.',
      },
      {
        id: 'c1-d',
        label: 'Berikan kredensial akun admin database kepada staf BPR agar mereka mengubahnya sendiri',
        status: 'risk',
        fieldImpact:
          'Akun hak istimewa dipakai lintas pihak tanpa pemisahan tugas dan memperlebar risiko salah perintah di produksi.',
        whyAndAction:
          'Mengapa berisiko: melanggar prinsip least privilege dan akuntabilitas akses.',
      },
    ],
  },
  {
    id: 2,
    moduleRef: 'MODUL 02: ANCAMAN & SERANGAN SIBER',
    topic: 'Tawaran Aplikasi Utilitas Database Versi Bajakan/Crack',
    scenario:
      'Saat menyiapkan laptop kerja baru untuk proyek implementasi BPR, Anda butuh utilitas pengolah spreadsheet dan klien database tambahan. Seseorang menyarankan mengunduh versi crack dari forum agar tidak menunggu proses lisensi. Apa yang terjadi pada tiap opsi?',
    discussionTip:
      'Bahas bagaimana rantai serangan Supply Chain dan Infostealer sering berawal dari laptop pengembang atau implementor.',
    options: [
      {
        id: 'c2-a',
        label: 'Pasang versi crack karena dianggap hanya memunculkan iklan ringan yang tidak berbahaya',
        status: 'risk',
        fieldImpact:
          'Aktivator atau crack kerap menyisipkan trojan infostealer yang diam-diam mencuri cookie sesi login, token VPN BPR, dan password di browser.',
        whyAndAction:
          'Mengapa berisiko: penyerang tidak perlu membobol firewall kantor jika sudah memegang token VPN dari laptop staf.',
      },
      {
        id: 'c2-b',
        label: 'Ajukan lisensi resmi kantor atau gunakan utilitas open-source terverifikasi dari repositori resmi',
        status: 'safe',
        fieldImpact:
          'Perangkat kerja tetap bersih dari backdoor dan bebas risiko pencurian sesi browser maupun profil VPN klien.',
        whyAndAction:
          'Menjaga kebersihan endpoint sejak hari pertama serta mematuhi standar keamanan perangkat SaaS.',
      },
      {
        id: 'c2-c',
        label: 'Matikan antivirus bawaan laptop sebentar saja selama instalasi aplikasi crack berlangsung',
        status: 'risk',
        fieldImpact:
          'Mematikan pelindung endpoint membuka jalan bagi skrip berbahaya memasang persistence sebelum antivirus menyala kembali.',
        whyAndAction:
          'Mengapa berisiko: peringatan antivirus adalah alarm dini bahwa berkas instalasi mengandung muatan berbahaya.',
      },
      {
        id: 'c2-d',
        label: 'Pasang di partisi drive D agar terpisah dari sistem operasi Windows di drive C',
        status: 'risk',
        fieldImpact:
          'Begitu program dijalankan oleh akun pengguna, prosesnya tetap bisa membaca folder profil browser dan konfigurasi VPN di seluruh disk.',
        whyAndAction:
          'Mengapa berisiko: pemisahan folder atau partisi tidak mengisolasi hak akses proses malware.',
      },
    ],
  },
  {
    id: 3,
    moduleRef: 'MODUL 03: PHISHING & SOCIAL ENGINEERING',
    topic: 'Email Peringatan Pemblokiran VPN dari Domain Tiruan',
    scenario:
      'Pukul 16.45 WIB masuk email berjudul "[MENDESAK] Sesi VPN SaaS Akan Diblokir dalam 30 Menit" dari support@sigitadi-auth-portal.com yang mengarahkan ke halaman login mirip portal kantor. Eksplorasi cara staf merespons situasi ini:',
    discussionTip:
      'Ajak kelas membaca alamat domain akar dari kanan ke kiri (membedakan sigitadi.id dengan sigitadi-auth-portal.com).',
    options: [
      {
        id: 'c3-a',
        label: 'Segera login lewat tautan tersebut karena pengirim memakai logo resmi SaaS dan tenggatnya tinggal 30 menit',
        status: 'risk',
        fieldImpact:
          'Username, password, dan kode OTP yang diketik langsung masuk ke server penyerang untuk membajak akun kerja Anda.',
        whyAndAction:
          'Mengapa berisiko: logo mudah disalin dan urgensi palsu adalah ciri klasik rekayasa sosial. Selalu periksa domain akar resmi sigitadi.id.',
      },
      {
        id: 'c3-b',
        label: 'Periksa alamat pengirim utuh, lihat bahwa domain bukan sigitadi.id, jangan klik tautan, dan konfirmasi ke tim IT via kanal internal',
        status: 'safe',
        fieldImpact:
          'Upaya pencurian kredensial gagal total dan tim IT Security dapat langsung memblokir domain tiruan bagi seluruh pegawai.',
        whyAndAction:
          'Verifikasi domain utama dan pengecekan Out-of-Band merupakan benteng utama melawan spear phishing B2B.',
      },
      {
        id: 'c3-c',
        label: 'Balas email tersebut untuk menanyakan apakah benar dari tim infrastruktur kantor',
        status: 'risk',
        fieldImpact:
          'Membalas langsung hanya menghubungi pelaku penipuan yang tentu akan meyakinkan Anda agar segera membuka tautan palsu.',
        whyAndAction:
          'Mengapa berisiko: konfirmasi tidak boleh dilakukan ke jalur yang sedang dicurigai; gunakan saluran internal terpisah.',
      },
      {
        id: 'c3-d',
        label: 'Teruskan email tersebut ke rekan satu divisi untuk menanyakan apakah mereka berani mencobanya',
        status: 'risk',
        fieldImpact:
          'Menambah peluang rekan kerja lain tidak sengaja mengklik tautan berbahaya tanpa peringatan keamanan.',
        whyAndAction:
          'Mengapa berisiko: laporkan langsung ke tim IT Security SaaS agar email bisa ditarik atau diblokir terpusat.',
      },
    ],
  },
  {
    id: 4,
    moduleRef: 'MODUL 04: PASSWORD & ACCESS MANAGEMENT',
    topic: 'Hujan Notifikasi Persetujuan MFA Pukul 02.15 WIB',
    scenario:
      'Saat Anda sedang tidur dan laptop kerja mati, ponsel bergetar menerima lima permintaan persetujuan MFA berturut-turut untuk akun portal SaaS. Bagaimana konsekuensi dari masing-masing respons?',
    discussionTip:
      'Tekankan di kelas bahwa munculnya prompt MFA tanpa aktivitas pribadi berarti kata sandi utama sudah diketahui pihak lain.',
    options: [
      {
        id: 'c4-a',
        label: 'Tekan Setujui (Approve) satu kali supaya notifikasi berhenti dan Anda bisa tidur kembali',
        status: 'risk',
        fieldImpact:
          'Penyerang langsung masuk ke akun portal SaaS dengan otorisasi sah dari perangkat MFA Anda.',
        whyAndAction:
          'Mengapa berisiko: inilah sasaran serangan MFA Fatigue (push bombing). Jangan pernah menyetujui login yang tidak Anda mulai sendiri.',
      },
      {
        id: 'c4-b',
        label: 'Tekan Tolak (Deny) pada semua permintaan, segera lapor tim IT Security, dan ganti password utama beserta pencabutan sesi aktif',
        status: 'safe',
        fieldImpact:
          'Akses penyerang tertahan oleh penolakan MFA dan celah password bocor langsung ditutup dengan rotasi kredensial.',
        whyAndAction:
          'Langkah paling tepat karena prompt MFA membuktikan password utama telah bocor dan harus segera diganti.',
      },
      {
        id: 'c4-c',
        label: 'Tekan Tolak (Deny) lalu abaikan saja sampai siang tanpa melapor karena merasa akun sudah aman',
        status: 'risk',
        fieldImpact:
          'Penyerang masih memegang kata sandi Anda dan dapat mencoba ulang login atau memakai kredensial yang sama di layanan lain.',
        whyAndAction:
          'Mengapa berisiko: penolakan MFA hanya menahan satu percobaan, bukan mengganti password yang sudah bocor.',
      },
      {
        id: 'c4-d',
        label: 'Matikan sementara fitur MFA di pengaturan profil agar ponsel tidak bergetar lagi',
        status: 'risk',
        fieldImpact:
          'Lapisan pertahanan terakhir hilang seketika sehingga penyerang langsung masuk memakai password yang sudah mereka pegang.',
        whyAndAction:
          'Mengapa berisiko: menonaktifkan MFA saat sedang diserang membuka pintu masuk selebar-lebarnya.',
      },
    ],
  },
  {
    id: 5,
    moduleRef: 'MODUL 05: DATA PROTECTION & ENKRIPSI',
    topic: 'Pengiriman Log Sensitif SaaSCore dan Sisa Dump Database',
    scenario:
      'Anda harus mengirim ekspor log konfigurasi SaaSCore ke PIC BPR lewat email, sementara di folder Downloads laptop kerja masih tersimpan file dump database dari tiket minggu lalu. Eksplorasi dampak setiap perlakuan:',
    discussionTip:
      'Ingatkan peserta tentang aturan pemisahan saluran (Out-of-Band) dan pembersihan berkas sementara pasca-tiket.',
    options: [
      {
        id: 'c5-a',
        label: 'Enkripsi lampiran dengan AES-256, kirim password pembuka lewat saluran terpisah (Out-of-Band), dan hapus file dump lama yang sudah selesai',
        status: 'safe',
        fieldImpact:
          'Berkas tetap terlindungi meski kotak masuk email disadap, dan laptop kerja tidak menumpuk data nasabah BPR yang tidak lagi diperlukan.',
        whyAndAction:
          'Memenuhi standar perlindungan data sensitif perbankan serta kebersihan penyimpanan lokal.',
      },
      {
        id: 'c5-b',
        label: 'Kirim file ZIP terenkripsi dan tulis password pembukanya di badan email yang sama agar praktis bagi PIC BPR',
        status: 'risk',
        fieldImpact:
          'Siapa pun yang menyadap atau tidak sengaja menerima terusan email tersebut langsung mendapat berkas beserta kunci pembukanya.',
        whyAndAction:
          'Mengapa berisiko: enkripsi menjadi sia-sia bila sandinya menempel di saluran yang sama.',
      },
      {
        id: 'c5-c',
        label: 'Simpan dump database BPR di folder Downloads selama berbulan-bulan sebagai arsip pribadi berjaga-jaga',
        status: 'risk',
        fieldImpact:
          'Jika laptop hilang atau terkena infostealer, seluruh salinan data nasabah klien ikut terekspos.',
        whyAndAction:
          'Mengapa berisiko: data klien berklasifikasi Rahasia/Sangat Rahasia tidak boleh menumpuk di perangkat lokal pasca-tiket.',
      },
      {
        id: 'c5-d',
        label: 'Kompres file menggunakan layanan situs konverter online gratis agar ukurannya muat di lampiran email',
        status: 'risk',
        fieldImpact:
          'Isi konfigurasi dan log sensitif SaaSCore terunggah ke server pihak ketiga publik di luar kendali SaaS dan BPR.',
        whyAndAction:
          'Mengapa berisiko: dilarang mengunggah data perusahaan atau klien ke tools publik gratis.',
      },
    ],
  },
  {
    id: 6,
    moduleRef: 'MODUL 06: ENDPOINT SECURITY & DEVICE PROTECTION',
    topic: 'Flashdisk Asing di Meja Resepsionis & Laptop Ditinggal Sebentar',
    scenario:
      'Saat pendampingan on-site di kantor BPR, Anda melihat flashdisk tanpa label di meja resepsionis, lalu beberapa menit kemudian Anda harus ke ruang rapat lain meninggalkan laptop kerja selama 5 menit. Mari cek tiap opsi tindakan:',
    discussionTip:
      'Tunjukkan bahwa serangan fisik sering memanfaatkan rasa penasaran (USB baiting) dan kelengahan beberapa menit saja.',
    options: [
      {
        id: 'c6-a',
        label: 'Colokkan flashdisk ke laptop kerja sebentar untuk melihat nama pemiliknya dari isi folder',
        status: 'risk',
        fieldImpact:
          'Media USB temuan bisa membawa skrip berbahaya atau perangkat keras BadUSB yang langsung mengeksekusi perintah di laptop Anda.',
        whyAndAction:
          'Mengapa berisiko: jangan pernah mencolokkan USB tak dikenal ke perangkat kerja maupun komputer BPR.',
      },
      {
        id: 'c6-b',
        label: 'Minimize semua jendela aplikasi SaaSCore di layar tanpa mengunci laptop karena hanya pergi 5 menit',
        status: 'risk',
        fieldImpact:
          'Orang yang melintas dalam hitungan detik dapat membuka kembali jendela aplikasi, membaca dokumen, atau menyalin file.',
        whyAndAction:
          'Mengapa berisiko: mengunci layar hanya butuh 1 detik dengan tombol Win + L.',
      },
      {
        id: 'c6-c',
        label: 'Serahkan USB temuan ke resepsionis/IT BPR tanpa dicolokkan, pastikan BitLocker/FileVault aktif, dan kunci layar (Win + L) sebelum beranjak',
        status: 'safe',
        fieldImpact:
          'Serangan BadUSB terhindari dan sesi kerja di laptop tetap terlindungi meskipun ditinggal di ruang kerja klien.',
        whyAndAction:
          'Kebiasaan endpoint bersih dan screen lock wajib dijalankan setiap kali meninggalkan meja kerja.',
      },
      {
        id: 'c6-d',
        label: 'Gunakan komputer operasional teller BPR untuk memeriksa isi flashdisk temuan tersebut',
        status: 'risk',
        fieldImpact:
          'Berpotensi menyebarkan malware langsung ke jaringan internal transaksi BPR klien.',
        whyAndAction:
          'Mengapa berisiko: keamanan lingkungan BPR jauh lebih kritis untuk dijaga dari media asing.',
      },
    ],
  },
  {
    id: 7,
    moduleRef: 'MODUL 07: NETWORK SECURITY & SAFE INTERNET',
    topic: 'Akses Server SaaSCore dari Wi-Fi Hotel Saat Dinas Luar Kota',
    scenario:
      'Saat dinas luar kota di hotel untuk migrasi data BPR, muncul jaringan Wi-Fi terbuka bernama "Hotel_Guest_Free" tanpa password, sementara Anda perlu menyalakan VPN klien BPR untuk pengecekan server. Bandingkan langkah berikut:',
    discussionTip:
      'Bahas bahaya Evil Twin Wi-Fi dan pentingnya memutus tunnel VPN klien BPR segera setelah pekerjaan selesai.',
    options: [
      {
        id: 'c7-a',
        label: 'Langsung pakai "Hotel_Guest_Free" dan klik lanjutkan jika muncul peringatan sertifikat HTTPS di browser',
        status: 'risk',
        fieldImpact:
          'Koneksi rentan disadap melalui serangan Evil Twin atau Man-in-the-Middle, dan mengabaikan peringatan HTTPS membuka celah pencurian sesi.',
        whyAndAction:
          'Mengapa berisiko: Wi-Fi publik terbuka tanpa sandi tidak menjamin keaslian titik akses jaringan.',
      },
      {
        id: 'c7-b',
        label: 'Gunakan hotspot pribadi terenkripsi WPA2/WPA3 atau VPN kantor, cek gembok HTTPS valid, lalu putuskan VPN BPR segera usai pekerjaan selesai',
        status: 'safe',
        fieldImpact:
          'Jalur koneksi terkendali dari penyadapan jaringan hotel dan akses ke jaringan BPR tidak dibiarkan terbuka melebihi kebutuhan.',
        whyAndAction:
          'Menerapkan disiplin jaringan aman serta prinsip akses seperlunya untuk koneksi VPN klien.',
      },
      {
        id: 'c7-c',
        label: 'Biarkan VPN klien BPR tetap tersambung semalaman agar besok pagi tinggal lanjut bekerja',
        status: 'risk',
        fieldImpact:
          'Memperpanjang jendela paparan sehingga jika laptop terkompromi saat dipakai aktivitas lain, akses ke BPR masih terbuka.',
        whyAndAction:
          'Mengapa berisiko: putuskan VPN BPR segera setelah tiket atau sesi maintenance selesai.',
      },
      {
        id: 'c7-d',
        label: 'Pasang ekstensi browser VPN gratis tak dikenal untuk melapisi Wi-Fi hotel',
        status: 'risk',
        fieldImpact:
          'Ekstensi pihak ketiga gratis sering membaca seluruh lalu lintas browser dan berisiko mencuri cookie sesi portal kerja.',
        whyAndAction:
          'Mengapa berisiko: gunakan hanya klien VPN resmi perusahaan dan periksa kebersihan ekstensi browser secara berkala.',
      },
    ],
  },
  {
    id: 8,
    moduleRef: 'MODUL 08: INCIDENT RESPONSE & REPORTING',
    topic: 'Rekan Tak Sengaja Klik Lampiran Berbahaya Saat VPN Aktif',
    scenario:
      'Seorang rekan tim tidak sengaja menjalankan file makro faktur palsu saat VPN BPR masih tersambung dan melihat kilatan PowerShell. Ia panik dan takut ditegur atasan. Bagaimana respons yang tepat menurut protokol SaaS?',
    discussionTip:
      'Uji pemahaman peserta atas urutan Isolate - Preserve - Report serta budaya No-Blame Reporting.',
    options: [
      {
        id: 'c8-a',
        label: 'Diam dulu 1 jam untuk melihat apakah laptop normal lagi, lalu restart berulang kali dan hapus riwayat browser',
        status: 'risk',
        fieldImpact:
          'Waktu tunda memberi ruang bagi penyerang mengeksploitasi VPN aktif, sementara restart menghapus jejak forensik di RAM.',
        whyAndAction:
          'Mengapa berisiko: menyembunyikan insiden jauh lebih membahayakan klien BPR daripada salah klik itu sendiri.',
      },
      {
        id: 'c8-b',
        label: 'Isolate (putus Wi-Fi/LAN/VPN seketika), Preserve (biarkan laptop menyala offline tanpa hapus bukti), lalu Report dalam 5 menit lewat jalur no-blame SaaS',
        status: 'safe',
        fieldImpact:
          'Pergerakan ke server BPR terhenti seketika, bukti RAM tetap utuh untuk forensic triage, dan pelapor terlindungi oleh budaya no-blame.',
        whyAndAction:
          'Standar tanggap darurat 5 menit pertama PT. Sigit Adi Aman Siber (SaaS).',
      },
      {
        id: 'c8-c',
        label: 'Matikan paksa laptop lalu format ulang SSD sebelum memberitahu koordinator insiden',
        status: 'risk',
        fieldImpact:
          'Seluruh barang bukti digital musnah sehingga tim keamanan tidak bisa memastikan data klien mana yang sempat diakses.',
        whyAndAction:
          'Mengapa berisiko: format mandiri justru menghambat investigasi dampak bagi BPR.',
      },
      {
        id: 'c8-d',
        label: 'Ganti seluruh password kerja langsung dari browser laptop yang baru saja menjalankan file mencurigakan tersebut',
        status: 'risk',
        fieldImpact:
          'Keylogger atau pencuri sesi di perangkat terdampak berpotensi langsung merekam kata sandi baru yang diketik.',
        whyAndAction:
          'Mengapa berisiko: rotasi password wajib dilakukan dari perangkat lain yang bersih.',
      },
    ],
  },
  {
    id: 9,
    moduleRef: 'MODUL 09: EMAIL, CLOUD & DIGITAL COMMUNICATION',
    topic: 'Siaran Pembaruan Sistem ke 15 BPR & Berbagi Folder Panduan',
    scenario:
      'Tim Support perlu mengirim jadwal maintenance ke 15 pejabat dari 15 BPR klien yang berbeda sekaligus menautkan folder panduan di Google Drive. Bandingkan konfigurasi yang aman dan berisiko:',
    discussionTip:
      'Soroti kaitan antara pengaturan BCC, domain email, tautan cloud Restricted, dan perlindungan data pribadi.',
    options: [
      {
        id: 'c9-a',
        label: 'Masukkan 15 email pejabat BPR ke kolom CC dan atur folder Google Drive menjadi "Anyone with the link - Viewer"',
        status: 'risk',
        fieldImpact:
          'Membocorkan daftar klien antar-BPR, memicu risiko Reply All, serta membuka dokumen teknis kepada siapa saja tanpa login.',
        whyAndAction:
          'Mengapa berisiko: melanggar kerahasiaan relasi bisnis BPR dan kontrol akses cloud.',
      },
      {
        id: 'c9-b',
        label: 'Bagikan screenshot panduan beserta IP server maintenance ke grup WhatsApp gabungan agar semua cepat membaca',
        status: 'risk',
        fieldImpact:
          'Informasi IP server tersimpan di banyak ponsel pribadi dan menyalahi aturan komunikasi aman SaaS.',
        whyAndAction:
          'Mengapa berisiko: chat grup pribadi bukan tempat berbagi detail infrastruktur produksi.',
      },
      {
        id: 'c9-c',
        label: 'Gunakan kolom BCC (atau kirim terpisah per BPR), cek domain tujuan, dan setel folder cloud Restricted ke email berwenang dengan masa kedaluwarsa',
        status: 'safe',
        fieldImpact:
          'Daftar alamat BPR tetap rahasia, terhindar dari kesalahan kirim, dan dokumen panduan hanya dibuka oleh akun yang tepat selama masa pemeliharaan.',
        whyAndAction:
          'Praktik terbaik komunikasi bisnis dan least privilege pada penyimpanan cloud.',
      },
      {
        id: 'c9-d',
        label: 'Andalkan saran auto-complete email tanpa memeriksa domain agar pengiriman cepat selesai',
        status: 'risk',
        fieldImpact:
          'Kemiripan nama antar BPR sering membuat dokumen terkirim ke klien yang salah atau alamat email pribadi.',
        whyAndAction:
          'Mengapa berisiko: biasakan pemeriksaan penerima tiga detik sebelum menekan tombol Send.',
      },
    ],
  },
  {
    id: 10,
    moduleRef: 'MODUL 10: BUDAYA KEAMANAN & 7 KEBIASAAN EMAS',
    topic: 'Budaya Saling Mengingatkan Saat Tekanan Go-Live Tengah Malam',
    scenario:
      'Menjelang go-live modul baru SaaSCore di sebuah BPR pada tengah malam, rekan satu tim hampir mengirim password darurat dan screenshot data nasabah asli ke grup WhatsApp agar proses cepat selesai. Sikap apa yang membangun Security Culture?',
    discussionTip:
      'Tutup diskusi kelas dengan mengaitkan kasus ini ke komitmen nyata 7 Kebiasaan Emas Keamanan Siber SaaS.',
    options: [
      {
        id: 'c10-a',
        label: 'Biarkan saja karena situasi darurat go-live lebih penting daripada prosedur keamanan',
        status: 'risk',
        fieldImpact:
          'Kredensial darurat dan data nasabah asli langsung tersebar ke perangkat seluruh peserta grup dan sering terlupakan setelah go-live.',
        whyAndAction:
          'Mengapa berisiko: momen terburu-buru adalah celah paling umum terjadinya kebocoran data perbankan.',
      },
      {
        id: 'c10-b',
        label: 'Ingatkan rekan secara sopan dan suportif untuk menyamarkan data nasabah serta memakai brankas secret atau jalur resmi terautentikasi',
        status: 'safe',
        fieldImpact:
          'Go-live tetap tuntas tepat waktu tanpa kebocoran data nasabah maupun rasa sungkan di antara anggota tim.',
        whyAndAction:
          'Wujud nyata Security Culture: kecepatan kerja dan keamanan berjalan seiring lewat kepedulian kolektif.',
      },
      {
        id: 'c10-c',
        label: 'Diam saat kejadian lalu mengadukannya di forum evaluasi proyek minggu depan',
        status: 'risk',
        fieldImpact:
          'Data nasabah dan kata sandi sudah telanjur tersebar selama seminggu tanpa ditangani atau dirotasi.',
        whyAndAction:
          'Mengapa berisiko: pencegahan cepat di tempat jauh lebih melindungi klien daripada menyalahkan belakangan.',
      },
      {
        id: 'c10-d',
        label: 'Minta rekan mengirimkannya lewat pesan Telegram pribadi karena dianggap bukan grup ramai',
        status: 'risk',
        fieldImpact:
          'Riwayat pesan dan gambar data nasabah tetap tersimpan tanpa enkripsi kontrol kantor dan tanpa batas waktu kedaluwarsa.',
        whyAndAction:
          'Mengapa berisiko: baik grup maupun chat pribadi di aplikasi non-brankas tetap dilarang untuk data nasabah asli dan kredensial produksi.',
      },
    ],
  },
];

const TOTAL_CASES = CROSS_MODULE_CASES.length;

interface Lab10SessionState {
  currentIdx: number;
  clickedOptionsByCase: Record<number, string[]>;
  isMarkedDone: boolean;
}

const INITIAL_LAB10_STATE: Lab10SessionState = {
  currentIdx: 0,
  clickedOptionsByCase: {},
  isMarkedDone: false,
};

export function Lab10CaseReview({
  moduleId,
  instructorMode = false,
  onMarkExplored,
}: LabProps) {
  const { resetModuleExploration } = useProgress();
  const [sessionState, setSessionState, resetSessionState] =
    useLabSessionState<Lab10SessionState>(moduleId, INITIAL_LAB10_STATE);
  const { currentIdx, clickedOptionsByCase, isMarkedDone } = sessionState;
  const [showAllExplanations, setShowAllExplanations] = useState(false);

  useEffect(() => {
    if (!instructorMode) {
      setShowAllExplanations(false);
    }
  }, [instructorMode]);

  const currentCase = CROSS_MODULE_CASES[currentIdx];
  const clickedInCurrent = currentCase ? (clickedOptionsByCase[currentCase.id] ?? []) : [];

  const exploredCasesCount = CROSS_MODULE_CASES.filter(
    (c) => (clickedOptionsByCase[c.id]?.length ?? 0) > 0
  ).length;

  const { exploredCount: effectiveExploredCount, isExplored } = computeLabProgress(
    exploredCasesCount,
    TOTAL_CASES,
    isMarkedDone,
  );

  const setCurrentIdx = (updater: number | ((prev: number) => number)) => {
    setSessionState((prev) => ({
      ...prev,
      currentIdx:
        typeof updater === 'function' ? updater(prev.currentIdx) : updater,
    }));
  };

  const handleToggleOption = (caseId: number, optionId: string) => {
    const existing = clickedOptionsByCase[caseId] ?? [];
    const nextList = existing.includes(optionId) ? existing : [...existing, optionId];
    const nextMap = { ...clickedOptionsByCase, [caseId]: nextList };
    setSessionState((prev) => ({ ...prev, clickedOptionsByCase: nextMap }));

    const nextCount = CROSS_MODULE_CASES.filter(
      (c) => (nextMap[c.id]?.length ?? 0) > 0
    ).length;
    onMarkExplored(isMarkedDone ? TOTAL_CASES : nextCount, TOTAL_CASES);
  };

  const handleToggleShowAll = () => {
    const nextShow = !showAllExplanations;
    setShowAllExplanations(nextShow);
    if (nextShow) {
      const fullMap: Record<number, string[]> = {};
      for (const item of CROSS_MODULE_CASES) {
        fullMap[item.id] = item.options.map((o) => o.id);
      }
      setSessionState((prev) => ({ ...prev, clickedOptionsByCase: fullMap }));
      onMarkExplored(TOTAL_CASES, TOTAL_CASES);
    }
  };

  const handleMarkDone = () => {
    setSessionState((prev) => ({ ...prev, isMarkedDone: true }));
    onMarkExplored(TOTAL_CASES, TOTAL_CASES);
  };

  const handleReset = () => {
    resetSessionState();
    setShowAllExplanations(false);
    resetModuleExploration(moduleId);
  };

  return (
    <LabShell
      moduleId={moduleId}
      session="siang"
      title="Simulasi Diskusi Kasus Terpadu Lintas Modul"
      instructions="Eksplorasi 10 studi kasus operasional lintas Modul 01 sampai Modul 10 untuk diskusi kelas bersama Narasumber Sigit Adi. Klik bebas setiap opsi tindakan untuk membandingkan kondisi aman dan berisiko di lapangan."
      exploredCount={effectiveExploredCount}
      totalCount={TOTAL_CASES}
      isExplored={isExplored}
      onMarkDone={handleMarkDone}
      onReset={handleReset}
    >
      <div className="space-y-5">
        {/* Case Navigator */}
        <nav
          aria-label="Navigasi daftar kasus diskusi"
          className="rounded-lg border border-slate-200 bg-white p-3.5 sm:p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
              Daftar Kasus Diskusi ({effectiveExploredCount}/{TOTAL_CASES} Kasus Dieksplorasi)
            </span>
            {instructorMode && (
              <button
                type="button"
                aria-pressed={showAllExplanations}
                onClick={handleToggleShowAll}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                {showAllExplanations ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span>
                  {showAllExplanations
                    ? 'Tutup Penjelasan Terbuka'
                    : 'Buka Semua Penjelasan Kondisi'}
                </span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
            {CROSS_MODULE_CASES.map((item, idx) => {
              const isCurrent = idx === currentIdx;
              const hasExplored = (clickedOptionsByCase[item.id]?.length ?? 0) > 0;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  aria-label={`Kasus nomor ${item.id}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`flex min-h-[44px] items-center justify-center gap-1 rounded-md border font-mono text-xs font-bold transition-colors ${
                    isCurrent
                      ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white ring-2 ring-[#047857]/40 dark:border-emerald-400 dark:bg-emerald-500 dark:text-slate-950'
                      : hasExplored
                        ? 'border-emerald-700/50 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 dark:border-emerald-500/50 dark:bg-emerald-950/40 dark:text-emerald-200'
                        : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{item.id}</span>
                  {hasExplored && !isCurrent && (
                    <CheckCircle2 className="h-3 w-3 shrink-0" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {currentCase && (
          <article className="rounded-lg border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded bg-[#0B1F3A] px-2.5 py-1 font-mono text-xs font-semibold text-emerald-300 dark:bg-slate-800">
                {currentCase.moduleRef}
              </span>
              <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">
                Kasus {currentCase.id} dari {TOTAL_CASES}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-slate-100">
              <RichTermText text={currentCase.topic} />
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-200">
              <RichTermText text={currentCase.scenario} />
            </p>

            <div className="mt-4">
              <Callout
                title="Pemicu Diskusi Kelas"
                variant="navy"
                icon={<MessageSquareText className="h-4 w-4 text-[#0B1F3A] dark:text-sky-400" aria-hidden="true" />}
              >
                <p>
                  <RichTermText text={currentCase.discussionTip} />
                </p>
              </Callout>
            </div>

            <div className="mt-5 space-y-3">
              {currentCase.options.map((opt, idx) => {
                const isInspected = showAllExplanations || clickedInCurrent.includes(opt.id);
                const letter = String.fromCharCode(65 + idx);
                return (
                  <div key={opt.id} className="space-y-2">
                    <button
                      type="button"
                      aria-expanded={isInspected}
                      onClick={() => handleToggleOption(currentCase.id, opt.id)}
                      className={`flex min-h-[44px] w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-colors ${
                        isInspected
                          ? opt.status === 'safe'
                            ? 'border-emerald-700/60 bg-emerald-50/70 text-slate-950 dark:border-emerald-500/60 dark:bg-emerald-950/30 dark:text-slate-50'
                            : 'border-rose-700/60 bg-rose-50/70 text-slate-950 dark:border-rose-500/60 dark:bg-rose-950/30 dark:text-slate-50'
                          : 'border-slate-200 bg-slate-50/70 text-slate-900 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold ${
                          isInspected
                            ? opt.status === 'safe'
                              ? 'bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950'
                              : 'bg-rose-700 text-white dark:bg-rose-500 dark:text-slate-950'
                            : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-medium leading-snug">
                        {opt.label}
                      </span>
                    </button>

                    {isInspected && (
                      <FeedbackBox
                        variant={opt.status === 'safe' ? 'safe' : 'risk'}
                        label={opt.status === 'safe' ? 'KONDISI AMAN / TEPAT' : 'KONDISI BERISIKO'}
                      >
                        <p>
                          <strong>Dampak di Lapangan:</strong>{' '}
                          <RichTermText text={opt.fieldImpact} />
                        </p>
                        <p className="mt-1">
                          <strong>Mengapa & Langkah Tepat:</strong>{' '}
                          <RichTermText text={opt.whyAndAction} />
                        </p>
                      </FeedbackBox>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Kasus Sebelumnya</span>
              </button>

              <button
                type="button"
                disabled={currentIdx >= TOTAL_CASES - 1}
                onClick={() => setCurrentIdx((prev) => Math.min(TOTAL_CASES - 1, prev + 1))}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#0B1F3A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
              >
                <span>Kasus Berikutnya</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>
        )}
      </div>
    </LabShell>
  );
}

export default Lab10CaseReview;
