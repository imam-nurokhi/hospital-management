export type WorkstreamStatus = "Ready" | "In progress" | "Blocked";

type Workstream = {
  name: string;
  owner: string;
  status: WorkstreamStatus;
  detail: string;
};

type Role = {
  name: string;
  users: number;
  permissions: string[];
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Aktif" | "Undangan" | "Nonaktif";
  lastSeen: string;
};

type Unit = {
  name: string;
  code: string;
  services: number;
  lead: string;
  status: "Aktif" | "Draft";
};

type ServiceCatalogItem = {
  code: string;
  name: string;
  unit: string;
  tariff: number;
  turnaround: string;
};

type Patient = {
  mrn: string;
  name: string;
  birthDate: string;
  phone: string;
  lastVisit: string;
  risk: "Normal" | "Duplikat" | "Butuh verifikasi";
  tags: string[];
};

type Registration = {
  id: string;
  patientName: string;
  mrn: string;
  channel: "Walk-in" | "Online" | "Corporate";
  destination: string;
  status: "Draft" | "Verified" | "Checked-in";
  time: string;
};

type QueueDisplay = {
  station: string;
  current: string;
  next: string;
  waiting: number;
  color: string;
};

const publicDepartments = [
  { id: "dept-cardio", name: "Kardiologi", slug: "kardiologi", description: "Layanan jantung terpadu dengan dokter spesialis berpengalaman.", icon: "❤️", color: "#ef4444", isActive: true },
  { id: "dept-neuro", name: "Neurologi", slug: "neurologi", description: "Diagnosis dan terapi gangguan saraf pusat maupun tepi.", icon: "🧠", color: "#8b5cf6", isActive: true },
  { id: "dept-lab", name: "Laboratorium", slug: "laboratorium", description: "Pemeriksaan laboratorium cepat untuk rawat jalan dan MCU.", icon: "🔬", color: "#10b981", isActive: true },
  { id: "dept-rad", name: "Radiologi", slug: "radiologi", description: "Pencitraan medis modern untuk diagnosis lebih presisi.", icon: "🩻", color: "#3b82f6", isActive: true },
  { id: "dept-mcu", name: "Medical Check Up", slug: "mcu", description: "Paket pemeriksaan kesehatan individu dan korporat.", icon: "🏥", color: "#0b4f8a", isActive: true },
  { id: "dept-igd", name: "IGD 24 Jam", slug: "igd", description: "Layanan gawat darurat aktif sepanjang hari.", icon: "🚨", color: "#f97316", isActive: true },
];

const publicDoctors = [
  { id: "doc-siti", name: "Dr. Siti Rahayu", specialty: "Sp.JP", photo: null, isAvailable: true, departmentId: "dept-cardio", department: publicDepartments[0] },
  { id: "doc-ahmad", name: "Dr. Ahmad Fauzi", specialty: "Dokter Umum", photo: null, isAvailable: true, departmentId: "dept-igd", department: publicDepartments[5] },
  { id: "doc-sekar", name: "Dr. Sekar Anindya", specialty: "Sp.Rad", photo: null, isAvailable: true, departmentId: "dept-rad", department: publicDepartments[3] },
  { id: "doc-reno", name: "Dr. Reno Saputra", specialty: "Sp.PK", photo: null, isAvailable: true, departmentId: "dept-lab", department: publicDepartments[2] },
];

const publicNews = [
  { id: "news-1", title: "Layanan MCU Korporat Kini Lebih Cepat", slug: "layanan-mcu-korporat", excerpt: "Paket pemeriksaan kesehatan untuk perusahaan dengan alur digital dan hasil terintegrasi.", imageUrl: null, publishedAt: "2026-07-19T08:00:00.000Z", isPublished: true },
  { id: "news-2", title: "Tips Menjaga Kesehatan Jantung Keluarga", slug: "tips-kesehatan-jantung", excerpt: "Kenali tanda awal gangguan jantung dan jadwalkan konsultasi rutin dengan dokter spesialis.", imageUrl: null, publishedAt: "2026-07-18T08:00:00.000Z", isPublished: true },
  { id: "news-3", title: "IGD 24/7 Siap Melayani Pasien Darurat", slug: "igd-24-jam", excerpt: "Tim medis dan ambulans siaga untuk kebutuhan darurat setiap hari.", imageUrl: null, publishedAt: "2026-07-17T08:00:00.000Z", isPublished: true },
];

export type ModuleShortcut = {
  href: string;
  label: string;
  group: string;
  status: "Ready" | "Preview" | "Planned";
  description: string;
};

export type PrototypeModule = {
  slug: string;
  title: string;
  prototypeFile: string;
  route: string;
  icon: string;
  readiness: "Built" | "Enhanced";
  summary: string;
  highlights: string[];
  metrics: Array<{ label: string; value: string }>;
};

export type ModuleReviewDetail = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  accent: string;
  primaryAction: string;
  secondaryAction: string;
  metrics: Array<{ label: string; value: string; note: string; tone: string }>;
  lanes: Array<{ title: string; count: string; items: string[] }>;
  records: Array<{ id: string; subject: string; context: string; owner: string; status: string; progress: number }>;
  alerts: Array<{ title: string; detail: string; tone: "info" | "warning" | "success" }>;
};

const dummyAdmin = {
  id: "demo-admin",
  name: "Admin Review",
  email: "admin@rsbisadibicarakan.com",
};

