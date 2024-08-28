import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  return <div>Dashboard</div>;
}
