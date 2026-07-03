"use client"

import { useEffect, useState } from "react"
import { BookOpen, Calendar, Tag } from "lucide-react"

// Ortak Tasarım Bileşeni (Hem gerçek post hem önizleme kullanır)
export function PostLayout({ post }: {
    post: {
        title: string
        content: string
        description?: string | null
        category?: string
        tags?: string | null
        createdAt?: Date | string
    }
}) {
    const readingTime = Math.max(1, Math.ceil((post.content || "").trim().split(/\s+/).filter(Boolean).length / 200))
    const formattedDate = new Date(post.createdAt || new Date()).toLocaleDateString("tr-TR", {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <div className="min-h-screen bg-[#f7f4ee] text-slate-900 selection:bg-[#d6c2a0]/30">
            <main className="mx-auto max-w-4xl px-6 py-12 lg:px-10 lg:py-16">

                {/* Category & Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    {post.category && (
                        <span className="inline-flex items-center rounded-full bg-[#8d6e45]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8d6e45] border border-[#d6c2a0]/30 shadow-xs">
                            {post.category}
                        </span>
                    )}

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#8d6e45]" />
                            {formattedDate}
                        </span>
                        <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-[#8d6e45]" />
                            {readingTime} dk okuma
                        </span>
                    </div>
                </div>

                {/* Article Header */}
                <header className="mb-10">
                    <h1 className="font-serif text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl leading-tight">
                        {post.title || "Başlıksız Post"}
                    </h1>

                    {post.description && (
                        <div className="mt-6 border-l-4 border-[#8d6e45] bg-white/40 p-4 rounded-r-2xl shadow-xs">
                            <p className="text-base md:text-lg italic leading-relaxed text-slate-600">
                                {post.description}
                            </p>
                        </div>
                    )}
                </header>

                <hr className="my-8 border-slate-200" />

                {/* Article Content */}
                <article 
                    className="prose prose-slate max-w-none prose-headings:font-serif"
                    dangerouslySetInnerHTML={{ __html: post.content || "<p><em>Henüz içerik girilmedi.</em></p>" }}
                />

                {/* Tags */}
                {post.tags && post.tags.trim() && (
                    <div className="mt-12 border-t border-slate-200 pt-8">
                        <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-wider text-slate-400 font-bold">
                            <Tag className="w-3.5 h-3.5 text-[#8d6e45]" />
                            <span>Etiketler</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center rounded-lg bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200 shadow-2xs hover:bg-[#8d6e45]/5 hover:text-[#8d6e45] transition cursor-default"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

// Sadece Önizleme Sayfasında Çalışacak Client Component
export default function PostPreviewClient() {
    const [post, setPost] = useState<any>(null)

    useEffect(() => {
        try {
            const postData = JSON.parse(localStorage.getItem('preview_post') || '{}')
            if (postData && postData.title) {
                setPost(postData)
            }
        } catch (e) {
            console.warn("LocalStorage access blocked inside iframe. Waiting for postMessage...")
        }

        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return
            if (event.data && event.data.type === 'PREVIEW_DATA') {
                setPost(event.data.payload)
            }
        }

        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [])

    if (!post) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f4ee] text-slate-500 font-mono text-sm">
                Önizleme verisi bekleniyor...
            </div>
        )
    }

    return <PostLayout post={post} />
}
