"use client";

import { useRouter } from "next/navigation";

export default function NoAccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-600 mb-6">
        You don’t have permission to view this page.
      </p>

      <button
        onClick={() => router.push("/dashboard")}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
