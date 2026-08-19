import AdminTopBar from "@/components/admin/AdminTopBar";
import CarForm from "@/components/admin/CarForm";

// Photo uploads can take a few seconds on slower connections — give the
// save action more headroom than the platform default.
export const maxDuration = 60;

export default function NewCarPage() {
  return (
    <div>
      <AdminTopBar title="Nový vůz" />
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <h1 className="font-display text-2xl text-graphite">Přidat nový vůz</h1>
        <div className="mt-8">
          <CarForm />
        </div>
      </div>
    </div>
  );
}