const moduleShortcuts: ModuleShortcut[] = [
  { href: "/admin", label: "Dashboard", group: "Foundation", status: "Ready", description: "Phase 1 command center." },
  { href: "/admin/identity", label: "Identity", group: "Foundation", status: "Ready", description: "Users, roles, permissions." },
  { href: "/admin/master-data", label: "Master Data", group: "Foundation", status: "Ready", description: "Service units and catalog." },
  { href: "/admin/patients", label: "Patient Registry", group: "Foundation", status: "Ready", description: "Dummy duplicate checker." },
  { href: "/admin/appointments", label: "Appointments", group: "Phase 2", status: "Preview", description: "Existing appointment management." },
  { href: "/admin/registration", label: "Registration", group: "Phase 2", status: "Ready", description: "Front-office registration flow." },
  { href: "/admin/queue", label: "Queue", group: "Phase 2", status: "Ready", description: "Queue dashboard and display." },
  { href: "/admin/modules?module=mcu", label: "MCU", group: "Phase 3", status: "Preview", description: "Packages, registration, cases, station board." },
  { href: "/admin/modules?module=clinical", label: "Clinical EMR", group: "Phase 4", status: "Preview", description: "Nurse station, doctor worklist, EMR timeline." },
  { href: "/admin/modules?module=laboratory", label: "Laboratory", group: "Phase 4", status: "Preview", description: "Worklist, result entry, verification." },
  { href: "/admin/modules?module=radiology", label: "Radiology", group: "Phase 4", status: "Preview", description: "Radiology worklist and result entry." },
  { href: "/admin/modules?module=mcu-review", label: "MCU Final Review", group: "Phase 5", status: "Preview", description: "Doctor review, report preview, release." },
  { href: "/admin/modules?module=billing", label: "Billing", group: "Phase 6", status: "Preview", description: "Tariffs, invoices, cashier, AR aging." },
  { href: "/admin/modules?module=back-office", label: "Back Office", group: "Phase 7", status: "Preview", description: "Inventory, assets, employees, reports." },
  { href: "/admin/modules?module=inpatient", label: "Inpatient", group: "Phase 8", status: "Preview", description: "Admissions, beds, transfer, discharge." },
  { href: "/admin/modules?module=surgery", label: "Surgery", group: "Phase 8", status: "Preview", description: "OR schedule calendar and display." },
  { href: "/admin/modules?module=kiosk", label: "Kiosk/APM", group: "Phase 9", status: "Preview", description: "Self check-in preview." },
  { href: "/admin/modules?module=patient-portal", label: "Patient Portal", group: "Phase 9", status: "Preview", description: "Booking, QR check-in, progress MCU, payment, result release." },
  { href: "/admin/doctors", label: "Doctors", group: "Current App", status: "Preview", description: "Existing doctor admin page." },
  { href: "/admin/messages", label: "Messages", group: "Current App", status: "Preview", description: "Existing contact message page." },
];

const reviewMetricTones = ["border-teal-500", "border-sky-500", "border-amber-500", "border-rose-500"];

