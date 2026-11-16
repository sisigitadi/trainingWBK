# Training IT Security Awareness and Cybersecurity Protection 2026

**Handout Presentasi Pelatihan Keamanan Siber**

- **Penyelenggara / Domain:** sigitadi.id (2026)
- **Narasumber:** Sigit Adi Irianto, S.Kom. - sigitadi.id
- **Pendekatan:** Pembelajaran Interaktif & Simulasi Eksploratif (Tanpa Ujian / Tanpa Skor)
- **Disclaimer Konteks Contoh:** Entitas **PT. Sigit Adi Aman Siber (SaaS)** dan produk *Core Banking System* **SaaSCore** dalam seluruh materi dan studi kasus ini adalah **entitas fiktif (rekaan tidak nyata)**. Keduanya dihadirkan murni sebagai ilustrasi contoh untuk memudahkan pemahaman serta menyelaraskan pengalaman belajar dengan alur kerja operasional peserta sehari-hari.

## Rundown Jadwal Pelatihan

| Sesi | Waktu | Durasi | Modul |
| :--- | :--- | :--- | :--- |
| Sesi Pagi | 08.30 - 09.10 | 40 menit | Modul 01: Fundamental IT Security dan Prinsip Cybersecurity |
| Sesi Pagi | 09.10 - 09.50 | 40 menit | Modul 02: Pengenalan Ancaman dan Serangan Siber |
| Sesi Pagi | 10.05 - 10.50 | 45 menit | Modul 03: Phishing Awareness dan Social Engineering |
| Sesi Pagi | 10.50 - 11.30 | 45 menit | Modul 04: Password Security dan Access Management |
| Sesi Pagi | 11.30 - 12.00 | 30 menit | Modul 05: Data Protection dan Information Security |
| Sesi Siang | 13.00 - 13.40 | 40 menit | Modul 06: Endpoint Security dan Device Protection |
| Sesi Siang | 13.40 - 14.20 | 40 menit | Modul 07: Network Security dan Safe Internet Practices |
| Sesi Siang | 14.20 - 14.55 | 35 menit | Modul 08: Cybersecurity Incident Response dan Reporting |
| Sesi Siang | 14.55 - 15.30 | 35 menit | Modul 09: Email, Cloud, dan Digital Communication Security |
| Sesi Siang | 15.30 - 16.00 | 30 menit | Modul 10: Cybersecurity Best Practices dan Security Awareness Culture |

---

## Modul 01: Fundamental IT Security dan Prinsip Cybersecurity

**Jadwal:** Sesi Pagi (08.30 - 09.10) | **Durasi:** 40 menit

> Memahami bagaimana setiap konfigurasi, akses database, dan kebiasaan harian tim PT. Sigit Adi Aman Siber (SaaS) menjaga kepercayaan nasabah BPR pengguna SaaSCore.

### Tujuan Pembelajaran

- Membedakan fokus IT Security operasional dan Cybersecurity di lingkungan vendor teknologi perbankan.
- Menguraikan tiga pilar segitiga CIA (Confidentiality, Integrity, Availability) pada layanan Core Banking System SaaSCore.
- Menjelaskan peran pegawai IT sebagai Human Firewall di garis pertahanan pertama layanan BPR.
- Mengklasifikasikan insiden teknis harian ke dalam dampak kerahasiaan, integritas, atau ketersediaan sistem.

### Materi Inti

#### Keamanan Siber Dimulai dari Meja Kerja Vendor

PT. Sigit Adi Aman Siber (SaaS) mengemban kepercayaan tinggi sebagai pengembang dan pengelola Core Banking System SaaSCore untuk berbagai BPR dan lembaga keuangan mitra. Pelaku ancaman kerap mengincar vendor teknologi karena satu akses remote, skrip patch, atau perangkat kerja tim support yang lemah dapat menjadi jalan pintas menuju jaringan banyak bank sekaligus.

- Kredensial VPN, SSH, dan RDP menuju server BPR mitra merupakan aset kritikal di laptop tim support.
- Kode sumber, skrip migrasi, dan paket pembaruan SaaSCore harus terjaga keasliannya sebelum dikirim ke klien.
- Salinan database uji coba maupun log transaksi tetap berpotensi memuat jejak informasi sensitif nasabah.

#### Segitiga CIA dalam Operasional SaaSCore

Seluruh kontrol keamanan informasi bertumpu pada tiga pilar segitiga CIA: Confidentiality (kerahasiaan), Integrity (integritas), dan Availability (ketersediaan). Di lingkungan perbankan berbasis SaaSCore, gangguan pada salah satu pilar langsung berdampak pada kepercayaan nasabah, keakuratan pembukuan BPR, dan kepatuhan regulasi.

- Confidentiality: Melindungi CIF (Customer Information File), NIK, nomor rekening, dan mutasi tabungan agar hanya diakses pihak berwenang.
- Integrity: Menjamin saldo rekening, perhitungan bunga deposito, dan jurnal akuntansi tidak berubah tanpa otorisasi sah.
- Availability: Memastikan modul teller, layanan digital, dan proses End of Day (EOD) berjalan lancar sesuai jam layanan bank.

#### Dilema Kecepatan Support vs Prosedur Keamanan

Tim support dan implementator sering menghadapi tekanan tinggi saat antrean teller BPR padat atau proses tutup buku harian mengalami kendala. Dalam kondisi mendesak, jalan pintas seperti meminta salinan data produksi lewat chat atau menjalankan perintah SQL tanpa uji staging justru sering memicu insiden baru yang lebih sulit dipulihkan.

- Setiap perubahan data produksi wajib tercatat dalam tiket resmi dengan persetujuan pihak berwenang di BPR.
- Gunakan akun individual agar Audit Trail mencatat pelaku dan waktu perubahan secara jelas tanpa akun admin bersama.
- Lakukan backup titik pemulihan sebelum mengeksekusi skrip perbaikan pada database operasional.

#### Manusia sebagai Human Firewall

Firewall, antivirus, dan enkripsi hanyalah alat bantu yang bekerja mengikuti keputusan manusia di belakang layar. Membangun Human Firewall berarti membiasakan verifikasi sebelum bertindak, memisahkan lingkungan kerja secara disiplin, dan berani melapor cepat ketika menemukan kejanggalan sistem sekecil apa pun.

- Berpikir sejenak sebelum membuka lampiran, mengunduh utilitas luar, atau menyetujui permintaan akses mendadak.
- Pisahkan secara tegas akun, kata sandi, dan data uji coba lokal dari lingkungan produksi BPR.
- Anggap ketelitian keamanan sebagai standar kualitas layanan tim SaaS, bukan beban tambahan.

### Analogi Sehari-hari: Analogi Mobil Lapis Baja Pengangkut Uang Tunai

Layanan SaaSCore dan tim SaaS ibarat armada mobil lapis baja bank: Confidentiality adalah kaca gelap dan dinding baja yang menutup isi muatan, Integrity adalah segel bernomor seri agar nominal uang tidak selisih satu rupiah pun, sedangkan Availability adalah mesin prima agar mobil tiba sebelum loket buka. Sebagus apa pun mobilnya, semua percuma jika pengemudi meninggalkan kunci kontak tergantung di pintu.

### Studi Kasus Operasional SaaS / SaaSCore

#### [Ilustrasi Skenario] Ekspor Data CIF ke Laptop Pribadi untuk Analisis SLIK

- **Konteks:** Seorang implementator SaaS menangani tiket BPR terkait ketidaksesuaian format data identitas pada laporan SLIK OJK yang dihasilkan SaaSCore.
- **Kejadian:** Agar bisa memeriksa data dari rumah setelah jam kerja, ia mengekspor tabel CIF berisi nama, NIK, alamat, dan nomor rekening ribuan nasabah ke berkas CSV tanpa enkripsi, lalu menyalinnya ke flashdisk pribadi.
- **Pembelajaran:** Memindahkan data nasabah keluar dari perangkat kerja terkendali melanggar pilar Confidentiality dan membuka risiko kebocoran data apabila flashdisk hilang atau komputer rumah terinfeksi malware.

#### [Ilustrasi Skenario] Koreksi Bunga Langsung di Database Produksi Jelang EOD

- **Konteks:** Menjelang proses End of Day (EOD) di salah satu BPR mitra, ditemukan selisih pembulatan bunga pada beberapa kelompok rekening deposito.
- **Kejadian:** Karena khawatir EOD terlambat, engineer langsung menjalankan skrip SQL pembaruan di database produksi tanpa uji staging dan tanpa backup terbaru. Klausa kondisi yang terlalu luas menimpa kolom bunga ribuan rekening lain menjadi nol sehingga layanan teller pagi terhenti untuk rekonsiliasi manual.
- **Pembelajaran:** Kelalaian menjaga pilar Integrity melalui perubahan tanpa uji coba langsung merembet menjadi gangguan Availability layanan perbankan.

### Lakukan (Do) vs Hindari (Don't)

