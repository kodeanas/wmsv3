"use client";

import DataTable from "@/components/data-tables";
import RadioCardGroup from "@/components/globals/additionals/CategoryRadio";
import {
  InfoDisplay,
  InputRupiah,
  InputSelect,
  InputSelectSearch,
  InputText,
  InputTextArea,
} from "@/components/globals/additionals/Inputs";
import Modal from "@/components/globals/additionals/Modal";
import QualityTabs from "@/components/globals/additionals/QualtiyTabs";
import ScannerCard from "@/components/globals/additionals/ScannerCard";
import SelectedCategoryInfo from "@/components/globals/additionals/SelectedCategoryInfo";
import Tabs from "@/components/globals/additionals/Tabs";
import Button from "@/components/globals/buttons/ButtonPrimary";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import CardMatrix from "@/components/globals/cards/CardMatrix";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import {
  Layers,
  MapPin,
  Package,
  PackagePlus,
  Printer,
  RefreshCw,
  Search,
  User,
} from "lucide-react";
import React, { useState } from "react";

// Data barang
const dataBarang = [
  {
    id: 1,
    barcode: "LQD-01",
    nama: "Liquid Mango Ice",
    kategori: "Liquid",
    stok: 150,
    tgl_masuk: "2026-03-20",
  },
  {
    id: 2,
    barcode: "LQD-02",
    nama: "Liquid Strawberry",
    kategori: "Liquid",
    stok: 5,
    tgl_masuk: "2026-03-21",
  },
];