const moduleReviewDetails: ModuleReviewDetail[] = [
  {
    slug: "mcu",
    title: "Core Medical Check-Up",
    eyebrow: "Phase 3 preview",
    summary: "End-to-end MCU individual dan korporat dari registrasi, paket, station order, hingga readiness review dokter.",
    accent: "from-teal-500 to-emerald-400",
    primaryAction: "Registrasi MCU",
    secondaryAction: "Sinkronkan station",
    metrics: [
      { label: "Kasus aktif", value: "73", note: "48 selesai hari ini", tone: reviewMetricTones[0] },
      { label: "SLA station", value: "86%", note: "6 melewati SLA", tone: reviewMetricTones[1] },
      { label: "Corporate batch", value: "2", note: "202 peserta terjadwal", tone: reviewMetricTones[2] },
      { label: "Hasil kritis", value: "4", note: "butuh eskalasi dokter", tone: reviewMetricTones[3] },
    ],
    lanes: [
      { title: "Check-in", count: "14", items: ["Verifikasi identitas", "Aktivasi paket", "Cetak wristband"] },
      { title: "Station aktif", count: "39", items: ["Vital sign", "Laboratorium", "Radiologi"] },
      { title: "Review", count: "8", items: ["Dokter MCU", "Resume hasil", "Release portal"] },
    ],
    records: [
      { id: "MCU-260721-001", subject: "Budi Santoso", context: "Executive Male - Lab processing", owner: "Citra Lestari", status: "In Progress", progress: 76 },
      { id: "MCU-260721-002", subject: "Siti Rahmawati", context: "Basic Female - Doctor review", owner: "dr. Anisa", status: "Review", progress: 92 },
      { id: "CB-2026-071", subject: "PT Cakrawala Digital", context: "Corporate batch 120 peserta", owner: "MCU Coordinator", status: "Running", progress: 62 },
    ],
    alerts: [
      { title: "Critical result routing", detail: "4 hasil kritis sudah masuk queue dokter dan notifikasi internal.", tone: "warning" },
      { title: "Paket MCU siap dikonfigurasi", detail: "Basic, Executive, dan Pre-employment sudah punya komponen dummy.", tone: "success" },
    ],
  },
  {
    slug: "clinical",
    title: "Clinical EMR",
    eyebrow: "Phase 4 preview",
    summary: "Workbench dokter dan perawat untuk encounter, CPPT, diagnosis, order, dan timeline klinis.",
    accent: "from-blue-500 to-cyan-400",
    primaryAction: "Buat CPPT",
    secondaryAction: "Buka worklist",
    metrics: [
      { label: "Encounter aktif", value: "58", note: "RJ, IGD, RI", tone: reviewMetricTones[0] },
      { label: "Order terbuka", value: "31", note: "lab, rad, farmasi", tone: reviewMetricTones[1] },
      { label: "CPPT hari ini", value: "94", note: "signed 82%", tone: reviewMetricTones[2] },
      { label: "Alergi tercatat", value: "12", note: "guard order obat", tone: reviewMetricTones[3] },
    ],
    lanes: [
      { title: "Nurse station", count: "18", items: ["Triage", "Vital sign", "Nursing note"] },
      { title: "Doctor worklist", count: "22", items: ["SOAP note", "ICD diagnosis", "Clinical order"] },
      { title: "Handoff", count: "7", items: ["RI transfer", "Discharge summary", "Referral"] },
    ],
    records: [
      { id: "ENC-260721-044", subject: "Rafi Mahendra", context: "Kardiologi - SOAP draft", owner: "dr. Siti", status: "Draft", progress: 54 },
      { id: "ENC-260721-052", subject: "Maya Putri", context: "IGD - critical lab follow-up", owner: "dr. Ahmad", status: "Urgent", progress: 72 },
      { id: "ENC-260721-058", subject: "Rudi Hartono", context: "Rawat inap - discharge planning", owner: "Ward A", status: "Review", progress: 81 },
    ],
    alerts: [{ title: "Medication allergy guard", detail: "Order farmasi menampilkan warning alergi sebelum sign.", tone: "info" }],
  },
  {
    slug: "laboratory",
    title: "Laboratory",
    eyebrow: "Phase 4 preview",
    summary: "Worklist sampling, hasil lab, validasi analis, verifikasi dokter PK, dan critical value escalation.",
    accent: "from-indigo-500 to-blue-400",
    primaryAction: "Input hasil",
    secondaryAction: "Cetak barcode",
    metrics: [
      { label: "Sample waiting", value: "16", note: "5 belum sampling", tone: reviewMetricTones[0] },
      { label: "Processing", value: "24", note: "hematologi dominan", tone: reviewMetricTones[1] },
      { label: "Verified", value: "41", note: "hari ini", tone: reviewMetricTones[2] },
      { label: "Critical", value: "3", note: "telepon ulang", tone: reviewMetricTones[3] },
    ],
    lanes: [
      { title: "Pre-analitik", count: "12", items: ["Barcode", "Sample collection", "Reject reason"] },
      { title: "Analitik", count: "24", items: ["Result entry", "Instrument import", "Delta check"] },
      { title: "Post-analitik", count: "9", items: ["Verification", "Critical call", "Release"] },
    ],
    records: [
      { id: "LAB-260721-110", subject: "Hematologi Lengkap", context: "MCU-260721-001 - analyzer import", owner: "Reno Saputra", status: "Processing", progress: 68 },
      { id: "LAB-260721-124", subject: "HbA1c", context: "Maya Putri - critical high", owner: "dr. Reno", status: "Critical", progress: 88 },
      { id: "LAB-260721-131", subject: "Profil Lipid", context: "Batch Cakrawala", owner: "Analis 2", status: "Sampling", progress: 34 },
    ],
    alerts: [{ title: "Critical value call log", detail: "Semua hasil kritis wajib punya penerima, jam telepon, dan readback.", tone: "warning" }],
  },
  {
    slug: "radiology",
    title: "Radiology",
    eyebrow: "Phase 4 preview",
    summary: "Worklist radiologi, jadwal pemeriksaan, entry ekspertise, dan release hasil terstruktur.",
    accent: "from-sky-500 to-teal-400",
    primaryAction: "Jadwalkan pemeriksaan",
    secondaryAction: "Buka viewer",
    metrics: [
      { label: "Waiting", value: "14", note: "4 lewat SLA", tone: reviewMetricTones[0] },
      { label: "On scan", value: "5", note: "X-Ray, USG", tone: reviewMetricTones[1] },
      { label: "Expertise", value: "9", note: "menunggu dokter", tone: reviewMetricTones[2] },
      { label: "Released", value: "28", note: "hari ini", tone: reviewMetricTones[3] },
    ],
    lanes: [
      { title: "Scheduling", count: "11", items: ["Slot check", "Preparation note", "Queue call"] },
      { title: "Acquisition", count: "5", items: ["X-Ray", "USG", "Repeat image"] },
      { title: "Reporting", count: "9", items: ["Draft expertise", "Sign result", "Portal release"] },
    ],
    records: [
      { id: "RAD-260721-030", subject: "Thorax PA", context: "Budi Santoso - MCU station", owner: "Radiographer 1", status: "Waiting", progress: 58 },
      { id: "RAD-260721-036", subject: "USG Abdomen", context: "Rudi Hartono - rawat inap", owner: "dr. Sekar", status: "Expertise", progress: 83 },
      { id: "RAD-260721-041", subject: "CT Head", context: "IGD priority", owner: "Radiology Lead", status: "Urgent", progress: 44 },
    ],
    alerts: [{ title: "SLA queue", detail: "4 pasien menunggu lebih dari 30 menit di radiologi.", tone: "warning" }],
  },
  {
    slug: "mcu-review",
    title: "MCU Final Review",
    eyebrow: "Phase 5 preview",
    summary: "Finalisasi hasil MCU oleh dokter, preview PDF, rekomendasi, dan release ke portal pasien.",
    accent: "from-emerald-500 to-lime-400",
    primaryAction: "Review hasil",
    secondaryAction: "Preview report",
    metrics: [
      { label: "Siap review", value: "18", note: "semua station selesai", tone: reviewMetricTones[0] },
      { label: "Draft report", value: "11", note: "butuh narasi dokter", tone: reviewMetricTones[1] },
      { label: "Released", value: "32", note: "hari ini", tone: reviewMetricTones[2] },
      { label: "Amendment", value: "2", note: "audit tracked", tone: reviewMetricTones[3] },
    ],
    lanes: [
      { title: "Completeness", count: "18", items: ["Lab verified", "Radiology signed", "Billing clear"] },
      { title: "Doctor review", count: "11", items: ["Assessment", "Recommendation", "Fit status"] },
      { title: "Release", count: "7", items: ["PDF lock", "Portal publish", "Notification"] },
    ],
    records: [
      { id: "REV-260721-014", subject: "Siti Rahmawati", context: "Basic Female - PT Cakrawala", owner: "dr. Anisa", status: "Review", progress: 92 },
      { id: "REV-260721-018", subject: "Dewi Lestari", context: "Pre-employment - fit with note", owner: "dr. Damar", status: "Ready release", progress: 100 },
      { id: "REV-260721-021", subject: "Maya Putri", context: "Executive Female - critical follow-up", owner: "dr. Fajar", status: "Hold", progress: 77 },
    ],
    alerts: [{ title: "Release guard", detail: "Report tidak bisa dirilis sebelum billing clear dan semua hasil mandatory verified.", tone: "info" }],
  },
  {
    slug: "billing",
    title: "Billing & Keuangan",
    eyebrow: "Phase 6 preview",
    summary: "Invoice, cashier payment, corporate AR, refund, treasury reconciliation, dan jasa medis.",
    accent: "from-orange-500 to-amber-400",
    primaryAction: "Terima pembayaran",
    secondaryAction: "Tutup kas",
    metrics: [
      { label: "Pendapatan", value: "186jt", note: "hari ini", tone: reviewMetricTones[0] },
      { label: "Invoice lunas", value: "74", note: "kasir + transfer", tone: reviewMetricTones[1] },
      { label: "AR individual", value: "42,8jt", note: "belum lunas", tone: reviewMetricTones[2] },
      { label: "AR corporate", value: "1,26M", note: "5 overdue", tone: reviewMetricTones[3] },
    ],
    lanes: [
      { title: "Invoice", count: "38", items: ["MCU", "Rawat inap", "Farmasi"] },
      { title: "Payment", count: "24", items: ["Cash", "EDC", "Transfer"] },
      { title: "Control", count: "6", items: ["Refund", "Void", "Discount approval"] },
    ],
    records: [
      { id: "INV-260721-0188", subject: "Budi Santoso", context: "MCU Executive - unpaid", owner: "Kasir FO", status: "Unpaid", progress: 0 },
      { id: "INV-260721-0187", subject: "Rudi Hartono", context: "Rawat inap - partial deposit", owner: "Kasir RI", status: "Partial", progress: 59 },
      { id: "INV-CORP-2607-044", subject: "PT Cakrawala Digital", context: "Corporate AR batch MCU", owner: "Finance AR", status: "AR", progress: 18 },
    ],
    alerts: [{ title: "Corporate overdue", detail: "5 corporate melewati jatuh tempo, total dummy Rp 312.500.000.", tone: "warning" }],
  },
  {
    slug: "back-office",
    title: "Back Office",
    eyebrow: "Phase 7 preview",
    summary: "Inventory, aset, mutu, HRD, akses user, master data, reporting, dan audit trail.",
    accent: "from-slate-600 to-blue-500",
    primaryAction: "Transaksi baru",
    secondaryAction: "Audit trail",
    metrics: [
      { label: "Inventory", value: "1.248", note: "item aktif", tone: reviewMetricTones[0] },
      { label: "Low stock", value: "18", note: "butuh reorder", tone: reviewMetricTones[1] },
      { label: "Aset", value: "326", note: "9 due kalibrasi", tone: reviewMetricTones[2] },
      { label: "Mutu", value: "7", note: "CAPA terbuka", tone: reviewMetricTones[3] },
    ],
    lanes: [
      { title: "Inventory", count: "18", items: ["Low stock", "Batch expiry", "Stock movement"] },
      { title: "Assets", count: "9", items: ["Calibration", "Maintenance", "Location"] },
      { title: "Quality", count: "7", items: ["Incident", "CAPA", "IKM"] },
    ],
    records: [
      { id: "INV-STK-012", subject: "Reagen HbA1c", context: "Stok 8 kit, minimum 12", owner: "Gudang Medis", status: "Low Stock", progress: 35 },
      { id: "AST-ECG-03", subject: "ECG Unit MCU-03", context: "Kalibrasi jatuh tempo 24 Jul", owner: "Biomed", status: "Due Soon", progress: 64 },
      { id: "QIP-2607-007", subject: "Near miss identifikasi", context: "RCA berjalan", owner: "Mutu", status: "Open", progress: 42 },
    ],
    alerts: [{ title: "Back office linked to master data", detail: "Preview ini berdampingan dengan halaman master data yang sudah built.", tone: "success" }],
  },
  {
    slug: "inpatient",
    title: "Rawat Inap",
    eyebrow: "Phase 8 preview",
    summary: "Admission, bed monitoring, ward worklist, transfer, discharge, billing trigger, dan OR handoff.",
    accent: "from-cyan-500 to-blue-500",
    primaryAction: "Admission",
    secondaryAction: "Sync bed",
    metrics: [
      { label: "BOR", value: "72%", note: "kelas 1 dan 2", tone: reviewMetricTones[0] },
      { label: "Admission", value: "8", note: "hari ini", tone: reviewMetricTones[1] },
      { label: "Transfer", value: "3", note: "menunggu bed", tone: reviewMetricTones[2] },
      { label: "Discharge", value: "6", note: "rencana hari ini", tone: reviewMetricTones[3] },
    ],
    lanes: [
      { title: "Admission", count: "8", items: ["Dari IGD", "Elektif", "Observasi MCU"] },
      { title: "Ward", count: "21", items: ["Order aktif", "Medication", "Visite DPJP"] },
      { title: "Discharge", count: "6", items: ["Resume", "Billing final", "Bed cleaning"] },
    ],
    records: [
      { id: "IP-260719-008", subject: "Rudi Hartono", context: "A101-1 - observasi", owner: "dr. Fajar", status: "Observasi", progress: 71 },
      { id: "IP-260718-012", subject: "Mia Prameswari", context: "A102-2 - discharge plan", owner: "Ward A", status: "Discharge", progress: 86 },
      { id: "OR-260721-003", subject: "Dian Kurnia", context: "B201-1 - pre-op OR-1", owner: "Surgery Team", status: "Pre-Op", progress: 64 },
    ],
    alerts: [{ title: "Bed cleaning queue", detail: "2 bed perlu cleaning sebelum tersedia untuk admission baru.", tone: "info" }],
  },
  {
    slug: "surgery",
    title: "Surgery",
    eyebrow: "Phase 8 preview",
    summary: "Jadwal kamar operasi, persiapan pasien, checklist keselamatan, status tindakan, dan handoff rawat inap.",
    accent: "from-rose-500 to-orange-400",
    primaryAction: "Jadwalkan OR",
    secondaryAction: "Safety checklist",
    metrics: [
      { label: "Tindakan", value: "4", note: "hari ini", tone: reviewMetricTones[0] },
      { label: "On going", value: "1", note: "OR-1", tone: reviewMetricTones[1] },
      { label: "Preparation", value: "2", note: "checklist", tone: reviewMetricTones[2] },
      { label: "Delayed", value: "1", note: "alat belum siap", tone: reviewMetricTones[3] },
    ],
    lanes: [
      { title: "Pre-op", count: "2", items: ["Consent", "Lab ready", "Anesthesia note"] },
      { title: "OR running", count: "1", items: ["Time out", "Procedure", "Instrument count"] },
      { title: "Post-op", count: "1", items: ["Recovery", "Handoff ward", "Billing"] },
    ],
    records: [
      { id: "OR-260721-001", subject: "Dian Kurnia", context: "Appendectomy - OR-1", owner: "dr. Aulia", status: "On Going", progress: 58 },
      { id: "OR-260721-002", subject: "Wahyu Adi", context: "Arthroscopy - OR-2", owner: "Anesthesia", status: "Preparation", progress: 41 },
      { id: "OR-260721-004", subject: "Lia M.", context: "Cholecystectomy - scheduled", owner: "OR Admin", status: "Scheduled", progress: 22 },
    ],
    alerts: [{ title: "Checklist gate", detail: "Tindakan tidak bisa dimulai sebelum consent, marker, dan anestesi lengkap.", tone: "warning" }],
  },
  {
    slug: "kiosk",
    title: "Integrasi Internal & Kiosk",
    eyebrow: "Phase 9 preview",
    summary: "Health monitor untuk EMR, portal, kiosk/APM, display antrean, bed monitor, notification service, dan event stream.",
    accent: "from-violet-500 to-blue-500",
    primaryAction: "Health check",
    secondaryAction: "Export log",
    metrics: [
      { label: "Service", value: "12", note: "terhubung", tone: reviewMetricTones[0] },
      { label: "Healthy", value: "11", note: "1 degraded", tone: reviewMetricTones[1] },
      { label: "Device", value: "18", note: "kiosk + display", tone: reviewMetricTones[2] },
      { label: "Uptime", value: "99.8%", note: "internal", tone: reviewMetricTones[3] },
    ],
    lanes: [
      { title: "Realtime feed", count: "4", items: ["Queue display", "Bed monitor", "Notification", "Event bus"] },
      { title: "Devices", count: "18", items: ["Kiosk", "APM", "Lobby display"] },
      { title: "Services", count: "12", items: ["EMR", "Billing", "Portal"] },
    ],
    records: [
      { id: "EVT-889201", subject: "MCU order created", context: "MCU-260721-007 - event bus", owner: "Integration", status: "Delivered", progress: 100 },
      { id: "DEV-KIOSK-03", subject: "Kiosk Lt. 1", context: "37 check-in hari ini", owner: "IT Ops", status: "Online", progress: 100 },
      { id: "BED-SYNC", subject: "Bed Monitoring", context: "Delayed 3 menit", owner: "Ward Integration", status: "Degraded", progress: 72 },
    ],
    alerts: [{ title: "Bed monitor degraded", detail: "Feed bed monitoring terlambat 3 menit, tapi antrean dan kiosk sehat.", tone: "warning" }],
  },
  {
    slug: "patient-portal",
    title: "Portal Pasien",
    eyebrow: "Patient experience preview",
    summary: "Self-service pasien untuk booking, check-in QR, progress MCU, pembayaran, hasil, dan bantuan petugas.",
    accent: "from-emerald-500 to-cyan-400",
    primaryAction: "Preview QR",
    secondaryAction: "Kirim notifikasi",
    metrics: [
      { label: "Booking online", value: "24", note: "hari ini", tone: reviewMetricTones[0] },
      { label: "Check-in QR", value: "37", note: "via kiosk", tone: reviewMetricTones[1] },
      { label: "Result ready", value: "18", note: "menunggu release", tone: reviewMetricTones[2] },
      { label: "Unread", value: "7", note: "notifikasi", tone: reviewMetricTones[3] },
    ],
    lanes: [
      { title: "Booking", count: "24", items: ["Pilih layanan", "Persiapan MCU", "Reschedule"] },
      { title: "Visit day", count: "37", items: ["QR check-in", "Progress station", "Queue call"] },
      { title: "After visit", count: "18", items: ["Payment", "Result download", "Recommendation"] },
    ],
    records: [
      { id: "PORT-260721-001", subject: "Budi Santoso", context: "MCU progress 76%, station Lab", owner: "Portal", status: "In Visit", progress: 76 },
      { id: "PORT-260721-014", subject: "Siti Rahmawati", context: "Report ready after doctor review", owner: "Portal", status: "Waiting", progress: 92 },
      { id: "PORT-260721-018", subject: "Dewi Lestari", context: "Result released, payment clear", owner: "Portal", status: "Released", progress: 100 },
    ],
    alerts: [{ title: "Patient-friendly release", detail: "Hasil hanya tampil setelah dokter release dan billing clear.", tone: "success" }],
  },
];

