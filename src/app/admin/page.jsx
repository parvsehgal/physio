// app/dashboard/page.js (Server Component)
import { requireAuth } from "../../lib/auth";

export default async function DashboardPage() {
  // This runs on the server during page rendering
  const user = await requireAuth();
  
  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      {/* Rest of your component */}
    </div>
  );
}
