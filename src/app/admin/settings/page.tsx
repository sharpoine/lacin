import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { toast } from "sonner"

export default async function SettingsAdminPage() {
  const settingsRecords = await prisma.setting.findMany()
  const settings = settingsRecords.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>)

  async function saveSettings(formData: FormData) {
    "use server"
    
    const entries = Array.from(formData.entries())
    
    for (const [key, value] of entries) {
      if (typeof value === "string" && !key.startsWith("$")) {
        await prisma.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value }
        })
      }
    }
    
    revalidatePath("/admin/settings")
    revalidatePath("/iletisim")
    revalidatePath("/")
  }

  return (
    <div className="w-full text-slate-800 font-sans relative antialiased px-2 max-w-4xl pb-10">
      <div className="mb-10 animate-fade-in-up">
          <h1 className="text-4xl font-serif font-extrabold tracking-tight text-slate-900">Ayarlar</h1>
          <p className="text-sm text-slate-500 mt-2">Sitede kullanılacak iletişim ve genel bilgileri güncelleyin.</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_16px_40px_rgba(15,23,42,0.04)] border border-slate-100 animate-fade-in-up delay-100">
        <form action={saveSettings} className="space-y-8">
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-[#fbf8f1] border border-[#d6c2a0] flex items-center justify-center text-[#8d6e45]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-slate-900">İletişim Bilgileri</h2>
              <p className="text-sm text-slate-500 mt-1">Sitedeki formlar ve iletişim sayfasında görünecek veriler.</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-[#8d6e45] transition-colors">Telefon Numarası</label>
              <input type="text" name="phone" defaultValue={settings.phone || ""} className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none text-slate-800 text-lg" placeholder="+90 (332) 000 00 00" />
            </div>
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-[#8d6e45] transition-colors">E-Posta Adresi</label>
              <input type="email" name="email" defaultValue={settings.email || ""} className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none text-slate-800 text-lg" placeholder="info@emrelacin.av.tr" />
            </div>
            <div className="md:col-span-2 group">
              <label className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-[#8d6e45] transition-colors">Açık Adres</label>
              <textarea name="address" defaultValue={settings.address || ""} className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none resize-none text-slate-800 text-lg leading-relaxed" placeholder="Adliye Karşısı..."></textarea>
            </div>
          </div>
          
          <div className="pt-8 flex justify-end">
            <button type="submit" className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-[#8d6e45] transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-md hover:-translate-y-1">
              Ayarları Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