const prototypeModuleLandscape: PrototypeModule[] = [
  {
    slug: "dashboard",
    title: "Dashboard Eksekutif",
    prototypeFile: "prototype/index.html",
    route: "/admin",
    icon: "D",
    readiness: "Enhanced",
    summary: "Command center operasional, klinis, finansial, dan mutu rumah sakit.",
    highlights: ["KPI pasien harian", "Volume 7 hari", "Alert operasional", "Landscape modul HIS"],
    metrics: [
      { label: "Pasien hari ini", value: "128" },
      { label: "MCU aktif", value: "73" },
      { label: "Revenue", value: "186jt" },
    ],
  },
  {
    slug: "core-mcu",
    title: "Core Medical Check-Up",
    prototypeFile: "prototype/core-mcu.html",
    route: "/admin/modules?module=mcu",
    icon: "+",
    readiness: "Built",
    summary: "Booking, paket, station task, hasil, review dokter, dan report release.",
    highlights: ["Package builder", "Station board", "Doctor review", "PDF result release"],
    metrics: [
      { label: "Kasus aktif", value: "73" },
      { label: "SLA", value: "86%" },
      { label: "Overdue", value: "6" },
    ],
  },
  {
    slug: "front-office",
    title: "Front Office RJ & IGD",
    prototypeFile: "prototype/front-office.html",
    route: "/admin/registration",
    icon: "FO",
    readiness: "Built",
    summary: "Registrasi, check-in, antrean, poliklinik, IGD, e-order, dan routing pasien.",
    highlights: ["Duplicate warning", "Check-in", "Queue display", "Clinical worklist routing"],
    metrics: [
      { label: "Booking", value: "42" },
      { label: "Check-in", value: "31" },
      { label: "IGD aktif", value: "3" },
    ],
  },
  {
    slug: "inpatient",
    title: "Rawat Inap",
    prototypeFile: "prototype/inpatient.html",
    route: "/admin/modules?module=inpatient",
    icon: "RI",
    readiness: "Built",
    summary: "Admission, bed monitoring, ward operations, transfer, discharge, dan surgery handoff.",
    highlights: ["Bed grid", "Admission flow", "Transfer/discharge", "Room charge trigger"],
    metrics: [
      { label: "Bed occupied", value: "78%" },
      { label: "Cleaning", value: "6" },
      { label: "Discharge", value: "9" },
    ],
  },
  {
    slug: "billing-finance",
    title: "Billing & Keuangan",
    prototypeFile: "prototype/billing-finance.html",
    route: "/admin/modules?module=billing",
    icon: "Rp",
    readiness: "Built",
    summary: "Invoice, pembayaran, corporate AR, refund, treasury, dan jasa medis.",
    highlights: ["Cashier payment", "Invoice detail", "AR aging", "Doctor fee dashboard"],
    metrics: [
      { label: "Pendapatan", value: "186jt" },
      { label: "AR open", value: "42" },
      { label: "Refund", value: "3" },
    ],
  },
  {
    slug: "back-office",
    title: "Back Office",
    prototypeFile: "prototype/back-office.html",
    route: "/admin/master-data",
    icon: "BO",
    readiness: "Enhanced",
    summary: "Inventory, aset, HRD, mutu, master data, reporting, dan user access.",
    highlights: ["Service catalog", "Inventory warning", "Asset registry", "User access"],
    metrics: [
      { label: "Unit aktif", value: "5" },
      { label: "Katalog", value: "11" },
      { label: "Completion", value: "84%" },
    ],
  },
  {
    slug: "internal-integration",
    title: "Integrasi Internal",
    prototypeFile: "prototype/internal-integration.html",
    route: "/admin/modules?module=kiosk",
    icon: "IN",
    readiness: "Built",
    summary: "EMR, portal, kiosk, display antrean, bed monitor, notifikasi, dan EIS.",
    highlights: ["SSE/WebSocket display", "Kiosk check-in", "Notification feed", "EIS dashboard"],
    metrics: [
      { label: "Feed aktif", value: "4" },
      { label: "Display", value: "6" },
      { label: "Latency", value: "<1s" },
    ],
  },
  {
    slug: "patient-portal",
    title: "Portal Pasien",
    prototypeFile: "prototype/patient-portal.html",
    route: "/admin/modules?module=patient-portal",
    icon: "P",
    readiness: "Built",
    summary: "Portal pendukung untuk booking, hasil MCU, riwayat pembayaran, dan notifikasi pasien.",
    highlights: ["Appointment self-service", "Result access", "Secure release", "Patient notifications"],
    metrics: [
      { label: "Booking", value: "24" },
      { label: "Result ready", value: "18" },
      { label: "Unread", value: "7" },
    ],
  },
];

