import { checkUserRole } from "@/lib/auth";

export default async function AdminPage() {
  // This runs on the server before sending HTML to client
  await checkUserRole(["admin"]); // This will redirect if not authenticated or not an admin

  // Only reaches here if authenticated and user is an admin
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">Welcome to the admin dashboard. This page is only accessible to administrators.</p>
        </div>
      </div>
    </div>
  );
}
