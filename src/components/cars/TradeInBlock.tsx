import Link from "next/link";

export default function TradeInBlock() {
  return (
    <div className="flex flex-col items-start gap-5 border border-stone-200 bg-stone-50 p-6 sm:p-8">
      <div>
        <h3 className="font-display text-xl text-graphite">Máte vlastní auto?</h3>
        <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-graphite-soft">
          Váš současný vůz můžeme vykoupit nebo použít jako protiúčet při
          nákupu nového.
        </p>
      </div>
      <Link
        href="/vykup-vozidel"
        className="inline-flex shrink-0 items-center justify-center bg-accent px-6 py-3 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-graphite"
      >
        Nabídnout vůz
      </Link>
    </div>
  );
}