const roles: Role[] = [
  { name: "Super Admin", users: 2, permissions: ["identity:*", "audit:read", "master-data:*"] },
  { name: "Front Office", users: 5, permissions: ["patient:write", "appointment:write", "queue:write"] },
  { name: "MCU Coordinator", users: 3, permissions: ["mcu:*", "order:read", "billing:read"] },
  { name: "Dokter", users: 4, permissions: ["clinical:write", "mcu-review:approve"] },
  { name: "Laboratorium", users: 2, permissions: ["lab:worklist", "lab:verify"] },
  { name: "Kasir", users: 2, permissions: ["invoice:write", "payment:write"] },
];

const users: User[] = [
  { id: "USR-001", name: "Alya Paramitha", email: "alya@rsbisadibicarakan.local", role: "Super Admin", status: "Aktif", lastSeen: "21 Jul 2026, 09:12" },
  { id: "USR-014", name: "Bima Radiansyah", email: "bima.fo@rsbisadibicarakan.local", role: "Front Office", status: "Aktif", lastSeen: "21 Jul 2026, 08:44" },
  { id: "USR-022", name: "Citra Lestari", email: "citra.mcu@rsbisadibicarakan.local", role: "MCU Coordinator", status: "Aktif", lastSeen: "20 Jul 2026, 17:30" },
  { id: "USR-031", name: "dr. Damar Wicaksono", email: "damar.dr@rsbisadibicarakan.local", role: "Dokter", status: "Undangan", lastSeen: "Belum masuk" },
];

