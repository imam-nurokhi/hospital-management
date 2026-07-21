import AdminChrome from "@/components/AdminChrome";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminChrome>{children}</AdminChrome>;
}
