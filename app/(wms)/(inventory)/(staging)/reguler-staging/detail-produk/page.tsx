"use client";

import { Printer, Edit, Eye, ChevronDown, Search, Check } from "lucide-react";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import Tabs from "@/components/globals/additionals/Tabs";
import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import {
  InfoDisplay,
  InputRupiah,
} from "@/components/globals/additionals/Inputs";
import BarcodeModal from "@/components/globals/additionals/BarcodeModal";
import { useState } from "react";
import Button from "@/components/globals/buttons/ButtonPrimary";

const fileInfo = {
  code: "STG-001",
  name: "staging-produk-01.csv",
  lokasi: "staging",
  is_out: false,
};

const barangAsal = {
  barcode: "899100110011",
  nama: "Premix Ayam 1 Kg",
  qty: 20,
  harga: 75000,
};

const barangGudang = {
  barcode: "WH-220011",
  nama: "Premix Ayam 1 Kg",
  qty: 20,
  harga: 77000,
};

const historyData = [
  {
    attribut: "Harga Gudang",
    data_awal: "Rp 75.000",
    data_akhir: "Rp 77.000",
    tanggal_berubah: "2026-03-25",
    user: "admin",
  },
  {
    attribut: "Harga Asal",
    data_awal: "Rp 73.000",
    data_akhir: "Rp 75.000",
    tanggal_berubah: "2026-03-20",
    user: "supervisor",
  },
];

const mockCategories = [
  { id: "feed", name: "Feed", discount: 0 },
  { id: "supplement", name: "Supplement", discount: 5 },
  { id: "vitamin", name: "Vitamin", discount: 10 },
  { id: "medicine", name: "Medicine", discount: 15 },
];

type HistoryItem = (typeof historyData)[number];

