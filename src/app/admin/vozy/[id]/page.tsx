import { notFound } from "next/navigation";
import { getCarById } from "@/lib/cars-data";
import { getEquipmentOptions } from "@/lib/equipmentOptions";
import { displayName } from "@/lib/utils";
import AdminTopBar from "@/components/admin/AdminTopBar";
import CarForm from "@/components/admin/CarForm";

// Photo uploads can take a few seconds on slower connections — give the
// save action more headroom than the platform default.
export const maxDuration = 60;

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [car, equipmentOptions] = await Promise.all([getCarById(id), getEquipmentOptions()]);
  if (!car) notFound();

  return (
    <div>
      <AdminTopBar title="Úprava vozu" />
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <h1 className="font-display text-2xl text-graphite">{displayName(car)}</h1>
        <div className="mt-8">
          <CarForm car={car} equipmentOptions={equipmentOptions} />
        </div>
      </div>
    </div>
  );
}
