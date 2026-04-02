"use client";

import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";
import StatsSectionWrapper from "@/components/globals/cards/StatsSectionWrapper";
import Tabs from "@/components/globals/additionals/Tabs";
import { Activity, Check, ChevronDown, Eye, PackageSearch, Search } from "lucide-react";
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

const rakDisplayOptions = [
	{ label: "Rak Display A1", value: "A1" },
	{ label: "Rak Display A2", value: "A2" },
	{ label: "Rak Display B1", value: "B1" },
	{ label: "Rak Display B2", value: "B2" },
];

function SelectSearchInline({
	label,
	options,
	value,
	onChange,
	placeholder = "Pilih data...",
}: {
	label: string;
	options: { label: string; value: string | number }[];
	value: string | number;
	onChange: (value: string | number) => void;
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
				<span className={selectedLabel ? "font-medium text-slate-700" : "text-slate-400"}>
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
							placeholder="Cari rak display..."
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

export default function StagingRegulerPage() {
	const [isBagModalOpen, setIsBagModalOpen] = useState(false);
	const [rakDisplayTujuan, setRakDisplayTujuan] = useState<string | number>("");

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
				<h2 className="text-xl font-bold text-slate-800">Staging Reguler</h2>
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
							label: "Bag",
							content: (
								<DataTable
									title="Daftar Bag"
									data={bagData}
									columns={[
										{ key: "code_bag", header: "Code Bag", accessor: "code_bag" },
										{ key: "total_item", header: "Total Item", accessor: "total_item" },
										{
											key: "total_harga_gudang",
											header: "Total Harga Gudang",
											accessor: (item: any) => formatRupiah(item.total_harga_gudang),
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
															colorMap[item.status] || "bg-slate-100 text-slate-700"
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
												href: () => "/reguler-staging/detail-bag",
											},
										],
									}}
									exportConfig={{ show: true }}
								queryParamPrefix="bag"
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
										show: true
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
												href: () => "/reguler-staging/detail-produk",
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
				isOpen={isBagModalOpen}
				onClose={handleCloseBagModal}
				title="Konfirmasi Pembuatan Bag"
				size="md"
				footer={
					<>
						<button
							type="button"
							onClick={handleConfirmCreateBag}
							className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
						>
							Ya, saya setuju
						</button>
						<button
							type="button"
							onClick={handleCloseBagModal}
							className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
						>
							Batal
						</button>
					</>
				}
			>
				<div className="space-y-4">
					<p className="text-sm leading-relaxed text-slate-600">
						Pastikan data sudah sesuai sebelum melanjutkan pembuatan Bag baru.
					</p>
					<SelectSearchInline
						label="Rak Display Tujuan"
						options={rakDisplayOptions}
						value={rakDisplayTujuan}
						onChange={setRakDisplayTujuan}
						placeholder="Pilih rak display tujuan"
					/>
				</div>
			</Modal>
		</div>
	);
}
