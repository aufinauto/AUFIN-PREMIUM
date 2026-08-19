import Link from "next/link";
import { getAllCars } from "@/lib/cars-data";
import { displayName, formatPrice, statusLabels } from "@/lib/utils";
import PhotoImage from "@/components/ui/PhotoImage";
import AdminTopBar from "@/components/admin/AdminTopBar";
import DeleteCarButton from "@/components/admin/DeleteCarButton";

export default async function AdminDashboardPage() {
  const cars = await getAllCars();

  return (
    <div>
      <AdminTopBar title="Vozy" />

      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-2xl text-graphite">
            Vozy v nabídce ({cars.length})
          </h1>
          <Link
            href="/admin/vozy/novy"
            className="bg-graphite px-5 py-2.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent"
          >
            + Přidat vůz
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto border border-stone-200 bg-white">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-stone-200 font-sans text-xs uppercase tracking-[0.1em] text-graphite-faint">
                <th className="px-4 py-3 font-normal">Vůz</th>
                <th className="px-4 py-3 font-normal">Cena</th>
                <th className="px-4 py-3 font-normal">Stav</th>
                <th className="px-4 py-3 font-normal">Homepage</th>
                <th className="px-4 py-3 font-normal" />
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="border-b border-stone-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden bg-stone-100">
                        {car.photos[0] ? (
                          <PhotoImage src={car.photos[0]} alt="" sizes="64px" className="h-full w-full" />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-sans text-sm text-graphite">{displayName(car)}</p>
                        <p className="font-sans text-xs text-graphite-faint">{car.year}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-graphite">
                    {formatPrice(car.price)}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-graphite-soft">
                    {statusLabels[car.status]}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-graphite-soft">
                    {car.featured ? "Ano" : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/vozy/${car.id}`}
                        className="font-sans text-xs uppercase tracking-[0.08em] text-graphite-soft hover:text-graphite"
                      >
                        Upravit
                      </Link>
                      <DeleteCarButton id={car.id} label={displayName(car)} />
                    </div>
                  </td>
                </tr>
              ))}
              {cars.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center font-sans text-sm text-graphite-faint">
                    Zatím žádné vozy. Přidejte první přes tlačítko výše.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
