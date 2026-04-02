"use client";

import DataTable from "@/components/data-tables";
import {
  InfoDisplay,
  InputNumber,
  InputSelectSearch,
  InputText,
} from "@/components/globals/additionals/Inputs";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import {
  ArrowLeftSquare,
  ArrowRightSquare,
  Eye,
  User,
  UserPlus,
} from "lucide-react";
import React from "react";

const history = [
  {
    id: 1,
    class_before: "Gold",
    class_after: "Platinum",
    date: "2026-01-01",
    expired_on: "2023-02-01",
    reason: "Prestise upgrade karena pembelian besar",
  },
  {
    id: 2,
    class_before: "Silver",
    class_after: "Gold",
    date: "2025-12-01",
    expired_on: "2026-01-01",
    reason: "Pencapaian target transaksi",
  },
  {
    id: 3,
    class_before: "Silver",
    class_after: "Gold",
    date: "2025-11-01",
    expired_on: "2025-12-01",
    reason: "Upgrade dari program promosi",
  },
  {
    id: 4,
    class_before: "Silver",
    class_after: "Gold",
    date: "2025-10-01",
    expired_on: "2025-11-01",
    reason: "Upgrade atas permintaan pelanggan",
  },
];

const buyerSale = [
  {
    id: 1,
    code: "SL-001",
    date: "2026-01-01",
    total_items: 10,
    grand_total: 100000,
    format_grand_total: "Rp 100.000",
    class: "Gold",
  },
  {
    id: 2,
    code: "SL-002",
    date: "2026-01-15",
    total_items: 8,
    grand_total: 85000,
    format_grand_total: "Rp 85.000",
    class: "Gold",
  },
  {
    id: 3,
    code: "SL-003",
    date: "2026-02-05",
    total_items: 5,
    grand_total: 50000,
    format_grand_total: "Rp 50.000",
    class: "Silver",
  },
  {
    id: 4,
    code: "SL-004",
    date: "2026-02-20",
    total_items: 12,
    grand_total: 130000,
    format_grand_total: "Rp 130.000",
    class: "Platinum",
  },
  {
    id: 5,
    code: "SL-005",
    date: "2026-03-10",
    total_items: 3,
    grand_total: 33000,
    format_grand_total: "Rp 33.000",
    class: "Silver",
  },
];