const units: Unit[] = [
  { name: "Medical Check Up", code: "MCU", services: 4, lead: "Citra Lestari", status: "Aktif" },
  { name: "Laboratorium", code: "LAB", services: 3, lead: "Reno Saputra", status: "Aktif" },
  { name: "Radiologi", code: "RAD", services: 2, lead: "dr. Sekar Anindya", status: "Aktif" },
  { name: "Farmasi", code: "FAR", services: 2, lead: "Maya Oktaviani", status: "Draft" },
  { name: "Kasir", code: "BIL", services: 2, lead: "Irfan Nugraha", status: "Aktif" },
];

const catalog: ServiceCatalogItem[] = [
  { code: "MCU-BASIC", name: "Paket MCU Basic", unit: "Medical Check Up", tariff: 450000, turnaround: "1 hari" },
  { code: "MCU-EXEC", name: "Paket MCU Executive", unit: "Medical Check Up", tariff: 1250000, turnaround: "2 hari" },
  { code: "MCU-CORP", name: "Batch MCU Korporat", unit: "Medical Check Up", tariff: 980000, turnaround: "2 hari" },
  { code: "MCU-CARD", name: "Screening Kardio", unit: "Medical Check Up", tariff: 675000, turnaround: "1 hari" },
  { code: "LAB-CBC", name: "Hematologi Lengkap", unit: "Laboratorium", tariff: 95000, turnaround: "2 jam" },
  { code: "LAB-LIPID", name: "Profil Lipid", unit: "Laboratorium", tariff: 175000, turnaround: "4 jam" },
  { code: "LAB-GLU", name: "Glukosa Puasa", unit: "Laboratorium", tariff: 55000, turnaround: "1 jam" },
  { code: "RAD-CXR", name: "Foto Thorax PA", unit: "Radiologi", tariff: 210000, turnaround: "3 jam" },
  { code: "RAD-USG", name: "USG Abdomen", unit: "Radiologi", tariff: 350000, turnaround: "4 jam" },
  { code: "FAR-RX", name: "Resep Rawat Jalan", unit: "Farmasi", tariff: 0, turnaround: "30 menit" },
  { code: "BIL-INV", name: "Invoice MCU", unit: "Kasir", tariff: 0, turnaround: "15 menit" },
];

