export default function Hero() {
    return (
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-28">
            <div className="flex flex-col justify-center">
                <div className="mb-4 text-xs uppercase tracking-[0.3em] text-[#8d6e45] animate-fade-in-up">
                    Konya Barosu’na Kayıtlı Avukat
                </div>
                <h1 className="max-w-3xl font-serif text-5xl leading-tight md:text-6xl animate-fade-in-up delay-100">
                    Hukuki süreçlerde sade, güven veren ve kurumsal bir yaklaşım.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 animate-fade-in-up delay-200">
                    Aile hukuku, iş hukuku ve ticaret hukuku alanlarında genel bilgilendirme,
                    hukuki danışmanlık ve avukatlık hizmeti sunan modern bir hukuk ofisi.
                </p>
                <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up delay-300">
                    <a
                        href="#alanlar"
                        className="rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-1 hover:shadow-slate-900/30"
                    >
                        Çalışma Alanlarını İncele
                    </a>
                    <a
                        href="#yazilar"
                        className="rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
                    >
                        Yazılara Göz At
                    </a>
                </div>
            </div>

            <div className="relative animate-fade-in-up delay-200 group">
                <div className="absolute -left-6 top-8 h-32 w-32 rounded-full bg-[#c8a977]/30 blur-3xl transition-all group-hover:scale-125" />
                <div className="absolute -bottom-8 right-8 h-40 w-40 rounded-full bg-slate-400/20 blur-3xl transition-all group-hover:scale-125" />
                <div className="relative overflow-hidden rounded-[2rem] glass-card transition-all duration-500 hover:shadow-[0_24px_100px_rgba(15,23,42,0.12)] hover:-translate-y-2">
                    <div className="border-b border-black/5 px-8 py-6 bg-white/50">
                        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Ofis Profili</div>
                        <div className="mt-3 font-serif text-3xl text-slate-900">Kurumsal ve Zamansız Görünüm</div>
                    </div>
                    <div className="space-y-6 px-8 py-8 text-sm leading-7 text-slate-600">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-2xl bg-white/60 p-4 shadow-sm border border-slate-100 transition-transform hover:scale-105 cursor-default">
                                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Çalışma Alanı</div>
                                <div className="mt-2 text-base font-medium text-slate-900">Aile Hukuku</div>
                            </div>
                            <div className="rounded-2xl bg-white/60 p-4 shadow-sm border border-slate-100 transition-transform hover:scale-105 cursor-default">
                                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Dil</div>
                                <div className="mt-2 text-base font-medium text-slate-900">Türkçe / English</div>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-[#d6c2a0]/60 bg-[#fbf8f1]/80 p-6 shadow-sm transition-transform hover:scale-105 cursor-default">
                            <div className="text-xs uppercase tracking-[0.25em] text-[#8d6e45]">Yayın Modülü</div>
                            <p className="mt-3 text-base leading-7 text-slate-700">
                                Sitede düzenli olarak yayımlanan hukuki bilgilendirme yazıları ile hem güven
                                oluşturulur hem de görünürlük desteklenir.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-xl transition-transform hover:scale-105 cursor-default">
                            <div className="text-xs uppercase tracking-[0.25em] text-white/60">İletişim Alanı</div>
                            <div className="mt-3 text-2xl font-serif">Ofis Bilgileri ve Form</div>
                            <p className="mt-3 text-sm leading-7 text-white/75">
                                Basit, güven veren ve abartısız iletişim kurgusu.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
