import React, { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 px-4">
      <div className="w-full max-w-md dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        {children}
      </div>
    </div>
  );
}
