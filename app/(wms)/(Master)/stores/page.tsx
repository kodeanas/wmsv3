"use client";

import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import DataTable from "@/components/data-tables";
import Tabs from "@/components/globals/additionals/Tabs";
import Modal from "@/components/globals/additionals/Modal";
import Button from "@/components/globals/buttons/ButtonPrimary";
import { InputSelectSearch, InputText, InputTextArea } from "@/components/globals/additionals/Inputs";
import { Building2, Eye, Users, Settings, PackagePlus } from "lucide-react";
import React from "react";

// Data Toko
const tokoData = [
  {
    id: 1,
    name: "Toko Pusat Jakarta",
    phone: "081234567890",
    total_items: 150,
    total_price_warehouse: 50000000,
    status: "Aktif",
  },
  {
    id: 2,
    name: "Toko Surabaya",
    phone: "082345678901",
    total_items: 120,
    total_price_warehouse: 45000000,
    status: "Aktif",
  },
  {
    id: 3,
    name: "Toko Bandung",
    phone: "083456789012",
    total_items: 80,
    total_price_warehouse: 30000000,
    status: "Tidak Aktif",
  },
];

// Data Crew
const crewData = [
  {
    id: 1,
    name: "Ahmad Rijali",
    phone: "081234567890",
    total_sale: 45,
    is_cashier: true,
    status: "Aktif",
  },
  {
    id: 2,
    name: "Budi Santoso",
    phone: "082345678901",
    total_sale: 32,
    is_cashier: false,
    status: "Aktif",
  },
  {
    id: 3,
    name: "Citra Dewi",
    phone: "083456789012",
    total_sale: 28,
    is_cashier: true,
    status: "Tidak Aktif",
  },
  {
    id: 4,
    name: "Doni Hermawan",
    phone: "084567890123",
    total_sale: 51,
    is_cashier: false,
    status: "Aktif",
  },
];

