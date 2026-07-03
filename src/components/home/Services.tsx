import Link from "next/link"

export default function Services({services}: {services: {title: string, text: string, slug: string}[]}) {
    return (<section id="alanlar" className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="flex items-end justify-between gap-6 mb-12">
            <div className="animate-fade-in-up">
                <div className="text-xs uppercase tracking-[0.3em] text-[#8d6e45] font-semibold">Çalışma Alanları</div>
                <h2 className="mt-4 font-serif text-4xl lg:text-5xl">Uzmanlık alanları</h2>
            </div>
            <p className="hidden max-w-xl text-base leading-relaxed text-slate-500 md:block animate-fade-in-up delay-100">
                Müvekkillerimizin hukuki süreçlerini güvenle yönetmek için odaklandığımız temel uzmanlık alanlarımız.
            </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
                <Link
                    href={`/calisma-alanlari/${service.slug}`}
                    key={service.title}
                    className="group relative rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(15,23,42,0.08)] block overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8d6e45] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 group-hover:text-[#8d6e45] transition-colors">Hizmet Alanı</div>
                    <h3 className="mt-4 font-serif text-2xl lg:text-3xl group-hover:text-[#8d6e45] transition-colors text-slate-900">{service.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 line-clamp-3">{service.text}</p>
                    <div className="mt-8 text-sm font-medium text-[#8d6e45] group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">Detayları İncele <span>→</span></div>
                </Link>
            ))}
        </div>
    </section>)
}