"use client";

import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import Tabs from "@/components/globals/additionals/Tabs";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
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

const rakData = [
	{
		code_rak: "Rak-001",
		nama_rak: "Rak Display A1",
		total_item: 120,
		total_harga_gudang: 4850000,
		status: "open",
	},
	{
		code_rak: "Rak-002",
		nama_rak: "Rak Display A2",
		total_item: 80,
		total_harga_gudang: 3275000,
		status: "close",
	},
	{
		code_rak: "Rak-003",
		nama_rak: "Rak Display B1",
		total_item: 95,
		total_harga_gudang: 4125000,
		status: "lock",
	},
];

const scannedProductData = [
	{
		warehouse_barcode: "WH-220011",
		name: "Premix Ayam 1 Kg",
		qty: 20,
		price: 75000,
		warehouse_price: 77000,
		category: "Feed",
	},
	{
		warehouse_barcode: "WH-220012",
		name: "Premix Ayam 5 Kg",
		qty: 10,
		price: 210000,
		warehouse_price: 214000,
		category: "Feed",
	},
	{
		warehouse_barcode: "WH-220013",
		name: "Premix Sapi 1 Kg",
		qty: 15,
		price: 82000,
		warehouse_price: 83500,
		category: "Supplement",
	},
	{
		warehouse_barcode: "WH-220014",
		name: "Premix Ikan 500 gr",
		qty: 28,
		price: 45000,
		warehouse_price: 47000,
		category: "Feed",
	},
];

export default function DisplayPage() {
	const [isRakModalOpen, setIsRakModalOpen] = useState(false);
	const [namaRak, setNamaRak] = useState("");
	const handleOpenRakModal = () => {
		setIsRakModalOpen(true);
	};

	const handleCloseRakModal = () => {
		setNamaRak("");
		setIsRakModalOpen(false);
	};

	const handleConfirmCreateRak = () => {
		setNamaRak("");
		setIsRakModalOpen(false);
	};

	return (
		<div className="space-y-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-bold text-slate-800">Display</h2>
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

			<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
				<Tabs
					align="center"
					items={[
						{
							label: "Rak Display",
							content: (
								<DataTable
									title="Daftar Rak Display"
									data={rakData}
									columns={[
										{ key: "code_rak", header: "Code Rak", accessor: "code_rak" },
										{ key: "nama_rak", header: "Nama Rak", accessor: "nama_rak" },
										{ key: "total_item", header: "Total Item", accessor: "total_item" },
										{
											key: "total_harga_gudang",
											header: "Total Harga Gudang",
											accessor: (item: any) => formatRupiah(item.total_harga_gudang),
										},
									]}
									searchableKeys={["code_rak", "nama_rak"]}
									topButton={{
										label: "Rak Display",
										onClick: handleOpenRakModal,
									}}
									actions={{
										customActions: [
											{
												label: "Detail",
												icon: <Eye size={18} />,
												color: "blue",
												href: () => "/display/detail-rak",
											},
										],
									}}
									exportConfig={{ show: true }}
									queryParamPrefix="rak"
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
											key: "warehouse_barcode",
											header: "Barcode Warehouse",
											accessor: "warehouse_barcode",
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
											accessor: (item: any) => formatRupiah(item.warehouse_price),
										},
										{
											key: "category",
											header: "Kategori",
											accessor: (item: any) => item.category || "-",
										},
									]}
									searchableKeys={["warehouse_barcode", "name"]}
									actions={{
										customActions: [
											{
												label: "Detail",
												icon: <Eye size={18} />,
												color: "blue",
												href: () => "/display/detail-produk",
											},
										],
									}}
									queryParamPrefix="produk"
								/>
							),
						},
					]}
				/>
			</section>

			<Modal
				isOpen={isRakModalOpen}
				onClose={handleCloseRakModal}
				title="Konfirmasi Pembuatan Rak Display"
				size="md"
				footer={
					<>
						<button
							type="button"
							onClick={handleConfirmCreateRak}
							className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
						>
							Ya, saya setuju
						</button>
						<button
							type="button"
							onClick={handleCloseRakModal}
							className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
						>
							Batal
						</button>
					</>
				}
			>
				<div className="space-y-4">
					<p className="text-sm leading-relaxed text-slate-600">
						Pastikan data sudah sesuai sebelum melanjutkan pembuatan rak baru.
					</p>
					<div className="flex flex-col gap-2">
						<label
							htmlFor="nama-rak"
							className="text-xs font-bold uppercase tracking-wider text-slate-500"
						>
							Nama Rak
						</label>
						<input
							id="nama-rak"
							type="text"
							value={namaRak}
							onChange={(e) => setNamaRak(e.target.value)}
							placeholder="Masukkan nama rak"
							className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
						/>
					</div>
				</div>
			</Modal>

		</div>
	);
}
