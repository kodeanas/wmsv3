"use client";

import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import CardMatrix from "@/components/globals/cards/CardMatrix";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import Tabs from "@/components/globals/additionals/Tabs";
import { Activity, Eye, PackageSearch } from "lucide-react";
import { useState } from "react";

const formatRupiah = (value: number) =>
  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const saldoAwal = {
  itemAwal: 1200,
  hargaAsalAwal: 48500000,
  hargaGudangAwal: 51250000,
};

const saldoAkhirRealtime = {
  itemAkhir: 1348,
  hargaAsalAkhir: 53620000,
  hargaGudangAkhir: 56800000,
};

const bagData = [
  {
    code_bag: "BAG-001",
    total_item: 120,
    total_harga_gudang: 4850000,
    status: "open",
  },
  {
    code_bag: "BAG-002",
    total_item: 80,
    total_harga_gudang: 3275000,
    status: "close",
  },
  {
    code_bag: "BAG-003",
    total_item: 95,
    total_harga_gudang: 4125000,
    status: "lock",
  },
];

const scannedProductData = [
  {
    barcode: "WH-220011",
    name: "Premix Ayam 1 Kg",
    qty: 20,
    price: 75000,
    warehouse_price: 77000,
    sticker: "big",
  },
  {
    barcode: "WH-220012",
    name: "Premix Ayam 5 Kg",
    qty: 10,
    price: 210000,
    warehouse_price: 214000,
    sticker: "small",
  },
  {
    barcode: "WH-220013",
    name: "Premix Sapi 1 Kg",
    qty: 15,
    price: 82000,
    warehouse_price: 83500,
    sticker: "tiny",
  },
  {
    barcode: "WH-220014",
    name: "Premix Ikan 500 gr",
    qty: 28,
    price: 45000,
    warehouse_price: 47000,
    sticker: "small",
  },
];

const stickerMap: Record<string, { label: string; dotClass: string }> = {
  big: { label: "Big", dotClass: "bg-red-500" },
  small: { label: "Small", dotClass: "bg-amber-500" },
  tiny: { label: "Tiny", dotClass: "bg-emerald-500" },
};

