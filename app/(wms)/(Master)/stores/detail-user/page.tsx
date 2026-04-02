"use client";

import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import DataTable from "@/components/data-tables";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import { InputText } from "@/components/globals/additionals/Inputs";
import { User, Edit, ArrowRightSquare } from "lucide-react";
import React from "react";

// Data penjualan user
const salesData = [
  {
    id: 1,
    code: "INV-001",
    name_buyer: "PT Maju Jaya",
    date: "2026-03-25",
    grand_total: 25000000,
  },
  {
    id: 2,
    code: "INV-002",
    name_buyer: "CV Berkah Selalu",
    date: "2026-03-24",
    grand_total: 15000000,
  },
  {
    id: 3,
    code: "INV-003",
    name_buyer: "Toko Indah",
    date: "2026-03-23",
    grand_total: 20500000,
  },
  {
    id: 4,
    code: "INV-004",
    name_buyer: "UD Perdana",
    date: "2026-03-22",
    grand_total: 12000000,
  },
  {
    id: 5,
    code: "INV-005",
    name_buyer: "Minimarket Suka",
    date: "2026-03-21",
    grand_total: 28000000,
  },
];

export default function DetailUserPage() {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editName, setEditName] = React.useState("Ahmad Rijali");
  const [editPhone, setEditPhone] = React.useState("081234567890");
  const [editAddress, setEditAddress] = React.useState(
    "Jl. Sudirman No. 123, Jakarta",
  );

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Column 1 - Card User Details */}
        <div>
          {/* Card 2 - User Detail with Edit Button */}
          <CardKeyValueVertical
            title="Detail User"
            icon={<Edit className="w-6 h-6" />}
            items={[
              { label: "Nama", value: "Ahmad Rijali" },
              { label: "Phone", value: "081234567890" },
              { label: "Alamat", value: "Jl. Sudirman No. 123, Jakarta" },
            ]}
            footerActions={[
              {
                label: "Edit Data",
                onClick: handleOpenEditModal,
                className: "bg-blue-500 text-white cursor-pointer",
              },
            ]}
          />
        </div>

        {/* Column 2 - Span 2 (Two Cards Stacked) */}
        <div className="col-span-2 space-y-6">
            {/* Card Sales */}
          <div className="grid grid-cols-2 gap-6">
            {/* Card 1 - Total Keseluruhan */}
            <CardKeyValueVertical
              title="Total Keseluruhan"
              icon={<User className="w-6 h-6" />}
              items={[
                { label: "Total Transaksi", value: "45" },
                { label: "Total Penjualan", value: "Rp 125.500.000" },
                { label: "Rata-rata Transaksi", value: "Rp 2.788.889" },
              ]}
            />

            {/* Card 2 - Total Harian */}
            <CardKeyValueVertical
              title="Total Harian"
              icon={<User className="w-6 h-6" />}
              items={[
                { label: "Transaksi Hari Ini", value: "5" },
                { label: "Total Harian", value: "Rp 15.000.000" },
                { label: "Rata-rata Harian", value: "Rp 3.000.000" },
              ]}
            />
          </div>

          {/* Table sales user */}
          <DataTable
            title="History Penjualan"
            data={salesData}
            searchableKeys={["code", "name_buyer"]}
            columns={[
              {
                key: "code",
                header: "Kode",
                accessor: (item) => (
                  <span className="font-bold">{item.code}</span>
                ),
              },
              {
                key: "name_buyer",
                header: "Buyer",
                accessor: (item) => item.name_buyer,
              },
              {
                key: "date",
                header: "Tanggal",
                accessor: (item) => item.date,
              },
              {
                key: "grand_total",
                header: "Grand Total",
                accessor: (item) => (
                  <span className="font-bold">
                    Rp {item.grand_total.toLocaleString()}
                  </span>
                ),
              },
            ]}
            dateFilter={{
              show: true,
              accessor: "date",
            }}
            exportConfig={{
              show: true,
              onExport: (data) => alert(`Exporting ${data.length} sales...`),
            }}
            actions={{
              customActions: [
                {
                  label: "Detail",
                  icon: <ArrowRightSquare className="w-6 h-6" />,
                  color: "emerald",
                  onClick: (item) => console.log("Detail clicked", item),
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Modal Edit User */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Data User"
        footer={[
          <Button
            label="Batal"
            variant="outline"
            onClick={() => setShowEditModal(false)}
          />,
          <Button
            label="Simpan Perubahan"
            onClick={() => {
              alert("Data user berhasil diperbarui!");
              setShowEditModal(false);
            }}
          />,
        ]}
      >
        <div className="space-y-5">
          <InputText
            label="Nama"
            name="name"
            placeholder="Masukkan Nama"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <InputText
            label="Phone"
            name="phone"
            placeholder="Masukkan Phone"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
          <InputText
            label="Alamat"
            name="address"
            placeholder="Masukkan Alamat"
            value={editAddress}
            onChange={(e) => setEditAddress(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}
