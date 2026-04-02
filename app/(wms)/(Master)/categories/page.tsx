"use client";

import DataTable from "@/components/data-tables";
import {
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

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  discount: number;
  min_price: string;
  max_price: string;
  is_status: boolean;
};

const categories: CategoryItem[] = [
  {
    id: "5f2da0fd-f6df-4609-bb2a-5e4a34295d7c",
    name: "Liquid",
    slug: "liquid",
    discount: 10,
    min_price: "50000",
    max_price: "100000",
    is_status: true,
  },
  {
    id: "75f4dff2-20d0-4c2f-8fd4-2f4d4f90208a",
    name: "Elektronik",
    slug: "elektronik",
    discount: 20,
    min_price: "75000",
    max_price: "150000",
    is_status: true,
  },
  {
    id: "5f10f9ea-f5ee-4887-8f75-451ea00cdf15",
    name: "Otomotif",
    slug: "otomotif",
    discount: 40,
    min_price: "100000",
    max_price: "250000",
    is_status: false,
  },
];

export default function CategoriesPage() {
  const [selectedName, setSelectedName] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [discount, setDiscount] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("true");

  const [showModalEdit, setShowModalEdit] = React.useState(false);
  const [showModalCreate, setShowModalCreate] = React.useState(false);

  const resetForm = () => {
    setSelectedName("");
    setSelectedSlug("");
    setDiscount("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedStatus("true");
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setShowModalCreate(true);
  };

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
        title="Informasi Kategori"
        icon={<Tag size={20} />}
        items={[{ label: "Total Kategori", value: String(categories.length) }]}
      />

      <DataTable
        data={categories}
        searchableKeys={["name", "slug"]}
        columns={[
          {
            key: "name",
            header: "Name",
            accessor: (item) => <span className="font-bold">{item.name}</span>,
          },
          {
            key: "slug",
            header: "Slug",
            accessor: (item) => (
              <span className="font-medium text-blue-500">{item.slug}</span>
            ),
          },
          {
            key: "discount",
            header: "Discount",
            accessor: (item) => (
              <span className="font-bold">{item.discount}%</span>
            ),
          },
          {
            key: "min_price",
            header: "Min Price",
            accessor: (item) => <span>{formatIDR(item.min_price)}</span>,
          },
          {
            key: "max_price",
            header: "Max Price",
            accessor: (item) => <span>{formatIDR(item.max_price)}</span>,
          },
          {
            key: "is_status",
            header: "Is Status",
            accessor: (item) => (
              <span
                className={`font-bold  ${
                  item.is_status ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.is_status ? "Aktif" : "Tidak Aktif"}
              </span>
            ),
          },
        ]}
        filters={[
          {
            label: "Status",
            accessor: "is_status",
            options: [
              { label: "Aktif", value: "true" },
              { label: "Tidak Aktif", value: "false" },
            ],
            show: true,
          },
        ]}
        topButton={{
          label: "Kategori",
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
                setSelectedSlug(item.slug);
                setDiscount(String(item.discount));
                setMinPrice(item.min_price);
                setMaxPrice(item.max_price);
                setSelectedStatus(String(item.is_status));
                setShowModalEdit(true);
              },
            },
          ],
        }}
      />

      <Modal
        isOpen={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        title="Detail & Update Kategori"
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
            label="Name"
            name="name"
            placeholder="Masukkan nama kategori"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          />
          <InputText
            label="Slug"
            name="slug"
            placeholder="contoh: elektronik"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-5">
            <InputNumber
              name="discount"
              label="Diskon"
              suffix="%"
              placeholder="0"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <InputRupiah
              label="Min Price"
              name="min_price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <InputRupiah
              label="Max Price"
              name="max_price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputSelectSearch
              label="Status"
              options={dataStatus}
              value={selectedStatus}
              onChange={(val) => setSelectedStatus(val)}
              placeholder="Pilih status..."
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showModalCreate}
        onClose={() => setShowModalCreate(false)}
        title="Buat Kategori Baru"
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
            label="Name"
            name="name"
            placeholder="Masukkan nama kategori"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          />
          <InputText
            label="Slug"
            name="slug"
            placeholder="contoh: elektronik"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-5">
            <InputNumber
              name="discount"
              label="Diskon"
              suffix="%"
              placeholder="0"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <InputRupiah
              label="Min Price"
              name="min_price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <InputRupiah
              label="Max Price"
              name="max_price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputSelectSearch
              label="Status"
              options={dataStatus}
              value={selectedStatus}
              onChange={(val) => setSelectedStatus(val)}
              placeholder="Pilih status..."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