export default function StagingStickerPage() {
  const [isBagModalOpen, setIsBagModalOpen] = useState(false);

  const matrixVerticalKeys = ["Big", "Small", "Tiny"];
  const matrixHorizontalKeys = ["Item", "Harga Asal", "Harga Gudang"];

  const matrixData = scannedProductData.reduce(
    (acc, item) => {
      const key = item.sticker.toLowerCase();
      if (!acc[key]) {
        acc[key] = { item: 0, hargaAsal: 0, hargaGudang: 0 };
      }
      acc[key].item += item.qty;
      acc[key].hargaAsal += item.price;
      acc[key].hargaGudang += item.warehouse_price;
      return acc;
    },
    {} as Record<
      string,
      { item: number; hargaAsal: number; hargaGudang: number }
    >,
  );

  const handleOpenBagModal = () => {
    setIsBagModalOpen(true);
  };

  const handleCloseBagModal = () => {
    setIsBagModalOpen(false);
  };

  const handleConfirmCreateBag = () => {
    setIsBagModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Staging Sticker</h2>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          {new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      <StatsSectionWrapper title="Ringkasan">
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <CardKeyValueHorizontal
            title="Saldo Awal"
            icon={<PackageSearch className="h-5 w-5" />}
            items={[
              { label: "Item Awal", value: saldoAwal.itemAwal },
              {
                label: "Harga Asal Awal",
                value: formatRupiah(saldoAwal.hargaAsalAwal),
              },
              {
                label: "Harga Gudang Awal",
                value: formatRupiah(saldoAwal.hargaGudangAwal),
              },
            ]}
          />

          <CardKeyValueHorizontal
            title="Saldo Akhir (Realtime)"
            icon={<Activity className="h-5 w-5" />}
            items={[
              { label: "Item Akhir", value: saldoAkhirRealtime.itemAkhir },
              {
                label: "Harga Asal Akhir",
                value: formatRupiah(saldoAkhirRealtime.hargaAsalAkhir),
              },
              {
                label: "Harga Gudang Akhir",
                value: formatRupiah(saldoAkhirRealtime.hargaGudangAkhir),
              },
            ]}
          />
        </section>
      </StatsSectionWrapper>

      <section>
        <CardMatrix
          title="Data Sticker"
          verticalKeys={matrixVerticalKeys}
          horizontalKeys={matrixHorizontalKeys}
          renderValue={(vKey, hKey) => {
            const data = matrixData[vKey.toLowerCase()] || {
              item: 0,
              hargaAsal: 0,
              hargaGudang: 0,
            };

            if (hKey === "Item") return data.item;
            if (hKey === "Harga Asal") return formatRupiah(data.hargaAsal);
            if (hKey === "Harga Gudang") return formatRupiah(data.hargaGudang);
            return "-";
          }}
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <Tabs
          align="center"
          items={[
            {
              label: "Bag",
              content: (
                <DataTable
                  title="Daftar Bag"
                  data={bagData}
                  columns={[
                    {
                      key: "code_bag",
                      header: "Code Bag",
                      accessor: "code_bag",
                    },
                    {
                      key: "total_item",
                      header: "Total Item",
                      accessor: "total_item",
                    },
                    {
                      key: "total_harga_gudang",
                      header: "Total Harga Gudang",
                      accessor: (item: any) =>
                        formatRupiah(item.total_harga_gudang),
                    },
                    {
                      key: "status",
                      header: "Status",
                      accessor: (item: any) => {
                        const colorMap: Record<string, string> = {
                          open: "bg-emerald-100 text-emerald-700",
                          close: "bg-amber-100 text-amber-700",
                          lock: "bg-red-100 text-red-700",
                        };
                        return (
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                              colorMap[item.status] ||
                              "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        );
                      },
                    },
                  ]}
                  searchableKeys={["code_bag", "status"]}
                  topButton={{
                    label: "Bag",
                    onClick: handleOpenBagModal,
                  }}
                  actions={{
                    customActions: [
                      {
                        label: "Detail",
                        icon: <Eye size={18} />,
                        color: "blue",
                        href: () => "/sticker-staging/detail-bag",
                      },
                    ],
                  }}
                  exportConfig={{ show: true }}
                />
              ),
            },
            {
              label: "Produk",
              content: (
                <DataTable
                  title="Produk Sudah Terscan"
                  data={scannedProductData}
                  exportConfig={{
                    show: true,
                  }}
                  columns={[
                    {
                      key: "barcode",
                      header: "Barcode",
                      accessor: "barcode",
                    },
                    { key: "name", header: "Nama", accessor: "name" },
                    { key: "qty", header: "Item", accessor: "qty" },
                    {
                      key: "price",
                      header: "Harga Asal",
                      accessor: (item: any) => formatRupiah(item.price),
                    },
                    {
                      key: "warehouse_price",
                      header: "Harga Gudang",
                      accessor: (item: any) =>
                        formatRupiah(item.warehouse_price),
                    },
                    {
                      key: "sticker",
                      header: "Sticker",
                      accessor: (item: any) => {
                        const cfg = stickerMap[item.sticker] || {
                          label: "-",
                          dotClass: "bg-slate-400",
                        };
                        return (
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${cfg.dotClass}`}
                            />
                            {cfg.label}
                          </span>
                        );
                      },
                    },
                  ]}
                  searchableKeys={["barcode", "name", "sticker"]}
                  actions={{
                    customActions: [
                      {
                        label: "Detail",
                        icon: <Eye size={18} />,
                        color: "blue",
                        href: () => "/sticker-staging/detail-produk",
                      },
                    ],
                  }}
                />
              ),
            },
          ]}
        />
      </section>

      <Modal
        isOpen={isBagModalOpen}
        onClose={handleCloseBagModal}
        title="Konfirmasi Pembuatan Bag"
        size="md"
        footer={
          <>
            <button
              type="button"
              onClick={handleCloseBagModal}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirmCreateBag}
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
            >
              Ya, saya setuju
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-600">
            Bag baru akan dibuat dari data staging sticker saat ini.
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            Lanjutkan jika Anda yakin ingin membuat Bag.
          </p>
        </div>
      </Modal>
    </div>
  );
}
