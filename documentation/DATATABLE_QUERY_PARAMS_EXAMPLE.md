// CONTOH IMPLEMENTASI: Buyers Page dengan Query Params
// Ini adalah contoh how-to untuk mengintegrasikan query params ke halaman yang sudah ada

"use client";

import DataTable from "@/components/data-tables";
import { Edit, PackagePlus, User, UserPlus } from "lucide-react";
import React from "react";

const classOptions = [
  { label: "Gold", value: "Gold" },
  { label: "Silver", value: "Silver" },
  { label: "Platinum", value: "Platinum" },
];

const buyer = [
  {
    id: "buyer-uuid-001",
    name: "Anas Syihabuddin",
    email: "anas@example.com",
    phone: "081234567890",
    join_date: "2026-03-26",
    class_id: "class-uuid-gold",
    class_name: "Gold",
    total_order: 10,
  },
  {
    id: "buyer-uuid-002",
    name: "Budi Santoso",
    email: null,
    phone: "089876543210",
    join_date: "2026-03-25",
    class_id: "class-uuid-silver",
    class_name: "Silver",
    total_order: 25,
  },
  // ... more data
];

/**
 * SEBELUM: Tanpa query params, filter state hilang saat reload/share
 * SESUDAH: Dengan query params, semua state tersimpan di URL
 *
 * IMPLEMENTASI STEP BY STEP:
 *
 * 1. Import DataTable (sudah ada)
 * 2. Tambah queryParamPrefix jika applicable
 * 3. Tambah searchableKeys untuk field yang bisa dicari
 * 4. Tambah filters config dengan accessor yang sesuai data
 * 5. Tambah dateFilter config jika ada date field
 *
 * HASIL:
 * - URL otomatis berubah: ?search=anas&filter_class_name=Gold&dateFilter=2026-03-26&page=1
 * - Semua state sync dengan URL
 * - Browser back/forward berfungsi
 * - Dapat share link dengan orang lain
 */

export default function BuyersPageExample() {
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [selectedClassId, setSelectedClassId] = React.useState<string | null>(
    null,
  );

  return (
    <div className="space-y-6">
      {/* ... Stats section ... */}

      {/* DataTable - DENGAN QUERY PARAMS */}
      <DataTable
        data={buyer}
        searchableKeys={["name", "email", "phone"]} // Bisa search di field ini
        columns={[
          {
            key: "name",
            header: "Nama",
            accessor: (item) => <span className="font-bold">{item.name}</span>,
          },
          {
            key: "class_name",
            header: "Kelas",
            accessor: (item) => (
              <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-lg text-xs">
                {item.class_name}
              </span>
            ),
          },
          {
            key: "join_date",
            header: "Join Date",
            accessor: (item) => item.join_date,
          },
          {
            key: "total_order",
            header: "Total Order",
            accessor: (item) => item.total_order,
          },
        ]}
        // FILTER: Filter berdasarkan class_name
        filters={[
          {
            label: "Kelas",
            accessor: "class_name", // Harus match dengan field di data
            options: [
              { label: "Gold", value: "Gold" },
              { label: "Silver", value: "Silver" },
              { label: "Platinum", value: "Platinum" },
            ],
          },
        ]}
        // DATE FILTER: Filter berdasarkan join_date
        dateFilter={{
          show: true,
          accessor: "join_date", // Harus match dengan field di data
        }}
        // PAGINATION
        pageSize={10}
        // QUERY PARAMS: Tanpa prefix karena ini halaman utama (bukan tabs/detail)
        // queryParamPrefix tidak perlu jika hanya 1 DataTable di halaman
        // HASIL URL: ?search=anas&filter_class_name=Gold&dateFilter=2026-03-26&page=2
        // ACTIONS
        actions={{
          showDetail: true,
          detailHref: (item) => `/buyers/${item.id}`,
        }}
        // TOP BUTTON
        topButton={{
          label: "Tambah Buyer",
          onClick: () => setShowModalCreate(true),
          icon: <UserPlus size={18} />,
        }}
      />

      {/* ... Modal ... */}
    </div>
  );
}

/**
 * CONTOH URL YANG DIHASILKAN:
 *
 * 1. Halaman pertama kali dibuka:
 *    /buyers
 *    (tidak ada query params)
 *
 * 2. User search "anas":
 *    /buyers?search=anas
 *
 * 3. User filter kelas Gold:
 *    /buyers?search=anas&filter_class_name=Gold
 *
 * 4. User pilih date 2026-03-26:
 *    /buyers?search=anas&filter_class_name=Gold&dateFilter=2026-03-26
 *
 * 5. User ke halaman 2:
 *    /buyers?search=anas&filter_class_name=Gold&dateFilter=2026-03-26&page=2
 *
 * 6. User reload page → semua filter state tetap sama! ✅
 *
 * 7. User copy URL dan share → orang lain akan lihat EXACTLY sama state ✅
 *
 * 8. User klik back → URL dan state kembali ke step sebelumnya ✅
 */
