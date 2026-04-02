"use client";

import DataTable from "@/components/data-tables";
import {
  InputColor,
  InputNumber,
  InputRupiah,
  InputSelectSearch,
  InputText,
} from "@/components/globals/additionals/Inputs";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import { Edit, PackagePlus, Sticker } from "lucide-react";
import React, { useState } from "react";

// 1. Update Type Definition
type StickerItem = {
  id: string;
  hex: string;
  name: string;
  type: "big" | "small" | "tiny";
  min_price: string;
  max_price: string;
  fixed_price: string;
  is_status: boolean;
};

// 2. Mock Data Baru
const stickers: StickerItem[] = [
  {
    id: "5f2da0fd-f6df-4609-bb2a-5e4a34295d7c",
    hex: "#FF5733",
    name: "Sticker Hologram A",
    type: "big",
    min_price: "50000",
    max_price: "100000",
    fixed_price: "75000",
    is_status: true,
  },
  {
    id: "75f4dff2-20d0-4c2f-8fd4-2f4d4f90208a",
    hex: "#33FF57",
    name: "Sticker Vinyl B",
    type: "small",
    min_price: "10000",
    max_price: "20000",
    fixed_price: "15000",
    is_status: true,
  },
];

export default function StickersPage() {
  // State Management
  const [selectedName, setSelectedName] = useState("");
  const [selectedHex, setSelectedHex] = useState("#000000");
  const [selectedType, setSelectedType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("true");

  const [showModalEdit, setShowModalEdit] = React.useState(false);
  const [showModalCreate, setShowModalCreate] = React.useState(false);

  const resetForm = () => {
    setSelectedName("");
    setSelectedHex("#000000");
    setSelectedType("");
    setMinPrice("");
    setMaxPrice("");
    setFixedPrice("");
    setSelectedStatus("true");
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setShowModalCreate(true);
  };

  const dataType = [
    { label: "Big", value: "big" },
    { label: "Small", value: "small" },
    { label: "Tiny", value: "tiny" },
  ];

  const dataStatus = [
    { label: "Aktif", value: "true" },
    { label: "Tidak Aktif", value: "false" },
  ];

  const formatIDR = (amount: string) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(amount || 0));

  return (
    <div className="space-y-6">
      <CardKeyValueVertical
        title="Informasi Stickers"
        icon={<Sticker size={20} />}
        items={[{ label: "Total Koleksi", value: String(stickers.length) }]}
      />

      <DataTable
        data={stickers}
        searchableKeys={["name", "type"]}
        columns={[
          {
            key: "hex",
            header: "Color",
            accessor: (item) => (
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded border shadow-sm"
                  style={{ backgroundColor: item.hex }}
                />
                <span className="font-mono text-xs uppercase">{item.hex}</span>
              </div>
            ),
          },
          {
            key: "name",
            header: "Name",
            accessor: (item) => <span className="font-bold">{item.name}</span>,
          },
          {
            key: "type",
            header: "Type",
            accessor: (item) => (
              <span className="px-2 py-1 bg-slate-100 rounded text-xs uppercase font-semibold">
                {item.type}
              </span>
            ),
          },
          {
            key: "fixed_price",
            header: "Fixed Price",
            accessor: (item) => <span>{formatIDR(item.fixed_price)}</span>,
          },
          {
            key: "min_price",
            header: "Min Price",
            accessor: (item) => (
              <span className="text-slate-500 text-sm">
                {formatIDR(item.min_price)}
              </span>
            ),
          },
          {
            key: "max_price",
            header: "Max Price",
            accessor: (item) => (
              <span className="text-slate-500 text-sm">
                {formatIDR(item.max_price)}
              </span>
            ),
          },
          {
            key: "is_status",
            header: "Status",
            accessor: (item) => (
              <span
                className={`font-bold ${item.is_status ? "text-green-500" : "text-red-500"}`}
              >
                {item.is_status ? "Aktif" : "Tidak Aktif"}
              </span>
            ),
          },
        ]}
        filters={[
          {
            label: "Semua Tipe",
            accessor: "type",
            options: dataType,
            show: true,
          },
        ]}
        topButton={{
          label: "Tambah Sticker",
          onClick: handleOpenCreateModal,
          icon: <PackagePlus size={18} />,
          show: true,
        }}
        actions={{
          customActions: [
            {
              label: "Edit",
              icon: <Edit size={18} />,
              color: "blue",
              show: true,
              onClick: (item) => {
                setSelectedName(item.name);
                setSelectedHex(item.hex);
                setSelectedType(item.type);
                setMinPrice(item.min_price);
                setMaxPrice(item.max_price);
                setFixedPrice(item.fixed_price);
                setSelectedStatus(String(item.is_status));
                setShowModalEdit(true);
              },
            },
          ],
        }}
      />

      {/* Reusable Form Content */}
      {/* (Bisa dipisah ke component sendiri agar tidak duplikasi antara Create & Edit) */}
      <Modal
        isOpen={showModalEdit || showModalCreate}
        onClose={() => {
          setShowModalEdit(false);
          setShowModalCreate(false);
        }}
        title={showModalEdit ? "Update Sticker" : "Buat Sticker Baru"}
        footer={
          <>
            <Button
              label="Batal"
              variant="outline"
              onClick={() => {
                setShowModalEdit(false);
                setShowModalCreate(false);
              }}
            />
            <Button label="Simpan" onClick={() => alert("Data Terkirim!")} />
          </>
        }
      >
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 grid grid-cols-2 gap-4">
              <InputText
                name="name"
                label="Nama Sticker"
                placeholder="Contoh: Vinyl Glossy"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
              />

              <InputColor
                name="hex"
                label="Hex"
                value={selectedHex}
                onChange={(e) => setSelectedHex(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <InputSelectSearch
              label="Tipe Ukuran"
              options={dataType}
              value={selectedType}
              onChange={(val) => setSelectedType(val)}
              placeholder="Pilih tipe..."
            />
            <InputSelectSearch
              label="Status"
              options={dataStatus}
              value={selectedStatus}
              onChange={(val) => setSelectedStatus(val)}
            />
          </div>

          <hr className="border-slate-100" />

          <div className="grid grid-cols-1">
            <InputRupiah
              name="fixed_price"
              label="Fixed Price (Harga Jual Utama)"
              value={fixedPrice}
              onChange={(e) => setFixedPrice(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <InputRupiah
              name="min_price"
              label="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <InputRupiah
              name="max_price"
              label="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