export default function StoresPage() {
  const [activeTab, setActiveTab] = React.useState("toko");
  const [showStatusModal, setShowStatusModal] = React.useState(false);
  const [selectedTokoName, setSelectedTokoName] = React.useState("");
  const [selectedTokoStatus, setSelectedTokoStatus] = React.useState("");
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [createName, setCreateName] = React.useState("");
  const [createPhone, setCreatePhone] = React.useState("");
  const [createAddress, setCreateAddress] = React.useState("");
  const [showCreateCrewModal, setShowCreateCrewModal] = React.useState(false);
  const [createCrewName, setCreateCrewName] = React.useState("");
  const [createCrewPhone, setCreateCrewPhone] = React.useState("");
  const [showCrewSettingModal, setShowCrewSettingModal] = React.useState(false);
  const [selectedCrewName, setSelectedCrewName] = React.useState("");
  const [selectedCrewStatus, setSelectedCrewStatus] = React.useState("");
  const [selectedCrewIsCashier, setSelectedCrewIsCashier] = React.useState(false);

  const dataStatus = [
    { label: "Aktif", value: "Aktif" },
    { label: "Tidak Aktif", value: "Tidak Aktif" },
  ];

  const dataCashier = [
    { label: "Bisa", value: "true" },
    { label: "Tidak bisa", value: "false" },
  ];

  const handleOpenCreateModal = () => {
    setCreateName("");
    setCreatePhone("");
    setCreateAddress("");
    setShowCreateModal(true);
  };

  const handleOpenCreateCrewModal = () => {
    setCreateCrewName("");
    setCreateCrewPhone("");
    setShowCreateCrewModal(true);
  };

  const tabs = [
    {
      id: "toko",
      label: "Toko",
      content: (
        <DataTable
          data={tokoData}
          searchableKeys={["name"]}
          columns={[
            {
              key: "name",
              header: "Nama Toko",
              accessor: (item) => (
                <span className="font-bold">{item.name}</span>
              ),
            },
            {
              key: "phone",
              header: "No Telp",
              accessor: (item) => item.phone,
            },
            {
              key: "total_items",
              header: "Total Barang",
              accessor: (item) => (
                <span className="font-bold">{item.total_items} Pcs</span>
              ),
            },
            {
              key: "total_price_warehouse",
              header: "Total Harga Gudang",
              accessor: (item) => (
                <span className="font-bold">
                  Rp {item.total_price_warehouse.toLocaleString()}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              accessor: (item) => (
                <span
                  className={`font-bold ${
                    item.status === "Aktif" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.status}
                </span>
              ),
            },
          ]}
          filters={[
            {
              label: "Status",
              accessor: "status",
              options: [
                { label: "Aktif", value: "Aktif" },
                { label: "Tidak Aktif", value: "Tidak Aktif" },
              ],
              show: true,
            },
          ]}
          exportConfig={{
            show: true,
            onExport: (data) => alert(`Exporting ${data.length} toko...`),
          }}
          topButton={{
            label: "Toko",
            onClick: handleOpenCreateModal,
            icon: <PackagePlus size={18} />,
            show: true,
          }}
          actions={{
            showDetail: true,
            detailHref: (item) => `/stores/detail-store/`,
            customActions: [
              {
                label: "Setting Status",
                icon: <Settings className="w-4 h-4" />,
                color: "amber",
                onClick: (item) => {
                  setSelectedTokoName(item.name);
                  setSelectedTokoStatus(item.status);
                  setShowStatusModal(true);
                },
              },
            ],
          }}
          queryParamPrefix="toko"
        />
      ),
    },
    {
      id: "crew",
      label: "Crew",
      content: (
        <DataTable
          data={crewData}
          searchableKeys={["name"]}
          columns={[
            {
              key: "name",
              header: "Nama",
              accessor: (item) => (
                <span className="font-bold">{item.name}</span>
              ),
            },
            {
              key: "phone",
              header: "No Telp",
              accessor: (item) => item.phone,
            },
            {
              key: "total_sale",
              header: "Sale",
              accessor: (item) => (
                <span className="font-bold text-blue-600">{item.total_sale}</span>
              ),
            },
            {
              key: "is_cashier",
              header: "Kasir",
              accessor: (item) => (
                <span
                  className={`font-bold ${
                    item.is_cashier ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.is_cashier ? "Bisa" : "Tidak bisa"}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              accessor: (item) => (
                <span
                  className={`font-bold ${
                    item.status === "Aktif" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.status}
                </span>
              ),
            },
          ]}
          filters={[
            {
              label: "Status",
              accessor: "status",
              options: [
                { label: "Aktif", value: "Aktif" },
                { label: "Tidak Aktif", value: "Tidak Aktif" },
              ],
              show: true,
            },
          ]}
          exportConfig={{
            show: true,
            onExport: (data) => alert(`Exporting ${data.length} crew...`),
          }}
          topButton={{
            label: "Crew",
            onClick: handleOpenCreateCrewModal,
            icon: <PackagePlus size={18} />,
            show: true,
          }}
          actions={{
            showDetail: true,
            detailHref: (item) => `/stores/detail-user/`,
            customActions: [
              {
                label: "Setting",
                icon: <Settings className="w-4 h-4" />,
                color: "amber",
                onClick: (item) => {
                  setSelectedCrewName(item.name);
                  setSelectedCrewStatus(item.status);
                  setSelectedCrewIsCashier(item.is_cashier);
                  setShowCrewSettingModal(true);
                },
              },
            ],
          }}
          queryParamPrefix="crew"
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Card Info Toko & Crew */}
        <div>
          <CardKeyValueVertical
            title="Info Toko & Crew"
            icon={<Building2 className="w-6 h-6" />}
            items={[
              { label: "Total Toko", value: "12" },
              { label: "Total Crew", value: "45" },
            ]}
          />
        </div>

        {/* Card Info Produk & Harga Gudang */}
        <div>
          <CardKeyValueVertical
            title="Info Produk & Gudang"
            icon={<Users className="w-6 h-6" />}
            items={[
              { label: "Total Produk", value: "256" },
              { label: "Harga Gudang", value: "Rp 125.500.000" },
            ]}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs items={tabs} align="center" />

      {/* Modal Setting Status */}
      <Modal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        title="Setting Status Toko"
        footer={[
          <Button
            label="Batal"
            variant="outline"
            onClick={() => setShowStatusModal(false)}
          />,
          <Button
            label="Simpan"
            onClick={() => {
              alert(`Status ${selectedTokoName} diubah menjadi ${selectedTokoStatus}`);
              setShowStatusModal(false);
            }}
          />,
        ]}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">Nama Toko</label>
            <div className="bg-gray-100 px-4 py-2 rounded text-gray-700">
              {selectedTokoName}
            </div>
          </div>
          <InputSelectSearch
            label="Pilih Status"
            options={dataStatus}
            value={selectedTokoStatus}
            onChange={(val) => setSelectedTokoStatus(val)}
            placeholder="Pilih status..."
          />
        </div>
      </Modal>

      {/* Modal Create Toko */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Buat Toko Baru"
        footer={[
          <Button
            label="Batal"
            variant="outline"
            onClick={() => setShowCreateModal(false)}
          />,
          <Button
            label="Simpan"
            onClick={() => {
              alert(`Toko "${createName}" berhasil dibuat!`);
              setShowCreateModal(false);
            }}
          />,
        ]}
      >
        <div className="space-y-5">
          <InputText
            label="Nama Toko"
            name="name"
            placeholder="Masukkan Nama Toko"
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
          />
          <InputText
            label="No Telp"
            name="phone"
            placeholder="Masukkan No Telp"
            value={createPhone}
            onChange={(e) => setCreatePhone(e.target.value)}
          />
          <InputTextArea
            label="Alamat"
            name="address"
            placeholder="Masukkan Alamat"
            value={createAddress}
            onChange={(e) => setCreateAddress(e.target.value)}
          />
        </div>
      </Modal>

      {/* Modal Create Crew */}
      <Modal
        isOpen={showCreateCrewModal}
        onClose={() => setShowCreateCrewModal(false)}
        title="Buat Crew Baru"
        footer={[
          <Button
            label="Batal"
            variant="outline"
            onClick={() => setShowCreateCrewModal(false)}
          />,
          <Button
            label="Simpan"
            onClick={() => {
              alert(`Crew "${createCrewName}" berhasil dibuat!`);
              setShowCreateCrewModal(false);
            }}
          />,
        ]}
      >
        <div className="space-y-5">
          <InputText
            label="Nama"
            name="name"
            placeholder="Masukkan Nama Crew"
            value={createCrewName}
            onChange={(e) => setCreateCrewName(e.target.value)}
          />
          <InputText
            label="No Telp"
            name="phone"
            placeholder="Masukkan No Telp"
            value={createCrewPhone}
            onChange={(e) => setCreateCrewPhone(e.target.value)}
          />
        </div>
      </Modal>

      {/* Modal Setting Crew */}
      <Modal
        isOpen={showCrewSettingModal}
        onClose={() => setShowCrewSettingModal(false)}
        title="Setting Crew"
        footer={[
          <Button
            label="Batal"
            variant="outline"
            onClick={() => setShowCrewSettingModal(false)}
          />,
          <Button
            label="Simpan"
            onClick={() => {
              alert(`Crew "${selectedCrewName}" berhasil diupdate!`);
              setShowCrewSettingModal(false);
            }}
          />,
        ]}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">Nama Crew</label>
            <div className="bg-gray-100 px-4 py-2 rounded text-gray-700">
              {selectedCrewName}
            </div>
          </div>
          <InputSelectSearch
            label="Pilih Status"
            options={dataStatus}
            value={selectedCrewStatus}
            onChange={(val) => setSelectedCrewStatus(val)}
            placeholder="Pilih status..."
          />
          <InputSelectSearch
            label="Kasir"
            options={dataCashier}
            value={String(selectedCrewIsCashier)}
            onChange={(val) => setSelectedCrewIsCashier(val === "true")}
            placeholder="Pilih..."
          />
        </div>
      </Modal>
    </div>
  );
}
