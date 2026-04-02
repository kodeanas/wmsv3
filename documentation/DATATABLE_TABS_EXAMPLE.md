// CONTOH IMPLEMENTASI: Inventory Page dengan Multiple Tabs dan Query Params
// Setiap tab punya DataTable sendiri dengan filter state terpisah

"use client";

import { useState } from "react";
import DataTable from "@/components/data-tables";
import { Box, TrendingDown, Package } from "lucide-react";

const inboundData = [
  { id: "IN-001", status: "pending", reference: "REF-001", date: "2026-01-10" },
  { id: "IN-002", status: "done", reference: "REF-002", date: "2026-01-11" },
  { id: "IN-003", status: "pending", reference: "REF-003", date: "2026-01-12" },
];

const outboundData = [
  { id: "OUT-001", type: "cargo", status: "pending", date: "2026-01-10" },
  { id: "OUT-002", type: "reguler", status: "done", date: "2026-01-11" },
  { id: "OUT-003", type: "cargo", status: "pending", date: "2026-01-12" },
];

const stockData = [
  { sku: "SKU-001", name: "Product A", qty: 100, status: "in_stock" },
  { sku: "SKU-002", name: "Product B", qty: 50, status: "almost_out" },
  { sku: "SKU-003", name: "Product C", qty: 0, status: "out_of_stock" },
];

type TabType = "inbound" | "outbound" | "stock";

const TABS: { label: string; value: TabType; icon: React.ReactNode }[] = [
  { label: "Inbound", value: "inbound", icon: <Box size={20} /> },
  { label: "Outbound", value: "outbound", icon: <TrendingDown size={20} /> },
  { label: "Stock", value: "stock", icon: <Package size={20} /> },
];

/**
 * MULTI-TAB DATATABLE DENGAN QUERY PARAMS
 *
 * MASALAH TANPA QUERY PARAMS:
 * - Filter di tab 1, switch ke tab 2, kembali ke tab 1 → filter hilang
 * - Reload page → semua filter hilang
 * - Tidak bisa share URL dengan filter dari tab tertentu
 *
 * SOLUSI QUERY PARAMS + PREFIX:
 * - Tab inbound: URL berisi ?inbound_search=xxx&inbound_filter_status=pending&inbound_page=1
 * - Tab outbound: URL berisi ?outbound_search=yyy&outbound_filter_type=cargo&outbound_page=1
 * - Tab stock: URL berisi ?stock_search=zzz&stock_page=2
 * - Switch tab → URL otomatis berubah, state tetap tersimpan
 * - Reload → state kembali dari URL
 * - Dapat share URL dengan tab + filter spesifik
 *
 * ⚠️  PENTING: Gunakan CONDITIONAL RENDER (jika/else) untuk tabs, BUKAN render semua bersamaan
 * - ❌ SALAH: Render semua DataTable sekaligus
 *   {activeTab === "inbound" && <DataTable ... />}
 *   {activeTab === "outbound" && <DataTable ... />}
 *   → Search state bisa tercampur karena keduanya render di DOM
 *
 * - ✅ BENAR: Gunakan conditional render yang proper
 *   {activeTab === "inbound" && <DataTable ... queryParamPrefix="inbound" />}
 *   {activeTab === "outbound" && <DataTable ... queryParamPrefix="outbound" />}
 *   → Hanya 1 DataTable di DOM pada saat, search state terpisah per tab
 */

