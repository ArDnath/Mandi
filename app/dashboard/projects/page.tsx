import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="/dashboard/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          New Project
        </Link>
      </div>
      <div className="grid gap-4">
        <div className="p-4 border rounded shadow-sm bg-white">
          <h3 className="font-semibold">Example Project</h3>
          <p className="text-sm text-gray-500">This is a placeholder for your projects.</p>
          <div className="mt-2 space-x-2">
            <Link href="/dashboard/projects/1" className="text-blue-600 hover:underline">View</Link>
            <Link href="/dashboard/projects/1/edit" className="text-gray-600 hover:underline">Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
