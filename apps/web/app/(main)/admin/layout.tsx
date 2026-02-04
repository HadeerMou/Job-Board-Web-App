"use client";

import { ReactNode } from "react";
import RequireRole from "@/app/components/RequireRole";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RequireRole role="admin">
      <div className="min-h-screen p-6">{children}</div>
    </RequireRole>
  );
}
