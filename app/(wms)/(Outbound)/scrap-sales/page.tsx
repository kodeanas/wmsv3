"use client";

import { useState } from "react";
import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import { Download, Eye, ShoppingCart, Wallet } from "lucide-react";

type ScrapSalesRow = {
  code_document: string;
  buyer: string;
  bag: string;
  harga_asal: number;
  grand_total: number;
};

const formatRupiah = (value: number) =>
  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const stats = {
  buyerBelanja: 11,
  grandTotal: 6435000,
};

const scrapSalesRows: ScrapSalesRow[] = [
  {
    code_document: "SCR-SALE-001",
    buyer: "PT Recycle Sentosa",
    bag: "Bag Scrap Mix",
    harga_asal: 2150000,
    grand_total: 1990000,
  },
  {
    code_document: "SCR-SALE-002",
    buyer: "CV Besi Lama",
    bag: "Bag Scrap Besi",
    harga_asal: 2385000,
    grand_total: 2210000,
  },
  {
    code_document: "SCR-SALE-003",
    buyer: "UD Barang Sisa",
    bag: "Bag Scrap Tekstil",
    harga_asal: 2110000,
    grand_total: 1975000,
  },
];

export default function ScrapSalesPage() {
  const [selectedDetail, setSelectedDetail] = useState<ScrapSalesRow | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetail = (row: ScrapSalesRow) => {
    setSelectedDetail(row);
    setIsDetailModalOpen(true);
  };

  const handleExportBag = (row: ScrapSalesRow) => {
    const content = [
      "Detail Penjualan Scrap",
      `Code Document: ${row.code_document}`,
      `Buyer: ${row.buyer}`,
      `Bag: ${row.bag}`,
      `Harga Asal: ${formatRupiah(row.harga_asal)}`,
      `Grand Total: ${formatRupiah(row.grand_total)}`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `detail-bag-scrap-${row.code_document}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Penjualan Scrap</h2>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          {new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

            <StatsSectionWrapper title="Ringkasan">
<section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <CardKeyValueHorizontal
          title="Buyer Belanja"
          icon={<ShoppingCart className="h-5 w-5" />}
          items={[{ label: "Total Buyer", value: stats.buyerBelanja }]}
        />

        <CardKeyValueHorizontal
          title="Grand Total"
          icon={<Wallet className="h-5 w-5" />}
          items={[
            { label: "Total Penjualan", value: formatRupiah(stats.grandTotal) },
          ]}
        />
      </section>
      </StatsSectionWrapper>

      <section>
        <DataTable
          title="Data Penjualan Scrap"
          data={scrapSalesRows}
          exportConfig={{ show: true }}
          topButton={{ label: "Buat Penjualan", href: "/scrap-sales/form-sales" }}
          columns={[
            {
              key: "code_document",
              header: "Code Document",
              accessor: "code_document",
            },
            { key: "buyer", header: "Buyer", accessor: "buyer" },
            {
              key: "harga_asal",
              header: "Harga Asal",
              accessor: (row: any) => formatRupiah(row.harga_asal),
            },
            {
              key: "grand_total",
              header: "Grand Total",
              accessor: (row: any) => formatRupiah(row.grand_total),
            },
          ]}
          searchableKeys={["code_document", "buyer"]}
          actions={{
            customActions: [
              {
                label: "Detail",
                icon: <Eye size={18} />,
                color: "blue",
                onClick: (item) => handleOpenDetail(item),
              },
            ],
          }}
        />
      </section>

      <Modal
        isOpen={isDetailModalOpen && !!selectedDetail}
        onClose={() => setIsDetailModalOpen(false)}
        title="Detail Penjualan Scrap"
        size="md"
        footer={
          selectedDetail && (
            <>
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => handleExportBag(selectedDetail)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              >
                <Download className="h-4 w-4" />
                Export Bag
              </button>
            </>
          )
        }
      >
        {selectedDetail && (
          <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <p>Code Document: {selectedDetail.code_document}</p>
            <p>Buyer: {selectedDetail.buyer}</p>
            <p>Bag: {selectedDetail.bag}</p>
            <p>Harga Asal: {formatRupiah(selectedDetail.harga_asal)}</p>
            <p>Grand Total: {formatRupiah(selectedDetail.grand_total)}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
