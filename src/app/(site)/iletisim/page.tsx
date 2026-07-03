import { prisma } from "@/lib/prisma"

export default async function ContactPage() {
  const settingsRecords = await prisma.setting.findMany()
  const settings = settingsRecords.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>)
  
  const phone = settings.phone || "+90 (332) 000 00 00"
  const email = settings.email || "info@emrelacin.av.tr"
  const address = settings.address || "Adliye Karşısı, Hukuk Plaza Kat: 3 No: 12\nKaratay, Konya"

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-slate-900">
      <main>
        <section className="border-b border-black/5 bg-white/60">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.3em] text-[#8d6e45]">
                İletişim
              </div>
              <h1 className="mt-5 font-serif text-5xl leading-tight md:text-6xl">
                Bize ulaşın
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Hukuki danışmanlık, süreç takibi veya genel bilgi almak için iletişim
                kanallarımızdan bizimle bağlantı kurabilirsiniz.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            
            {/* Contact Info */}
            <div className="space-y-10">
              <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">
                <div className="text-xs uppercase tracking-[0.25em] text-[#8d6e45] mb-6">
                  İletişim Bilgileri
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Adres</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                      {address}
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-slate-100" />
                  
                  <div>
                    <div className="text-sm font-bold text-slate-900">Telefon</div>
                    <div className="mt-2 text-sm text-slate-600">
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#8d6e45] transition">{phone}</a>
                    </div>
                  </div>

                  <div className="h-px w-full bg-slate-100" />
                  
                  <div>
                    <div className="text-sm font-bold text-slate-900">E-Posta</div>
                    <div className="mt-2 text-sm text-slate-600">
                      <a href={`mailto:${email}`} className="hover:text-[#8d6e45] transition">{email}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-[2rem] border border-black/5 bg-white p-8 lg:p-12 shadow-[0_20px_80px_rgba(15,23,42,0.05)]">
              <div className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-8">
                Mesaj Gönderin
              </div>
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Ad Soyad</label>
                    <input 
                      type="text" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#8d6e45] focus:outline-none focus:ring-1 focus:ring-[#8d6e45] transition"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">E-Posta</label>
                    <input 
                      type="email" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#8d6e45] focus:outline-none focus:ring-1 focus:ring-[#8d6e45] transition"
                      placeholder="E-posta adresiniz"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Konu</label>
                  <input 
                    type="text" 
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#8d6e45] focus:outline-none focus:ring-1 focus:ring-[#8d6e45] transition"
                    placeholder="Görüşme talebi, danışmanlık vs."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Mesajınız</label>
                  <textarea 
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-[#8d6e45] focus:outline-none focus:ring-1 focus:ring-[#8d6e45] transition"
                    placeholder="Detaylı mesajınızı buraya yazabilirsiniz..."
                  />
                </div>

                <button 
                  type="button"
                  className="w-full rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-[#8d6e45]"
                >
                  Mesajı Gönder
                </button>
              </form>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
