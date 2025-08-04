import AuthenticatedLayout from "../../components/DashboardLayout";
export default function DashboardLayout({ children }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
