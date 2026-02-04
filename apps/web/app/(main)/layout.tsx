import { ReactNode } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 w-full py-16">
        <div className="max-w-7xl mx-auto px-6">{children}</div>
      </main>
      <Footer />
    </>
  );
}
