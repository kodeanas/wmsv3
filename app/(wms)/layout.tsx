import { Sidebar } from "@/components/globals/sidebars/Sidebar";
import Breadcrumbs from "@/components/globals/additionals/Breadcrumbs"; // Import di sini

export default function WmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Sidebar Area */}
      <aside className="sticky top-0 h-screen shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {/* Taruh di sini biar posisinya di atas konten utama */}
            <Breadcrumbs />
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}