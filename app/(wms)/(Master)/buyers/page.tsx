"use client";

import DataTable from "@/components/data-tables";
import {
  InputNumber,
  InputSelectSearch,
  InputText,
  InputTextArea,
} from "@/components/globals/additionals/Inputs";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import { Edit, PackagePlus, User, UserPlus } from "lucide-react";
import React from "react";

const classOptions = [
  { label: "Gold", value: "class-uuid-gold" },
  { label: "Silver", value: "class-uuid-silver" },
  { label: "Platinum", value: "class-uuid-platinum" },
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
    total_amount: 100000,
    format_total_amount: "Rp 100.000",
    last_order: "2026-03-26",
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
    total_amount: 550000,
    format_total_amount: "Rp 550.000",
    last_order: "2026-03-25",
  },
  {
    id: "buyer-uuid-003",
    name: "Siti Nurhaliza",
    email: "siti@example.com",
    phone: null,
    join_date: "2026-03-24",
    class_id: "class-uuid-platinum",
    class_name: "Platinum",
    total_order: 18,
    total_amount: 320000,
    format_total_amount: "Rp 320.000",
    last_order: "2026-03-24",
  },
  {
    id: "buyer-uuid-004",
    name: "Ahmad Wijaya",
    email: null,
    phone: null,
    join_date: "2026-03-23",
    class_id: "class-uuid-gold",
    class_name: "Gold",
    total_order: 32,
    total_amount: 780000,
    format_total_amount: "Rp 780.000",
    last_order: "2026-03-23",
  },
];

export default function BuyersPage() {
  // Modal
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [selectedClassId, setSelectedClassId] = React.useState<string | null>(null);
  return (
    <div className=" space-y-6">
      <StatsSectionWrapper
        title="Laporan Operasional"
        description="Data statistik dari gudang dan penjualan"
        onApplyFilter={() => console.log("Filtering data...")}
      >
        <div className=" space-y-6">
          {/* Info Card */}
          <div className=" grid grid-cols-2 gap-6">
            {/* Bisa masukin Card buatanmu */}
            <CardKeyValueVertical
              title="Customer Aktif"
              items={[
                { label: "Total Bulan Ini", value: 120 },
                {
                  label: "Persentase",
                  value: (
                    <span className="text-green-700 bg-green-300 rounded-lg px-2 py-1">
                      20% Lebih banyak dari rata-rata
                    </span>
                  ),
                },
              ]}
            />
            {/* Bisa masukin Card Statistik Ringkas */}
            <CardKeyValueVertical
              title="Customer Keseluruhan"
              items={[
                { label: "Total Customer", value: 400 },
                {
                  label: "Rata Rata Aktif/BUlan",
                  value: (
                    <span className="text-blue-700 bg-blue-300 rounded-lg px-2 py-1">
                      100 Buyer
                    </span>
                  ),
                },
              ]}
            />
          </div>

          {/* Table */}
          <DataTable
            data={buyer}
            searchableKeys={["name", "email", "phone"]}
            columns={[
              {
                key: "name",
                header: "Nama",
                accessor: (item) => (
                  <span className="font-bold">{item.name}</span>
                ),
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
                header: "Order",
                accessor: (item) => item.total_order,
              },
              {
                key: "total_amount",
                header: "Bayar",
                accessor: (item) => item.format_total_amount,
              },
              {
                key: "last_order",
                header: "Last Order",
                accessor: (item) => item.last_order,
              },
            ]}
            filters={[
              {
                label: "Kelas",
                accessor: "class_name",
                options: classOptions.map((c) => ({ label: c.label, value: c.label })),
                show: true,
              },
            ]}
            topButton={{
              label: "Buyer",
              onClick: () => setShowModalCreate(true),
              icon: <UserPlus size={18} />,
              show: true,
            }}
            exportConfig={{
              show: true,
              onExport: (data) => alert(`Exporting ${data.length} data...`),
            }}
            actions={{
              showDetail: true,
              detailHref: (item) => `/buyers/detail-buyer`,
            }}
          />
        </div>
      </StatsSectionWrapper>

      {/* Modal create */}
      <Modal
        isOpen={showModalCreate}
        onClose={() => setShowModalCreate(false)}
        title="Tambah Buyer"
        footer={
          <>
            <Button
              label="Batal"
              variant="outline"
              onClick={() => setShowModalCreate(false)}
            />
            <Button label="Simpan" onClick={() => alert("Saved!")} />
          </>
        }
      >
        <div className="space-y-6">
          <InputText
            label="Nama Buyer"
            placeholder="Masukkan Nama Buyer"
            name="name"
          />
          <InputText
            label="Email"
            placeholder="Masukkan Email (opsional)"
            name="email"
          />
          <InputNumber
            label="Nomor Telepon"
            placeholder="Masukkan Nomor Telepon (opsional)"
            name="phone"
          />
          <InputSelectSearch
            label="Kelas"
            placeholder="Pilih Kelas"
            options={classOptions}
            value={selectedClassId}
            onChange={(val) => setSelectedClassId(val)}
          />
        </div>
      </Modal>
    </div>
  );
}
