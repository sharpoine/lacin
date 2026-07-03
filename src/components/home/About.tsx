import Link from "next/link";

export default function About() {
    return (
        <section id="hakkinda" className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <div className="grid gap-8 rounded-[2rem] border border-black/5 bg-gradient-to-br from-white to-[#fbf8f1] p-8 
            shadow-[0_20px_80px_rgba(15,23,42,0.06)] lg:grid-cols-[0.9fr_1.1fr] lg:p-14 relative overflow-hidden group hover:shadow-[0_24px_100px_rgba(15,23,42,0.09)] transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8a977]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <div className="w-8 h-px bg-[#8d6e45]"></div>
                        <div className="text-xs uppercase tracking-[0.3em] text-[#8d6e45] font-semibold">Hakkında</div>
                    </div>
                    <h2 className="mt-2 font-serif text-4xl lg:text-5xl leading-tight text-slate-900">Mesleki ciddiyet, <span className="text-[#8d6e45] italic">sade iletişim</span>, güven veren dil.</h2>
                </div>
                <div className="flex flex-col gap-6 relative z-10 lg:pt-8">
                    <div className="space-y-5 text-lg leading-relaxed text-slate-600">
                        <p>
                            Bu bölümde avukatın eğitim geçmişi, baro kaydı, çalışma alanları, mesleğe başlama yılı
                            ve genel yaklaşımı kurumsal bir dille sunulur.
                        </p>
                        <p>
                            Amaç abartılı iddialar değil; netlik, erişilebilirlik ve mesleki güven duygusudur.
                        </p>
                    </div>
                    <Link href="hakkinda" className="mt-4 text-sm font-bold text-[#8d6e45] hover:text-[#6d4c30] self-start flex items-center gap-2 group/link">
                        Daha fazla bilgi <span className="group-hover/link:translate-x-2 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}