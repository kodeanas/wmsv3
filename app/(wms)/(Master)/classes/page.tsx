"use client";

import DataTable from "@/components/data-tables";
import {
  InfoDisplay,
  InputNumber,
  InputRupiah,
  InputSelectSearch,
  InputText,
} from "@/components/globals/additionals/Inputs";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import { Edit, PackagePlus, Tag } from "lucide-react";
import React, { useState } from "react";

// Data kelas dengan boolean is_active
const classes = [
  {
    id: 1,
    image: "https://via.placeholder.com/50",
    name: "Gold",
    min_order: 10,
    min_amount: 1000000,
    expired_weeks: 52,
    is_active: true, // Boolean
  },
  {
    id: 2,
    image: "https://via.placeholder.com/50",
    name: "Silver",
    min_order: 5,
    min_amount: 500000,
    expired_weeks: 26,
    is_active: true, // Boolean
  },
  {
    id: 3,
    image: "https://via.placeholder.com/50",
    name: "Platinum",
    min_order: 20,
    min_amount: 2000000,
    expired_weeks: 78,
    is_active: false, // Boolean
  },
];

export default function ClassesPage() {
  const [showModalEdit, setShowModalEdit] = React.useState(false);
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [selectedName, setSelectedName] = React.useState("");
  const [minOrder, setMinOrder] = React.useState("");
  const [minAmount, setMinAmount] = React.useState("");
  const [expiredWeeks, setExpiredWeeks] = React.useState("");
  // State status sekarang menyimpan boolean atau string kosong untuk inisialisasi
  const [isActive, setIsActive] = React.useState<boolean | "">("");

  const dataStatus = [
    { label: "Aktif", value: "true" }, // Value dikirim sebagai string jika component InputSelectSearch memerlukan string
    { label: "Tidak Aktif", value: "false" },
  ];

  const handleOpenCreateModal = () => {
    setSelectedName("");
    setMinOrder("");
    setMinAmount("");
    setExpiredWeeks("");
    setIsActive("");
    setShowModalCreate(true);
  };

  return (
    <div className="space-y-6">
      {/* Card Info */}
      <CardKeyValueVertical
        title="Informasi Kelas"
        icon={<Tag size={20} />}
        items={[{ label: "Total Kelas", value: String(classes.length) }]}
      />

      {/* Tabel */}
      <DataTable
        data={classes}
        searchableKeys={["name"]}
        columns={[
          {
            key: "image",
            header: "Image",
            accessor: (item) => (
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded object-cover"
              />
            ),
          },
          {
            key: "name",
            header: "Nama Kelas",
            accessor: (item) => (
              <span className="font-bold">{item.name}</span>
            ),
          },
          {
            key: "min_order",
            header: "Min Order",
            accessor: (item) => (
              <span className="font-bold">{item.min_order} Pcs</span>
            ),
          },
          {
            key: "min_amount",
            header: "Min Amount",
            accessor: (item) => (
              <span className="font-bold">Rp {item.min_amount.toLocaleString()}</span>
            ),
          },
          {
            key: "expired",
            header: "Expired",
            accessor: (item) => (
              <span className="font-bold text-blue-600">{item.expired_weeks} Minggu</span>
            ),
          },
          {
            key: "is_active",
            header: "Status",
            accessor: (item) => (
              <span
                className={`font-bold ${
                  item.is_active ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.is_active ? "Aktif" : "Tidak Aktif"}
              </span>
            ),
          },
        ]}
        filters={[
          {
            label: "Status",
            accessor: "is_active",
            options: [
              { label: "Aktif", value: 'true' },
              { label: "Tidak Aktif", value: 'false' },
            ],
            show: true,
          },
        ]}
        topButton={{
          label: "Kelas",
          onClick: handleOpenCreateModal,
          icon: <PackagePlus size={18} />,
          show: true,
        }}
        exportConfig={{
          show: true,
          onExport: (data) => alert(`Exporting ${data.length} data...`),
        }}
        actions={{
          customActions: [
            {
              label: "Detail",
              icon: <Edit size={18} />,
              color: "blue",
              show: true,
              onClick: (item) => {
                setSelectedName(item.name);
                setMinOrder(String(item.min_order));
                setMinAmount(String(item.min_amount));
                setExpiredWeeks(String(item.expired_weeks));
                setIsActive(item.is_active);
                setShowModalEdit(true);
              },
            },
          ],
        }}
      />

      {/* Modal Edit */}
      <Modal
        isOpen={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        title="Detail & Update Kelas"
        footer={
          <>
            <Button
              label="Batal"
              variant="outline"
              onClick={() => setShowModalEdit(false)}
            />
            <Button label="Simpan Perubahan" onClick={() => alert("Saved!")} />
          </>
        }
      >
        <div className="space-y-5">
          <InputText
            label="Nama Kelas"
            name="name"
            placeholder="Masukkan Nama Kelas"
            defaultValue={selectedName || ""}
          />
          <div className="grid grid-cols-2 gap-5">
            <InputNumber
              name="min_order"
              label="Min Order"
              suffix="Pcs"
              placeholder="0"
              value={minOrder}
            />
            <InputRupiah
              label="Min Amount"
              name="min_amount"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputNumber
              name="expired_weeks"
              label="Expired"
              suffix="Minggu"
              placeholder="0"
              value={expiredWeeks}
            />
            <InputSelectSearch
              label="Pilih Status"
              options={dataStatus}
              value={String(isActive)}
              onChange={(val) => setIsActive(val === "true")}
              placeholder="Pilih status..."
            />
          </div>
        </div>
      </Modal>

      {/* Modal Create */}
      <Modal
        isOpen={showModalCreate}
        onClose={() => setShowModalCreate(false)}
        title="Buat Kelas Baru"
        footer={
          <>
            <Button
              label="Batal"
              variant="outline"
              onClick={() => setShowModalCreate(false)}
            />
            <Button label="Simpan Perubahan" onClick={() => alert("Saved!")} />
          </>
        }
      >
        <div className="space-y-5">
          <InputText
            label="Nama Kelas"
            name="name"
            placeholder="Masukkan Nama Kelas"
          />
          <div className="grid grid-cols-2 gap-5">
            <InputNumber
              name="min_order"
              label="Min Order"
              suffix="Pcs"
              placeholder="0"
            />
            <InputRupiah
              label="Min Amount"
              name="min_amount"
              placeholder="0"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <InputNumber
              name="expired_weeks"
              label="Expired"
              suffix="Minggu"
              placeholder="0"
            />
            <InputSelectSearch
              label="Pilih Status"
              options={dataStatus}
              value={String(isActive)}
              onChange={(val) => setIsActive(val === "true")}
              placeholder="Pilih status..."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}