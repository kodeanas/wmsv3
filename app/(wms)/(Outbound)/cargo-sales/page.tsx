"use client";

import { useState } from "react";
import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import { Download, Eye, ShoppingCart, Wallet } from "lucide-react";

type CargoSalesRow = {
  code_document: string;
  buyer: string;
  cargo: string;
  harga_asal: number;
  grand_total: number;
};

const formatRupiah = (value: number) =>
  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const stats = {
  buyerBelanja: 19,
  grandTotal: 12450000,
};

const cargoSalesRows: CargoSalesRow[] = [
  {
    code_document: "CRG-SALE-001",
    buyer: "PT Cargo Makmur",
    cargo: "Cargo Mix Grade A",
    harga_asal: 6850000,
    grand_total: 6550000,
  },
  {
    code_document: "CRG-SALE-002",
    buyer: "CV Angkut Jaya",
    cargo: "Cargo Mix Grade B",
    harga_asal: 4290000,
    grand_total: 4100000,
  },
  {
    code_document: "CRG-SALE-003",
    buyer: "UD Lintas Nusantara",
    cargo: "Cargo Fast Move",
    harga_asal: 1980000,
    grand_total: 1800000,
  },
];

export default function CargoSalesPage() {
  const [selectedDetail, setSelectedDetail] = useState<CargoSalesRow | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetail = (row: CargoSalesRow) => {
    setSelectedDetail(row);
    setIsDetailModalOpen(true);
  };

  const handleExportCargo = (row: CargoSalesRow) => {
    const content = [
      "Detail Penjualan Cargo",
      `Code Document: ${row.code_document}`,
      `Buyer: ${row.buyer}`,
      `Cargo: ${row.cargo}`,
      `Harga Asal: ${formatRupiah(row.harga_asal)}`,
      `Grand Total: ${formatRupiah(row.grand_total)}`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `detail-cargo-${row.code_document}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Penjualan Cargo</h2>
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
          title="Data Penjualan Cargo"
          data={cargoSalesRows}
          exportConfig={{ show: true }}
          topButton={{ label: "Buat Penjualan", href: "/cargo-sales/form-sales" }}
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
        title="Detail Penjualan Cargo"
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
                onClick={() => handleExportCargo(selectedDetail)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              >
                <Download className="h-4 w-4" />
                Export Cargo
              </button>
            </>
          )
        }
      >
        {selectedDetail && (
          <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <p>Code Document: {selectedDetail.code_document}</p>
            <p>Buyer: {selectedDetail.buyer}</p>
            <p>Cargo: {selectedDetail.cargo}</p>
            <p>Harga Asal: {formatRupiah(selectedDetail.harga_asal)}</p>
            <p>Grand Total: {formatRupiah(selectedDetail.grand_total)}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
