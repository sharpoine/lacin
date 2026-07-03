export default function Contact({ address, phone, email }: { address?: string, phone?: string, email?: string }) {
    const displayAddress = address || "Adliye Karşısı, Hukuk Plaza Kat: 3 No: 12, Karatay, Konya"
    const displayPhone = phone || "+90 (332) 000 00 00"
    const displayEmail = email || "info@emrelacin.av.tr"

    return (
        <section id="iletisim" className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <div className="grid overflow-hidden rounded-[2rem] border border-black/5 bg-slate-900 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)] lg:grid-cols-[0.95fr_1.05fr]">
                <div className="p-8 lg:p-12">
                    <div className="text-xs uppercase tracking-[0.3em] text-[#d2b48c]">İletişim</div>
                    <h2 className="mt-4 font-serif text-4xl">Görüşme talebi için iletişim bırakın</h2>
                    <div className="mt-8 space-y-4 text-sm leading-7 text-white/75">
                        <p className="whitespace-pre-wrap"><span className="font-bold">Adres:</span><br/>{displayAddress}</p>
                        <p><span className="font-bold">Telefon:</span><br/><a href={`tel:${displayPhone.replace(/\s+/g, '')}`} className="hover:text-white transition">{displayPhone}</a></p>
                        <p><span className="font-bold">E-posta:</span><br/><a href={`mailto:${displayEmail}`} className="hover:text-white transition">{displayEmail}</a></p>
                    </div>
                </div>
                <div className="bg-white p-8 text-slate-900 lg:p-12">
                    <div className="grid gap-4">
                        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-1 focus:ring-[#8d6e45]" placeholder="Ad Soyad" />
                        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-1 focus:ring-[#8d6e45]" placeholder="Telefon veya E-posta" />
                        <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-1 focus:ring-[#8d6e45]" placeholder="Konu" />
                        <textarea className="min-h-[140px] rounded-2xl border border-slate-200 px-4 py-3 outline-none resize-none focus:ring-1 focus:ring-[#8d6e45]" placeholder="Mesajınız" />
                        <label className="flex items-start gap-3 text-sm leading-6 text-slate-500">
                            <input type="checkbox" className="mt-1 accent-[#8d6e45]" />
                            <span>Kişisel verilerimin iletişim amacıyla işlenmesine ilişkin bilgilendirmeyi okudum.</span>
                        </label>
                        <button className="rounded-full bg-slate-900 px-6 py-3 text-sm text-white transition hover:opacity-90 font-bold hover:bg-[#8d6e45]">
                            Mesaj Gönder
                        </button>
                    </div>
                </div>
            </div>
        </section>)
}