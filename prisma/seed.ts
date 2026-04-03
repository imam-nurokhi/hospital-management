import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg(process.env.DATABASE_URL as string);
// @ts-ignore
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding hospital database...");

  // Admin
  const hashedPw = await bcrypt.hash("admin123456", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@rssehatmedika.com" },
    update: {},
    create: { name: "Admin RS Sehat Medika", email: "admin@rssehatmedika.com", password: hashedPw, role: "ADMIN" },
  });

  // Departments
  const depts = [
    { name: "Kardiologi (Jantung)", slug: "kardiologi", description: "Diagnosis dan pengobatan penyakit jantung & pembuluh darah", icon: "❤️", color: "#ef4444" },
    { name: "Neurologi (Saraf)", slug: "neurologi", description: "Gangguan sistem saraf pusat dan tepi", icon: "🧠", color: "#8b5cf6" },
    { name: "Bedah Umum", slug: "bedah-umum", description: "Prosedur operasi dan bedah tindakan", icon: "🔪", color: "#f59e0b" },
    { name: "Onkologi (Kanker)", slug: "onkologi", description: "Deteksi dini dan pengobatan kanker", icon: "🎗️", color: "#ec4899" },
    { name: "Obstetri & Ginekologi", slug: "obgyn", description: "Kesehatan reproduksi wanita dan kebidanan", icon: "👶", color: "#10b981" },
    { name: "Radiologi", slug: "radiologi", description: "Pencitraan medis diagnosis menggunakan radiasi", icon: "🩻", color: "#3b82f6" },
    { name: "Penyakit Dalam", slug: "penyakit-dalam", description: "Diagnosis penyakit organ tubuh bagian dalam", icon: "🫁", color: "#06b6d4" },
    { name: "Anak (Pediatri)", slug: "pediatri", description: "Pelayanan kesehatan anak dari bayi hingga remaja", icon: "🧒", color: "#84cc16" },
    { name: "Ortopedi", slug: "ortopedi", description: "Gangguan tulang, sendi, otot, dan ligamen", icon: "🦴", color: "#d97706" },
    { name: "THT", slug: "tht", description: "Telinga, Hidung, Tenggorokan dan kepala leher", icon: "👂", color: "#7c3aed" },
    { name: "Mata (Oftalmologi)", slug: "oftalmologi", description: "Kesehatan dan operasi mata", icon: "👁️", color: "#0891b2" },
    { name: "Kulit & Kelamin", slug: "kulit-kelamin", description: "Penyakit kulit, estetika dermatologi", icon: "🌿", color: "#16a34a" },
    { name: "Psikiatri", slug: "psikiatri", description: "Kesehatan mental dan psikologis", icon: "🧘", color: "#9333ea" },
    { name: "Dokter Umum / IGD", slug: "igd", description: "Pelayanan darurat 24 jam dan dokter umum", icon: "🚨", color: "#dc2626" },
  ];

  const createdDepts: Record<string, string> = {};
  for (const dept of depts) {
    const d = await prisma.department.upsert({ where: { slug: dept.slug }, update: {}, create: dept });
    createdDepts[dept.slug] = d.id;
  }

  // Doctors
  const doctors = [
    { name: "dr. Budi Santoso, Sp.JP", slug: "budi-santoso", speciality: "Kardiologi", departmentId: createdDepts["kardiologi"], bio: "Spesialis jantung berpengalaman 15 tahun. Ahli dalam tindakan kateterisasi dan bedah jantung minimally invasive.", education: "FK UI – Spesialis Jantung & Pembuluh Darah", experience: 15, rating: 4.9, schedule: { senin: "08:00-12:00", rabu: "08:00-12:00", jumat: "13:00-17:00" } },
    { name: "dr. Siti Rahayu, Sp.N", slug: "siti-rahayu", speciality: "Neurologi", departmentId: createdDepts["neurologi"], bio: "Spesialis saraf dengan keahlian di bidang stroke, epilepsi, dan gangguan saraf perifer. Berpengalaman 12 tahun.", education: "FK UNPAD – Neurologi", experience: 12, rating: 4.8 },
    { name: "dr. Ahmad Fauzi, Sp.B", slug: "ahmad-fauzi", speciality: "Bedah Umum", departmentId: createdDepts["bedah-umum"], bio: "Ahli bedah dengan spesialisasi laparoskopi dan bedah minimal invasif. 10 tahun pengalaman.", education: "FK UGM – Ilmu Bedah", experience: 10, rating: 4.7 },
    { name: "dr. Dewi Kusuma, Sp.OG", slug: "dewi-kusuma", speciality: "Obstetri & Ginekologi", departmentId: createdDepts["obgyn"], bio: "Spesialis kandungan berpengalaman dalam penanganan kehamilan risiko tinggi dan laparoskopi ginekologi.", education: "FK UI – Obstetri & Ginekologi", experience: 14, rating: 4.9 },
    { name: "dr. Reza Pratama, Sp.A", slug: "reza-pratama", speciality: "Pediatri (Anak)", departmentId: createdDepts["pediatri"], bio: "Dokter anak dengan pendekatan ramah anak. Ahli dalam imunisasi dan tumbuh kembang anak.", education: "FK UNAIR – Ilmu Kesehatan Anak", experience: 8, rating: 4.8 },
    { name: "dr. Hendra Wijaya, Sp.PD", slug: "hendra-wijaya", speciality: "Penyakit Dalam", departmentId: createdDepts["penyakit-dalam"], bio: "Internist berpengalaman dalam penanganan diabetes, hipertensi, dan penyakit metabolik.", education: "FK UGM – Ilmu Penyakit Dalam", experience: 11, rating: 4.7 },
    { name: "dr. Maya Indah, Sp.M", slug: "maya-indah", speciality: "Oftalmologi (Mata)", departmentId: createdDepts["oftalmologi"], bio: "Dokter mata spesialis dengan keahlian LASIK, operasi katarak, dan glaukoma.", education: "FK UI – Ilmu Penyakit Mata", experience: 9, rating: 4.8 },
    { name: "dr. Agus Dermawan, Sp.KK", slug: "agus-dermawan", speciality: "Kulit & Kelamin", departmentId: createdDepts["kulit-kelamin"], bio: "Dermatologis dengan spesialisasi dermatologi estetika, acne, dan perawatan kulit modern.", education: "FK UNDIP – Kulit & Kelamin", experience: 7, rating: 4.6 },
  ];

  for (const doc of doctors) {
    await prisma.doctor.upsert({ where: { slug: doc.slug }, update: {}, create: doc });
  }

  // Sample Patients
  const patients = [
    { name: "Budi Hartono", phone: "081234567890", email: "budi@example.com", medicalNo: "P001" },
    { name: "Sri Wahyuni", phone: "082345678901", email: "sri@example.com", medicalNo: "P002" },
    { name: "Andi Surya", phone: "083456789012", medicalNo: "P003" },
  ];
  for (const p of patients) {
    await prisma.patient.upsert({ where: { medicalNo: p.medicalNo }, update: {}, create: p });
  }

  // News
  const newsItems = [
    { title: "Tips Menjaga Kesehatan Jantung di Usia 40+", slug: "tips-jantung-40", excerpt: "Penyakit jantung adalah penyebab kematian nomor satu di dunia. Berikut 7 tips praktis untuk menjaga jantung tetap sehat.", content: "Penyakit jantung menjadi ancaman serius bagi kesehatan global. Dengan gaya hidup yang tepat, Anda bisa menjaga jantung tetap sehat.", category: "Kardiologi", author: "dr. Budi Santoso, Sp.JP" },
    { title: "Kenali Tanda-Tanda Stroke dan Penanganannya", slug: "tanda-stroke", excerpt: "Stroke adalah kondisi darurat medis. Kenali metode FAST (Face, Arms, Speech, Time) untuk respons cepat.", content: "Stroke membutuhkan penanganan cepat. Metode FAST membantu identifikasi gejala stroke secara dini.", category: "Neurologi", author: "dr. Siti Rahayu, Sp.N" },
    { title: "Panduan Kehamilan Sehat Trimester Pertama", slug: "kehamilan-sehat-t1", excerpt: "Trimester pertama adalah periode kritis bagi perkembangan janin. Nutrisi dan pemeriksaan rutin sangat penting.", content: "Trimester pertama kehamilan membutuhkan perhatian ekstra pada nutrisi dan pemeriksaan rutin.", category: "Obstetri", author: "dr. Dewi Kusuma, Sp.OG" },
    { title: "Deteksi Dini Kanker: Pentingnya Skrining Berkala", slug: "deteksi-dini-kanker", excerpt: "Kanker yang terdeteksi dini memiliki tingkat kesembuhan jauh lebih tinggi. Apa saja pemeriksaan yang dianjurkan?", content: "Deteksi dini kanker meningkatkan peluang kesembuhan secara signifikan.", category: "Onkologi", author: "Tim Medis RS Sehat Medika" },
    { title: "Diabetes Tipe 2: Gaya Hidup Sebagai Obat", slug: "diabetes-gaya-hidup", excerpt: "Perubahan gaya hidup bisa mengendalikan bahkan membalikkan diabetes tipe 2. Simak panduan lengkapnya.", content: "Diabetes tipe 2 dapat dikendalikan dengan perubahan gaya hidup yang konsisten.", category: "Penyakit Dalam", author: "dr. Hendra Wijaya, Sp.PD" },
    { title: "Kesehatan Mata di Era Digital: Lindungi dari Radiasi Layar", slug: "kesehatan-mata-digital", excerpt: "Penggunaan gadget berlebihan berdampak pada kesehatan mata. Blue light, dry eyes, dan cara mengatasinya.", content: "Penggunaan gadget berlebihan dapat merusak kesehatan mata. Lindungi mata Anda dengan tips berikut.", category: "Oftalmologi", author: "dr. Maya Indah, Sp.M" },
  ];
  for (const n of newsItems) {
    await prisma.news.upsert({ where: { slug: n.slug }, update: {}, create: n });
  }

  console.log("✅ Database seeded successfully!");
  console.log("Admin: admin@rssehatmedika.com / admin123456");
}

main().catch(console.error).finally(() => prisma.$disconnect());