export default function Dashboard() {
  // Select Category
  const [selectedCategory, setSelectedCategory] = useState("elektronik");
  const categories = [
    {
      id: "elektronik",
      title: "Elektronik",
      subTitle: "Category",
      valueLabel: "Max Limit",
      valueText: "Rp 300.000",
      percentage: "40%",
    },
    {
      id: "otomotif",
      title: "Otomotif",
      subTitle: "Category",
      valueLabel: "Max Limit",
      valueText: "Rp 300.000",
      percentage: "50%",
    },
    {
      id: "fmgc",
      title: "FMGC",
      subTitle: "Category",
      valueLabel: "Max Limit",
      valueText: "Rp 300.000",
      percentage: "60%",
    },
    // ... tambah data lain sesukamu
  ];
  // CARA DINAMIS: Cari data lengkap kategori yang sedang dipilih
  const activeData = categories.find((cat) => cat.id === selectedCategory);

  // Quality Tabs
  const [formData, setFormData] = useState({
    namaBarang: "",
    qualityStatus: "", // Ini yang bakal nampung 'good', 'damaged', dll
    qualityLabel: "",
    detailKondisi: "",
  });
  const handleQualityChange = (id: string, label: string) => {
    setFormData((prev) => ({
      ...prev,
      qualityStatus: id,
      qualityLabel: label,
    }));
  };

  const tabs = [
    {
      id: "good",
      label: "Good",
      content: (
        <div className="p-4 text-slate-500 bg-white rounded-xl border border-dashed border-slate-300 text-center">
          <RadioCardGroup
            options={categories}
            selectedValue={selectedCategory}
            onChange={(id) => setSelectedCategory(id as string)}
          />

          {selectedCategory && (
            <div className="mt-8">
              <SelectedCategoryInfo
                // Judul jadi dinamis (Barang Elektronik / Kategori, dst)
                title={`Barang ${activeData?.title ?? "-"} / Kategori`}
                // Deskripsi bisa kamu ambil dari valueText atau field lain
                description={`Limit transaksi ${activeData?.valueText ?? "-"}`}
                // Nama Kategori otomatis update
                categoryName={activeData?.title ?? "-"}
                // Diskon kita ambil dari field percentage yang ada di data kamu
                discount={activeData?.percentage ?? "-"}
              />
            </div>
          )}
        </div>
      ),
    },
    {
      id: "damaged",
      label: "Damaged",
      content: (
        <InputTextArea
          label="Penjelasan Kerusakan"
          name="detail_damage"
          placeholder="Jelaskan bagian mana yang rusak..."
        />
      ),
    },
    {
      id: "abnormal",
      label: "Abnormal",
      content: (
        <InputTextArea
          label="Catatan Kejanggalan"
          name="note_abnormal"
          placeholder="Misal: Segel terbuka tapi isi aman..."
        />
      ),
    },
    {
      id: "non",
      label: "Non-Sellable",
      content: (
        <p className="text-sm font-medium text-red-400 p-4 bg-red-50 rounded-xl">
          Barang ini akan otomatis masuk ke karantina.
        </p>
      ),
    },
  ];

  // Cara scan
  const handleResult = (val: string) => {
    console.log("Barcode yang didapat:", val);
    // Di sini kamu bisa hit API buat update stok
  };

  // Select
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const suppliers = [
    { label: "PT. Maju Mundur Vape", value: "SUP-01" },
    { label: "CV. Liquid Sejahtera", value: "SUP-02" },
    { label: "Distributor Vapeindo", value: "SUP-03" },
    { label: "Gudang Coil Jakarta", value: "SUP-04" },
  ];

  // Set Modal
  const [showModal, setShowModal] = React.useState(false);
  const [harga, setHarga] = React.useState("");

  // CARD MATTRIX
  const warna = ["Hitam", "Putih", "Navy"];
  const ukuran = ["S", "M", "L", "XL"];

  // Dummy data logic
  const getStock = (v: string, h: string) => {
    const dummyData: Record<string, Record<string, number>> = {
      Hitam: { S: 10, M: 20, L: 37, XL: 5 },
      Putih: { S: 15, M: 25, L: 30, XL: 10 },
    };

    return dummyData[v]?.[h] ?? 0; // Balikin 0 kalau ga ada
  };

  //   TABS
  const tabData = [
    {
      label: "Monitoring Stok",
      content: (
        <DataTable
          data={dataBarang}
          // 2. Tentukan field mana saja yang bisa dicari (Search)
          searchableKeys={["nama", "barcode"]}
          // 3. Susun kolom table
          columns={[
            { key: "bc", header: "Barcode", accessor: "barcode" },
            { key: "nm", header: "Nama Barang", accessor: "nama" },
            {
              key: "kt",
              header: "Kategori",
              accessor: (item) => (
                <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-[11px] font-bold uppercase">
                  {item.kategori}
                </span>
              ),
            },
            {
              key: "st",
              header: "Stok",
              accessor: (item) => (
                <span
                  className={`font-bold ${item.stok < 10 ? "text-red-500" : "text-slate-600"}`}
                >
                  {item.stok} Pcs
                </span>
              ),
            },
            { key: "tm", header: "Tgl Masuk", accessor: "tgl_masuk" },
          ]}
          // 4. Konfigurasi Filter Dropdown
          filters={[
            {
              label: "Kategori",
              accessor: "kategori",
              options: [
                { label: "Liquid", value: "Liquid" },
                { label: "Device", value: "Device" },
                { label: "Aksesoris", value: "Aksesoris" },
              ],
              show: true,
            },
          ]}
          // 5. Konfigurasi Filter Tanggal
          dateFilter={{
            show: true,
            accessor: "tgl_masuk",
          }}
          // 6. Tombol Aksi di Header (Tambah/Export)
          topButton={{
            label: "Tambah Barang",
            href: "/inventory/add",
            icon: <PackagePlus size={18} />,
            show: true,
          }}
          exportConfig={{
            show: true,
            onExport: (data) => alert(`Exporting ${data.length} data...`),
          }}
          // 7. Konfigurasi Aksi di setiap baris (Edit/Hapus/Detail)
          actions={{
            customActions: [
              {
                label: "Cetak Label",
                icon: <Printer size={18} />,
                color: "blue",
                onClick: () => setShowModal(true),
                show: true,
              },
              {
                label: "Update Status",
                icon: <Search size={18} />,
                color: "emerald",
                href: (item) => `/wms/barang/status/${item.id}`,
                show: true,
              },
            ],
          }}
        />
      ),
    },
    {
      label: "Info Lokasi",
      content: (
        <div className="p-4 text-slate-500 bg-white rounded-xl border border-dashed border-slate-300 text-center">
          Belum ada aktivitas.
        </div>
      ),
    },
    {
      label: "Log Aktivitas",
      content: (
        <div className="p-4 text-slate-500 bg-white rounded-xl border border-dashed border-slate-300 text-center">
          Belum ada aktivitas.
        </div>
      ),
    },
  ];
  return (
    <div className="space-y-6">
      <StatsSectionWrapper title="Ringkasan">
        <div className="space-y-6">
      {/* Grid Wrapper - items-stretch adalah kuncinya */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">

        <CardKeyValueHorizontal
          title="Info Gudang"
          icon={<Package size={20} />}
          items={[
            { label: "Barang Awal", value: "10 Ton" },
            { label: "Harga Gudang Awal", value: "Rp 2.000.000" },
            { label: "Harga Asal Awal", value: "Rp 10.000.000" },
          ]}
        />

        {/* Card 2: Data Banyak (Ini yang nentuin tinggi baris) */}
        <CardKeyValueHorizontal
          title="Detail Lokasi"
          icon={<MapPin size={20} />}
          action={{
            label: "Edit",
            href: "/inventory/edit/1",
            // Default warna biru
          }}
          items={[
            { label: "Barang Akhir", value: "10 Ton" },
            { label: "Harga Gudang Akhir", value: "Rp 2.000.000" },
            { label: "Harga Asal Akhir", value: "Rp 10.000.000" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
        {/* Card 1: Data Sedikit */}
        {/* <CardKeyValueVertical
          title="Info Gudang"
          icon={<Package size={20} />}
          items={[
            { label: "Kode", value: "WH-001" },
            { label: "Nama", value: "Gudang Pusat Jakarta" },
          ]}
        /> */}

        {/* Card 2: Data Banyak (Ini yang nentuin tinggi baris) */}
        {/* <CardKeyValueVertical
          title="Detail Lokasi"
          icon={<MapPin size={20} />}
          items={[
            { label: "Alamat", value: "Jl. Industri No. 12, Cikarang" },
            { label: "Kota", value: "Bekasi" },
            { label: "Provinsi", value: "Jawa Barat" },
            { label: "PIC", value: "Bapak Budi Santoso" },
            { label: "Kontak", value: "0812-3456-7890" },
          ]}
        /> */}

        <CardKeyValueVertical
          title="Info Gudang"
          icon={<Package size={20} />}
          items={[
            { label: "Barang Awal", value: "10 Ton" },
            { label: "Harga Gudang Awal", value: "Rp 2.000.000" },
            { label: "Harga Asal Awal", value: "Rp 10.000.000" },
          ]}
        />

        {/* Card 2: Data Banyak (Ini yang nentuin tinggi baris) */}
        <CardKeyValueVertical
          title="Detail Lokasi"
          icon={<MapPin size={20} />}
          items={[
            { label: "Barang Akhir", value: "10 Ton" },
            { label: "Harga Gudang Akhir", value: "Rp 2.000.000" },
            { label: "Harga Asal Akhir", value: "Rp 10.000.000" },
          ]}
        />
      </div>

      {/* Card Matrix */}
      <div className="">
        <CardMatrix
          icon={<Layers size={18} />}
          verticalKeys={warna}
          horizontalKeys={ukuran}
          onActionClick={() => console.log("Refresh Data")}
          renderValue={(v, h) => <span>{getStock(v, h)}</span>}
        />
      </div>

        </div>
      </StatsSectionWrapper>

      {/* Scanner */}
      <div className="w-full">
        <ScannerCard title="Scan Barang Masuk" onScanComplete={handleResult} />
      </div>

      {/* Tab Content */}
      <div className="">
        {/* Tinggal panggil Tabs-nya */}
        <Tabs items={tabData} align="center" />
      </div>

      {/* Quality Control */}
      {/* Komponen Quality Tabs */}
      <QualityTabs items={tabs} onChange={handleQualityChange} />

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detail & Update Barang"
        footer={
          <>
            <Button
              label="Batal"
              variant="outline"
              onClick={() => setShowModal(false)}
            />
            <Button label="Simpan Perubahan" onClick={() => alert("Saved!")} />
          </>
        }
      >
        <div className="space-y-6">
          {/* Section Info (Detail Saja) */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl">
            <InfoDisplay label="Barcode" value="LQD-99021" />
            <InfoDisplay label="Status" value="Tersedia" />
          </div>

          {/* Section Form (Input) */}
          <div className="space-y-4">
            <InputText
              label="Nama Barang"
              name="nama"
              placeholder="Masukkan nama..."
            />

            <InputSelectSearch
              label="Pilih Supplier"
              options={suppliers}
              value={selectedSupplier}
              onChange={(val) => setSelectedSupplier(val)}
              placeholder="Cari nama supplier..."
            />

            <InputRupiah
              label="Harga Beli"
              name="harga"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
