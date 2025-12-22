import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <nav className="mt-6 px-6 space-y-2">
          <Link href="/dashboard/profile" className="block py-2 px-4 rounded hover:bg-gray-100">
            Profile
          </Link>
          <Link href="/dashboard/projects" className="block py-2 px-4 rounded hover:bg-gray-100">
            Projects
          </Link>
          <Link href="/dashboard/settings" className="block py-2 px-4 rounded hover:bg-gray-100">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
