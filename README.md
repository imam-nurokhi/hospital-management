# RS Sehat Medika – Hospital Management Website

Website profesional untuk manajemen rumah sakit yang lengkap, responsif, dan modern.

## 🏥 Fitur Utama

- **Landing Page** – Hero section dengan animasi typing & particle background
- **Navigasi** – Sticky navbar responsif dengan hamburger menu untuk mobile
- **Statistik** – Counter animasi untuk jumlah pasien, dokter, departemen
- **Tentang Kami** – Profil rumah sakit dengan keunggulan & penghargaan
- **Layanan Medis** – 6 departemen utama (Kardiologi, Neurologi, Bedah, dll.)
- **Tim Dokter** – Profil dokter spesialis dengan status ketersediaan
- **Buat Janji Temu** – Formulir pendaftaran lengkap dengan konfirmasi
- **Testimoni Pasien** – Slider otomatis dengan navigasi
- **Fasilitas** – Galeri fasilitas rumah sakit modern
- **Berita & Info** – Artikel kesehatan terbaru
- **Kontak** – Informasi kontak lengkap & form pesan
- **Footer** – Navigasi, layanan, kontak darurat, sosial media

## 🎨 Desain

- Responsif & mobile-friendly (breakpoint: 1024px, 768px, 480px)
- Animasi scroll (AOS – Animate On Scroll)
- Animated counter untuk statistik
- Smooth scroll navigation
- Loading screen animation
- Floating action cards di hero
- Glassmorphism effect di navbar

## 🛠️ Teknologi

- HTML5 Semantik
- CSS3 modern (Custom Properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Poppins + Inter)
- SVG icons (inline, zero dependency)

## 📁 Struktur

```
hospital-management/
├── index.html          # Halaman utama (single page)
├── css/
│   └── style.css       # Stylesheet lengkap
├── js/
│   └── main.js         # JavaScript interaktivitas
└── README.md
```

## 🚀 Cara Menjalankan

Cukup buka `index.html` di browser modern. Tidak memerlukan server atau build tool.

```bash
# Atau dengan simple HTTP server
npx serve .
# atau
python3 -m http.server 8080
```

## 📱 Responsif

| Breakpoint | Tampilan |
|-----------|---------|
| ≥ 1200px  | Desktop penuh (4 kolom dokter, 3 kolom layanan) |
| 1024px    | Tablet landscape (layout 1 kolom untuk beberapa section) |
| 768px     | Tablet/Mobile (hamburger menu, 2 kolom) |
| 480px     | Mobile kecil (1 kolom, font lebih kecil) |
