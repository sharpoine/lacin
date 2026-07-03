import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export default async function ServicesAdminPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' }
  })

  async function addService(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const text = formData.get("text") as string
    
    const slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
    
    await prisma.service.create({
      data: {
        title,
        text,
        slug
      }
    })
    revalidatePath("/admin/services")
  }

  async function deleteService(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    await prisma.service.delete({ where: { id } })
    revalidatePath("/admin/services")
  }

  return (
    <div className="w-full text-slate-800 font-sans relative antialiased px-2 pb-10">
      <div className="mb-10 animate-fade-in-up">
          <h1 className="text-4xl font-serif font-extrabold tracking-tight text-slate-900">
            Çalışma Alanları
          </h1>
          <p className="text-sm text-slate-500 mt-2">Sitede görünecek çalışma alanlarını yönetin.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div className="bg-white p-8 rounded-[2rem] shadow-[0_16px_40px_rgba(15,23,42,0.04)] border border-slate-100 animate-fade-in-up delay-100 h-max">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-[#d6c2a0]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <h2 className="text-xl font-serif font-bold text-slate-900">Yeni Hizmet Ekle</h2>
          </div>
          <form action={addService} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Başlık</label>
              <input type="text" name="title" required className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none" placeholder="Örn: Aile Hukuku" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Açıklama</label>
              <textarea name="text" required className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none resize-none" placeholder="Hizmetin kapsamı ve detayları..."></textarea>
            </div>
            <button type="submit" className="w-full h-12 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-[#8d6e45] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              Hizmeti Kaydet
            </button>
          </form>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-[0_16px_40px_rgba(15,23,42,0.04)] border border-slate-100 h-max max-h-[800px] overflow-y-auto animate-fade-in-up delay-200 custom-scrollbar">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#fbf8f1] border border-[#d6c2a0] flex items-center justify-center text-[#8d6e45]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </div>
            <h2 className="text-xl font-serif font-bold text-slate-900">Mevcut Hizmetler</h2>
          </div>
          
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={service.id} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start group hover:border-[#d6c2a0] hover:shadow-md transition-all animate-fade-in-up" style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#8d6e45] transition-colors">{service.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">{service.text}</p>
                </div>
                <form action={deleteService} className="shrink-0">
                  <input type="hidden" name="id" value={service.id} />
                  <button type="submit" title="Sil" className="w-9 h-9 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500 bg-red-50 rounded-lg transition-all duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </form>
              </div>
            ))}
            {services.length === 0 && (
              <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                <p className="text-slate-500 text-sm">Hiç hizmet bulunamadı. Sol taraftan ekleyebilirsiniz.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
