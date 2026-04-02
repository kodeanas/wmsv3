"use client";

import DataTable from "@/components/data-tables/DataTable";
import ScannerCard from "@/components/globals/additionals/ScannerCard";
import Modal from "@/components/globals/additionals/Modal";
import CardKeyValueVertical from "@/components/globals/cards/CardKeyValueVertical";
import { Check, ChevronDown, Eye, FileText, PackageSearch, Search } from "lucide-react";
import { useState } from "react";

const detailBagStaging = {
	code: "BAG-001",
	rak_display: "Rak Display A1",
	tanggal_bag: "2026-03-27",
	total_item: 120,
	status: "open",
};

const initialBagItems = [
	{
		warehouse_barcode: "BG330101",
		name: "Premix Ayam 1 Kg",
		qty: 10,
		price: 75000,
		warehouse_price: 77000,
		category: "Pakan Ayam",
	},
	{
		warehouse_barcode: "BG330102",
		name: "Premix Ayam 5 Kg",
		qty: 6,
		price: 210000,
		warehouse_price: 214000,
		category: "Pakan Ayam",
	},
	{
		warehouse_barcode: "BG330103",
		name: "Premix Ikan 500 gr",
		qty: 14,
		price: 45000,
		warehouse_price: 47000,
		category: "Pakan Ikan",
	},
];

const scanLookup: Record<string, (typeof initialBagItems)[number]> = {
	BG330101: {
		warehouse_barcode: "BG330101",
		name: "Premix Ayam 1 Kg",
		qty: 1,
		price: 75000,
		warehouse_price: 77000,
		category: "Pakan Ayam",
	},
	BG330102: {
		warehouse_barcode: "BG330102",
		name: "Premix Ayam 5 Kg",
		qty: 1,
		price: 210000,
		warehouse_price: 214000,
		category: "Pakan Ayam",
	},
};

const rakDisplayOptions = [
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

export default function DetailBagStagingPage() {
	const [tableItems, setTableItems] = useState(initialBagItems);
	const [isEditRackModalOpen, setIsEditRackModalOpen] = useState(false);
	const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
	const [rakDisplay, setRakDisplay] = useState(detailBagStaging.rak_display);
	const [bagStatus, setBagStatus] = useState(detailBagStaging.status);
	const totalHargaGudang = tableItems.reduce(
		(sum, item) => sum + item.qty * item.warehouse_price,
		0,
	);

	const handleOpenEditRackModal = () => {
		setIsEditRackModalOpen(true);
	};

	const handleCloseEditRackModal = () => {
		setIsEditRackModalOpen(false);
	};

	const handleOpenEditStatusModal = () => {
		setIsEditStatusModalOpen(true);
	};

	const handleCloseEditStatusModal = () => {
		setIsEditStatusModalOpen(false);
	};

	const handleScanBarcode = (rawValue: string) => {
		const scannedValue = rawValue.trim().toUpperCase();
		if (!scannedValue) return;

		const mappedItem = scanLookup[scannedValue] ?? {
			warehouse_barcode: scannedValue,
			name: "Produk Scan Baru",
			qty: 1,
			price: 0,
			warehouse_price: 0,
			category: "-",
		};

		setTableItems((prev) => {
			const existingIndex = prev.findIndex((item) => item.warehouse_barcode === mappedItem.warehouse_barcode);
			if (existingIndex === -1) {
				return [mappedItem, ...prev];
			}

			return prev.map((item, index) =>
				index === existingIndex ? { ...item, qty: item.qty + 1 } : item,
			);
		});
	};

	const statusClassName =
		bagStatus === "lock"
			? "inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold uppercase text-red-700"
			: bagStatus === "close"
				? "inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase text-amber-700"
				: "inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold uppercase text-emerald-700";

	return (
		<div className="space-y-6">
<section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
				<CardKeyValueVertical
					title="Informasi Bag"
					icon={<FileText className="h-5 w-5" />}
					action={{
						label: "Edit Rak Tujuan",
						onClick: handleOpenEditRackModal,
						className: "bg-blue-100 text-blue-600 hover:bg-blue-200",
					}}
					items={[
						{
							label: "Code Bag",
							value: (
								<span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase text-blue-700">
									{detailBagStaging.code}
								</span>
							),
						},
						{ label: "Rak Display", value: rakDisplay },
						{ label: "Tanggal Bag", value: detailBagStaging.tanggal_bag },
					]}
				/>

				<CardKeyValueVertical
					title="Ringkasan Bag"
					icon={<PackageSearch className="h-5 w-5" />}
					action={{
						label: "Update Status",
						onClick: handleOpenEditStatusModal,
						className: "bg-amber-100 text-amber-700 hover:bg-amber-200",
					}}
					items={[
						{
							label: "Status",
							value: (
								<span className={statusClassName}>{bagStatus}</span>
							),
						},
						{
							label: "Total Item",
							value: detailBagStaging.total_item,
						},
						{
							label: "Total Harga Gudang",
							value: formatRupiah(totalHargaGudang),
						},
					]}
				/>
			</section>
<section>
				<ScannerCard
					title="Scan Item Bag Staging"
					placeholder="Scan barcode item bag..."
					onScanComplete={handleScanBarcode}
				/>
			</section>

			<section>
				<DataTable
					title="Produk Sudah Terscan"
					data={tableItems}
					exportConfig={{ show: true }}
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
				/>
			</section>

			<Modal
				isOpen={isEditRackModalOpen}
				onClose={handleCloseEditRackModal}
				title="Edit Rak Tujuan"
				size="md"
				footer={
					<>
						<button
							type="button"
							onClick={handleCloseEditRackModal}
							className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
						>
							Batal
						</button>
						<button
							type="button"
							onClick={handleCloseEditRackModal}
							className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
						>
							Simpan
						</button>
					</>
				}
			>
				<div className="space-y-4">
					<p className="text-sm leading-relaxed text-slate-600">
						Pilih rak display tujuan baru untuk bag staging ini.
					</p>
					<SelectSearchInline
						label="Rak Display Tujuan"
						options={rakDisplayOptions}
						value={rakDisplay}
						onChange={(value) => setRakDisplay(String(value))}
						placeholder="Pilih rak display tujuan"
					/>
				</div>
			</Modal>

			<Modal
				isOpen={isEditStatusModalOpen}
				onClose={handleCloseEditStatusModal}
				title="Update Status Bag"
				size="sm"
				footer={
					<button
						type="button"
						onClick={handleCloseEditStatusModal}
						className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
					>
						Tutup
					</button>
				}
			>
				<div className="space-y-4">
					<p className="text-sm leading-relaxed text-slate-600">
						Pilih status terbaru untuk bag staging ini.
					</p>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
						{[
							{ value: "open", className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" },
							{ value: "close", className: "bg-amber-100 text-amber-700 hover:bg-amber-200" },
							{ value: "lock", className: "bg-red-100 text-red-700 hover:bg-red-200" },
						].map((statusOption) => (
							<button
								key={statusOption.value}
								type="button"
								onClick={() => {
									setBagStatus(statusOption.value);
									handleCloseEditStatusModal();
								}}
								className={`rounded-xl px-4 py-3 text-sm font-bold uppercase transition-colors ${statusOption.className} ${
									bagStatus === statusOption.value ? "ring-2 ring-offset-2 ring-slate-300" : ""
								}`}
							>
								{statusOption.value}
							</button>
						))}
					</div>
				</div>
			</Modal>

		</div>
	);
}
