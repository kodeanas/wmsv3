"use client";

import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import { Activity, BadgePoundSterling, Eye, Package, PackageSearch } from "lucide-react";
import { useState } from "react";

const formatRupiah = (value: number) =>
	`Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const saldoAwal = {
	itemAwal: 980,
	hargaAsalAwal: 36750000,
};

const saldoAkhirRealtime = {
	itemAkhir: 1124,
	hargaAsalAkhir: 42120000,
};

type SkuStagingItem = {
	barcode: string;
	nama: string;
	item: number;
	hargaAsal: number;
	userInput: {
		namaUser: string;
		tanggalInput: string;
		catatan: string;
	};
};

const skuStagingData: SkuStagingItem[] = [
	{
		barcode: "SKU-330011",
		nama: "Vitamin Ayam A1",
		item: 32,
		hargaAsal: 56000,
		userInput: {
			namaUser: "Aldi",
			tanggalInput: "2026-03-28",
			catatan: "Input awal stok SKU rak A1",
		},
	},
	{
		barcode: "SKU-330012",
		nama: "Vitamin Ayam B2",
		item: 18,
		hargaAsal: 74000,
		userInput: {
			namaUser: "Sinta",
			tanggalInput: "2026-03-28",
			catatan: "Penyesuaian item hasil scan pagi",
		},
	},
	{
		barcode: "SKU-330013",
		nama: "Konsentrat Sapi C3",
		item: 14,
		hargaAsal: 128000,
		userInput: {
			namaUser: "Rudi",
			tanggalInput: "2026-03-27",
			catatan: "Revisi qty berdasarkan QC",
		},
	},
	{
		barcode: "SKU-330014",
		nama: "Premix Ikan D4",
		item: 27,
		hargaAsal: 49000,
		userInput: {
			namaUser: "Tari",
			tanggalInput: "2026-03-27",
			catatan: "Input barang retur layak jual",
		},
	},
];

export default function StagingSkuPage() {
	const [isDetailOpen, setIsDetailOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<SkuStagingItem | null>(null);

	const handleOpenDetail = (item: SkuStagingItem) => {
		setSelectedItem(item);
		setIsDetailOpen(true);
	};

	const handleCloseDetail = () => {
		setIsDetailOpen(false);
		setSelectedItem(null);
	};

	return (
		<div className="space-y-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-bold text-slate-800">Staging SKU</h2>
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
					]}
				/>
			</section>
			</StatsSectionWrapper>

			<section>
				<DataTable
					title="Data SKU Staging"
					data={skuStagingData}
					exportConfig={{
						show: true,
						onExport: (data) => {
							console.log("Export data SKU staging:", data);
						},
					}}
					columns={[
						{
							key: "barcode",
							header: "Barcode",
							accessor: "barcode",
						},
						{
							key: "nama",
							header: "Nama",
							accessor: "nama",
						},
						{
							key: "item",
							header: "Item",
							accessor: "item",
						},
						{
							key: "hargaAsal",
							header: "Harga Asal",
							accessor: (row) => formatRupiah(row.hargaAsal),
						},
					]}
					searchableKeys={["barcode", "nama"]}
					actions={{
						customActions: [
							{
								label: "Show Detail",
								icon: <Eye size={18} />,
								color: "blue",
								onClick: (item) => handleOpenDetail(item),
							},
							{
								label: "Bundling",
								icon: <Package size={18} />,
								color: "emerald",
								href: () => "/sku-staging/detail-produk",
							},
						],
					}}
				/>
			</section>

			<Modal
				isOpen={isDetailOpen}
				onClose={handleCloseDetail}
				title="Detail SKU Staging"
				size="md"
				footer={
					<button
						type="button"
						onClick={handleCloseDetail}
						className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
					>
						Tutup
					</button>
				}
			>
				{selectedItem && (
					<div className="space-y-4">
						<section className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
							<h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-500">
								Informasi Barang
							</h4>
							<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
								<div>
									<p className="text-xs font-semibold text-slate-400">Barcode</p>
									<p className="text-sm font-semibold text-slate-700">{selectedItem.barcode}</p>
								</div>
								<div>
									<p className="text-xs font-semibold text-slate-400">Nama</p>
									<p className="text-sm font-semibold text-slate-700">{selectedItem.nama}</p>
								</div>
								<div>
									<p className="text-xs font-semibold text-slate-400">Item</p>
									<p className="text-sm font-semibold text-slate-700">{selectedItem.item}</p>
								</div>
								<div>
									<p className="text-xs font-semibold text-slate-400">Harga Asal</p>
									<p className="text-sm font-semibold text-slate-700">
										{formatRupiah(selectedItem.hargaAsal)}
									</p>
								</div>
							</div>
						</section>

						<section className="rounded-xl border border-slate-200 bg-white p-4">
							<h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-500">
								Data User Input
							</h4>
							<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
								<div>
									<p className="text-xs font-semibold text-slate-400">Nama User Input</p>
									<p className="text-sm font-semibold text-slate-700">
										{selectedItem.userInput.namaUser}
									</p>
								</div>
								<div>
									<p className="text-xs font-semibold text-slate-400">Tanggal Input</p>
									<p className="text-sm font-semibold text-slate-700">
										{new Date(selectedItem.userInput.tanggalInput).toLocaleDateString("id-ID", {
											day: "2-digit",
											month: "long",
											year: "numeric",
										})}
									</p>
								</div>
								<div className="md:col-span-2">
									<p className="text-xs font-semibold text-slate-400">Catatan</p>
									<p className="text-sm font-semibold text-slate-700">
										{selectedItem.userInput.catatan}
									</p>
								</div>
							</div>
						</section>
					</div>
				)}
			</Modal>
		</div>
	);
}