function SelectSearchInline({
  label,
  options,
  value,
  onChange,
  placeholder = "Pilih data...",
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl border p-3 text-sm transition-all ${
          isOpen
            ? "border-blue-400 ring-4 ring-blue-50"
            : "border-slate-200 bg-white hover:border-slate-300"
        }`}
      >
        <span
          className={
            selectedLabel ? "font-medium text-slate-700" : "text-slate-400"
          }
        >
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 p-3">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kategori..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>

          <div className="max-h-48 overflow-y-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                    opt.value === value
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{opt.label}</span>
                  {opt.value === value && <Check size={14} />}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-xs italic text-slate-400">
                Data tidak ditemukan
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DetailProdukPage() {
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(
    null,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<{
    hargaAsal: number;
    selectedCategory: string;
    hargaGudang: number;
    qty: number;
  }>({
    hargaAsal: barangAsal.harga,
    selectedCategory: "feed",
    hargaGudang: barangGudang.harga,
    qty: barangAsal.qty,
  });

  const calculateWarehousePrice = (
    basePrice: number,
    discountPercent: number,
  ) => {
    return Math.round(basePrice * (1 + discountPercent / 100));
  };

  const handlePrintBarcode = () => {
    setIsBarcodeModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleHargaAsalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(e.target.value) || 0;
    const selectedCat = mockCategories.find(
      (cat) => cat.id === editFormData.selectedCategory,
    );
    const discount = selectedCat?.discount || 0;
    const newWarehousePrice = calculateWarehousePrice(newPrice, discount);

    setEditFormData((prev) => ({
      ...prev,
      hargaAsal: newPrice,
      hargaGudang: newWarehousePrice,
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    const selectedCat = mockCategories.find((cat) => cat.id === categoryId);
    const discount = selectedCat?.discount || 0;
    const newWarehousePrice = calculateWarehousePrice(
      editFormData.hargaAsal,
      discount,
    );

    setEditFormData((prev) => ({
      ...prev,
      selectedCategory: categoryId,
      hargaGudang: newWarehousePrice,
    }));
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = parseInt(e.target.value) || 0;
    setEditFormData((prev) => ({
      ...prev,
      qty: newQty,
    }));
  };

  const handleSaveEdit = () => {
    console.log("Save edit:", editFormData);
    setIsEditModalOpen(false);
  };

  const showCategorySelect = editFormData.hargaAsal >= 100000;
  const activeCategory =
    mockCategories.find((cat) => cat.id === editFormData.selectedCategory) ||
    mockCategories[0];

  return (
    <div className="space-y-6">
      {/* Section Info File */}
      <div className="flex items-center justify-between divide-x divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-1 divide-x divide-slate-100">
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Kode File
            </p>
            <p className="mt-0.5 font-mono text-sm font-semibold text-slate-700">
              {fileInfo.code}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Nama File
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-700">
              {fileInfo.name}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Lokasi
            </p>
            <div className="mt-1">
              <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                {fileInfo.lokasi}
              </span>
            </div>
          </div>
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Is Out
            </p>
            <div className="mt-1">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
                  fileInfo.is_out
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {String(fileInfo.is_out)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-5 py-4">
          <Button
            label="Print Barcode"
            onClick={handlePrintBarcode}
            icon={<Printer size={16} />}
            variant="outline"
            size="sm"
          />
          <Button
            label="Edit"
            onClick={handleEdit}
            icon={<Edit size={16} />}
            variant="warning"
            size="sm"
          />
        </div>
      </div>

      {/* Info Produk */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <CardKeyValueHorizontal
          title="Data Barang Asal"
          items={[
            { label: "Barcode", value: barangAsal.barcode },
            { label: "Nama", value: barangAsal.nama },
            { label: "Qty", value: barangAsal.qty },
            {
              label: "Harga",
              value: `Rp ${barangAsal.harga.toLocaleString("id-ID")}`,
            },
          ]}
        />
        <CardKeyValueHorizontal
          title="Data Barang Gudang"
          items={[
            { label: "Barcode", value: barangGudang.barcode },
            { label: "Nama", value: barangGudang.nama },
            { label: "Qty", value: barangGudang.qty },
            {
              label: "Harga",
              value: `Rp ${barangGudang.harga.toLocaleString("id-ID")}`,
            },
          ]}
        />
      </div>
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/30 p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg border border-slate-100 bg-white p-2.5 shadow-sm">
              <svg
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Informasi Barang Reguler
              </h3>
              <p className="text-xs text-slate-500">Item di atas Rp 100.000</p>
            </div>
          </div>

          <div className="flex items-center gap-6 pr-2">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Kategori Aktif
              </span>
              <span className="text-sm font-extrabold uppercase text-blue-600">
                {activeCategory.name}
              </span>
            </div>

            <div className="h-8 w-px bg-slate-200" />

            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Diskon
              </span>
              <span className="text-sm font-extrabold text-slate-700">
                {activeCategory.discount}%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <Tabs
          align="center"
          items={[
            {
              label: "History",
              content: (
                <DataTable
                  title="History Perubahan"
                  queryParamPrefix="history"
                  data={historyData}
                  columns={[
                    {
                      key: "attribut",
                      header: "Attribut",
                      accessor: "attribut",
                    },
                    {
                      key: "data_awal",
                      header: "Data Awal",
                      accessor: "data_awal",
                    },
                    {
                      key: "data_akhir",
                      header: "Data Akhir",
                      accessor: "data_akhir",
                    },
                    {
                      key: "tanggal_berubah",
                      header: "Tanggal Berubah",
                      accessor: "tanggal_berubah",
                    },
                    { key: "user", header: "User", accessor: "user" },
                  ]}
                  searchableKeys={["attribut", "user"]}
                  actions={{
                    customActions: [
                      {
                        label: "Detail",
                        icon: <Eye size={18} />,
                        color: "blue",
                        onClick: (item) => setSelectedHistory(item),
                      },
                    ],
                  }}
                />
              ),
            },
            {
              label: "Bundling Produk",
              content: (
                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                  Bukan Produk Bundling
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Barcode Modal */}
      <BarcodeModal
        isOpen={isBarcodeModalOpen}
        onClose={() => setIsBarcodeModalOpen(false)}
        barcode={barangGudang.barcode}
        categoryName={
          mockCategories.find((c) => c.id === editFormData.selectedCategory)
            ?.name ?? "-"
        }
        discount={
          mockCategories.find((c) => c.id === editFormData.selectedCategory)
            ?.discount ?? 0
        }
        namaBarang={barangAsal.nama}
        hargaRetail={barangAsal.harga}
        hargaDiskon={barangGudang.harga}
      />

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Edit Harga Produk"
        size="md"
        footer={
          <>
            <Button
              label="Batal"
              onClick={handleCloseEditModal}
              variant="outline"
              size="sm"
            />
            <Button
              label="Simpan"
              onClick={handleSaveEdit}
              variant="success"
              size="sm"
            />
          </>
        }
      >
        <div className="space-y-4">
          {/* Harga Asal Input + Harga Gudang Display + Qty Input */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputRupiah
              label="Harga Asal"
              name="hargaAsal"
              value={editFormData.hargaAsal}
              onChange={handleHargaAsalChange}
            />
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Harga Gudang (Kalkulasi)
              </label>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                Rp {editFormData.hargaGudang.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Qty
            </label>
            <input
              type="number"
              value={editFormData.qty}
              onChange={handleQtyChange}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* Kategori Select - Conditional Render */}
          {showCategorySelect && (
            <SelectSearchInline
              label="Kategori"
              options={mockCategories.map((cat) => ({
                label: `${cat.name} (${cat.discount}% discount)`,
                value: cat.id,
              }))}
              value={editFormData.selectedCategory}
              onChange={handleCategoryChange}
              placeholder="Pilih kategori..."
            />
          )}
        </div>
      </Modal>

      {/* History Modal */}
      <Modal
        isOpen={Boolean(selectedHistory)}
        onClose={() => setSelectedHistory(null)}
        title="Detail History"
        size="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setSelectedHistory(null)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
          </>
        }
      >
        {selectedHistory && (
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-2 md:gap-x-6">
            <InfoDisplay label="Attribut" value={selectedHistory.attribut} />
            <InfoDisplay label="User" value={selectedHistory.user} />
            <InfoDisplay label="Data Awal" value={selectedHistory.data_awal} />
            <InfoDisplay
              label="Data Akhir"
              value={selectedHistory.data_akhir}
            />
            <InfoDisplay
              label="Tanggal Berubah"
              value={selectedHistory.tanggal_berubah}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
