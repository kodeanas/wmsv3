import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const cashierOnDuty = "";

export default function CashierLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-slate-50 flex flex-col">
			<header className="sticky top-0 z-100 border-b border-blue-200 bg-linear-to-r from-blue-500 via-blue-500 to-blue-400 text-white shadow-lg bg-white shadow-blue-500/10">
				<div className="mx-auto flex w-full max-w-400 items-center justify-between px-6 py-4 lg:px-8">
					<div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white px-4 py-2.5 text-blue-700 shadow-sm">
						<span className="text-2xl font-black tracking-tighter flex items-center text-slate-900">
							LIQUID<span className="text-blue-500 text-3xl">8</span>
						</span>
						<div className="leading-tight">
							<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">
								Kasir Berjaga
							</p>
							<p className="min-h-5 text-sm font-bold text-slate-800">
								{cashierOnDuty || "-"}
							</p>
						</div>
					</div>

					<Link
						href="/reguler-sales"
						className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-50"
					>
						<ArrowLeft size={16} />
						Kembali
					</Link>
				</div>
			</header>

			<main className="mx-auto w-full max-w-400 flex-1 px-6 pt-8 pb-16 lg:px-8 lg:pt-10 lg:pb-20">
				{children}
			</main>

			<footer className="border-t border-slate-200 bg-white/80">
				<div className="mx-auto w-full max-w-400 px-6 py-4 text-center text-xs text-slate-500 lg:px-8">
					© 2026 Reserved bla bla bla
				</div>
			</footer>
		</div>
	);
}