export default function DetailBuyerPage() {
  // Modal Detail Histori
  const [showHistory, setShowHistory] = React.useState(false);
  const [classBefore, setClassBefore] = React.useState("");
  const [classAfter, setClassAfter] = React.useState("");
  const [date, setDate] = React.useState("");
  const [expiredOn, setExpiredOn] = React.useState("");
  const [reason, setReason] = React.useState("");

  const [showSaleDetail, setShowSaleDetail] = React.useState(false);
  const [saleCode, setSaleCode] = React.useState("");
  const [saleDate, setSaleDate] = React.useState("");
  const [saleTotalItems, setSaleTotalItems] = React.useState(0);
  const [saleGrandTotal, setSaleGrandTotal] = React.useState(0);
  const [saleClass, setSaleClass] = React.useState("");

  // Modal Edit Buyer
  const [showEditBuyer, setShowEditBuyer] = React.useState(false);
  const [editName, setEditName] = React.useState("Anas Syihabuddin");
  const [editEmail, setEditEmail] = React.useState("anas@example.com");
  const [editPhone, setEditPhone] = React.useState("081234567890");
  const [editClassId, setEditClassId] = React.useState("class-uuid-gold");

  const classOptions = [
    { label: "Gold", value: "class-uuid-gold" },
    { label: "Silver", value: "class-uuid-silver" },
    { label: "Platinum", value: "class-uuid-platinum" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-6">
        {/* Card Buyer */}
        <div className="">
          <CardKeyValueVertical
            title="Data Buyer"
            icon={<User className="w-6 h-6" />}
            items={[
              { label: "Nama", value: "Anas Syihabuddin" },
              { label: "Email", value: "anas@example.com" },
              { label: "No. Telepon", value: "081234567890" },
              { label: "Kelas", value: "Gold" },
              { label: "Tanggal Gabung", value: "2026-03-26" },
            ]}
            footerActions={[
              {
                label: "Edit",
                onClick: () => setShowEditBuyer(true),
                className: "bg-blue-500 text-white cursor-pointer",
              },
            ]}
          />
        </div>

        {/* Table Buyer */}
        <div className=" col-span-2">
          <DataTable
            title="History Kelas Buyer"
            data={history}
            pageSize={4}
            showSearch={false}
            queryParamPrefix="history"
            columns={[
              {
                key: "cb",
                header: "Class Before",
                accessor: (item) => (
                  <span className="font-bold ">{item.class_before}</span>
                ),
              },
              {
                key: "ca",
                header: "Class After",
                accessor: (item) => (
                  <span className="font-bold ">{item.class_after}</span>
                ),
              },
              {
                key: "date",
                header: "Tanggal Berubah",
                accessor: (item) => item.date,
              },
              {
                key: "expired_on",
                header: "Tanggal Kadaluarsa",
                accessor: (item) => item.expired_on,
              },
            ]}
            dateFilter={{
              show: true,
              accessor: "date",
            }}
            exportConfig={{
              show: true,
              onExport: (data) => alert(`Exporting ${data.length} data...`),
            }}
            // 7. Konfigurasi Aksi di setiap baris (Edit/Hapus/Detail)
            actions={{
              customActions: [
                {
                  label: "Detail",
                  icon: <Eye className="w-6 h-6" />,
                  color: "blue",
                  onClick: (item) => {
                    setShowHistory(true);

                    setClassBefore(item.class_before);
                    setClassAfter(item.class_after);
                    setDate(item.date);
                    setExpiredOn(item.expired_on);
                    setReason(item.reason || "");
                  },
                },
              ],
            }}
          />
        </div>
      </div>
      <div className="w-full">
        {/* Table list sales per buyer */}
        <DataTable
          title="Sales Per Buyer"
          data={buyerSale}
          pageSize={5}
          showSearch={true}
          searchableKeys={["code"]}
          columns={[
            {
              key: "code",
              header: "Code",
              accessor: (item) => item.code,
            },
            {
              key: "date",
              header: "Tanggal",
              accessor: (item) => item.date,
            },
            {
              key: "total_items",
              header: "Total Item",
              accessor: (item) => item.total_items,
            },
            {
              key: "grand_total",
              header: "Grand Total",
              accessor: (item) => item.format_grand_total,
            },
            {
              key: "class",
              header: "Class",
              accessor: (item) => item.class,
            },
          ]}
          queryParamPrefix="sales"
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
                icon: <Eye className="w-6 h-6" />,
                color: "blue",
                onClick: (item) => {
                  setShowSaleDetail(true);
                  setSaleCode(item.code);
                  setSaleDate(item.date);
                  setSaleTotalItems(item.total_items);
                  setSaleGrandTotal(item.grand_total);
                  setSaleClass(item.class);
                },
              },
              {
                label: "Go To",
                icon: <ArrowRightSquare className="w-6 h-6" />,
                color: "emerald",
                onClick: (item) => console.log("Go To clicked", item),
              },
            ],
          }}
        />
      </div>

      {/* Modal History */}
      <Modal
        title="Detail History"
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        footer={[
          <Button
            key="closeHistory"
            label="Kembali"
            className="hover:cursor-pointer"
            variant="outline"
            onClick={() => setShowHistory(false)}
          />,
        ]}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <InfoDisplay label="Kelas Sebelum" value={classBefore} />
            <InfoDisplay label="Kelas Sesudah" value={classAfter} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InfoDisplay label="Tanggal Berubah" value={date} />
            <InfoDisplay label="Tanggal Kadaluarsa" value={expiredOn} />
          </div>
          <InfoDisplay label="Penyebab Upgrade/Downgrade" value={reason} />
        </div>
      </Modal>

      {/* Modal Edit Buyer */}
      <Modal
        title="Edit Data Buyer"
        isOpen={showEditBuyer}
        onClose={() => setShowEditBuyer(false)}
        footer={
          <>
            <Button
              label="Batal"
              variant="outline"
              onClick={() => setShowEditBuyer(false)}
            />
            <Button label="Simpan Perubahan" onClick={() => alert("Saved!")} />
          </>
        }
      >
        <div className="space-y-6">
          <InputText
            label="Nama Buyer"
            placeholder="Masukkan Nama Buyer"
            name="name"
            defaultValue={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <InputText
            label="Email"
            placeholder="Masukkan Email (opsional)"
            name="email"
            defaultValue={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <InputNumber
            label="No. Telepon"
            placeholder="Masukkan Nomor Telepon (opsional)"
            name="phone"
            defaultValue={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />
          <InputSelectSearch
            label="Kelas"
            placeholder="Pilih Kelas"
            options={classOptions}
            value={editClassId}
            onChange={(val) => setEditClassId(val)}
          />
        </div>
      </Modal>

      {/* Modal Sale Detail */}
      <Modal
        title="Detail Sale"
        isOpen={showSaleDetail}
        onClose={() => setShowSaleDetail(false)}
        footer={[
          <Button
            key="closeSale"
            label="Tutup"
            className="hover:cursor-pointer"
            variant="outline"
            onClick={() => setShowSaleDetail(false)}
          />,
        ]}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <InfoDisplay label="Kode Sale" value={saleCode} />
            <InfoDisplay label="Tanggal" value={saleDate} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InfoDisplay label="Total Item" value={String(saleTotalItems)} />
            <InfoDisplay
              label="Grand Total"
              value={`Rp ${saleGrandTotal.toLocaleString()}`}
            />
          </div>
          <InfoDisplay label="Class" value={saleClass} />
        </div>
      </Modal>
    </div>
  );
}
