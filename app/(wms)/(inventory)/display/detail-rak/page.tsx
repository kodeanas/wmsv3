"use client";

import DataTable from "@/components/data-tables/DataTable";
import Modal from "@/components/globals/additionals/Modal";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import { Check, ChevronDown, Eye, FileText, PackageSearch, Search } from "lucide-react";
import { useState } from "react";

const detailRakDisplay = {
	code: "RAK-001",
	nama_rak: "Rak Display A1",
	tanggal_rak: "2026-03-27",
	total_item: 120,
};

const initialRakItems = [
	{
		warehouse_barcode: "WH-220011",
		name: "Premix Ayam 1 Kg",
		qty: 10,
		price: 75000,
		warehouse_price: 77000,
		category: "Feed",
	},
	{
		warehouse_barcode: "WH-220012",
		name: "Premix Ayam 5 Kg",
		qty: 6,
		price: 210000,
		warehouse_price: 214000,
		category: "Feed",
	},
	{
		warehouse_barcode: "WH-220013",
		name: "Premix Ikan 500 gr",
		qty: 14,
		price: 45000,
		warehouse_price: 47000,
		category: "Supplement",
	},
];

const namaRakOptions = [
	{ label: "Rak Display A1", value: "Rak Display A1" },
	{ label: "Rak Display A2", value: "Rak Display A2" },
	{ label: "Rak Display B1", value: "Rak Display B1" },
	{ label: "Rak Display B2", value: "Rak Display B2" },
];

const formatRupiah = (value: number) =>
	`Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

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
							placeholder="Cari nama rak..."
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

export default function DetailRakDisplayPage() {
	const [tableItems] = useState(initialRakItems);
	const [isEditNamaRakModalOpen, setIsEditNamaRakModalOpen] = useState(false);
	const [namaRak, setNamaRak] = useState(detailRakDisplay.nama_rak);
	const totalHargaAsal = tableItems.reduce((sum, item) => sum + item.qty * item.price, 0);
	const totalHargaGudang = tableItems.reduce(
		(sum, item) => sum + item.qty * item.warehouse_price,
		0,
	);

	const handleOpenEditNamaRakModal = () => {
		setIsEditNamaRakModalOpen(true);
	};

	const handleCloseEditNamaRakModal = () => {
		setIsEditNamaRakModalOpen(false);
	};

	return (
		<div className="space-y-6">
<section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
				<CardKeyValueVertical
					title="Informasi Rak"
					icon={<FileText className="h-5 w-5" />}
					action={{
						label: "Edit Nama Rak",
						onClick: handleOpenEditNamaRakModal,
						className: "bg-blue-100 text-blue-600 hover:bg-blue-200",
					}}
					items={[
						{
							label: "Code Rak",
							value: (
								<span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase text-blue-700">
									{detailRakDisplay.code}
								</span>
							),
						},
						{ label: "Nama Rak", value: namaRak },
						{ label: "Tanggal Rak", value: detailRakDisplay.tanggal_rak },
					]}
				/>

				<CardKeyValueVertical
					title="Ringkasan Rak"
					icon={<PackageSearch className="h-5 w-5" />}
					items={[
						{
							label: "Total Item",
							value: detailRakDisplay.total_item,
						},
						{
							label: "Total Harga Asal",
							value: formatRupiah(totalHargaAsal),
						},
						{
							label: "Total Harga Gudang",
							value: formatRupiah(totalHargaGudang),
						},
					]}
				/>
			</section>
<section>
				<DataTable
					title="Produk Sudah Terscan"
					data={tableItems}
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
				/>
			</section>

			<Modal
				isOpen={isEditNamaRakModalOpen}
				onClose={handleCloseEditNamaRakModal}
				title="Edit Nama Rak"
				size="md"
				footer={
					<>
						<button
							type="button"
							onClick={handleCloseEditNamaRakModal}
							className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
						>
							Batal
						</button>
						<button
							type="button"
							onClick={handleCloseEditNamaRakModal}
							className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
						>
							Simpan
						</button>
					</>
				}
			>
				<div className="space-y-4">
					<p className="text-sm leading-relaxed text-slate-600">
						Pilih nama rak baru untuk rak display ini.
					</p>
					<SelectSearchInline
						label="Nama Rak"
						options={namaRakOptions}
						value={namaRak}
						onChange={(value) => setNamaRak(String(value))}
						placeholder="Pilih nama rak"
					/>
				</div>
			</Modal>
		</div>
	);
}
