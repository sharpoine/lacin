import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug }
  })

  if (!post || !post.published) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-slate-900">
      <main>
        <article className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-24">
          <header className="mb-16 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-[#8d6e45] mb-6 font-mono">
              {new Date(post.createdAt).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <h1 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl text-slate-900">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-lg mx-auto prose-headings:font-serif prose-headings:text-slate-900 prose-a:text-[#8d6e45] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl"
               dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </article>
      </main>
    </div>
  )
}
