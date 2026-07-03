import { prisma } from "@/lib/prisma"

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-slate-900">
      <main>
        {/* HERO */}
        <section className="border-b border-black/5 bg-white/60">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.3em] text-[#8d6e45]">
                Çalışma Alanları
              </div>
              <h1 className="mt-4 font-serif text-5xl leading-tight">
                Hukuki hizmet alanları
              </h1>
              <p className="mt-6 text-lg text-slate-600">
                Farklı hukuki ihtiyaçlara yönelik çalışma alanları ve süreçler hakkında genel bilgilendirme.
              </p>
            </div>
          </div>
        </section>

        {/* LIST */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`/calisma-alanlari/${service.slug}`}
                className="rounded-[1.75rem] border border-black/5 bg-white p-8 shadow hover:-translate-y-1 transition"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Hizmet Alanı
                </div>
                <h2 className="mt-4 font-serif text-2xl">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm text-slate-600">
                  {service.text}
                </p>
                <div className="mt-6 text-sm text-[#8d6e45]">
                  Detayları incele →
                </div>
              </a>
            ))}
            
            {services.length === 0 && (
              <div className="col-span-full py-10 text-slate-500 font-serif">
                Henüz bir çalışma alanı eklenmemiş.
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}