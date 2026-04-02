// components/globals/sidebars/Sidebar.tsx
import { SidebarSection } from "./SidebarSection";
import { SidebarItem } from "./SidebarItem";
import { LogOut } from "lucide-react";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <aside className="flex flex-col w-72 h-screen bg-white border-r border-gray-100 p-6">
      {/* 1. Header & Logo (Tetap di atas) */}
      <div className="mb-10">
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-black tracking-tighter flex items-center">
            LIQUID<span className="text-blue-500 text-3xl">8</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-70">
            Warehouse Management System
          </span>
        </div>
      </div>

      {/* 2. Menu Section (Bisa di-scroll kalau kepanjangan) */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <SidebarSection title="ANALYTICS">
          <SidebarItem label="Dashboard" href="/dashboard" />
          <SidebarItem label="Sales" href="/sales" />
          <SidebarItem label="Testing" href="/testing" />
        </SidebarSection>
        <SidebarSection title="MASTER DATA">
          <SidebarItem
            label="Setting Potongan"
            subItems={[
              { label: "Kategori", href: "/categories" },
              { label: "Sticker", href: "/stickers" },
            ]}
          />
          <SidebarItem
            label="Buyer"
            subItems={[
              { label: "Buyer", href: "/buyers" },
              { label: "Class", href: "/classes" },
            ]}
          />
          <SidebarItem label="Toko" href="/stores" />
        </SidebarSection>

        <SidebarSection title="INBOUND">
          <SidebarItem
            label="Scan In"
            subItems={[
              { label: "BAST", href: "/bast" },
              { label: "Bulk", href: "/bulk" },
              { label: "Satuan", href: "/pieces" },
              { label: "SKU", href: "/sku" },
            ]}
          />
          <SidebarItem label="Return BKL" href="/return-bkl" />
        </SidebarSection>

        <SidebarSection title="INVENTORY">
          <SidebarItem
            label="Staging"
            subItems={[
              { label: "Reguler", href: "/reguler-staging" },
              { label: "Sticker", href: "/sticker-staging" },
              { label: "SKU", href: "/sku-staging" },
            ]}
          />
          <SidebarItem label="Display" href="/display"/>
          <SidebarItem label="BKL" href="/bkl"/>
          <SidebarItem label="Wholesale" subItems={[
            { label: "Bag", href: "/bag-wholesale" },
            { label: "Cargo", href: "/cargo-wholesale" },
          ]} />
        </SidebarSection>

        <SidebarSection title="REPAIR STATION">
          <SidebarItem label="Reparasi" href="/repair"/>
          <SidebarItem label="Product" subItems={[
            { label: "Abnormal", href: "/abnormal" },
            { label: "Damaged", href: "/damaged" },
            { label: "Non", href: "/non" },
          ]} />
          <SidebarItem label="Disposition" subItems={[
            { label: "Bag QCD", href: "/bag-qcd" },
            { label: "Bag Scrap", href: "/bag-scrap" },
          ]} />
        </SidebarSection>

        <SidebarSection title="OUTBOUND">
          <SidebarItem label="Penjualan Reguler" href="/reguler-sales"/>
          <SidebarItem label="Penjualan Wholesale" subItems={[
            { label: "Cargo", href: "/cargo-sales" },
            { label: "QCD", href: "/qcd-sales" },
            { label: "Scrap", href: "/scrap-sales" },
          ]} />
          <SidebarItem label="Transfer Toko" href="/store-transfer"/>
        </SidebarSection>

        <SidebarSection title="ADMIN PANEL">
          <SidebarItem label="User" href="/users"/>
          <SidebarItem label="PPN" href="tax"/>
        </SidebarSection>
      </div>

      {/* 3. Profile Section (Nempel di bawah pakai mt-auto) */}
      <div className="pt-6 mt-auto border-t border-gray-100 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-50">
            <Image
              src="/file.svg" // Ganti path foto lu Nas
              alt="Anas Syihabuddin"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
              Supervisor
            </p>
            <p className="text-[16px] font-bold text-gray-900 leading-tight">
              Anas Syihabuddin
            </p>
          </div>
        </div>

        <button className="flex items-center gap-3 text-red-500 font-bold hover:opacity-80 transition-opacity">
          <div className="p-2 rounded-lg bg-red-50">
            <LogOut size={18} />
          </div>
          <span className="text-[15px]">Logout Account</span>
        </button>
      </div>
    </aside>
  );
};
