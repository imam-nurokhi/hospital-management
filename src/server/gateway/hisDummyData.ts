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

const roles: Role[] = [
  { name: "Super Admin", users: 2, permissions: ["identity:*", "audit:read", "master-data:*"] },
  { name: "Front Office", users: 5, permissions: ["patient:write", "appointment:write", "queue:write"] },
  { name: "MCU Coordinator", users: 3, permissions: ["mcu:*", "order:read", "billing:read"] },
  { name: "Dokter", users: 4, permissions: ["clinical:write", "mcu-review:approve"] },
  { name: "Laboratorium", users: 2, permissions: ["lab:worklist", "lab:verify"] },
  { name: "Kasir", users: 2, permissions: ["invoice:write", "payment:write"] },
];

const users: User[] = [
  { id: "USR-001", name: "Alya Paramitha", email: "alya@rssehat.local", role: "Super Admin", status: "Aktif", lastSeen: "21 Jul 2026, 09:12" },
  { id: "USR-014", name: "Bima Radiansyah", email: "bima.fo@rssehat.local", role: "Front Office", status: "Aktif", lastSeen: "21 Jul 2026, 08:44" },
  { id: "USR-022", name: "Citra Lestari", email: "citra.mcu@rssehat.local", role: "MCU Coordinator", status: "Aktif", lastSeen: "20 Jul 2026, 17:30" },
  { id: "USR-031", name: "dr. Damar Wicaksono", email: "damar.dr@rssehat.local", role: "Dokter", status: "Undangan", lastSeen: "Belum masuk" },
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