const patients: Patient[] = [
  { mrn: "RM-2607-0001", name: "Nadia Prameswari", birthDate: "1991-04-18", phone: "0812-3000-1001", lastVisit: "21 Jul 2026", risk: "Duplikat", tags: ["Nama mirip", "Tanggal lahir sama"] },
  { mrn: "RM-2607-0002", name: "Rafi Mahendra", birthDate: "1986-11-02", phone: "0821-2200-9090", lastVisit: "20 Jul 2026", risk: "Duplikat", tags: ["Nomor HP dipakai ulang"] },
  { mrn: "RM-2607-0003", name: "Saras Kirana", birthDate: "1997-02-09", phone: "0813-5555-2211", lastVisit: "19 Jul 2026", risk: "Normal", tags: ["MCU Basic"] },
  { mrn: "RM-2607-0004", name: "Hendra Wijaya", birthDate: "1978-08-30", phone: "0819-7777-3100", lastVisit: "18 Jul 2026", risk: "Butuh verifikasi", tags: ["NIK belum lengkap"] },
  { mrn: "RM-2607-0005", name: "Putri Amelia", birthDate: "2000-12-12", phone: "0856-1100-8842", lastVisit: "17 Jul 2026", risk: "Normal", tags: ["Korporat"] },
];

const registrations: Registration[] = [
  { id: "REG-2607-001", patientName: "Nadia Prameswari", mrn: "RM-2607-0001", channel: "Online", destination: "MCU Basic", status: "Verified", time: "08:10" },
  { id: "REG-2607-002", patientName: "Rafi Mahendra", mrn: "RM-2607-0002", channel: "Walk-in", destination: "Kardiologi", status: "Checked-in", time: "08:24" },
  { id: "REG-2607-003", patientName: "Saras Kirana", mrn: "RM-2607-0003", channel: "Corporate", destination: "MCU Korporat", status: "Draft", time: "08:42" },
  { id: "REG-2607-004", patientName: "Hendra Wijaya", mrn: "RM-2607-0004", channel: "Walk-in", destination: "Laboratorium", status: "Verified", time: "09:05" },
];

