"use client";

import { useCallback, useEffect, useState } from "react";
import DataTable from "@/components/data-tables";
import { Barcode, LogOut, Plus, ReceiptText, WalletCards, X } from "lucide-react";

type CashierProduct = {
	barcodeGudang: string;
	nama: string;
	qty: number;
	harga: number;
	hargaLabel: string;
};

type BuyerOption = {
	id: string;
	nama: string;
	className: string;
	classDiscountPercent: number;
	transactionCount: number;
	nextClass: {
		name: string;
		minTransactions: number;
	};
};

const formatRupiah = (value: number) =>
	`Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const cashierItems: CashierProduct[] = [
	{
		barcodeGudang: "WH-2400192",
		nama: "Kaos Basic Putih",
		qty: 2,
		harga: 85000,
		hargaLabel: formatRupiah(85000),
	},
	{
		barcodeGudang: "WH-2402201",
		nama: "Celana Chino Navy",
		qty: 1,
		harga: 215000,
		hargaLabel: formatRupiah(215000),
	},
	{
		barcodeGudang: "WH-2404003",
		nama: "Jaket Windbreaker",
		qty: 1,
		harga: 329000,
		hargaLabel: formatRupiah(329000),
	},
];

const buyerOptions: BuyerOption[] = [
	{
		id: "BUYER-001",
		nama: "PT Nusantara Retail",
		className: "Silver",
		classDiscountPercent: 3,
		transactionCount: 7,
		nextClass: {
			name: "Gold",
			minTransactions: 10,
		},
	},
	{
		id: "BUYER-002",
		nama: "CV Sumber Grosir",
		className: "Gold",
		classDiscountPercent: 5,
		transactionCount: 14,
		nextClass: {
			name: "Platinum",
			minTransactions: 18,
		},
	},
	{
		id: "BUYER-003",
		nama: "Toko Sentosa Jaya",
		className: "Bronze",
		classDiscountPercent: 2,
		transactionCount: 3,
		nextClass: {
			name: "Silver",
			minTransactions: 6,
		},
	},
];

const PPN_RATE = 0.11;

const totalQty = cashierItems.reduce((acc, item) => acc + item.qty, 0);
const subtotal = cashierItems.reduce((acc, item) => acc + item.harga * item.qty, 0);

export default function CashierPage() {
	const [scannerValue, setScannerValue] = useState("");
	const [isSubmittingScan, setIsSubmittingScan] = useState(false);
	const [lastScannedValue, setLastScannedValue] = useState("");
	const [selectedBuyerId, setSelectedBuyerId] = useState("");
	const [voucherNominalInput, setVoucherNominalInput] = useState("");
	const [isPpnChecked, setIsPpnChecked] = useState(true);
	const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);
	const [boxQtyInput, setBoxQtyInput] = useState("0");
	const [boxUnitPriceInput, setBoxUnitPriceInput] = useState("0");
	const [boxQty, setBoxQty] = useState(0);
	const [boxUnitPrice, setBoxUnitPrice] = useState(0);

	const submitScan = useCallback((rawValue: string) => {
		const scannedValue = rawValue.trim().toUpperCase();
		if (!scannedValue) return;

		setIsSubmittingScan(true);
		setLastScannedValue(scannedValue);

		// TODO: ganti ke API/logic tambah item saat endpoint sudah siap.
		console.log("Auto submit scanner:", scannedValue);

		setScannerValue("");
		setTimeout(() => {
			setIsSubmittingScan(false);
		}, 250);
	}, []);

	useEffect(() => {
		if (!scannerValue.trim() || isSubmittingScan) return;

		const timeoutId = setTimeout(() => {
			submitScan(scannerValue);
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [scannerValue, isSubmittingScan, submitScan]);

	const handleEnterSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== "Enter") return;

		event.preventDefault();
		submitScan(scannerValue);
	};

	const selectedBuyer = buyerOptions.find((buyer) => buyer.id === selectedBuyerId);
	const voucherNominal = Number(voucherNominalInput || "0");
	const boxUnitPriceDraft = Number(boxUnitPriceInput || "0");
	const totalHargaProduk = subtotal;
	const totalPpn = isPpnChecked ? Math.round(totalHargaProduk * PPN_RATE) : 0;
	const totalPembelianBox = boxQty * boxUnitPrice;
	const diskonKelasPercent = selectedBuyer?.classDiscountPercent ?? 0;
	const diskonKelas = Math.round(totalHargaProduk * (diskonKelasPercent / 100));
	const grandTotal = Math.max(
		0,
		totalHargaProduk + totalPpn + totalPembelianBox - diskonKelas - voucherNominal,
	);
	const transaksiLagiUntukNaikKelas = selectedBuyer
		? Math.max(0, selectedBuyer.nextClass.minTransactions - (selectedBuyer.transactionCount + 1))
		: null;

	const handleOpenBoxModal = () => {
		setBoxQtyInput(String(boxQty));
		setBoxUnitPriceInput(String(boxUnitPrice));
		setIsBoxModalOpen(true);
	};

	const handleSaveBoxPurchase = () => {
		const parsedQty = Math.max(0, Number(boxQtyInput || "0"));
		const parsedUnitPrice = Math.max(0, Number(boxUnitPriceInput || "0"));

		setBoxQty(parsedQty);
		setBoxUnitPrice(parsedUnitPrice);
		setIsBoxModalOpen(false);
	};

	return (
		<div className="space-y-6 pb-20 lg:pb-24">
			<section className="grid grid-cols-3 gap-6">
				<div className="space-y-5 col-span-2">
					<div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
						<div className="mb-4 flex items-center gap-3">
							<div className="rounded-lg bg-blue-50 p-2 text-blue-500">
								<Barcode className="h-5 w-5" />
							</div>
							<div>
								<h2 className="text-lg font-bold text-slate-700">Scanner Produk</h2>
								<p className="text-xs text-slate-500">
									Scan barcode atau masukkan SKU secara manual
								</p>
							</div>
						</div>

						<div>
							<input
								type="text"
								value={scannerValue}
								onChange={(event) => setScannerValue(event.target.value)}
								onKeyDown={handleEnterSubmit}
								disabled={isSubmittingScan}
								placeholder="Contoh: SKU-0192 / barcode"
								className="rounded-lg border border-slate-200 px-4 py-3 w-full text-sm outline-none focus:border-blue-400"
							/>
							<p className="mt-2 text-xs text-slate-500">
								{isSubmittingScan
									? "Memproses scanner..."
									: scannerValue
										? "Auto submit dalam 1 detik setelah input berhenti"
										: "Siap scan. Tidak perlu klik submit."}
							</p>
							{lastScannedValue && !scannerValue && !isSubmittingScan && (
								<p className="mt-1 text-xs text-emerald-600">
									Terakhir tersubmit: {lastScannedValue}
								</p>
							)}
						</div>
					</div>

					<div>
						<DataTable
							data={cashierItems}
							pageSize={5}
							showSearch={true}
							topButton={{ label: "", show: false }}
							exportConfig={{ show: false }}
							columns={[
								{ key: "barcodeGudang", header: "Barcode Gudang", accessor: "barcodeGudang" },
								{ key: "nama", header: "Nama Produk", accessor: "nama" },
								{ key: "qty", header: "Qty", accessor: "qty" },
								{ key: "harga", header: "Harga", accessor: "hargaLabel" },
							]}
							searchableKeys={["barcodeGudang", "nama"]}
							actions={{
								customActions: [
									{
										label: "Keluarkan Barang",
											icon: <LogOut size={18} />,
										color: "red",
									},
								],
							}}
						/>
					</div>
				</div>

				<aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="mb-5 flex items-center gap-3">
						<div className="rounded-lg bg-emerald-50 p-2 text-emerald-500">
							<ReceiptText className="h-5 w-5" />
						</div>
						<div>
							<h2 className="text-lg font-bold text-slate-700">Summary</h2>
							<p className="text-xs text-slate-500">Ringkasan transaksi aktif</p>
						</div>
					</div>

					<div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
						<div className="space-y-1">
							<label className="text-xs font-semibold text-slate-700">Buyer</label>
							<select
								value={selectedBuyerId}
								onChange={(event) => setSelectedBuyerId(event.target.value)}
								className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
							>
								<option value="">Pilih buyer (wajib)</option>
								{buyerOptions.map((buyer) => (
									<option key={buyer.id} value={buyer.id}>
										{buyer.nama}
									</option>
								))}
							</select>
							{!selectedBuyer && (
								<p className="text-xs text-rose-500">Buyer harus dipilih sebelum checkout.</p>
							)}
						</div>

						<div className="rounded-lg border border-slate-200 bg-white p-3">
							<p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
								Class Buyer Dipakai
							</p>
							<p className="mt-1 text-sm font-semibold text-slate-700">
								{selectedBuyer ? selectedBuyer.className : "-"}
							</p>
							<p className="text-xs text-emerald-600">
								Diskon kelas: {diskonKelasPercent}%
							</p>
							<p className="mt-2 text-xs text-slate-600">
								{selectedBuyer
									? `Next class ${selectedBuyer.nextClass.name}: perlu ${transaksiLagiUntukNaikKelas} transaksi lagi setelah transaksi ini selesai.`
									: "Pilih buyer untuk melihat progress naik kelas."}
							</p>
						</div>

						<div className="space-y-1">
							<label className="text-xs font-semibold text-slate-700">Voucher (Nominal)</label>
							<div className="relative">
								<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
									Rp
								</span>
								<input
									type="text"
									inputMode="numeric"
									value={voucherNominalInput}
									onChange={(event) =>
										setVoucherNominalInput(event.target.value.replace(/\D/g, ""))
									}
									placeholder="Contoh: 50000"
									className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-blue-400"
								/>
							</div>
							<p className="text-xs text-slate-500">
								Format: {formatRupiah(voucherNominal)}
							</p>
						</div>

						<div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
							<div>
								<p className="text-xs font-semibold text-slate-700">PPN (11%)</p>
								<p className="text-xs text-slate-500">Default aktif</p>
							</div>
							<input
								type="checkbox"
								checked={isPpnChecked}
								onChange={(event) => setIsPpnChecked(event.target.checked)}
								className="h-4 w-4 accent-blue-500"
							/>
						</div>

						<div className="rounded-lg border border-slate-200 bg-white p-3">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-semibold text-slate-700">Pembelian Box</p>
									<p className="text-xs text-slate-500">
										{boxQty > 0
											? `${boxQty} box x ${formatRupiah(boxUnitPrice)}`
											: "Belum ada pembelian box"}
									</p>
								</div>
								<button
									type="button"
									onClick={handleOpenBoxModal}
									className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100"
								>
									<Plus className="h-3.5 w-3.5" />
									Tambah
								</button>
							</div>
						</div>

						<div className="space-y-2 border-t border-slate-200 pt-2">
							<div className="flex items-center justify-between text-slate-600">
								<span>Total Item</span>
								<span className="font-semibold text-slate-700">{totalQty}</span>
							</div>
							<div className="flex items-center justify-between text-slate-600">
								<span>Total Harga Produk</span>
								<span className="font-semibold text-slate-700">{formatRupiah(totalHargaProduk)}</span>
							</div>
							<div className="flex items-center justify-between text-slate-600">
								<span>Total PPN</span>
								<span className="font-semibold text-slate-700">{formatRupiah(totalPpn)}</span>
							</div>
							<div className="flex items-center justify-between text-slate-600">
								<span>Pembelian Box</span>
								<span className="font-semibold text-slate-700">{formatRupiah(totalPembelianBox)}</span>
							</div>
							<div className="flex items-center justify-between text-slate-600">
								<span>Diskon Kelas</span>
								<span className="font-semibold text-emerald-600">-{formatRupiah(diskonKelas)}</span>
							</div>
							<div className="flex items-center justify-between text-slate-600">
								<span>Voucher</span>
								<span className="font-semibold text-emerald-600">
									-{formatRupiah(voucherNominal)}
								</span>
							</div>
							<div className="border-t border-slate-200 pt-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-semibold text-slate-700">Grand Total</span>
									<span className="text-lg font-bold text-blue-600">
										{formatRupiah(grandTotal)}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-5 space-y-3">
						<button
							disabled={!selectedBuyer}
							className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
						>
							<WalletCards className="h-4 w-4" />
							Pilih Pembayaran
						</button>
						<button className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
							Simpan Draft
						</button>
					</div>
				</aside>
			</section>

			{isBoxModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
					<div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="text-base font-bold text-slate-700">Input Pembelian Box</h3>
							<button
								type="button"
								onClick={() => setIsBoxModalOpen(false)}
								className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
							>
								<X className="h-4 w-4" />
							</button>
						</div>

						<div className="space-y-3">
							<div>
								<label className="mb-1 block text-xs font-semibold text-slate-700">Jumlah Box</label>
								<input
									type="text"
									inputMode="numeric"
									value={boxQtyInput}
									onChange={(event) =>
										setBoxQtyInput(event.target.value.replace(/\D/g, ""))
									}
									className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
								/>
							</div>
							<div>
								<label className="mb-1 block text-xs font-semibold text-slate-700">
									Harga Per Unit
								</label>
								<div className="relative">
									<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
										Rp
									</span>
									<input
										type="text"
										inputMode="numeric"
										value={boxUnitPriceInput}
										onChange={(event) =>
											setBoxUnitPriceInput(event.target.value.replace(/\D/g, ""))
										}
										className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-3 text-sm outline-none focus:border-blue-400"
									/>
								</div>
								<p className="mt-1 text-xs text-slate-500">
									Format: {formatRupiah(boxUnitPriceDraft)}
								</p>
							</div>
						</div>

						<div className="mt-5 flex items-center justify-end gap-2">
							<button
								type="button"
								onClick={() => setIsBoxModalOpen(false)}
								className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={handleSaveBoxPurchase}
								className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600"
							>
								Simpan
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
