"use client";

import CardKeyValueHorizontal from "@/components/globals/cards/CardKeyValueHorizontal";import BarcodeModal from "@/components/globals/additionals/BarcodeModal";
import { PackageCheck, Printer } from "lucide-react";
import { useMemo, useState } from "react";

type CategoryOption = {
	id: string;
	name: string;
	marginPercent: number;
};

type GeneratedBarcode = {
	id: string;
	code: string;
};

const kategoriOptions: CategoryOption[] = [
	{ id: "feed", name: "Feed", marginPercent: 8 },
	{ id: "supplement", name: "Supplement", marginPercent: 10 },
	{ id: "vitamin", name: "Vitamin", marginPercent: 12 },
];

const dataProduk = {
	barcode: "SKU-330011",
	nama: "Vitamin Ayam A1",
	qtyAwal: 50,
	hargaAsalSatuan: 25000,
};

const formatRupiah = (value: number) =>
	`Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

const getStickerByHarga = (hargaPerBundle: number) => {
	if (hargaPerBundle <= 50000) {
		return { type: "Tiny", color: "Hijau" };
	}

	return { type: "Small", color: "Kuning" };
};

const generateBarcodeCode = (index: number) => {
	const randomPart = Math.floor(1000 + Math.random() * 9000);
	return `BND-${Date.now()}-${index + 1}-${randomPart}`;
};

export default function DetailProdukSkuPage() {
	const [produkPerBundle, setProdukPerBundle] = useState<number>(0);
	const [jumlahBundle, setJumlahBundle] = useState<number>(0);
	const [selectedCategory, setSelectedCategory] = useState<string>(
		kategoriOptions[0].id,
	);
	const [generatedBarcodes, setGeneratedBarcodes] = useState<GeneratedBarcode[]>([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
	const [activeBarcode, setActiveBarcode] = useState("");

	const totalProdukDipakai = produkPerBundle * jumlahBundle;
	const sisaProduk = dataProduk.qtyAwal - totalProdukDipakai;
	const hargaAsalPerBundle = produkPerBundle * dataProduk.hargaAsalSatuan;
	const isAbove100k = hargaAsalPerBundle > 100000;

	const activeCategory = useMemo(
		() => kategoriOptions.find((item) => item.id === selectedCategory) || kategoriOptions[0],
		[selectedCategory],
	);

	const hargaGudangPerBundle = useMemo(() => {
		const marginPercent = isAbove100k ? activeCategory.marginPercent : 5;
		return Math.round(hargaAsalPerBundle * (1 + marginPercent / 100));
	}, [hargaAsalPerBundle, isAbove100k, activeCategory.marginPercent]);

	const stickerInfo = getStickerByHarga(hargaAsalPerBundle);

	const handleSubmitBundling = () => {
		setIsSubmitted(true);
		setErrorMessage("");

		if (produkPerBundle <= 0 || jumlahBundle <= 0) {
			setGeneratedBarcodes([]);
			setErrorMessage("Produk per bundle dan jumlah bundle harus lebih dari 0.");
			return;
		}

		if (totalProdukDipakai > dataProduk.qtyAwal) {
			setGeneratedBarcodes([]);
			setErrorMessage("Jumlah produk bundling melebihi stok tersedia.");
			return;
		}

		const barcodeList = Array.from({ length: jumlahBundle }, (_, index) => ({
			id: `bundle-${index + 1}`,
			code: generateBarcodeCode(index),
		}));
		setGeneratedBarcodes(barcodeList);
		setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 50);
	};

	const handleOpenBarcodeModal = (code: string) => {
		setActiveBarcode(code);
		setIsBarcodeModalOpen(true);
	};

	const handleCloseBarcodeModal = () => {
		setIsBarcodeModalOpen(false);
		setActiveBarcode("");
	};

	return (
		<div className="space-y-6">
			<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
				<div className="mb-4 flex items-center gap-3">
					<div className="rounded-lg bg-blue-100 p-2 text-blue-700">
						<PackageCheck size={18} />
					</div>
					<div>
						<h2 className="text-lg font-bold text-slate-800">Bundling SKU</h2>
						<p className="text-xs text-slate-500">
							Isi produk per bundle dan jumlah bundle untuk hitung sisa stok.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="space-y-2">
						<label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
							Produk Per Bundle
						</label>
						<input
							type="number"
							min={0}
							value={produkPerBundle || ""}
							onChange={(e) => setProdukPerBundle(Number(e.target.value) || 0)}
							className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
							placeholder="Contoh: 5"
						/>
					</div>

					<div className="space-y-2">
						<label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
							Jumlah Bundle
						</label>
						<input
							type="number"
							min={0}
							value={jumlahBundle || ""}
							onChange={(e) => setJumlahBundle(Number(e.target.value) || 0)}
							className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
							placeholder="Contoh: 2"
						/>
					</div>

					<div className="space-y-2">
						<label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
							Aksi
						</label>
						<button
							type="button"
							onClick={handleSubmitBundling}
							className="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
						>
							Submit Bundling
						</button>
					</div>
				</div>

				{isAbove100k ? (
					<div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3">
						<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
							Harga Per Bundle Di Atas Rp 100.000
						</p>
						<label className="mb-1 block text-xs font-semibold text-slate-600">
							Pilih Kategori
						</label>
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
						>
							{kategoriOptions.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</select>
					</div>
				) : (
					<div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-3">
						<p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
							Sticker
						</p>
						<p className="mt-1 text-sm font-semibold text-slate-700">
							{stickerInfo.type} ({stickerInfo.color})
						</p>
					</div>
				)}

				{errorMessage && (
					<p className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
						{errorMessage}
					</p>
				)}
			</section>
<section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
					<CardKeyValueHorizontal
						title="Data SKU Asal"
						items={[
							{ label: "Barcode", value: dataProduk.barcode },
							{ label: "Nama", value: dataProduk.nama },
							{ label: "Item Awal", value: dataProduk.qtyAwal },
							{ label: "Harga Asal / Item", value: formatRupiah(dataProduk.hargaAsalSatuan) },
						]}
					/>

					<CardKeyValueHorizontal
						title="Hasil Kalkulasi Bundling"
						items={[
							{ label: "Produk Dipakai", value: totalProdukDipakai },
							{ label: "Sisa Produk", value: sisaProduk < 0 ? 0 : sisaProduk },
							{ label: "Harga Asal / Bundle", value: formatRupiah(hargaAsalPerBundle) },
							{ label: "Harga Gudang / Bundle", value: formatRupiah(hargaGudangPerBundle) },
						]}
					/>
				</section>
{isSubmitted && generatedBarcodes.length > 0 && (
				<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
					<h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
						Barcode Bundle Siap Print
					</h3>
					<p className="mb-4 mt-1 text-xs text-slate-500">
						Jumlah barcode mengikuti jumlah bundle: {generatedBarcodes.length} barcode.
					</p>

					<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
						{generatedBarcodes.map((item, index) => (
							<div
								key={item.id}
								className="rounded-lg border border-slate-200 bg-slate-50 p-4"
							>
								<p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
									Bundle {index + 1}
								</p>
								<p className="mt-1 font-mono text-sm font-bold text-slate-700">{item.code}</p>
								<p className="mt-2 font-mono text-xs tracking-widest text-slate-500">
									|||| ||| || |||| ||| ||||
								</p>

								<button
									type="button"
									onClick={() => handleOpenBarcodeModal(item.code)}
									className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
								>
									<Printer size={14} />
									Preview Barcode
								</button>
							</div>
						))}
					</div>
				</section>
			)}

			<BarcodeModal
				isOpen={isBarcodeModalOpen}
				onClose={handleCloseBarcodeModal}
				barcode={activeBarcode}
				categoryName={isAbove100k ? activeCategory.name : ""}
				discount={isAbove100k ? activeCategory.marginPercent : 0}
				namaBarang={dataProduk.nama}
				hargaRetail={hargaAsalPerBundle}
				hargaDiskon={hargaGudangPerBundle}
			/>
		</div>
	);
}
