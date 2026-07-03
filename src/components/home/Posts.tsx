import Link from "next/link"

export default function Posts({ posts }: { posts: { title: string, excerpt: string, date: string, slug: string }[] }) {
    return (
        <section id="yazilar" className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <div className="mb-10">
                <div className="text-xs uppercase tracking-[0.3em] text-[#8d6e45]">Yazılar</div>
                <h2 className="mt-4 font-serif text-4xl">Bilgilendirme odaklı makale alanı</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
                {posts.map((post) => (
                    <Link
                        href={`/yazilar/${post.slug}`}
                        key={post.title}
                        className="overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.08)] block group"
                    >
                        <div className="h-48 bg-[linear-gradient(135deg,#e9dfcf,#f7f4ee,#dfe5ec)]" />
                        <div className="p-7">
                            <div className="text-xs uppercase tracking-[0.25em] text-slate-400">{post.date}</div>
                            <h3 className="mt-4 font-serif text-2xl leading-snug group-hover:text-[#8d6e45] transition-colors line-clamp-2">{post.title}</h3>
                            <p className="mt-4 text-sm leading-7 text-slate-600 line-clamp-3">{post.excerpt}</p>
                            <div className="mt-6 text-sm text-[#8d6e45]">Yazıyı oku →</div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}