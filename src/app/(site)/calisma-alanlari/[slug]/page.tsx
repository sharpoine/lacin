import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const service = await prisma.service.findUnique({
    where: { slug }
  })

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-slate-900">
      <main>
        <section className="border-b border-black/5 bg-white/60">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <div className="max-w-3xl">
              <Link href="/calisma-alanlari" className="text-xs uppercase tracking-[0.3em] text-slate-500 hover:text-[#8d6e45] transition-colors mb-6 inline-flex items-center gap-2">
                ← Tüm Çalışma Alanları
              </Link>
              <h1 className="mt-5 font-serif text-5xl leading-tight md:text-6xl text-slate-900">
                {service.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="max-w-4xl bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_80px_rgba(15,23,42,0.05)] border border-black/5">
            <div className="prose prose-lg mx-auto prose-headings:font-serif prose-headings:text-slate-900 prose-a:text-[#8d6e45] prose-a:no-underline hover:prose-a:underline prose-p:text-slate-600 prose-p:leading-relaxed"
                 dangerouslySetInnerHTML={{ __html: service.text || "" }}
            />
          </div>
        </section>
      </main>
    </div>
  )
}
