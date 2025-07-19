import { requireAuth } from "@/lib/auth";

export default async function AdminPage() {
  // This runs on the server before sending HTML to client
  await requireAuth(); // This should redirect if not authenticated

  // Only reaches here if authenticated
  return (
    <div>
      <div>This page is only for admin</div>
    </div>
  );
}
