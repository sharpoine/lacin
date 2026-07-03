import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: {
      published: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-slate-900">
      <main>
        <section className="border-b border-black/5 bg-white/60">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.3em] text-[#8d6e45]">
                Yazılar
              </div>
              <h1 className="mt-5 font-serif text-5xl leading-tight md:text-6xl">
                Hukuki makaleler ve güncel değerlendirmeler.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Farklı hukuk dallarına ilişkin makaleler, yargıtay kararı incelemeleri
                ve hukuki süreçlere dair bilgilendirici içerikler.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/yazilar/${post.slug}`}
                  className="group rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.08)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-mono">
                        {new Date(post.createdAt).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                    <h2 className="mt-5 font-serif text-2xl font-bold leading-snug group-hover:text-[#8d6e45] transition-colors line-clamp-3">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8d6e45] group-hover:text-slate-900 transition-colors">
                      Devamını Oku
                    </span>
                    <span className="text-[#8d6e45] group-hover:translate-x-1 transition-transform group-hover:text-slate-900">
                      →
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-500 font-serif text-xl">Henüz yayınlanmış bir yazı bulunmuyor.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