const queueDisplays: QueueDisplay[] = [
  { station: "Front Office 1", current: "A-014", next: "A-015", waiting: 3, color: "bg-blue-50 text-[#174a7e]" },
  { station: "MCU Station", current: "M-008", next: "M-009", waiting: 4, color: "bg-emerald-50 text-emerald-700" },
  { station: "Laboratorium", current: "L-021", next: "L-022", waiting: 2, color: "bg-indigo-50 text-indigo-700" },
  { station: "Kasir", current: "K-006", next: "K-007", waiting: 0, color: "bg-orange-50 text-orange-700" },
];

export function validateDummyAdminLogin(email: string, password: string) {
  if (email.toLowerCase() === dummyAdmin.email && password === "admin123456") {
    return dummyAdmin;
  }

  return null;
}

export function getModuleShortcuts() {
  return moduleShortcuts;
}

export function getPrototypeModuleLandscape() {
  return prototypeModuleLandscape;
}

export function getModuleReviewDetails() {
  return moduleReviewDetails;
}

export function getModuleReviewDetail(slug: string | undefined) {
  return moduleReviewDetails.find((detail) => detail.slug === slug) ?? moduleReviewDetails[0];
}

export function getFoundationDashboard() {
  const activeUsers = users.filter((user) => user.status === "Aktif").length + 15;

  return {
    metrics: {
      activeUsers,
      rolesConfigured: roles.length,
      masterDataCompletion: 84,
      duplicateWarnings: patients.filter((patient) => patient.risk === "Duplikat").length,
    },
    workstreams: [
      { name: "Identity service contract", owner: "FE + BE Identity", status: "Ready", detail: "Login, role matrix, audit trail screens mapped." },
      { name: "Backoffice master data", owner: "FE Foundation", status: "In progress", detail: "Dummy service unit and catalog screens ready for gateway swap." },
      { name: "Patient registry", owner: "FE Foundation", status: "In progress", detail: "Duplicate warning UX uses gateway-shaped data." },
      { name: "Service database", owner: "Backend agent", status: "Blocked", detail: "Waiting for service migrations and seed endpoints." },
    ] satisfies Workstream[],
  };
}

export function getIdentitySnapshot() {
  return { users, roles };
}

export function getMasterDataSnapshot() {
  return {
    units,
    catalog,
    catalogByUnit: catalog.reduce<Record<string, ServiceCatalogItem[]>>((grouped, item) => {
      grouped[item.unit] = [...(grouped[item.unit] ?? []), item];
      return grouped;
    }, {}),
  };
}

export function getPatientRegistry() {
  return {
    patients,
    duplicateWarnings: patients
      .filter((patient) => patient.risk === "Duplikat")
      .map((patient) => ({
        mrn: patient.mrn,
        patientName: patient.name,
        reason: patient.tags.join(", "),
      })),
  };
}

export function getRegistrationQueueSnapshot() {
  return {
    registrations,
    queueDisplays,
    queueCounters: {
      waiting: queueDisplays.reduce((sum, item) => sum + item.waiting, 0),
      serving: queueDisplays.length + 1,
      checkedIn: registrations.filter((item) => item.status === "Checked-in").length,
      verified: registrations.filter((item) => item.status === "Verified").length,
    },
  };
}

export function getPublicWebsiteFallback() {
  return {
    departments: publicDepartments,
    doctors: publicDoctors,
    news: publicNews,
    stats: {
      patients: 15000,
      doctors: 85,
      departments: publicDepartments.length,
      appointments: 4820,
    },
  };
}