| Lakukan (Do) | Hindari (Don't) | Mengapa |
| :--- | :--- | :--- |
| Petakan dampak Confidentiality, Integrity, dan Availability sebelum mengeksekusi perbaikan di server klien. | Langsung menjalankan skrip perbaikan darurat hanya agar pesan error cepat hilang dari layar. | Mencegah perbaikan satu gejala teknis memicu kerusakan integritas pembukuan atau matinya layanan teller BPR. |
| Gunakan data sintetis atau data yang sudah disamarkan saat mereproduksi bug SaaSCore di lingkungan lokal. | Menyimpan salinan mentah database produksi nasabah di folder kerja atau media pribadi tanpa enkripsi. | Data produksi memuat informasi pribadi dan keuangan nasabah yang wajib dijaga kerahasiaannya. |
| Catat setiap perubahan konfigurasi atau koreksi data melalui tiket resmi dengan otorisasi BPR. | Mengeksekusi perubahan saldo atau parameter produk hanya berdasarkan pesan chat informal. | Menjaga kejelasan Audit Trail saat pemeriksaan internal bank maupun audit regulator. |
| Gunakan akun login individual yang terikat pada masing-masing pegawai saat mengakses infrastruktur. | Memakai satu akun administrator bersama untuk seluruh anggota tim implementasi. | Memastikan akuntabilitas setiap perintah yang dijalankan di sistem produksi maupun staging. |
| Lakukan backup terverifikasi dan uji di staging sebelum menyentuh lingkungan produksi klien. | Menguji kueri pembaruan massal langsung pada database utama yang sedang melayani transaksi. | Memberi titik pemulihan aman jika logika skrip menimbulkan dampak yang tidak terduga. |

### Kamus Istilah & Kalimat Teknis

| Istilah | Penjelasan Sederhana | Konteks SaaSCore |
| :--- | :--- | :--- |
| **Confidentiality (Kerahasiaan)** | Prinsip memastikan informasi sensitif hanya boleh dilihat dan diakses oleh pihak yang memiliki izin sah. | Di SaaSCore, data identitas dan mutasi rekening nasabah BPR tidak boleh bocor ke pihak luar maupun perangkat pribadi. |
| **Integrity (Integritas)** | Prinsip menjaga keakuratan, keutuhan, dan keaslian data agar tidak diubah secara keliru atau tanpa otorisasi. | Menjamin angka saldo tabungan, jadwal kredit, dan jurnal akuntansi BPR tetap tepat setiap saat. |
| **Availability (Ketersediaan)** | Prinsip memastikan sistem dan data selalu siap digunakan oleh pihak berwenang saat dibutuhkan. | Menjaga aplikasi SaaSCore, layanan teller, dan proses EOD BPR tidak lumpuh saat jam operasional. |
| **CIF (Customer Information File)** | Berkas atau tabel data induk yang menyimpan profil lengkap nasabah seperti nama, NIK, alamat, dan kontak. | Tabel CIF di SaaSCore tergolong data sangat sensitif karena memuat identitas pribadi nasabah bank. |
| **Audit Trail** | Rekaman jejak kronologis yang mencatat siapa melakukan tindakan apa, kapan, dan dari mana di dalam sistem. | Dibutuhkan tim SaaS dan auditor BPR untuk menelusuri penyebab perubahan data atau insiden akses. |
| **Human Firewall** | Ketahanan keamanan yang bersumber dari kewaspadaan dan kebiasaan kerja aman setiap pengguna atau pegawai. | Pegawai IT SaaS menjadi benteng pertama sebelum ancaman menyentuh server SaaSCore. |

### Panduan Narasumber (Sigit Adi Irianto, S.Kom.)

**Poin Penyampaian Utama:**

- Buka sesi dengan menegaskan posisi strategis PT. Sigit Adi Aman Siber (SaaS) sebagai vendor tepercaya BPR: menjaga SaaSCore berarti menjaga kepercayaan nasabah bank.
- Gunakan analogi mobil lapis baja untuk menjelaskan perbedaan Confidentiality, Integrity, dan Availability secara cepat tanpa istilah berbelit.
- Bahas dua ilustrasi skenario secara interaktif: minta peserta menebak pilar CIA mana yang paling terdampak sebelum membuka pelajaran kasus.
- Tutup materi dengan menuntun peserta mencoba Lab 01 untuk mengeksplorasi dampak dan mitigasi tiap pilar CIA.

**Pemantik Diskusi Kelas:** Dalam rutinitas support atau implementasi SaaSCore di BPR, jalan pintas apa yang paling sering diminta klien saat kondisi darurat, dan bagaimana cara aman menolak atau menggantinya tanpa menghambat operasional?

### Poin Kunci & Simulasi Eksploratif

- Keamanan di meja kerja tim PT. Sigit Adi Aman Siber (SaaS) berdampak langsung pada keamanan seluruh BPR pengguna SaaSCore.
- Setiap tindakan teknis harus menjaga keseimbangan tiga pilar CIA: kerahasiaan data, keakuratan transaksi, dan ketersediaan layanan.
- Kecepatan support tetap harus berjalan beriringan dengan otorisasi tiket, akun individual, backup, dan uji staging.
- Human Firewall terbentuk dari kebiasaan verifikasi dan keterbukaan melapor ketika melihat anomali.

**Simulasi Terkait:** Lab 01: Klasifikasi Dampak CIA - Eksplorasi interaktif empat skenario operasional SaaSCore dan layanan support SaaS untuk memetakan dampak Confidentiality, Integrity, atau Availability beserta pilihan mitigasi aman dan berisiko.

---

## Modul 02: Pengenalan Ancaman dan Serangan Siber

**Jadwal:** Sesi Pagi (09.10 - 09.50) | **Durasi:** 40 menit

> Mengenali anatomi ancaman modern yang menargetkan vendor teknologi keuangan sebagai batu loncatan menuju sistem perbankan.

### Tujuan Pembelajaran

- Menjelaskan konsep Supply Chain Attack dan alasan vendor Core Banking menjadi target bernilai tinggi.
- Menguraikan tahapan kerja Ransomware dari celah akses awal hingga penyanderaan server dan backup.
- Mengidentifikasi bahaya Credential Stuffing akibat penggunaan ulang kata sandi di situs eksternal.
- Mengenali penyamaran Trojan dan Malicious Attachment di alur kerja teknis pegawai IT.

### Materi Inti

#### Supply Chain Attack: Menargetkan Vendor untuk Masuk ke Banyak Bank

Pelaku kejahatan siber semakin sering melancarkan Supply Chain Attack dengan menyerang penyedia perangkat lunak seperti PT. Sigit Adi Aman Siber (SaaS) terlebih dahulu. Jika akses pemeliharaan vendor atau jalur distribusi pembaruan SaaSCore berhasil disusupi, penyerang berpotensi menjangkau banyak jaringan BPR mitra melalui kepercayaan teknis yang sudah ada.

- Titik rawan meliputi akun VPN support ke klien, server build, dan repositori kode internal.
- Pustaka pihak ketiga atau dependensi open-source yang tidak diperiksa keasliannya dapat membawa kode sisipan.
- Menjaga keamanan internal SaaS berarti memutus jalur serangan berantai menuju seluruh BPR pengguna SaaSCore.

#### Ransomware dan Ancaman Pemerasan Ganda

Ransomware modern tidak hanya mengunci berkas di satu komputer, tetapi menyebar diam-diam ke server jaringan untuk mencuri data sensitif terlebih dahulu sebelum mengenkripsi database dan salinan cadangan. Pola yang dikenal sebagai Double Extortion ini memaksa organisasi menghadapi lumpuhnya layanan sekaligus ancaman kebocoran data nasabah.

- Sering bermula dari port remote access terbuka atau kredensial VPN tanpa autentikasi multifaktor.
- Penyerang melakukan Lateral Movement untuk mencari domain controller, server database, dan repositori backup.
- Salinan backup yang selalu terhubung online ke jaringan yang sama berisiko ikut terenkripsi.

#### Credential Stuffing: Efek Domino Kata Sandi yang Sama

Ketika sebuah situs forum, toko daring, atau aplikasi publik mengalami kebocoran database pengguna, pasangan email dan kata sandi tersebut langsung tersebar di internet. Melalui teknik Credential Stuffing, skrip otomatis mencoba jutaan kombinasi bocoran itu secara beruntun ke portal webmail, VPN, atau sistem tiket SaaS.

- Penggunaan ulang kata sandi antara akun pribadi dan akun kantor membuat kebocoran luar berdampak ke internal.
- Mendaftarkan alamat email domain `sigitadi.id` di layanan luar mempermudah pemetaan target oleh penyerang.
- Kredensial bocor tampak seperti login sah apabila portal belum dilindungi autentikasi multifaktor.

#### Trojan dan Malicious Attachment di Perangkat Kerja

Di lingkungan pegawai IT, Trojan jarang menyamar sebagai hadiah undian, melainkan sebagai alat bantu kerja seperti utilitas SQL bajakan, aktivator lisensi, atau lampiran dokumen bermasalah berformat arsip ZIP. Begitu dijalankan, varian Infostealer langsung menyedot cookie sesi browser, kata sandi tersimpan, dan konfigurasi SSH secara senyap.

- Program bajakan dan crack hampir selalu menyisipkan malware pencuri kredensial dan sesi VPN.
- Waspadai berkas dengan ekstensi ganda seperti `bukti_mutasi.pdf.exe` atau dokumen Office yang meminta pengaktifan makro.
- Gunakan hanya perangkat lunak resmi dan skrip yang telah diverifikasi tim infrastruktur SaaS.

### Analogi Sehari-hari: Analogi Bengkel Pembuat Kunci Kompleks Perumahan

Jika kantor BPR adalah rumah dengan pagar tinggi dan gembok kokoh, maka PT. Sigit Adi Aman Siber adalah bengkel pembuat kunci yang menyimpan akses perawatan rutin. Pencuri yang cerdik tidak perlu memanjat pagar satu per satu; ia cukup menyusup ke bengkel kunci dan menyalin master key di meja teknisi agar seluruh rumah ikut terancam.

### Studi Kasus Operasional SaaS / SaaSCore

#### [Ilustrasi Skenario] Client Database Bajakan Pencuri Sesi VPN

- **Konteks:** Seorang developer membutuhkan aplikasi manajemen database dengan fitur ekspor cepat untuk menguji kueri modul kredit SaaSCore.
- **Kejadian:** Ia mengunduh versi bajakan beserta file aktivator dari blog tidak resmi alih-alih meminta lisensi resmi melalui tim infrastruktur SaaS. Aktivator tersebut menanamkan Trojan Infostealer yang mencuri cookie sesi browser, konfigurasi SSH, dan profil koneksi VPN klien yang tersimpan.
- **Pembelajaran:** Menggunakan software bajakan di laptop kerja membuka akses jaringan internal SaaS dan server BPR tanpa penyerang perlu membobol firewall.

#### [Ilustrasi Skenario] Password Lama Membuka Portal Dokumentasi Teknis

- **Konteks:** Portal dokumentasi teknis internal SaaS yang memuat catatan integrasi SaaSCore dapat diakses tim lapangan melalui internet.
- **Kejadian:** Salah satu staf memakai kata sandi yang sama dengan akun pribadinya di sebuah situs belajar online yang pernah mengalami kebocoran data. Pelaku menjalankan skrip Credential Stuffing hingga berhasil masuk ke portal dan mengunduh dokumen topologi jaringan BPR.
- **Pembelajaran:** Mendaur ulang kata sandi membuat ketahanan akun kerja ikut runtuh ketika layanan eksternal yang tidak terkait mengalami kebocoran.

### Lakukan (Do) vs Hindari (Don't)

| Lakukan (Do) | Hindari (Don't) | Mengapa |
| :--- | :--- | :--- |
| Gunakan perangkat lunak berlisensi resmi atau open-source yang sudah disetujui tim infrastruktur SaaS. | Menginstal software bajakan, crack, keygen, atau skrip acak dari internet ke perangkat kerja. | Aktivator software bajakan merupakan jalur utama masuknya Trojan Infostealer pencuri token sesi dan VPN. |
| Gunakan kata sandi unik untuk setiap akun kantor dan pisahkan email kerja dari layanan publik pribadi. | Memakai ulang kata sandi kantor atau email `sigitadi.id` di forum, toko online, atau aplikasi hiburan. | Mencegah serangan Credential Stuffing memanfaatkan kebocoran data dari situs pihak ketiga. |
| Periksa sumber pustaka kode, checksum paket rilis, dan integritas skrip sebelum dikirim ke server BPR. | Memasukkan dependensi atau paket pembaruan ke alur distribusi klien tanpa verifikasi keaslian. | Memutus risiko Supply Chain Attack yang dapat menyebar ke seluruh jaringan BPR pengguna SaaSCore. |
| Pastikan salinan backup database terisolasi dan tidak dapat dimodifikasi langsung dari server produksi. | Menyimpan seluruh backup pada folder bersama yang terhubung aktif terus-menerus ke jaringan kerja. | Mencegah Ransomware mengenkripsi data utama sekaligus seluruh salinan pemulihannya. |
| Aktifkan tampilan ekstensi file lengkap dan tolak lampiran arsip mencurigakan dari pengirim tak terkonfirmasi. | Langsung mengeksekusi berkas di dalam ZIP berpassword hanya karena judulnya menyerupai tiket atau berita acara. | Ekstensi ganda dan arsip berpassword kerap dipakai untuk mengelabui pemindaian antivirus dan mata pengguna. |

### Kamus Istilah & Kalimat Teknis

| Istilah | Penjelasan Sederhana | Konteks SaaSCore |
| :--- | :--- | :--- |
| **Supply Chain Attack** | Serangan siber yang menyusupi vendor atau pemasok tepercaya untuk menargetkan organisasi klien di hilir. | Jika akun atau paket rilis SaaS disusupi, dampaknya bisa mengancam banyak BPR pengguna SaaSCore sekaligus. |
| **Ransomware** | Perangkat lunak berbahaya yang mengunci dan mengenkripsi data atau server hingga korban membayar tebusan. | Dapat melumpuhkan database transaksi SaaSCore dan menghentikan layanan teller BPR. |
| **Double Extortion** | Taktik pemerasan ganda di mana penyerang mencuri data terlebih dahulu sebelum mengenkripsi sistem. | Penyerang mengancam menyebarkan data nasabah BPR ke publik selain meminta tebusan pembuka kunci. |
| **Credential Stuffing** | Teknik mencoba pasangan email dan kata sandi hasil kebocoran situs lain secara otomatis ke berbagai portal. | Berhasil menembus akun portal SaaS bila pegawai memakai kata sandi yang sama dengan akun pribadinya. |
| **Trojan / Infostealer** | Program berbahaya yang menyamar sebagai aplikasi atau file normal untuk mencuri kata sandi dan sesi login. | Sering terbawa oleh aktivator software bajakan di laptop engineer atau tim support. |
| **Lateral Movement** | Pergerakan penyerang dari satu perangkat terkompromi ke server atau komputer lain di dalam jaringan. | Terjadi jika satu laptop support yang terhubung VPN BPR berhasil dikuasai penyerang. |

### Panduan Narasumber (Sigit Adi Irianto, S.Kom.)

**Poin Penyampaian Utama:**

- Tanyakan kepada peserta mengapa penyerang lebih tertarik membobol laptop staf SaaS daripada langsung membobol firewall BPR.
- Jelaskan keempat ancaman utama (Supply Chain, Ransomware, Credential Stuffing, Trojan) dengan fokus pada titik masuk paling umum di tim IT.
- Tekankan bahaya nyata software bajakan dan keygen sebagai pembawa Infostealer pencuri cookie sesi browser.
- Arahkan peserta membuka Lab 02 untuk menelusuri empat titik alur kerja tiket support dan membandingkan kontrol yang memutus serangan.

**Pemantik Diskusi Kelas:** Dari empat vektor ancaman di modul ini, titik mana dalam alur kerja harian tim SaaS yang paling berisiko membuka jalan ke jaringan BPR klien, dan kontrol sederhana apa yang bisa langsung diterapkan minggu ini?

### Poin Kunci & Simulasi Eksploratif

- Vendor Core Banking menjadi target utama Supply Chain Attack karena terhubung ke banyak BPR mitra sekaligus.
- Ransomware modern menggabungkan enkripsi sistem dengan pencurian data (Double Extortion) dan mengincar backup yang tidak terisolasi.
- Credential Stuffing berhasil hanya jika pegawai mendaur ulang kata sandi yang pernah bocor di layanan lain.
- Disiplin bebas software bajakan dan kewaspadaan terhadap lampiran adalah kunci mencegah infeksi Trojan.

**Simulasi Terkait:** Lab 02: Radar Deteksi Jalur Serangan - Eksplorasi empat titik alur kerja harian support SaaSCore (terima tiket, unduh lampiran, koneksi VPN klien, hingga kirim balasan) untuk melihat bagaimana tiap kontrol memutus atau meloloskan jalur serangan.

---

## Modul 03: Phishing Awareness dan Social Engineering

**Jadwal:** Sesi Pagi (10.05 - 10.50) | **Durasi:** 45 menit

> Membongkar teknik manipulasi psikologis, Spear Phishing B2B, pemalsuan identitas, dan domain tiruan yang menyasar tim operasional SaaS.

### Tujuan Pembelajaran

- Mengenali tiga pemicu psikologis utama dalam Social Engineering yaitu Urgency, Fear, dan Authority.
- Mengidentifikasi pola Spear Phishing B2B yang memanfaatkan konteks proyek SaaSCore dan mitra BPR.
- Memeriksa indikator Email Spoofing dan penyamaran akun WhatsApp di balik nama tampilan pengirim.
- Mendeteksi jebakan Typosquatting yang meniru domain resmi sigitadi.id melalui pemeriksaan Domain Akar.

### Materi Inti

#### Manipulasi Psikologis: Urgency, Fear, dan Authority

Social Engineering menargetkan sisi psikologis manusia agar korban mengambil keputusan terburu-buru sebelum sempat berpikir logis. Pelaku memanfaatkan dorongan alami pegawai IT yang ingin sigap melayani klien, takut dimarahi atasan, dan patuh pada instruksi pimpinan.

- Urgency: Mendesak tindakan segera dalam hitungan menit dengan alasan layanan teller atau transaksi sedang terhenti.
- Fear: Mengancam sanksi pelanggaran, penutupan akun otomatis hari ini, atau komplain resmi dari direksi BPR.
- Authority: Mengaku sebagai pimpinan PT. Sigit Adi Aman Siber, auditor, atau direktur bank agar staf enggan memverifikasi balik.

#### Spear Phishing B2B di Lingkungan Vendor Core Banking

Berbeda dengan spam acak yang mudah dikenali, Spear Phishing B2B disusun secara khusus berdasarkan riset informasi publik perusahaan. Penyerang merangkai pesan menggunakan nama pegawai, produk SaaSCore, istilah UAT, migrasi data, atau nama BPR mitra agar terasa sangat akrab dan masuk akal.

- Menggunakan jargon teknis perbankan seperti pelaporan SLIK, penyesuaian parameter bunga, atau berita acara UAT.
- Mengirim lampiran HTML atau arsip terenkripsi yang seolah berisi dokumen revisi proyek dari BPR mitra.
- Meminta korban login ulang melalui tautan tertentu untuk mengunduh berkas atau memverifikasi akses proyek.

#### Email Spoofing dan Penyamaran WhatsApp

Pada sistem email, kolom Display Name dapat ditulis sesuka hati menjadi nama pimpinan atau staf bank, sementara alamat email sebenarnya di dalam tanda kurung berasal dari domain asing. Pola serupa juga marak di WhatsApp ketika pelaku memakai foto profil atasan pada nomor baru dengan alasan ponsel utama sedang bermasalah.

- Selalu periksa alamat email lengkap setelah Display Name serta alamat Reply-To sebelum membalas atau mengklik isi pesan.
- Arahkan kursor (hover) pada tautan atau tombol di email untuk memeriksa URL tujuan sebenarnya sebelum mengklik.
- Lakukan Verifikasi Out-of-Band lewat panggilan suara ke nomor resmi tersimpan jika ada nomor baru meminta OTP atau akses.

#### Typosquatting: Membedakan sigitadi.id dan Domain Tiruan

Typosquatting memanfaatkan kemiripan huruf dan kebiasaan membaca cepat untuk menipu korban agar membuka halaman login palsu, misalnya mengganti `sigitadi.id` menjadi `sigitadi-support.id`, `s1gitadi.id`, atau memakai subdomain mengecoh seperti `sigitadi.id.login-verify.net`. Begitu kredensial dan kode OTP dimasukkan, data langsung jatuh ke tangan penyerang.

- Cara aman membaca URL adalah menemukan Domain Akar tepat di sebelah kiri garis miring pertama (`/`).
- Waspadai karakter mirip (homoglyph) seperti `rn` menggantikan `m`, angka `0` menggantikan `o`, atau huruf `l` kecil dan `I` besar.
- Akses portal kritikal seperti webmail, VPN, dan sistem tiket selalu melalui bookmark resmi, bukan tautan dari pesan masuk.

### Analogi Sehari-hari: Analogi Petugas Listrik Gadungan yang Mengaku Darurat

Seseorang mengetuk pintu rumah mengenakan rompi mirip petugas listrik dan berteriak bahwa kabel depan akan terbakar dalam dua menit jika ia tidak segera memeriksa meteran di dalam. Karena panik melihat seragam yang tampak meyakinkan, pemilik rumah bisa lupa menelepon kantor resmi untuk memastikan surat tugasnya. Seragam itu adalah Display Name dan domain tiruan, sedangkan ancaman kebakaran dalam dua menit adalah pemicu Fear dan Urgency.

### Studi Kasus Operasional SaaS / SaaSCore

#### [Ilustrasi Skenario] WhatsApp Nomor Baru Mengatasnamakan Pimpinan saat Piket

- **Konteks:** Seorang staf support SaaS sedang menjalani jadwal piket pemantauan sistem ketika menerima pesan WhatsApp dari nomor tidak dikenal dengan foto profil pimpinan perusahaan.
- **Kejadian:** Pengirim mengaku nomor lamanya sedang diperbarui saat rapat bersama BPR dan meminta staf segera mengirimkan tautan reset akses serta kode OTP portal admin untuk keperluan demo mendadak. Sebelum mengirim apa pun, staf tersebut menelepon nomor kontak resmi sang pimpinan yang tersimpan di buku alamatnya dan memastikan pesan itu adalah penipuan.
- **Pembelajaran:** Pemicu Authority dan Urgency di aplikasi pesan instan wajib dipatahkan dengan Verifikasi Out-of-Band melalui kanal komunikasi resmi yang terpisah.

#### [Ilustrasi Skenario] Email Pembaruan Profil VPN dari Domain Tiruan

- **Konteks:** Beberapa pegawai SaaS menerima email bertajuk pemberitahuan penutupan akses VPN pada sore hari dengan logo perusahaan yang rapi.
- **Kejadian:** Pesan mengancam akses ke seluruh server BPR akan terputus otomatis bila pengguna tidak melakukan validasi ulang lewat tombol di email. Pemeriksaan alamat pengirim dan tujuan tombol menunjukkan domain `portal-sigitadi.co-id.site` bukan `sigitadi.id`, sehingga tim segera melaporkan email tersebut agar seluruh pegawai waspada.
- **Pembelajaran:** Kerapian logo dan tata bahasa tidak menjamin keaslian pesan; validasi Domain Akar dan kebiasaan menggunakan bookmark resmi adalah kunci pencegahan.

### Lakukan (Do) vs Hindari (Don't)

| Lakukan (Do) | Hindari (Don't) | Mengapa |
| :--- | :--- | :--- |
| Periksa Domain Akar URL tepat sebelum garis miring pertama dari kanan ke kiri sebelum memasukkan kredensial. | Mengklik tombol login dari email atau pesan chat lalu langsung mengetik username dan kata sandi. | Menghindari jebakan Typosquatting dan subdomain palsu yang meniru tampilan portal `sigitadi.id`. |
| Terapkan Verifikasi Out-of-Band melalui telepon atau kanal internal resmi untuk permintaan akses, OTP, atau perubahan data sensitif. | Menyetujui permintaan mendesak hanya karena pengirim memakai foto profil atau nama tampilan pimpinan. | Nama tampilan email dan nomor WhatsApp baru sangat mudah dipalsukan oleh pelaku Social Engineering. |
| Gunakan bookmark browser resmi untuk membuka webmail, portal tiket, Git, dan gateway VPN setiap hari. | Membuka portal kritikal lewat tautan hasil pencarian mesin pencari atau tautan terusan di grup chat. | Bookmark memastikan Anda selalu mengakses domain asli perusahaan tanpa risiko salah ketik. |
| Berhenti sejenak untuk memeriksa fakta setiap kali pesan memancing emosi panik, takut, atau tergesa-gesa. | Menuruti tenggat waktu buatan yang mendesak tanpa mengonfirmasi keabsahan permintaan. | Menghilangkan pengaruh taktik Urgency dan Fear yang dirancang untuk melumpuhkan kehati-hatian. |
| Laporkan pesan phishing atau peniruan identitas yang diterima kepada tim keamanan internal SaaS. | Sekadar menghapus pesan mencurigakan tanpa memberi peringatan kepada rekan kerja lain. | Serangan Spear Phishing B2B sering dikirim serentak ke banyak staf sehingga laporan cepat melindungi seluruh tim. |

### Kamus Istilah & Kalimat Teknis

| Istilah | Penjelasan Sederhana | Konteks SaaSCore |
| :--- | :--- | :--- |
| **Social Engineering** | Teknik memanipulasi psikologis manusia agar bersedia membocorkan informasi rahasia atau melakukan tindakan berisiko. | Pelaku sering menyamar sebagai atasan atau staf IT BPR agar pegawai SaaS menyerahkan akses tanpa curiga. |
| **Spear Phishing B2B** | Serangan phishing yang ditargetkan khusus kepada karyawan perusahaan tertentu dengan konteks bisnis yang realistis. | Menggunakan istilah proyek SaaSCore, UAT, atau nama BPR mitra sebagai umpan. |
| **Email Spoofing** | Pemalsuan identitas pengirim email sehingga nama tampilan atau alamat terlihat seolah berasal dari pihak tepercaya. | Meniru nama pimpinan SaaS atau direksi bank untuk mengelabui tim support. |
| **Typosquatting** | Pendaftaran domain internet yang ejaannya hampir identik dengan domain resmi untuk menipu pengguna yang kurang teliti. | Contoh tiruan seperti `s1gitadi.id` atau `sigitadi-auth.com` yang menyamar sebagai domain resmi `sigitadi.id`. |
| **Domain Akar (Root Domain)** | Nama domain utama yang terletak tepat sebelum garis miring pertama dan menjadi penentu pemilik situs sebenarnya. | Pada `portal.sigitadi.id.cek-akses.net`, pemilik aslinya adalah `cek-akses.net`, bukan `sigitadi.id`. |
| **Verifikasi Out-of-Band** | Konfirmasi keaslian permintaan melalui saluran komunikasi lain yang terpisah dan sudah diketahui valid. | Menelepon langsung nomor resmi pimpinan atau staf BPR sebelum memproses permintaan reset akses dari WhatsApp. |

### Panduan Narasumber (Sigit Adi Irianto, S.Kom.)

**Poin Penyampaian Utama:**

- Tunjukkan bagaimana tiga pemicu psikologis (Urgency, Fear, Authority) sering muncul bersamaan dalam pesan WhatsApp maupun email kantor.
- Peragakan cara membaca URL dari kanan ke kiri sebelum garis miring pertama untuk membedakan `sigitadi.id` asli dengan subdomain palsu.
- Tekankan prinsip bahwa tidak ada alasan operasional yang mengharuskan staf mengirim kode OTP atau kata sandi kepada atasan sekalipun.
- Bimbing peserta mengerjakan Lab 03 untuk memeriksa setiap pesan kotak masuk dan WhatsApp guna memahami ciri aman serta jebakannya.

**Pemantik Diskusi Kelas:** Jika Anda menerima WhatsApp mendadak dari nomor baru yang mengaku pimpinan SaaS saat sedang piket di luar jam kerja, langkah verifikasi apa yang paling cepat namun tetap aman dilakukan?

### Poin Kunci & Simulasi Eksploratif

- Social Engineering membidik emosi manusia lewat Urgency, Fear, dan Authority agar korban melewatkan langkah verifikasi.
- Spear Phishing B2B memakai konteks asli pekerjaan SaaSCore dan nama BPR mitra agar tampak meyakinkan.
- Pengecekan alamat email aktual dan Domain Akar URL menangkal Email Spoofing serta Typosquatting domain `sigitadi.id`.
- Permintaan kode OTP, kredensial, atau data sensitif wajib selalu dikonfirmasi melalui Verifikasi Out-of-Band.

**Simulasi Terkait:** Lab 03: Simulator Kotak Masuk & WhatsApp Jebakan - Eksplorasi simulasi email kotak masuk dan pesan WhatsApp operasional BPR untuk membedakan komunikasi sah dari jebakan Email Spoofing, Typosquatting domain sigitadi.id, dan Social Engineering.

---

## Modul 04: Password Security dan Access Management

**Jadwal:** Sesi Pagi (10.50 - 11.30) | **Durasi:** 45 menit

> Membangun pertahanan gerbang identitas melalui Passphrase berentropi tinggi, prinsip Least Privilege, dan disiplin autentikasi multifaktor.

### Tujuan Pembelajaran

- Menjelaskan mengapa panjang dan keacakan Passphrase lebih kuat terhadap peretasan dibanding kata sandi pendek penuh simbol.
- Mengelola kata sandi unik pada setiap layanan kerja menggunakan Password Manager secara aman.
- Menerapkan prinsip Least Privilege pada pemberian dan pembatasan akses VPN maupun server BPR.
- Membandingkan keamanan MFA berbasis aplikasi autentikator terhadap SMS OTP serta cara menghadapi MFA Fatigue.

### Materi Inti

#### Passphrase Panjang vs Password Pendek yang Rumit

Kata sandi pendek delapan karakter dengan substitusi huruf umum seperti `Saas!2025` atau `Bpr@1234` mudah ditebak oleh kamus serangan otomatis modern. Sebaliknya, Passphrase menggabungkan empat kata acak atau lebih dengan panjang minimal empat belas hingga enam belas karakter sehingga memiliki Entropi tinggi dan tetap mudah diingat manusia.

- Panjang karakter menaikkan jumlah kombinasi tebakan jauh lebih besar daripada sekadar menambah satu dua simbol.
- Hindari memakai nama perusahaan, nama produk SaaSCore, tanggal lahir, atau pola papan ketik berurutan.
- Gunakan Password Manager agar setiap akun memiliki kata sandi acak yang berbeda dan Anda cukup mengingat satu passphrase utama.

#### Prinsip Least Privilege pada Akses VPN dan Server Klien

Prinsip Least Privilege memastikan setiap pegawai hanya memperoleh hak akses minimal yang benar-benar dibutuhkan untuk menuntaskan tugasnya dan hanya selama periode penugasan berlangsung. Di lingkungan support SaaSCore, pembatasan ini mencegah kelalaian atau kompromi pada satu akun berdampak luas ke seluruh BPR mitra.

- Pisahkan akun harian standar (read-only untuk investigasi log) dari akun elevasi administratif yang hanya dipakai saat perubahan terotorisasi.
- Berikan akses VPN server klien sesuai jadwal tiket atau proyek aktif, dan tutup koneksi segera setelah selesai.
- Cabut segera hak akses akun pegawai yang berpindah divisi, selesai magang, atau mengakhiri masa kerja.

#### Keunggulan MFA Berbasis Aplikasi Dibanding SMS OTP

Multi-Factor Authentication (MFA) menambahkan lapisan bukti kepemilikan di luar kata sandi. MFA berbasis aplikasi autentikator (TOTP) atau security key fisik jauh lebih aman daripada SMS OTP karena tidak bergantung pada jaringan seluler yang rentan terhadap pembajakan kartu SIM (SIM Swapping) maupun pembacaan notifikasi di layar kunci ponsel.

- Aplikasi autentikator (TOTP) menghasilkan kode dinamis secara lokal di perangkat dan tetap berjalan meski sinyal seluler lemah.
- Security key berbasis FIDO2 melakukan pencocokan kriptografis domain sehingga kebal terhadap situs login phishing tiruan.
- Nonaktifkan pratinjau isi pesan sensitif pada layar kunci ponsel agar kode verifikasi tidak terbaca orang di sekitar.

#### Waspada Serangan MFA Fatigue dan Kebersihan Sesi

Jika penyerang sudah mengantongi kata sandi pegawai, mereka kerap mengirim puluhan notifikasi persetujuan MFA berturut-turut (MFA Fatigue) pada tengah malam agar korban merasa kesal lalu menekan tombol setuju. Menekan setuju pada notifikasi login yang tidak dipicu sendiri berarti membuka pintu sistem secara langsung bagi pelaku.

- Tolak (Deny) setiap permintaan persetujuan MFA yang muncul ketika Anda tidak sedang melakukan login.
- Notifikasi MFA tak terduga merupakan tanda pasti kata sandi utama sudah bocor dan wajib segera diganti.
- Tinjau rutin daftar sesi login aktif di email, Git, dan panel cloud serta cabut perangkat lama yang tidak terpakai.

### Analogi Sehari-hari: Analogi Kunci Terpisah dan Kartu Akses Karyawan

Memakai satu kata sandi untuk semua sistem ibarat membawa satu kunci induk yang membuka pintu kantor, brankas rumah, dan semua ruang server BPR. Dengan Password Manager dan Passphrase unik, setiap pintu punya gembok berbeda; Least Privilege membatasi kartu akses agar staf hanya masuk ke ruangan tugasnya; dan MFA berbasis aplikasi adalah petugas jaga yang tetap memeriksa kartu fisik Anda meski kuncinya cocok.

### Studi Kasus Operasional SaaS / SaaSCore

#### [Ilustrasi Skenario] Akses Admin Permanen dan Akun Bersama di Server BPR

- **Konteks:** Usai proyek implementasi awal SaaSCore selesai, tim proyek tetap membiarkan satu akun admin bersama aktif pada server staging dan VPN klien.
- **Kejadian:** Beberapa bulan kemudian ditemukan perubahan parameter biaya administrasi yang tidak terjelaskan. Log audit hanya menampilkan satu nama akun bersama, dan belakangan diketahui dua mantan personel proyek luar masih menyimpan kata sandinya.
- **Pembelajaran:** Tanpa kepemilikan akun individual dan penerapan Least Privilege berbasis durasi tugas, organisasi kehilangan jejak audit sekaligus menyisakan akses bagi pihak tak berwenang.

#### [Ilustrasi Skenario] Hujan Notifikasi MFA pada Pukul 02.15 Dini Hari

- **Konteks:** Seorang sysadmin SaaS yang memegang akses panel infrastruktur cloud menerima belasan permintaan persetujuan login berturut-turut di ponselnya pada dini hari.
- **Kejadian:** Meski hampir menekan setuju karena mengantuk dan terganggu getaran ponsel, ia ingat pola MFA Fatigue lalu menekan tombol Tolak, memutus semua sesi aktif, mengganti passphrase melalui Password Manager, dan melapor ke tim keamanan.
- **Pembelajaran:** Menolak notifikasi MFA asing dan segera merotasi kata sandi menghentikan penyerang sebelum sempat masuk ke infrastruktur produksi.

### Lakukan (Do) vs Hindari (Don't)

| Lakukan (Do) | Hindari (Don't) | Mengapa |
| :--- | :--- | :--- |
| Buat Passphrase panjang minimal 14 hingga 16 karakter dari kombinasi kata acak yang unik untuk setiap akun. | Menggunakan password pendek dengan pola umum seperti `Saas@2026` atau memakai kata sandi yang sama di berbagai portal. | Panjang passphrase meningkatkan Entropi secara drastis dan mencegah pembobolan berantai antarlayanan. |
| Kelola seluruh kredensial unik melalui Password Manager yang dilindungi satu passphrase utama yang kuat. | Menyimpan daftar password server klien di file teks biasa, spreadsheet tanpa enkripsi, atau catatan tempel di monitor. | Berkas teks terbuka mudah terbaca orang sekitar maupun dicuri otomatis oleh malware. |
| Terapkan Least Privilege dengan hak akses minimum sesuai peran dan batas waktu koneksi VPN yang jelas. | Memberikan hak administrator penuh secara permanen ke semua akun staf untuk menghindari repot meminta izin. | Membatasi dampak insiden apabila satu akun mengalami kesalahan operasional atau diambil alih pihak luar. |
| Aktifkan MFA berbasis aplikasi autentikator (TOTP) atau security key fisik pada seluruh portal kerja kritikal. | Memilih SMS OTP atau mematikan MFA dengan alasan mempercepat proses login harian. | Aplikasi autentikator dan security key jauh lebih tahan terhadap SIM Swapping serta penyadapan jaringan seluler. |
| Segera tekan Tolak pada notifikasi MFA yang tidak Anda picu, lalu ganti passphrase akun terkait detik itu juga. | Menekan Approve berulang kali hanya agar notifikasi berhenti mengganggu istirahat atau pekerjaan Anda. | Notifikasi tersebut membuktikan kata sandi Anda sudah diketahui penyerang dan mereka sedang mencoba melewati lapisan MFA. |

### Kamus Istilah & Kalimat Teknis

| Istilah | Penjelasan Sederhana | Konteks SaaSCore |
| :--- | :--- | :--- |
| **Passphrase** | Kata sandi panjang yang tersusun dari beberapa kata acak agar sangat sulit ditebak komputer namun mudah diingat manusia. | Menjadi standar pengganti password pendek rumit untuk akun email, VPN, dan Password Manager tim SaaS. |
| **Entropi** | Ukuran tingkat kerumitan dan ketidakpastian kombinasi karakter yang menentukan seberapa sulit kata sandi ditebak. | Semakin panjang dan acak sebuah Passphrase, semakin tinggi entropinya terhadap serangan brute-force. |
| **Password Manager** | Aplikasi brankas terenkripsi yang membuat dan menyimpan kata sandi unik untuk setiap akun secara aman. | Membantu staf SaaS menghindari pemakaian ulang kata sandi di portal internal maupun layanan BPR. |
| **Least Privilege** | Prinsip memberi hak akses seminimal mungkin sesuai kebutuhan tugas dan hanya selama tugas tersebut berlangsung. | Membatasi akses database produksi SaaSCore dan VPN BPR hanya kepada teknisi yang sedang bertugas. |
| **MFA & TOTP** | Autentikasi berlapis yang memakai kode dinamis berbasis waktu (Time-based One-Time Password) dari aplikasi autentikator. | Lebih tahan terhadap pencurian nomor seluler (SIM Swapping) dibanding kode OTP via SMS. |
| **MFA Fatigue (Prompt Bombing)** | Serangan mengirim notifikasi persetujuan login berulang-ulang agar korban lengah atau kesal lalu menekan setuju. | Sinyal bahwa kata sandi pegawai sudah bocor sehingga notifikasi wajib ditolak dan kata sandi segera diganti. |

### Panduan Narasumber (Sigit Adi Irianto, S.Kom.)

**Poin Penyampaian Utama:**

- Bandingkan langsung di layar bagaimana password pendek bersimbol lebih cepat ditebak dibanding passphrase empat kata acak.
- Jelaskan mengapa akses VPN dan hak database SaaSCore harus mengikuti tiket tugas (Least Privilege) dan bukan akses permanen untuk semua orang.
- Soroti perbedaan risiko SMS OTP dibanding aplikasi autentikator TOTP dan tekankan bahaya MFA Fatigue pada jam malam.
- Ajak peserta mencoba Lab 04 untuk melihat efek panjang passphrase terhadap entropi secara langsung dan mengeksplorasi simulasi MFA Fatigue.

**Pemantik Diskusi Kelas:** Apa kendala paling sering dirasakan tim saat beralih ke Password Manager dan aplikasi autentikator untuk akses VPN atau server BPR, dan bagaimana cara tim saling mendukung?

### Poin Kunci & Simulasi Eksploratif

- Panjang dan keacakan Passphrase menghasilkan Entropi jauh lebih tinggi daripada password pendek yang hanya mengandalkan simbol.
- Password Manager memungkinkan setiap akun SaaS dan portal BPR memiliki kata sandi unik tanpa membebani ingatan.
- Prinsip Least Privilege menuntut akun individual dengan hak akses minimum dan pencabutan akses saat tugas berakhir.
- Gunakan MFA berbasis aplikasi atau security key, dan hadapi MFA Fatigue dengan menolak prompt asing lalu segera mengganti kata sandi.

**Simulasi Terkait:** Lab 04: Uji Entropi Passphrase & Simulasi MFA Fatigue - Eksplorasi interaktif perbandingan kekuatan entropi password pendek vs passphrase panjang serta simulasi pengambilan keputusan saat menghadapi notifikasi MFA Fatigue dan aturan Least Privilege.

---

## Modul 05: Data Protection dan Information Security

**Jadwal:** Sesi Pagi (11.30 - 12.00) | **Durasi:** 30 menit

> Menjaga kerahasiaan data BPR dan integritas informasi SaaSCore melalui klasifikasi data, enkripsi, dan pengiriman kredensial terpisah.

### Tujuan Pembelajaran

- Mengelompokkan dokumen dan berkas kerja SaaS ke dalam 4 tingkat klasifikasi data secara tepat.
- Menerapkan larangan penyimpanan database dump klien tanpa enkripsi di laptop maupun media sementara.
- Mempraktikkan pengiriman kredensial terpisah (Out-of-Band) agar kebocoran satu kanal tidak membuka akses penuh.
- Membiasakan pemakaian data anonim (data masking) untuk keperluan uji coba serta pembersihan berkas setelah tiket selesai.

### Materi Inti

#### Empat Tingkat Klasifikasi Data PT. Sigit Adi Aman Siber (SaaS)

Sebagai pengelola Core Banking System SaaSCore untuk BPR mitra, tim IT SaaS memegang kepercayaan tinggi atas data operasional dan finansial nasabah. Setiap dokumen atau berkas teknis wajib diberi perlakuan sesuai 4 tingkat klasifikasi berikut agar data sensitif tidak tersimpan atau terkirim sembarangan.

- Publik: Materi resmi untuk konsumsi umum seperti brosur SaaSCore atau profil di situs sigitadi.id.
- Internal: Dokumen operasional tim SaaS seperti SOP internal, jadwal piket support, dan catatan rapat non-sensitif.
- Rahasia: Kontrak kerja sama BPR, topologi jaringan klien, source code SaaSCore, serta laporan bug berstruktur tabel.
- Sangat Rahasia: Database dump produksi BPR, data pribadi nasabah/PII (NIK, nama ibu kandung, mutasi saldo), kredensial server/VPN, dan API secret.

#### Larangan Menyimpan Database Dump Klien Tanpa Enkripsi

Tim support dan developer sering mengekspor potongan tabel untuk menyelidiki selisih transaksi atau bug pada modul SaaSCore. Menyimpan file database dump (.sql, .bak, .dmp, atau CSV nasabah) dalam kondisi plaintext di folder Downloads atau Desktop adalah risiko kebocoran berat jika laptop hilang atau terkena pencuri file.

- Dilarang menyimpan database dump produksi BPR dalam bentuk teks terbuka di laptop lokal maupun cloud pribadi.
- Terapkan data masking atau gunakan data dummy buatan sebelum memindahkan sampel uji ke lingkungan lokal atau QA.
- Jika salinan sementara benar-benar dibutuhkan atas izin resmi, bungkus dalam arsip terenkripsi AES-256 (seperti 7-Zip) dan terapkan prinsip Least Privilege.
- Segera hapus berkas sementara dan kosongkan Recycle Bin begitu analisis tiket atau UAT klien rampung.

#### Pengiriman Kredensial Terpisah (Out-of-Band)

Mengirimkan alamat IP server, username, dan password di dalam satu email atau satu pesan chat yang sama membuat akun email menjadi titik kegagalan tunggal. Metode Out-of-Band memisahkan pengiriman informasi akses dan kata sandinya melalui dua jalur komunikasi yang berbeda.

- Kanal pertama (misalnya email resmi @sigitadi.id atau sistem tiket): kirim alamat host, username, atau arsip .7z terenkripsi.
- Kanal kedua (misalnya panggilan suara atau pesan terpisah ke nomor terverifikasi): kirimkan password atau passphrase pembuka.
- Jangan ulangi detail IP atau nama akun pada pesan kedua agar pesan tersebut tidak bermakna jika terbaca pihak asing.
- Instruksikan penerima untuk langsung mengganti kata sandi sementara saat login pertama.

#### Kewaspadaan terhadap Kenaikan Tingkat Sensitivitas Log

Sebuah file log error SaaSCore bisa berawal sebagai catatan teknis Internal, tetapi statusnya langsung naik menjadi Sangat Rahasia apabila memuat query SQL berisi NIK, nomor rekening, atau token otentikasi. Selalu periksa isi lampiran sebelum mengunggahnya ke papan tiket atau grup koordinasi.

- Sensor atau potong baris payload yang mengandung identitas nasabah (PII) dan rahasia sesi sebelum log dibagikan.
- Simpan kredensial akses BPR hanya di pengelola kata sandi resmi perusahaan, bukan di file teks polos pada Desktop.
- Lakukan pemeriksaan folder Downloads setiap kali menutup tiket harian agar tidak ada sisa file klien yang tertinggal.

### Analogi Sehari-hari: Brankas Terkunci dan Kode Kombinasi yang Dikirim Terpisah

Mengirim akses server klien ibarat mengirim brankas dokumen akta ke cabang bank di kota lain. Anda mengirim brankas terkunci lewat kurir resmi, lalu menelepon kepala cabang untuk menyampaikan kombinasi angkanya secara terpisah, sehingga pencegatan di satu jalur tidak membuka isi brankas.

### Studi Kasus Operasional SaaS / SaaSCore

#### [Ilustrasi Skenario] Database Dump BPR Tertinggal di Folder Downloads

- **Konteks:** Seorang staf implementasi SaaS mengekspor data nasabah dan kredit SaaSCore ke file .sql tanpa enkripsi di folder Downloads untuk memeriksa selisih migrasi saldo awal.
- **Kejadian:** Dua minggu berselang, laptop tersebut mengalami kerusakan layar dan dibawa ke tempat servis umum. Teknisi servis menemukan file database dump yang belum dihapus maupun dienkripsi berisi ribuan identitas dan saldo nasabah BPR.
- **Pembelajaran:** Data Sangat Rahasia tidak boleh disimpan plaintext di perangkat kerja. Pemakaian data masking untuk investigasi serta penghapusan berkas sementara segera setelah tiket ditutup wajib menjadi rutinitas.

#### [Ilustrasi Skenario] Kredensial Admin dan File VPN Dikirim dalam Satu Email

- **Konteks:** Seorang engineer menyiapkan akses pemeliharaan server uji SaaSCore untuk rekan baru guna mempercepat penanganan kendala modul pelaporan.
- **Kejadian:** File konfigurasi VPN, IP server, username, dan password dikirim sekaligus dalam satu email balasan. Saat email penerima sempat terbuka di komputer bersama yang lupa dikunci, pihak lain langsung memiliki paket akses penuh dalam satu layar.
- **Pembelajaran:** Pemisahan kanal pengiriman Out-of-Band memastikan kebocoran pada satu media komunikasi tidak otomatis menyerahkan kendali akses sistem.

### Lakukan (Do) vs Hindari (Don't)

| Lakukan (Do) | Hindari (Don't) | Mengapa |
| :--- | :--- | :--- |
| Berikan label dan perlakuan sesuai 4 tingkat klasifikasi data SaaS sebelum mengirim berkas. | Memperlakukan dokumen kontrak, log transaksi, dan brosur produk dengan cara distribusi yang sama. | Salah mengklasifikasikan data Rahasia atau Sangat Rahasia memicu kebocoran informasi bernilai tinggi. |
| Gunakan data dummy atau lakukan data masking sebelum memakai sampel database BPR di lingkungan uji. | Menyimpan file database dump produksi (.sql, .bak, CSV) tanpa enkripsi di Downloads atau Desktop. | File dump plaintext dapat langsung dibaca jika laptop hilang atau disusupi pencuri berkas. |
| Bungkus berkas sensitif sementara dengan enkripsi AES-256 dan hapus tuntas setelah tiket selesai. | Menimbun arsip database klien berbulan-bulan di laptop sebagai cadangan kerja pribadi. | Penumpukan data lama memperbesar dampak insiden bila suatu saat laptop berpindah tangan. |
| Pisahkan pengiriman username/file terenkripsi dan password melalui dua kanal berbeda (Out-of-Band). | Menuliskan host, username, dan password lengkap di dalam satu email atau satu pesan chat. | Satu akun pesan yang terkompromi tidak boleh langsung membuka pintu penuh ke server klien. |
| Saring baris berisi PII atau token dari log debug SaaSCore sebelum dilampirkan ke tiket. | Mengunggah tangkapan layar atau log mentah berisi data nasabah ke kanal diskusi umum. | Isi log yang memuat identitas nasabah otomatis mengangkat klasifikasi berkas menjadi Sangat Rahasia. |

### Kamus Istilah & Kalimat Teknis

| Istilah | Penjelasan Sederhana | Konteks SaaSCore |
| :--- | :--- | :--- |
| **Klasifikasi Data** | Pengelompokan informasi berdasarkan tingkat sensitivitas dan dampak kerusakannya jika bocor ke pihak tidak berhak. | Di PT. Sigit Adi Aman Siber (SaaS), seluruh berkas kerja SaaSCore dibagi ke level Publik, Internal, Rahasia, dan Sangat Rahasia. |
| **Database Dump** | Salinan mentah isi tabel dan struktur basis data yang diekspor ke dalam satu berkas seperti .sql atau .bak. | Dump produksi BPR berisi data nasabah sehingga dilarang disimpan tanpa enkripsi di laptop tim SaaS. |
| **Enkripsi AES-256** | Metode pengacakan data berstandar kuat sehingga isi berkas hanya bisa dibaca oleh pemegang kata sandi pembukanya. | Dipakai saat membungkus arsip konfigurasi atau data uji sensitif SaaSCore sebelum disimpan sementara atau dikirim. |
| **Out-of-Band** | Pengiriman informasi penting melalui dua jalur komunikasi yang terpisah agar penyadapan satu jalur tetap gagal. | Tim SaaS mengirim arsip atau username lewat email @sigitadi.id lalu mengirim password lewat telepon atau pesan terpisah. |
| **Data Masking** | Teknik menyamarkan atau mengganti isi kolom sensitif (seperti nama dan NIK) dengan nilai acak yang tetap masuk akal. | Memungkinkan developer SaaSCore menguji query laporan BPR tanpa membawa identitas asli nasabah. |
| **PII (Personally Identifiable Information)** | Segala informasi yang dapat mengidentifikasi seorang individu secara langsung maupun tidak langsung. | NIK, nomor rekening, alamat, dan nomor telepon nasabah BPR pada SaaSCore wajib dilindungi sebagai data Sangat Rahasia. |
| **Least Privilege** | Prinsip pemberian hak akses paling minimal yang cukup untuk menyelesaikan satu tugas tertentu saja. | Hanya engineer yang menangani tiket BPR terkait yang diberi akses sementara ke data klien tersebut. |

### Panduan Narasumber (Sigit Adi Irianto, S.Kom.)

**Poin Penyampaian Utama:**

- Tekankan perbedaan tegas antara dokumen Internal (SOP kantor) dan Sangat Rahasia (dump database nasabah BPR) pada sistem SaaSCore.
- Peragakan sekilas bagaimana satu baris log debug dapat menaikkan status file menjadi Sangat Rahasia jika mencetak data PII.
- Minta peserta mengingat kembali kebiasaan di folder Downloads masing-masing saat melakukan troubleshooting harian.

**Pemantik Diskusi Kelas:** Jika BPR mitra meminta tim Anda mengecek ketidaksesuaian saldo kredit pada jam sibuk, langkah tercepat sekaligus aman apa yang Anda lakukan tanpa meninggalkan file dump plaintext di laptop?

### Poin Kunci & Simulasi Eksploratif

- Klasifikasi Publik, Internal, Rahasia, dan Sangat Rahasia menentukan cara menyimpan serta membagikan informasi di SaaS.
- Database dump produksi BPR dilarang keras disimpan dalam kondisi plaintext; utamakan data masking dan enkripsi AES-256.
- Kredensial akses wajib dikirim secara Out-of-Band melalui dua kanal berbeda yang terverifikasi.
- Membersihkan file sementara di laptop adalah langkah penutup wajib setelah tiket dukungan selesai.

**Simulasi Terkait:** Lab 05: Simulator Pengamanan & Enkripsi Dokumen Klien - Eksplorasi kondisi aman dan berisiko dalam mengklasifikasikan dokumen SaaSCore, menangani database dump dengan enkripsi AES-256, serta mempraktikkan alur pengiriman kredensial Out-of-Band.

---

## Modul 06: Endpoint Security dan Device Protection

**Jadwal:** Sesi Siang (13.00 - 13.40) | **Durasi:** 40 menit

> Menjaga laptop kerja sebagai gerbang utama akses SaaSCore dari infostealer software bajakan, celah sistem tak terpatch, pencurian fisik, dan perangkat USB asing.

### Tujuan Pembelajaran

- Memahami cara kerja infostealer pada software bajakan dalam mencuri sesi browser dan konfigurasi VPN klien.
- Menerapkan disiplin pembaruan OS dan browser secara tepat waktu untuk menutup celah keamanan.
- Memastikan enkripsi disk penuh (BitLocker atau FileVault) serta prinsip akun non-admin (UAC/Least Privilege) berjalan aktif.
- Membiasakan penguncian layar (Win + L) dan penolakan perangkat USB tak dikenal guna mencegah akses fisik maupun serangan BadUSB.

### Materi Inti

#### Bahaya Software Bajakan dan Ancaman Infostealer

Memasang aplikasi bajakan, crack Office, aktivator KMS ilegal, atau klien SQL bajakan di laptop kerja membuka jalur masuk utama bagi malware jenis infostealer. Malware ini bekerja senyap selama beberapa detik saja tanpa memperlambat komputer, lalu mencuri kredensial yang tersimpan di perangkat sebelum menghapus jejaknya.

- Infostealer menyasar cookie sesi aktif browser sehingga pelaku dapat membajak akun kerja tanpa perlu password atau kode MFA.
- File konfigurasi VPN menuju jaringan BPR, kunci SSH, dan password database di tools pengembang menjadi target utama pencurian.
- Aktivator bajakan sering meminta pengguna mematikan antivirus bawaan, yang langsung melumpuhkan pertahanan endpoint.
- Gunakan hanya perangkat lunak berlisensi resmi dari PT. Sigit Adi Aman Siber (SaaS) atau alternatif open-source resmi.

#### Disiplin Patching OS, Browser, dan Hak Akun Terbatas (UAC)

Setiap pembaruan Windows, macOS, dan browser Chrome atau Edge membawa tambalan untuk celah keamanan yang baru dipublikasikan. Menunda restart laptop selama berminggu-minggu membuat laptop kerja rentan dieksploitasi hanya dengan membuka halaman web berbahaya.

- Terapkan pembaruan OS dan browser pada hari yang sama saat notifikasi update tersedia, misalnya saat jam istirahat.
- Jalankan pekerjaan harian dengan akun standar yang mengaktifkan UAC (User Account Control) agar program asing tidak diam-diam mengubah sistem.
- Pastikan Windows Defender atau agen keamanan endpoint perusahaan selalu aktif dan terbarui definisinya.

#### Enkripsi Disk Penuh dengan BitLocker dan FileVault

Password login sistem operasi hanya mengunci layar saat OS berjalan, bukan melindungi isi SSD jika laptop hilang atau dicuri saat kunjungan ke BPR. Dengan enkripsi disk penuh seperti BitLocker di Windows atau FileVault di macOS, seluruh sektor penyimpanan diacak sehingga SSD tidak dapat dibaca meskipun dilepas dan dipasang ke komputer lain.

- Verifikasi bahwa status BitLocker atau FileVault pada laptop kerja SaaS selalu aktif melindungi drive sistem.
- Simpan Recovery Key secara terpisah di pengelola akun resmi perusahaan, bukan di dalam file teks di laptop yang sama.
- Kombinasikan enkripsi disk dengan kata sandi login perangkat yang kuat agar lapisan perlindungan tetap utuh.

#### Keamanan Fisik, Screen Lock (Win + L), dan Larangan USB Asing

Ancaman endpoint juga datang dari akses fisik dalam hitungan detik, seperti meninggalkan layar menyala di ruang rapat BPR atau mencolokkan flashdisk asing. Selain membawa virus konvensional, perangkat keras BadUSB tampak seperti flashdisk biasa tetapi langsung menyamar sebagai keyboard otomatis yang mengetikkan skrip berbahaya.

- Selalu tekan Win + L (Windows) atau Control + Command + Q (macOS) setiap kali meninggalkan meja, bahkan untuk satu menit.
- Aktifkan penguncian layar otomatis (idle lock) maksimal lima menit tanpa aktivitas.
- Tolak mencolokkan flashdisk temuan, suvenir tak jelas, atau USB pribadi yang belum dipindai ke port laptop kerja.
- Gunakan repositori atau cloud internal terotorisasi untuk bertukar file antar-rekan tim SaaS.

### Analogi Sehari-hari: Brankas Beton di Rumah dengan Pintu yang Selalu Dikunci

Laptop kerja Anda ibarat rumah penyimpan berkas nasabah. Memasang software bajakan sama seperti membiarkan tukang kunci palsu menggandakan kunci seluruh kamar, sedangkan BitLocker adalah brankas beton agar isi berkas tetap tak terbaca meski laptop dicuri. Menekan Win + L setiap berdiri sama seperti mengunci pintu depan saat keluar sebentar, dan menolak USB asing berarti tidak menancapkan kunci misterius dari trotoar ke pintu rumah.

### Studi Kasus Operasional SaaS / SaaSCore

#### [Ilustrasi Skenario] Aktivator Office Bajakan Mencuri Sesi VPN dan Browser

- **Konteks:** Setelah memasang ulang sistem operasi laptop kerjanya pada akhir pekan, seorang staf teknis mengunduh aktivator Office dari blog acak agar segera bisa membuka dokumen spesifikasi SaaSCore.
- **Kejadian:** Sesuai panduan di situs tersebut, ia mematikan Windows Defender sementara. Tidak muncul pesan error dan Office berjalan normal, namun infostealer di balik aktivator diam-diam menyalin cookie sesi browser, token repositori, dan profil VPN uji klien BPR ke server penyerang.
- **Pembelajaran:** Alasan kepraktisan sesaat memakai software bajakan bisa menyerahkan seluruh kunci akses kerja. Gunakan lisensi resmi perusahaan dan jangan pernah menonaktifkan perlindungan antivirus.

#### [Ilustrasi Skenario] Tas Laptop Hilang di Perjalanan Pulang dari BPR Mitra

- **Konteks:** Seorang implementator SaaSCore menaruh tas laptopnya di rak bagasi kereta api saat perjalanan kembali ke kantor pusat setelah pendampingan go-live.
- **Kejadian:** Saat kereta tiba di stasiun tujuan, tas tersebut raib. Karena laptop kerja sudah dilindungi BitLocker sejak penyerahan awal, pelaku tidak dapat membaca partisi SSD, sementara tim IT langsung mencabut sertifikat VPN dan merotasi seluruh kredensial akun terkait.
- **Pembelajaran:** Enkripsi disk penuh mengubah insiden hilangnya perangkat menjadi kejadian yang risikonya terkendali dan tidak berujung kebocoran data nasabah.

### Lakukan (Do) vs Hindari (Don't)

| Lakukan (Do) | Hindari (Don't) | Mengapa |
| :--- | :--- | :--- |
| Gunakan hanya aplikasi berlisensi resmi SaaS atau software open-source dari situs pengembang aslinya. | Memasang software bajakan, crack, keygen, atau aktivator ilegal di laptop kerja. | Paket bajakan sering disisipi infostealer pencuri cookie sesi browser, password, dan profil VPN. |
| Lakukan update OS dan browser secara rutin segera setelah pembaruan keamanan dirilis. | Menunda restart pembaruan keamanan berminggu-minggu demi menghindari jeda kerja sebentar. | Celah keamanan yang sudah diumumkan tambalannya langsung diburu secara otomatis oleh penyerang. |
| Pastikan BitLocker atau FileVault aktif dan simpan Recovery Key di tempat resmi yang terpisah. | Membiarkan disk laptop tidak terenkripsi atau menaruh kunci pemulihan di Desktop laptop. | Tanpa enkripsi disk penuh, isi SSD dapat dibaca langsung lewat Live USB atau dilepas ke komputer lain. |
| Tekan Win + L (atau Ctrl + Cmd + Q) setiap kali bangkit dari kursi dan aktifkan auto-lock maksimal 5 menit. | Meninggalkan sesi SaaSCore atau portal admin terbuka saat ke toilet atau berdiskusi di ruangan lain. | Beberapa detik tanpa pengawasan cukup bagi pihak tak berhak untuk melihat atau menyalin data di layar. |
| Bertukar berkas kerja melalui kanal internal resmi dan gunakan adaptor dinding untuk mengisi daya ponsel. | Mencolokkan flashdisk temuan, hadiah tak dikenal, atau media USB eksternal sembarangan ke laptop kerja. | Perangkat USB asing berisiko membawa malware maupun serangan BadUSB yang mengetikkan perintah otomatis. |

### Kamus Istilah & Kalimat Teknis

| Istilah | Penjelasan Sederhana | Konteks SaaSCore |
| :--- | :--- | :--- |
| **Infostealer** | Malware yang menyelinap diam-diam untuk menyalin password tersimpan, cookie sesi browser, dan file kunci akses. | Sering bersembunyi di dalam crack atau aktivator bajakan dan mengincar profil VPN serta akses SaaSCore. |
| **BitLocker / FileVault** | Fitur enkripsi disk penuh bawaan Windows (BitLocker) dan macOS (FileVault) yang mengacak seluruh isi penyimpanan. | Wajib aktif di laptop tim SaaS agar data BPR tidak bisa dibaca jika perangkat hilang saat dinas luar kota. |
| **Patching OS & Browser** | Pemasangan pembaruan keamanan resmi untuk menambal celah pada sistem operasi maupun peramban web. | Menjaga browser yang dipakai membuka dasbor SaaSCore dan portal tiket tetap kebal terhadap eksploitasi web terbaru. |
| **UAC / Least Privilege** | Mekanisme konfirmasi dan pembatasan hak akun harian agar tidak sembarang program bisa memodifikasi sistem secara otomatis. | Mencegah skrip berbahaya menanamkan layanan latar belakang tanpa sepengetahuan staf IT SaaS. |
| **Screen Lock (Win + L)** | Pintasan cepat mengunci tampilan layar laptop sehingga membutuhkan otentikasi ulang untuk membukanya. | Harus menjadi refleks setiap pegawai SaaS ketika meninggalkan meja kerja maupun ruang operasional BPR. |
| **BadUSB** | Perangkat USB yang dimodifikasi agar dikenali komputer sebagai keyboard dan mengetikkan perintah serangan dalam hitungan detik. | Menjadi alasan utama pelarangan mencolokkan flashdisk temuan atau suvenir tak tepercaya ke laptop kerja SaaS. |

### Panduan Narasumber (Sigit Adi Irianto, S.Kom.)

**Poin Penyampaian Utama:**

- Buka diskusi dengan menjelaskan kenapa infostealer jauh lebih berbahaya dibanding virus lama karena targetnya langsung cookie sesi MFA dan file .ovpn.
- Minta seluruh peserta mengecek cepat apakah BitLocker/FileVault di laptop masing-masing saat ini sudah menyala.
- Peragakan betapa cepatnya skenario BadUSB bekerja saat colok flashdisk agar aturan larangan USB asing terasa nyata.

**Pemantik Diskusi Kelas:** Apa aplikasi utilitas gratis atau bajakan yang paling sering dicari tim IT saat baru menerima laptop, dan alternatif resmi apa yang aman dipakai di PT. Sigit Adi Aman Siber?

### Poin Kunci & Simulasi Eksploratif

- Software bajakan adalah pembawa utama infostealer yang mencuri sesi aktif browser, kata sandi, dan konfigurasi VPN.
- Pembaruan OS dan browser tepat waktu serta UAC aktif menutup celah eksploitasi paling umum.
- BitLocker atau FileVault melindungi data SSD secara menyeluruh apabila laptop hilang atau dicuri.
- Kebiasaan Win + L dan larangan USB tak dikenal mencegah kompromi cepat melalui akses fisik.

**Simulasi Terkait:** Lab 06: Audit Mandiri Kesehatan Laptop Kerja - Eksplorasi kondisi kesiapan endpoint kerja meliputi pemeriksaan enkripsi disk, status patching OS dan browser, identifikasi risiko software tidak resmi, serta kebiasaan layar kunci dan USB.

---

## Modul 07: Network Security dan Safe Internet Practices

**Jadwal:** Sesi Siang (13.40 - 14.20) | **Durasi:** 40 menit

> Mengamankan jalur koneksi kerja saat di kantor maupun perjalanan dinas melalui kewaspadaan Wi-Fi publik, disiplin VPN klien BPR, validasi HTTPS, dan kontrol ekstensi browser.

### Tujuan Pembelajaran

- Mengenali risiko Wi-Fi publik dan serangan Evil Twin Attack saat bertugas di luar kantor.
- Menerapkan aturan penggunaan VPN klien BPR secara terbatas sesuai jadwal tiket dan langsung memutusnya setelah selesai.
- Memvalidasi koneksi SSL/TLS (HTTPS) serta membaca struktur domain untuk mendeteksi subdomain spoofing dan typosquatting.
- Mengevaluasi izin akses ekstensi browser guna mencegah kebocoran sesi melalui ekstensi berlebihan.

### Materi Inti

#### Risiko Wi-Fi Publik dan Serangan Evil Twin

Saat melakukan pendampingan SaaSCore ke BPR luar kota, staf sering bekerja dari hotel, kafe, atau bandara. Jaringan Wi-Fi umum bersifat tidak tepercaya karena berbagi segmen dengan orang asing dan rentan terhadap serangan Evil Twin, yaitu pemancar palsu yang meniru nama Wi-Fi resmi (misalnya Hotel_Guest_WiFi) untuk memancing login palsu atau menyadap lalu lintas.

- Untuk akses sistem SaaS atau server BPR di luar kantor, prioritaskan tethering hotspot ponsel pribadi dengan sandi WPA2/WPA3.
- Matikan opsi Auto-Connect pada Wi-Fi publik agar laptop tidak tersambung diam-diam ke SSID tiruan.
- Jika terpaksa memakai Wi-Fi publik untuk riset umum, hindari login akun sensitif tanpa terowongan VPN yang sah.

#### Aturan Disiplin Penggunaan VPN Klien BPR

VPN klien BPR menghubungkan laptop Anda langsung ke dalam lingkar jaringan internal bank untuk pemeliharaan SaaSCore. Membiarkan VPN tetap menyala di luar jam tugas atau memakainya sambil berselancar bebas dapat menjadikan laptop Anda jembatan risiko menuju infrastruktur bank.

- Nyalakan VPN klien BPR hanya selama sesi pekerjaan terotorisasi sesuai tiket atau surat tugas berlangsung.
- Segera tekan Disconnect begitu pengecekan atau pemeliharaan server BPR selesai dilakukan.
- Dilarang membuka situs pribadi, streaming, atau mengunduh berkas non-kerja selama VPN klien BPR masih aktif.
- Jangan pernah meminjamkan atau menggandakan profil maupun sertifikat VPN ke perangkat rekan lain.

#### Validasi HTTPS, Struktur Domain, dan Subdomain Spoofing

Awalan https:// dengan protokol SSL/TLS hanya menandakan jalur antara browser dan server terenkripsi, bukan bukti bahwa situs tersebut resmi karena situs phishing pun dapat memakai sertifikat HTTPS gratis. Penentu identitas pemilik asli berada pada domain utama tepat di sebelah kiri garis miring pertama jalur URL.

- Baca domain dari kanan ke kiri sebelum garis miring pertama (/): pada portal.sigitadi.id.cek-sesi.com, pemilik aslinya adalah cek-sesi.com.
- Waspadai typosquatting (salah ketik mirip seperti sigitad1.id) dan huruf pengecoh pada tautan login.
- Jangan abaikan peringatan sertifikat tidak valid (NET::ERR_CERT_AUTHORITY_INVALID) dengan menekan tombol lanjut secara paksa.

#### Bahaya Ekstensi Browser Berlebihan dan Extension Takeover

Ekstensi gratis seperti pengunduh media, tema, atau pemblokir iklan tak dikenal sering meminta izin membaca seluruh data di semua situs web. Izin seluas ini memungkinkan ekstensi membaca password, token sesi dasbor SaaSCore, hingga risiko extension takeover ketika ekstensi lama dibeli pihak jahat dan didorong pembaruan berbahaya.

- Pasang hanya ekstensi kerja yang esensial dan telah diverifikasi keamanannya.
- Audit izin ekstensi secara berkala dan ubah akses situs menjadi "On click" atau "On specific sites" bila tersedia.
- Pisahkan profil browser khusus kerja dari profil browser pribadi agar data sesi perusahaan tetap terisolasi.

### Analogi Sehari-hari: Memeriksa Alamat Sertifikat Gedung di Balik Spanduk Teras

Membuka situs hanya karena melihat gembok HTTPS tanpa membaca domain utamanya ibarat masuk ke bilik transaksi tertutup yang rapi hanya karena melihat spanduk "RESMI" di pagar depan. Gembok HTTPS hanya menjamin percakapan Anda tidak didengar orang luar bilik, tetapi struktur domain di sebelah kanan-lah yang memastikan gedung tersebut benar-benar milik bank asli dan bukan penipu.

### Studi Kasus Operasional SaaS / SaaSCore

#### [Ilustrasi Skenario] Evil Twin Wi-Fi Hotel Menjebak dengan Halaman Verifikasi Palsu

- **Konteks:** Seorang engineer SaaSCore menginap di hotel dekat kantor BPR mitra dan menyalakan Wi-Fi laptop untuk membaca catatan rilis terbaru.
- **Kejadian:** Laptop otomatis tersambung ke SSID terbuka bernama "GrandHotel_5G" dan langsung memunculkan jendela pop-up meminta login akun email kantor agar internet aktif. Curiga karena hotel biasanya hanya meminta nomor kamar, ia segera memutus Wi-Fi, mematikan auto-connect, dan beralih ke hotspot ponsel pribadinya.
- **Pembelajaran:** Mengenali perilaku ganjil captive portal dan memilih tethering pribadi saat di lapangan menggagalkan upaya pencurian akun lewat Evil Twin.

#### [Ilustrasi Skenario] Subdomain Spoofing pada Tautan Pembaruan Akses

- **Konteks:** Seorang staf QA menerima tautan verifikasi akun menuju alamat https://login.sigitadi.id.portal-validasi-akses.com/session.
- **Kejadian:** Sekilas terlihat nama sigitadi.id di bagian depan URL sehingga tampak meyakinkan. Sebelum mengisi kredensial, ia memeriksa bagian paling kanan sebelum garis miring pertama dan menyadari domain aslinya adalah portal-validasi-akses.com, lalu segera melaporkannya ke tim keamanan.
- **Pembelajaran:** Kebiasaan membaca domain registrasi utama dari kanan ke kiri sebelum garis miring pertama merupakan pertahanan cepat terhadap subdomain spoofing.

### Lakukan (Do) vs Hindari (Don't)

| Lakukan (Do) | Hindari (Don't) | Mengapa |
| :--- | :--- | :--- |
| Gunakan tethering hotspot ponsel pribadi berpassword WPA2/WPA3 untuk pekerjaan sensitif di luar kantor. | Mengakses server BPR atau sistem internal SaaS langsung melalui Wi-Fi gratis di kafe atau lobi hotel. | Jaringan publik rentan penyadapan serta jebakan Evil Twin yang meniru nama Wi-Fi resmi. |
| Matikan fitur Auto-Connect Wi-Fi publik pada pengaturan jaringan laptop. | Membiarkan laptop tersambung otomatis ke SSID terbuka yang namanya pernah tersimpan. | Penyerang dapat menyiarkan ulang SSID populer untuk menyambungkan laptop korban tanpa klik. |
| Aktifkan VPN klien BPR hanya saat mengerjakan tiket resmi dan segera putuskan setelah tuntas. | Membiarkan VPN BPR menyala seharian sambil membuka situs hiburan atau mengunduh file pribadi. | Koneksi VPN yang terus aktif memperlebar jalur risiko dari laptop ke jaringan internal bank. |
| Validasi domain utama di sebelah kanan sebelum garis miring pertama selain memeriksa ikon HTTPS. | Langsung login hanya karena melihat ikon gembok HTTPS dan nama sigitadi.id di awal alamat URL. | Sertifikat HTTPS bisa dipakai situs phishing dan subdomain palsu dapat menaruh nama resmi di depan. |
| Gunakan ekstensi browser seminimal mungkin dan pisahkan profil browser kerja dari profil pribadi. | Memasang ekstensi acak dengan izin membaca semua website di browser yang dipakai membuka dasbor SaaSCore. | Ekstensi berizin luas dapat membaca input sensitif dan rentan disusupi lewat pembaruan pihak ketiga. |

### Kamus Istilah & Kalimat Teknis

| Istilah | Penjelasan Sederhana | Konteks SaaSCore |
| :--- | :--- | :--- |
| **Evil Twin Attack** | Pembuatan titik akses Wi-Fi palsu dengan nama jaringan yang meniru Wi-Fi resmi untuk menjebak pengguna. | Sangat berisiko saat tim SaaS bekerja dari hotel atau kafe dalam perjalanan dinas pendampingan BPR. |
| **Captive Portal** | Halaman web pembuka yang otomatis muncul saat terhubung ke Wi-Fi publik untuk meminta login atau persetujuan akses. | Captive portal palsu pada Evil Twin sering menyamar menjadi halaman login email kantor @sigitadi.id. |
| **VPN Klien BPR** | Terowongan jaringan terenkripsi untuk menghubungkan laptop tim SaaS ke server BPR secara terkontrol. | Hanya boleh aktif selama pengerjaan tiket SaaSCore terotorisasi dan wajib diputus segera setelah selesai. |
| **SSL/TLS & HTTPS** | Protokol penyandian komunikasi antara browser dan server web agar lalu lintas data tidak terbaca di tengah jalan. | Wajib ada saat mengakses portal sigitadi.id, namun tetap harus disertai pemeriksaan nama domain yang benar. |
| **Subdomain Spoofing** | Teknik menyisipkan nama domain resmi sebagai awalan subdomain dari domain palsu milik penyerang. | Contohnya login.sigitadi.id.domain-palsu.com di mana domain pengendali sebenarnya adalah domain-palsu.com. |
| **Typosquatting** | Pendaftaran domain yang ejaannya dibuat sangat mirip dengan domain asli untuk mengecoh mata pengguna. | Misalnya mengganti huruf i dengan angka 1 atau menambah tanda hubung yang menyerupai sigitadi.id. |
| **Extension Takeover** | Pengambilalihan kepemilikan ekstensi browser populer oleh pihak jahat lalu menyisipkan kode pencuri data lewat update otomatis. | Menjadikan penggunaan ekstensi berlebihan di profil browser kerja SaaS berbahaya bagi kerahasiaan sesi. |

### Panduan Narasumber (Sigit Adi Irianto, S.Kom.)

**Poin Penyampaian Utama:**

- Luruskan mitos umum bahwa gembok HTTPS berarti situs dijamin asli dan aman dari phishing.
- Latih peserta membaca anatomi URL dari kanan ke kiri sebelum garis miring pertama menggunakan contoh subdomain spoofing.
- Tegaskan aturan lapangan: satu sesi VPN untuk satu tiket BPR, selesai kerja langsung disconnect.

**Pemantik Diskusi Kelas:** Saat Anda menginap di hotel di daerah dengan sinyal seluler lemah dan hanya Wi-Fi hotel yang stabil, urutan langkah aman apa yang harus Anda pastikan sebelum mengakses server uji BPR?

### Poin Kunci & Simulasi Eksploratif

- Prioritaskan hotspot seluler pribadi dibanding Wi-Fi publik dan matikan auto-connect untuk mencegah Evil Twin Attack.
- VPN klien BPR bersifat sementara sesuai tiket; nyalakan saat perlu dan langsung matikan saat pekerjaan selesai.
- HTTPS mengenkripsi jalur, tetapi pemeriksaan domain registrasi utama adalah penentu keaslian situs.
- Batasi ekstensi browser dan pisahkan profil kerja guna menjaga keamanan sesi web.

**Simulasi Terkait:** Lab 07: Inspeksi URL & Struktur Domain - Eksplorasi berbagai contoh URL nyata dan pengecoh, membedakan subdomain sah dari subdomain spoofing, mengevaluasi status HTTPS serta izin ekstensi browser, dan memilih langkah jaringan lapangan yang aman.

---

## Modul 08: Cybersecurity Incident Response dan Reporting

**Jadwal:** Sesi Siang (14.20 - 14.55) | **Durasi:** 35 menit

> Bertindak cepat dan terstruktur pada lima menit pertama saat insiden siber terjadi untuk melindungi SaaS dan BPR klien.

### Tujuan Pembelajaran

- Mengenali gejala awal kompromi (Indicator of Compromise) pada laptop kerja, email sigitadi.id, dan akses VPN klien.
- Menjalankan protokol lima menit pertama (Isolate, Preserve, Report) tanpa merusak bukti digital.
- Memahami alasan teknis mengapa laptop terinfeksi tidak boleh langsung di-restart atau dibersihkan sendiri.
- Menerapkan budaya no-blame reporting dengan melapor cepat sebelum dampak meluas ke server SaaSCore.

### Materi Inti

#### 1. Mengenali Gejala Awal Kompromi Laptop dan Akun

Serangan terhadap vendor perbankan seperti PT. Sigit Adi Aman Siber (SaaS) umumnya berjalan senyap agar penyerang bisa mencuri token VPN atau kredensial SaaSCore tanpa terdeteksi. Mengenali gejala awal atau Indicator of Compromise (IoC) pada perangkat kerja menjadi garis pertahanan pertama sebelum akses melebar ke jaringan BPR.

- Lonjakan CPU dan kipas laptop secara tiba-tiba saat tidak ada proses berat atau query database.
- Jendela terminal atau PowerShell berkedip terbuka lalu hilang, atau aplikasi remote aktif tanpa izin.
- Notifikasi persetujuan MFA muncul mendadak di ponsel padahal Anda tidak sedang login.
- Ekstensi browser asing terpasang sendiri atau folder kerja tiba-tiba terkunci dengan catatan tebusan.

#### 2. Protokol 5 Menit Pertama: Isolate, Preserve, Report

Lima menit pertama setelah salah klik tautan berbahaya atau melihat anomali adalah jendela waktu paling kritis untuk menahan penyebaran serangan. Alih-alih panik atau bertanya di grup chat umum, ikuti protokol baku SaaS: Isolate, Preserve, dan Report.

- Isolate: Putuskan Wi-Fi, cabut kabel LAN, dan matikan koneksi VPN klien BPR seketika.
- Preserve: Biarkan laptop tetap menyala dalam mode offline, foto layar yang mencurigakan, dan catat jam kejadian.
- Report: Hubungi tim IT Security atau Lead operasional lewat jalur resmi dengan kronologi singkat dan jujur.

#### 3. Mengapa Tidak Langsung Restart atau Hapus Jejak?

Mematikan paksa laptop atau menjalankan aplikasi pembersih disk saat panik justru menghancurkan bukti di memori sementara (RAM). Tim keamanan membutuhkan data volatile tersebut untuk melakukan forensic triage, menentukan apakah kredensial SaaSCore bocor, dan melakukan rotasi kredensial secara tepat sasaran.

- Isi memori RAM (proses malware dan koneksi IP penyerang) hilang seketika saat laptop di-restart.
- Riwayat browser dan log lokal membantu melacak file atau URL pemicu kompromi.
- Jika perlu mengganti password segera, lakukan dari ponsel atau perangkat lain yang dipastikan bersih.

#### 4. Budaya Lapor Cepat Tanpa Takut Disalahkan (No-Blame Reporting)

Rasa takut dimarahi sering membuat staf menyembunyikan salah klik hingga berjam-jam, memberi waktu bagi penyerang untuk masuk ke lingkungan BPR. SaaS menerapkan prinsip no-blame reporting: pelapor yang cepat dan jujur dilindungi serta diapresiasi karena membantu menghentikan insiden lebih awal.

- Pelaporan dalam 5 menit memungkinkan pencabutan sesi VPN dan reset akses sebelum disalahgunakan.
- Evaluasi pasca-insiden fokus pada perbaikan kontrol teknis, bukan menghukum kesalahan manusia yang jujur.
- Sertakan daftar akun klien dan akses aktif saat melapor agar tim dapat langsung memantau log server.

### Analogi Sehari-hari: Analogi Kebocoran Gas di Dapur Kantor

Saat mencium bau gas bocor di dapur, Anda langsung menutup katup regulator (Isolate), tidak mengutak-atik sakelar listrik sambil membiarkan posisi kebocoran terlihat (Preserve), lalu segera memanggil petugas gedung (Report). Menunda melapor karena takut ditegur justru berisiko membakar seluruh ruangan.

### Studi Kasus Operasional SaaS / SaaSCore

#### [Ilustrasi Skenario] Implementor Mengklik Lampiran Palsu Sebelum Maintenance BPR

- **Konteks:** Seorang implementor SaaS menerima email tagihan perjalanan dinas palsu berisi file ZIP berpassword menjelang jadwal maintenance SaaSCore.
- **Kejadian:** Saat file dijalankan, jendela PowerShell berkedip singkat. Ia langsung mematikan Wi-Fi, tidak me-restart laptop, memotret layar, dan menelepon tim IT Security dalam empat menit.
- **Pembelajaran:** Respon cepat memungkinkan tim mencabut sesi VPN dan melakukan rotasi kredensial sebelum data keluar dari perangkat, sehingga server BPR tetap aman.

#### [Ilustrasi Skenario] Menunda Laporan Notifikasi MFA Misterius di Malam Hari

- **Konteks:** Staf support menerima tiga permintaan persetujuan MFA pada malam hari ketika laptop kerjanya sudah mati.
- **Kejadian:** Ia menekan tombol tolak lalu tidur dengan rencana melapor besok siang. Keesokan paginya ditemukan upaya login berulang memakai token sesi lama pada portal proyek.
- **Pembelajaran:** Munculnya prompt MFA tanpa aktivitas login membuktikan password sudah bocor dan wajib dilaporkan malam itu juga untuk reset akses segera.

### Lakukan (Do) vs Hindari (Don't)

| Lakukan (Do) | Hindari (Don't) | Mengapa |
| :--- | :--- | :--- |
| Putuskan Wi-Fi, kabel LAN, dan VPN klien BPR dalam hitungan detik saat gejala kompromi muncul. | Membiarkan laptop tetap online sambil mencari tahu sendiri penyebab anomali. | Jaringan yang masih terhubung memberi jalan bagi malware mengirim data keluar atau menjalar ke server BPR. |
| Biarkan laptop menyala secara offline dan foto layar untuk dokumentasi awal. | Langsung melakukan restart paksa, shutdown, atau membersihkan riwayat browser. | Restart menghapus bukti volatile di RAM yang dibutuhkan untuk forensic triage. |
| Laporkan salah klik atau anomali dalam 5 menit pertama lewat jalur darurat resmi SaaS. | Menyembunyikan insiden hingga keesokan hari karena takut disalahkan atasan. | Penundaan memperbesar dampak ke klien; budaya no-blame melindungi pelapor yang jujur dan cepat. |
| Gunakan perangkat lain yang bersih untuk melaporkan insiden dan mengganti password. | Mengetikkan password baru email sigitadi.id atau VPN dari laptop yang dicurigai terinfeksi. | Keylogger atau pencuri sesi di perangkat terkompromi akan langsung merekam kata sandi baru tersebut. |
| Laporkan setiap notifikasi MFA tak dikenal meski sudah Anda tekan Tolak (Deny). | Mengabaikan prompt MFA misterius karena mengira penolakan saja sudah cukup aman. | Prompt MFA tak diminta menandakan password utama sudah diketahui pihak lain dan perlu rotasi kredensial. |

### Kamus Istilah & Kalimat Teknis

| Istilah | Penjelasan Sederhana | Konteks SaaSCore |
| :--- | :--- | :--- |
| **Indicator of Compromise (IoC)** | Tanda atau petunjuk awal bahwa perangkat atau akun kemungkinan telah disusupi pihak luar. | Contohnya notifikasi MFA mendadak atau koneksi aneh saat akses SaaSCore. |
| **Isolate-Preserve-Report** | Protokol tiga langkah darurat: putuskan jaringan, jaga kondisi bukti tetap utuh, lalu segera lapor. | Prosedur wajib 5 menit pertama bagi seluruh staf SaaS saat insiden terjadi. |
| **Volatile Memory (RAM)** | Memori sementara komputer yang menyimpan data proses aktif dan langsung hilang ketika daya dimatikan. | Menyimpan jejak malware atau koneksi aktif ke server penyerang sebelum sempat dicatat. |
| **Forensic Triage** | Pemeriksaan cepat awal pada perangkat terdampak untuk memastikan jenis serangan dan data yang sempat diakses. | Membantu tim SaaS menentukan apakah server BPR perlu diputus sementara. |
| **Rotasi Kredensial** | Penggantian password, token API, dan kunci VPN secara serentak setelah terindikasi bocor. | Menutup akses penyerang agar tidak bisa masuk lagi ke lingkungan SaaSCore. |
| **No-Blame Reporting** | Budaya pelaporan insiden tanpa menyalahkan pelapor yang jujur dan bertindak cepat. | Mendorong staf SaaS segera melapor jika tidak sengaja mengklik tautan jebakan. |

### Panduan Narasumber (Sigit Adi Irianto, S.Kom.)

**Poin Penyampaian Utama:**

- Tunjukkan contoh gejala kompromi nyata yang sering dianggap sepele (kilatan CMD dan prompt MFA malam hari).
- Tekankan urutan Isolate-Preserve-Report dan jelaskan secara sederhana mengapa tidak boleh langsung shutdown.
- Tegaskan komitmen manajemen PT. Sigit Adi Aman Siber terhadap no-blame reporting untuk kesalahan tidak disengaja.

**Pemantik Diskusi Kelas:** Jika pukul 21.00 WIB Anda sadar baru saja memasukkan password sigitadi.id di situs palsu saat VPN BPR menyala, apa 3 hal pertama yang Anda lakukan secara berurutan?

### Poin Kunci & Simulasi Eksploratif

- Waspadai gejala dini kompromi seperti lonjakan CPU, kilatan terminal, ekstensi asing, dan prompt MFA tak dikenal.
- Jalankan urutan 5 menit pertama: Isolate (putus jaringan), Preserve (tahan perangkat tetap menyala offline), dan Report (lapor resmi).
- Jangan pernah me-restart paksa atau mengganti password dari laptop yang sedang dicurigai terinfeksi.
- Budaya no-blame reporting menjadikan staf yang melapor cepat sebagai penyelamat operasional SaaS dan BPR.

**Simulasi Terkait:** Lab 08: Simulator Krisis Tanggap Darurat - Eksplorasi kondisi aman dan berisiko pada skenario krisis 5 menit pertama ketika laptop kerja menunjukkan gejala kompromi saat terhubung ke BPR.

---

## Modul 09: Email, Cloud, dan Digital Communication Security

**Jadwal:** Sesi Siang (14.55 - 15.30) | **Durasi:** 35 menit

> Mengamankan email korporat, hak akses cloud, serta percakapan grup tim agar kredensial SaaSCore dan data pribadi nasabah BPR tidak bocor.

### Tujuan Pembelajaran

- Memahami risiko kebocoran dari tautan publik ("Anyone with the link") pada Google Drive dan OneDrive.
- Mengonfigurasi izin berbagi dokumen cloud berbasis prinsip least privilege dan batas waktu akses.
- Menerapkan larangan mengirim IP server, kredensial, dan screenshot data nasabah BPR di WhatsApp atau Telegram.
- Menggunakan jalur terpisah (out-of-band), redaction, dan pemeriksaan penerima email secara disiplin.

### Materi Inti

#### 1. Risiko Tautan Publik ("Anyone with the Link") di Cloud

Membagikan folder proyek dengan opsi "Anyone with the link" terasa praktis saat berkoordinasi dengan BPR, tetapi artinya siapa pun yang memperoleh URL tersebut dapat membukanya tanpa login. Tautan terbuka sangat mudah bocor lewat penerusan pesan, riwayat browser, atau tetap aktif berbulan-bulan setelah proyek selesai.

- Setel akses ke mode Restricted dan cantumkan alamat email penerima secara spesifik (prinsip least privilege).
- Pasang tanggal kedaluwarsa (expiration date) untuk setiap akses dokumen eksternal.
- Nonaktifkan opsi download dan copy jika penerima eksternal cukup membaca secara daring.
- Lakukan audit izin folder proyek secara rutin begitu fase UAT atau implementasi selesai.

#### 2. Larangan Kredensial dan Data Nasabah di WhatsApp/Telegram

Mengirim pasangan IP server, username, dan password SaaSCore ke grup WhatsApp atau Telegram sama saja menyebar kredensial ke galeri ponsel dan backup cloud pribadi seluruh anggota grup. Selain itu, membagikan screenshot error yang masih menampilkan nama, NIK, atau saldo nasabah BPR melanggar perlindungan Data Pribadi (UU PDP).

- Dilarang keras menulis IP/host server beserta username dan password dalam pesan chat atau grup mana pun.
- Dilarang mengirim screenshot data nasabah asli (NIK, rekening, saldo, mutasi) ke aplikasi chat.
- Lakukan penyamaran (redaction/blur) pada seluruh identitas nasabah sebelum membagikan tangkapan layar bug.
- Selalu logout dari WhatsApp Web setelah memakai komputer bersama dan aktifkan kunci aplikasi chat.

#### 3. Disiplin Email Bisnis dan Jalur Pengiriman Aman

Kesalahan memilih saran auto-complete pada aplikasi email dapat mengirim dokumen sensitif ke BPR lain atau alamat pribadi yang namanya mirip. Untuk siaran ke banyak klien sekaligus, mencantumkan semua email di kolom To atau CC membuka daftar klien SaaS serta memicu risiko Reply All.

- Periksa ulang alamat lengkap dan domain penerima selama tiga detik sebelum menekan tombol Send.
- Gunakan kolom BCC atau kirim email terpisah saat menghubungi beberapa BPR klien secara bersamaan.
- Enkripsi lampiran sensitif dan kirimkan kata sandi pembukanya via jalur berbeda (Out-of-Band Delivery).
- Gunakan brankas kredensial resmi atau secret link sekali baca untuk berbagi password sementara.

### Analogi Sehari-hari: Analogi Papan Pengumuman Pos Satpam vs Amplop Tersegel

Memasang tautan "Anyone with the link" atau mengirim password di grup chat seperti menempelkan kunci brankas di papan pengumuman pos satpam. Berbagi berbasis akun email spesifik dan pengiriman password terpisah seperti menyerahkan amplop tersegel hanya kepada penerima yang terverifikasi.

### Studi Kasus Operasional SaaS / SaaSCore

#### [Ilustrasi Skenario] Folder UAT SaaSCore Masih Terbuka Publik Pasca-Proyek

- **Konteks:** Menjelang UAT, staf membagikan folder panduan dan konfigurasi uji di Google Drive dengan izin "Anyone with the link" agar pihak BPR mudah mengunduh.
- **Kejadian:** Dua bulan setelah UAT selesai, tautan tersebut ditemukan masih dapat dibuka oleh akun Gmail pribadi tanpa autentikasi sigitadi.id.
- **Pembelajaran:** Dokumen teknis proyek wajib memakai mode Restricted dengan batas waktu akses dan dicabut segera setelah UAT tuntas.

#### [Ilustrasi Skenario] Screenshot Error Database Nasabah Dibagikan di Grup WhatsApp

- **Konteks:** Saat gangguan proses akhir hari (EOD) di BPR, staf memotret layar error database SaaSCore yang menampilkan nama dan saldo nasabah lalu mengirimnya ke grup WhatsApp bersama password akses darurat.
- **Kejadian:** Gambar dan kredensial tersebut otomatis tersinkron ke cloud pribadi anggota grup dan tertinggal meski salah satu staf kemudian pindah kerja.
- **Pembelajaran:** Identitas nasabah wajib disamarkan (redaction) dan kredensial tidak boleh masuk ke chat; gunakan vault resmi serta segera rotasi password darurat setelah EOD pulih.

### Lakukan (Do) vs Hindari (Don't)

| Lakukan (Do) | Hindari (Don't) | Mengapa |
| :--- | :--- | :--- |
| Setel folder cloud ke mode Restricted dan beri akses hanya ke alamat email yang berwenang. | Memilih opsi "Anyone with the link" untuk dokumen konfigurasi, topologi, atau UAT BPR. | Tautan publik memungkinkan siapa saja mengakses isi folder tanpa login atau jejak audit akun. |
| Lakukan redaction (sensor/blur) pada nama, NIK, nomor rekening, dan saldo sebelum berbagi screenshot. | Mengirim tangkapan layar aplikasi SaaSCore yang menampilkan data pribadi nasabah secara utuh. | Melindungi privasi nasabah sesuai perjanjian kerahasiaan dan ketentuan Data Pribadi / UU PDP. |
| Gunakan pengelola kredensial resmi atau secret link sekali pakai untuk berbagi password sementara. | Mengetik IP server, username, dan password secara langsung di grup WhatsApp atau Telegram. | Riwayat chat tersimpan permanen di perangkat pribadi anggota grup dan rawan dicadangkan tanpa kontrol kantor. |
| Gunakan kolom BCC saat mengirim pengumuman teknis ke banyak BPR berbeda. | Menaruh puluhan email pejabat BPR yang berbeda dalam kolom To atau CC. | Menjaga kerahasiaan daftar klien SaaS dan mencegah insiden Reply All lintas BPR. |
| Kirim file terenkripsi melalui email dan kirimkan password pembukanya lewat saluran berbeda. | Menuliskan password pembuka ZIP/PDF di badan email yang sama dengan file lampiran. | Pemisahan jalur (Out-of-Band) memastikan penyerang yang menyadap email tidak langsung mendapat kuncinya. |

### Kamus Istilah & Kalimat Teknis

| Istilah | Penjelasan Sederhana | Konteks SaaSCore |
| :--- | :--- | :--- |
| **Anyone with the Link** | Pengaturan berbagi cloud yang mengizinkan siapa pun pemilik tautan membuka file tanpa login. | Sangat berisiko jika dipakai untuk dokumen konfigurasi atau data proyek SaaSCore. |
| **Least Privilege** | Prinsip memberi hak akses seminimal mungkin sesuai kebutuhan tugas dan waktu tertentu saja. | Cukup beri izin View ke email PIC BPR terkait, bukan Edit untuk semua orang. |
| **Data Pribadi / UU PDP** | Data identitas dan finansial individu (seperti NIK, nama, rekening, saldo) yang dilindungi undang-undang. | Tim SaaS wajib menjaga kerahasiaan data nasabah BPR yang diproses di SaaSCore. |
| **Redaction (Penyamaran Data)** | Menutup atau memburamkan bagian informasi sensitif pada gambar atau log sebelum dibagikan. | Wajib dilakukan pada screenshot kendala aplikasi agar data nasabah tidak ikut terkirim. |
| **Out-of-Band Delivery** | Mengirim file sensitif dan kunci pembukanya melalui dua jalur komunikasi yang berbeda. | Misalnya file terenkripsi via email sigitadi.id, sedangkan password dikirim lewat saluran terpisah. |
| **BCC vs CC** | BCC menyembunyikan daftar alamat penerima satu sama lain, sedangkan CC menampilkannya ke semua orang. | Gunakan BCC saat mengirim pemberitahuan pembaruan ke banyak BPR klien. |

### Panduan Narasumber (Sigit Adi Irianto, S.Kom.)

**Poin Penyampaian Utama:**

- Tunjukkan perbedaan setting "Restricted" vs "Anyone with the link" di Google Drive/OneDrive secara singkat.
- Bahaskan risiko nyata grup WhatsApp proyek yang penuh screenshot error nasabah dan IP+password server.
- Perkenalkan kebiasaan sensor cepat (redaction) dan pengiriman kata sandi lewat vault/out-of-band.

**Pemantik Diskusi Kelas:** Saat BPR minta bantuan mendesak pukul 17.00 dan butuh screenshot error plus akun uji sementara, bagaimana cara mengirim keduanya dengan aman tanpa memperlambat penanganan?

### Poin Kunci & Simulasi Eksploratif

- Hindari tautan publik ("Anyone with the link"); terapkan izin email spesifik, batas waktu, dan audit akses berkala.
- Dilarang keras mengirim IP server, kredensial, atau screenshot data nasabah asli melalui WhatsApp maupun Telegram.
- Selalu lakukan redaction pada data pribadi nasabah sebelum membagikan tangkapan layar kendala teknis.
- Periksa alamat penerima email dengan teliti, pakai BCC untuk siaran multi-BPR, dan pisahkan jalur pengiriman password.

**Simulasi Terkait:** Lab 09: Konfigurasi Hak Akses Cloud & Audit Percakapan Grup - Eksplorasi pengaturan izin berbagi folder cloud yang aman dan audit kondisi aman vs berisiko pada percakapan grup teknis proyek.

---

## Modul 10: Cybersecurity Best Practices dan Security Awareness Culture

**Jadwal:** Sesi Siang (15.30 - 16.00) | **Durasi:** 30 menit

> Menyatukan seluruh materi ke dalam 7 Kebiasaan Emas Keamanan Siber SaaS dan membangun budaya kerja aman secara kolektif.

### Tujuan Pembelajaran

- Memahami dan menginternalisasi 7 Kebiasaan Emas Keamanan Siber PT. Sigit Adi Aman Siber (SaaS).
- Menghubungkan peran Developer, Implementor, Support, QA, dan Infrastruktur dalam menjaga keamanan SaaSCore.
- Membangun budaya saling mengingatkan secara sehat dan suportif saat melihat potensi celah keamanan.
- Menyusun langkah aksi konkret 24 jam dan 7 hari pertama setelah BimTek selesai.

### Materi Inti

#### 1. Dari Materi BimTek Menjadi Budaya Kerja Harian

Keamanan siber tidak cukup hanya dipahami dalam satu hari pelatihan; nilainya baru terasa saat menjadi kebiasaan otomatis ketika tim bekerja di bawah tekanan tenggat go-live BPR. Sebagai pengembang dan pengelola SaaSCore, kepercayaan seluruh klien perbankan bergantung pada konsistensi setiap individu di PT. Sigit Adi Aman Siber (SaaS).

- Keamanan bukan hanya tugas tim IT Security, melainkan standar profesionalisme seluruh pegawai SaaS.
- Kondisi mendesak menjelang akhir bulan justru menjadi momen terpenting untuk tetap patuh prosedur.
- Budaya kerja aman (Security Culture) mengutamakan pencegahan sejak awal, bukan perbaikan setelah kebocoran.

#### 2. Rangkuman 7 Kebiasaan Emas Keamanan Siber SaaS

Seluruh materi dari Modul 1 hingga Modul 9 dirangkum menjadi 7 Kebiasaan Emas agar mudah diingat dan langsung dipraktikkan setiap hari. Ketujuh kebiasaan ini membentuk lapisan pertahanan berlapis (Defense in Depth) yang melindungi akun, perangkat, jaringan, dan data BPR klien.

- 1. Passphrase Unik & MFA: Gunakan passphrase minimal 16 karakter yang unik tiap akun serta wajib aktifkan MFA.
- 2. Verifikasi Phishing & Domain sigitadi.id: Periksa pengirim utuh dan arahkan kursor ke URL sebelum klik atau login.
- 3. Klasifikasi Data & Enkripsi Dump DB: Lindungi data klien dan enkripsi dump SaaSCore sebelum disimpan atau dikirim.
- 4. Endpoint Bersih Tanpa Bajakan: Tolak software crack, rutin patch OS/browser, aktifkan BitLocker/FileVault, dan Win + L.
- 5. Jaringan Aman & Disiplin VPN: Hindari Wi-Fi publik tanpa pelindung dan putuskan VPN klien segera setelah selesai.
- 6. Komunikasi & Cloud Tertutup: Hindari "Anyone with the link" dan dilarang kirim IP, password, atau data nasabah di chat.
- 7. Lapor Cepat 5 Menit Pertama: Terapkan Isolate-Preserve-Report tanpa takut disalahkan (no-blame reporting).

#### 3. Tanggung Jawab Kolektif Lintas Peran di SaaS

Setiap divisi di SaaS memegang mata rantai keamanan yang saling terhubung dalam ekosistem SaaSCore. Kebiasaan saling mengingatkan secara sopan saat ada rekan yang lupa mengunci layar atau hampir mengirim kredensial di chat akan memperkuat ketahanan tim secara menyeluruh.

- Developer & QA: Tidak menaruh password di kode (hardcoded) dan memakai data anonymization saat pengujian.
- Implementor & Support: Memakai akun personal (bukan shared account) dan selalu memutus VPN klien usai sesi kerja.
- Infra & Tim Inti: Menjalankan access review rutin serta mencabut akses begitu proyek selesai atau staf berpindah tugas.

#### 4. Langkah Aksi Pribadi Setelah Pelatihan

Perubahan budaya selalu dimulai dari tindakan kecil pada perangkat dan akun kita masing-masing hari ini. Lakukan audit mandiri berkala agar celah lama dari proyek terdahulu tidak tertinggal menjadi pintu masuk serangan.

- Hari ke-1: Verifikasi MFA di seluruh akun sigitadi.id, periksa password manager, dan biasakan Win + L.
- Minggu ke-1: Bersihkan folder cloud dari tautan publik lama, hapus dump DB kedaluwarsa, dan cek update OS/browser.
- Bulanan: Lakukan audit mandiri ekstensi browser dan izin akses dokumen proyek yang sudah selesai.

### Analogi Sehari-hari: Analogi Daftar Periksa Keselamatan Kru Penerbangan

Pesawat terbang aman bukan hanya karena kecanggihan mesinnya, melainkan karena teknisi, pramugari, dan pilot menjalankan checklist yang sama dengan disiplin setiap hari. Di SaaS, 7 Kebiasaan Emas adalah checklist keselamatan harian agar setiap layanan SaaSCore mendarat aman di BPR.

### Studi Kasus Operasional SaaS / SaaSCore

#### [Ilustrasi Skenario] Saling Mengingatkan Saat Tekanan Go-Live Akhir Bulan

- **Konteks:** Menjelang go-live modul SaaSCore, seorang rekan tim hampir mengirim file konfigurasi database tanpa enkripsi ke grup WhatsApp agar lebih cepat dicek.
- **Kejadian:** Rekannya langsung mengingatkan secara sopan lewat telepon agar file ditaruh di folder cloud Restricted dan kata sandi dikirim terpisah. Proses tetap selesai tepat waktu tanpa risiko kebocoran.
- **Pembelajaran:** Kecepatan kerja dan keamanan dapat berjalan beriringan saat tim terbiasa saling mengingatkan dengan cara yang konstruktif.

#### [Ilustrasi Skenario] Audit Mandiri Bulanan Menutup Celah Sisa Proyek BPR

- **Konteks:** Setelah menyelesaikan pendampingan migrasi data di beberapa BPR, tim implementasi SaaS menjadwalkan sesi bersih-bersih digital selama 30 menit di akhir bulan.
- **Kejadian:** Tim menemukan sisa file backup sementara di folder Downloads, satu tautan folder UAT yang belum dicabut, dan akun uji coba staging yang masih aktif, lalu langsung membersihkannya.
- **Pembelajaran:** Audit mandiri berkala mencegah akumulasi sisa akses dan file proyek yang sering terlupakan setelah masa sibuk berakhir.

### Lakukan (Do) vs Hindari (Don't)

| Lakukan (Do) | Hindari (Don't) | Mengapa |
| :--- | :--- | :--- |
| Terapkan 7 Kebiasaan Emas secara konsisten baik saat kondisi santai maupun saat tenggat ketat. | Memotong prosedur keamanan dengan alasan pekerjaan sedang darurat atau mendesak. | Kesalahan fatal dan serangan siber justru paling sering berhasil terjadi ketika tim sedang terburu-buru. |
| Ingatkan rekan secara sopan dan pribadi jika melihat layar ditinggal terbuka atau kebiasaan berisiko. | Membiarkan celah keamanan di depan mata karena merasa sungkan atau bukan tugas divisi Anda. | Keamanan adalah tanggung jawab kolektif; satu perangkat yang bocor dapat berdampak ke seluruh tim. |
| Gunakan data dummy atau data yang sudah disamarkan (anonymized) untuk pengujian pengembangan. | Memakai salinan database nasabah BPR asli di laptop kerja atau server uji terbuka. | Mengurangi paparan data pribadi asli meminimalkan risiko kebocoran di lingkungan pengembangan. |
| Lakukan pencabutan akses dan rotasi kredensial segera saat ada rotasi PIC BPR atau offboarding staf. | Menggunakan akun admin bersama yang kata sandinya tidak pernah diganti meski anggota tim berubah. | Akun personal dan access review menjaga jejak audit tetap jelas serta menutup akses pihak yang sudah tidak bertugas. |
| Apresiasi rekan yang cepat dan jujur melapor ketika mengalami salah klik atau anomali keamanan. | Menyalahkan atau menertawakan rekan yang melapor cepat saat terjadi kesalahan. | Dukungan sosial menjaga budaya no-blame tetap hidup sehingga insiden selalu terdeteksi sejak dini. |

### Kamus Istilah & Kalimat Teknis

| Istilah | Penjelasan Sederhana | Konteks SaaSCore |
| :--- | :--- | :--- |
| **Security Culture** | Kebiasaan, nilai, dan sikap bersama dalam organisasi yang menjadikan keamanan sebagai bagian alami dari kerja harian. | Menjadikan staf SaaS otomatis mengunci layar dan memverifikasi tautan tanpa perlu diawasi. |
| **7 Kebiasaan Emas** | Tujuh praktik inti keamanan siber yang wajib dijalankan seluruh pegawai PT. Sigit Adi Aman Siber. | Panduan ringkas dari seluruh Modul 01 sampai Modul 09 untuk operasional SaaSCore. |
| **Defense in Depth** | Strategi pertahanan berlapis sehingga jika satu kontrol gagal, masih ada lapisan lain yang menahan serangan. | Kombinasi MFA, enkripsi data, VPN disiplin, dan lapor cepat 5 menit. |
| **Data Anonymization** | Proses menyamarkan atau mengganti data identitas asli menjadi data acak/dummy untuk keperluan uji coba. | Melindungi privasi nasabah BPR saat Developer dan QA menguji fitur baru SaaSCore. |
| **Access Review / Offboarding** | Peninjauan berkala dan pencabutan hak akses sistem saat proyek selesai atau pegawai berganti peran. | Mencegah akun lama atau mantan anggota proyek masih memiliki akses ke server klien. |
| **Audit Mandiri Berkala** | Pemeriksaan rutin oleh masing-masing staf atas kesehatan laptop, ekstensi browser, dan izin folder cloud. | Menjaga perangkat kerja tetap bersih dari file dump atau tautan proyek yang kedaluwarsa. |

### Panduan Narasumber (Sigit Adi Irianto, S.Kom.)

**Poin Penyampaian Utama:**

- Tinjau ulang 7 Kebiasaan Emas secara cepat dan kaitkan langsung dengan tantangan harian peserta di proyek SaaSCore.
- Dorong komitmen tim untuk saling mengingatkan secara suportif tanpa mempermalukan rekan kerja.
- Pandu kelas masuk ke Lab 10 sebagai simulasi diskusi kasus terpadu lintas modul tanpa tekanan nilai.

**Pemantik Diskusi Kelas:** Dari 7 Kebiasaan Emas Keamanan Siber SaaS, kebiasaan nomor berapa yang paling menantang diterapkan di tim Anda saat ini, dan satu perubahan kecil apa yang bisa dimulai besok pagi?

### Poin Kunci & Simulasi Eksploratif

- 7 Kebiasaan Emas Keamanan Siber SaaS menyatukan seluruh praktik inti mulai dari Passphrase & MFA hingga Lapor Cepat 5 Menit Pertama.
- Keamanan data nasabah BPR dan integritas SaaSCore adalah tanggung jawab kolektif lintas peran di PT. Sigit Adi Aman Siber.
- Budaya saling mengingatkan yang sehat dan no-blame reporting jauh lebih kuat daripada sekadar aturan tertulis.
- Mulai audit mandiri 24 jam pertama pada MFA, enkripsi disk, kebersihan software, serta izin folder cloud.

**Simulasi Terkait:** Lab 10: Simulasi Diskusi Kasus Terpadu Lintas Modul - Eksplorasi 10 situasi insiden lintas modul secara interaktif untuk didiskusikan bersama di kelas tanpa sistem nilai atau batas lulus.

---

## 7 Kebiasaan Emas Keamanan Siber PT. Sigit Adi Aman Siber (SaaS)

### 1. Passphrase Unik dan MFA Aplikasi

- **Kebiasaan:** Gunakan passphrase minimal 16 karakter yang unik untuk setiap akun kerja (email SaaS, portal tiket, server SaaSCore, dan VPN BPR), serta aktifkan MFA berbasis aplikasi autentikator.
- **Alasan:** Passphrase panjang jauh lebih tahan terhadap serangan brute-force maupun credential stuffing, sedangkan MFA aplikasi mencegah pengambilalihan akun meski kata sandi bocor.

### 2. Verifikasi Phishing dan Domain Resmi sigitadi.id

- **Kebiasaan:** Periksa alamat pengirim secara utuh dan arahkan kursor ke setiap tautan untuk memastikan domain utama benar-benar sigitadi.id atau domain resmi BPR klien sebelum mengeklik atau memasukkan kredensial.
- **Alasan:** Penyerang kerap memakai teknik typosquatting dan subdomain palsu disertai tekanan urgensi palsu untuk mencuri akun vendor IT sebagai pintu masuk ke jaringan perbankan.

### 3. Klasifikasi Data dan Enkripsi Dump Database

- **Kebiasaan:** Klasifikasikan setiap dokumen kerja, dilarang keras menyimpan dump database atau backup SaaSCore nasabah BPR di laptop tanpa enkripsi penuh, dan segera hapus berkas sementara setelah tiket selesai.
- **Alasan:** Data nasabah dan konfigurasi core banking termasuk kategori Rahasia hingga Sangat Rahasia; kebocoran satu file dump tanpa enkripsi berdampak langsung pada kepatuhan dan reputasi BPR klien.

### 4. Endpoint Bersih Tanpa Software Bajakan

- **Kebiasaan:** Gunakan hanya perangkat lunak berlisensi resmi, rutin perbarui sistem operasi dan browser, aktifkan enkripsi disk penuh, kunci layar (Win + L) saat meninggalkan meja, dan tolak USB tak dikenal.
- **Alasan:** Aktivator atau software bajakan sering membawa infostealer yang mencuri cookie sesi login, token VPN klien, dan kata sandi tersimpan dari browser secara diam-diam.

### 5. Jaringan Aman dan Disiplin VPN Klien

- **Kebiasaan:** Hindari akses sistem produksi SaaSCore atau portal internal melalui Wi-Fi publik tanpa pelindung, putuskan koneksi VPN BPR segera setelah pekerjaan remote selesai, dan periksa validitas HTTPS serta ekstensi browser.
- **Alasan:** Koneksi VPN yang dibiarkan menyala terus-menerus memperluas jangkauan pergerakan penyerang jika laptop terkompromi, sedangkan Wi-Fi publik rentan penyadapan Evil Twin.

### 6. Komunikasi Aman Tanpa Kredensial di Chat atau Cloud Publik

- **Kebiasaan:** Dilarang mengirim password, PIN, token, IP server produksi, atau tangkapan layar data nasabah di grup WhatsApp/Telegram; kirim kunci enkripsi lewat jalur terpisah (Out-of-Band) dan batasi akses cloud hanya ke akun spesifik.
- **Alasan:** Riwayat obrolan grup dan tautan cloud terbuka ("Anyone with the link") sangat mudah diteruskan, tersinkron ke perangkat pribadi, atau terindeks pihak luar.

### 7. Lapor Cepat 5 Menit Pertama Tanpa Takut Disalahkan

- **Kebiasaan:** Jika tidak sengaja mengeklik tautan mencurigakan, menjalankan lampiran asing, atau melihat aktivitas ganjil, segera putuskan jaringan (Isolate), jangan matikan paksa atau hapus bukti (Preserve), dan lapor ke tim IT Security SaaS dalam 5 menit pertama (Report).
- **Alasan:** Kecepatan pelaporan tanpa rasa takut disalahkan (no-blame culture) menentukan apakah insiden dapat dihentikan di satu laptop sebelum menjalar ke server SaaSCore milik BPR klien.

---

*Training IT Security Awareness and Cybersecurity Protection 2026 - sigitadi.id*