export default function InventoryTabbedPage() {
  // State untuk active tab
  const [activeTab, setActiveTab] = useState<TabType>("inbound");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <p className="text-slate-600 mt-2">
          Kelola semua data inventory termasuk inbound, outbound, dan stock
        </p>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex gap-2 border-b border-slate-200 bg-white rounded-t-lg p-4">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold transition-all ${
              activeTab === tab.value
                ? "bg-blue-400 text-white shadow-lg shadow-blue-400/30"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT - INBOUND */}
      {activeTab === "inbound" && (
        <div className="space-y-4">
          <DataTable
            data={inboundData}
            searchableKeys={["id", "reference"]} // Bisa search by ID atau Reference
            columns={[
              { key: "id", header: "Inbound ID", accessor: "id" },
              { key: "reference", header: "Reference", accessor: "reference" },
              { key: "status", header: "Status", accessor: "status" },
              { key: "date", header: "Date", accessor: "date" },
            ]}
            // FILTER untuk inbound
            filters={[
              {
                label: "Status",
                accessor: "status",
                options: [
                  { label: "Pending", value: "pending" },
                  { label: "Done", value: "done" },
                  { label: "Failed", value: "failed" },
                ],
              },
            ]}
            // DATE FILTER untuk inbound
            dateFilter={{
              show: true,
              accessor: "date",
            }}
            pageSize={5}
            // ✅ PENTING: Gunakan prefix "inbound" agar query params terpisah dari tab lain
            // URL: ?inbound_search=IN&inbound_filter_status=pending&inbound_dateFilter=2026-01-10&inbound_page=1
            queryParamPrefix="inbound"
          />
        </div>
      )}

      {/* TAB CONTENT - OUTBOUND */}
      {activeTab === "outbound" && (
        <div className="space-y-4">
          <DataTable
            data={outboundData}
            searchableKeys={["id"]} // Bisa search by ID
            columns={[
              { key: "id", header: "Outbound ID", accessor: "id" },
              { key: "type", header: "Type", accessor: "type" },
              { key: "status", header: "Status", accessor: "status" },
              { key: "date", header: "Date", accessor: "date" },
            ]}
            // FILTER untuk outbound
            filters={[
              {
                label: "Type",
                accessor: "type",
                options: [
                  { label: "Cargo", value: "cargo" },
                  { label: "Reguler", value: "reguler" },
                  { label: "Express", value: "express" },
                ],
              },
              {
                label: "Status",
                accessor: "status",
                options: [
                  { label: "Pending", value: "pending" },
                  { label: "Done", value: "done" },
                  { label: "Cancelled", value: "cancelled" },
                ],
              },
            ]}
            // DATE FILTER untuk outbound
            dateFilter={{
              show: true,
              accessor: "date",
            }}
            pageSize={5}
            // ✅ PENTING: Gunakan prefix "outbound" agar query params terpisah dari tab lain
            // URL: ?outbound_search=OUT&outbound_filter_type=cargo&outbound_filter_status=done&outbound_page=1
            queryParamPrefix="outbound"
          />
        </div>
      )}

      {/* TAB CONTENT - STOCK */}
      {activeTab === "stock" && (
        <div className="space-y-4">
          <DataTable
            data={stockData}
            searchableKeys={["sku", "name"]} // Bisa search by SKU atau Name
            columns={[
              { key: "sku", header: "SKU", accessor: "sku" },
              { key: "name", header: "Product Name", accessor: "name" },
              { key: "qty", header: "Quantity", accessor: "qty" },
              {
                key: "status",
                header: "Stock Status",
                accessor: (item) => (
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.status === "in_stock"
                        ? "bg-green-100 text-green-700"
                        : item.status === "almost_out"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                ),
              },
            ]}
            // FILTER untuk stock
            filters={[
              {
                label: "Stock Status",
                accessor: "status",
                options: [
                  { label: "In Stock", value: "in_stock" },
                  { label: "Almost Out", value: "almost_out" },
                  { label: "Out of Stock", value: "out_of_stock" },
                ],
              },
            ]}
            pageSize={5}
            // ✅ PENTING: Gunakan prefix "stock" agar query params terpisah dari tab lain
            // URL: ?stock_search=SKU&stock_filter_status=out_of_stock&stock_page=1
            queryParamPrefix="stock"
          />
        </div>
      )}
    </div>
  );
}

/**
 * CONTOH URL YANG DIHASILKAN:
 *
 * 1. User buka halaman pertama kali, lihat tab Inbound:
 *    /inventory
 *
 * 2. User search "IN" di Inbound tab:
 *    /inventory?inbound_search=IN
 *
 * 3. User filter status "pending" di Inbound tab:
 *    /inventory?inbound_search=IN&inbound_filter_status=pending
 *
 * 4. User switch ke Outbound tab:
 *    /inventory?inbound_search=IN&inbound_filter_status=pending
 *    (URL tetap sama, Outbound tab load tanpa filter)
 *
 * 5. User filter Outbound Type "cargo":
 *    /inventory?inbound_search=IN&inbound_filter_status=pending&outbound_filter_type=cargo
 *    (Sekarang URL berisi filter dari KEDUA tab!)
 *
 * 6. User switch kembali ke Inbound tab:
 *    /inventory?inbound_search=IN&inbound_filter_status=pending&outbound_filter_type=cargo
 *    (Inbound filter tetap ada, Outbound filter tetap ada)
 *    ✅ Inbound DataTable langsung menampilkan "IN" + status "pending"
 *    ✅ Browser tahu filter mana untuk tab mana
 *
 * 7. User reload page saat di Outbound tab:
 *    /inventory?inbound_search=IN&inbound_filter_status=pending&outbound_filter_type=cargo
 *    ✅ Outbound tab default load, dan filter Cargo sudah aktif!
 *
 * 8. User copy URL dan share ke orang lain:
 *    /inventory?inbound_search=IN&inbound_filter_status=pending&outbound_filter_type=cargo
 *    ✅ Orang lain akan lihat EXACTLY sama layout dan filters!
 *
 * KEUNTUNGAN:
 * ✅ Tidak perlu complex local storage untuk persist filter
 * ✅ URL menjadi "bookmarkable" - bisa save sebagai bookmark
 * ✅ Browser back/forward button bekerja perfectly
 * ✅ Collaboration: dapat share URL dengan orang lain atau via chat
 * ✅ Data analysis: dapat track user behavior via URL patterns di analytics
 */
