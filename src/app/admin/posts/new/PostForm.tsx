"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TiptapEditor from "@/components/admin/TiptapEditor"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useTransition } from "react"

export default function PostForm({ action }: { action: (formData: FormData) => Promise<{ success: boolean; error?: string } | void> }) {
    const [content, setContent] = useState("")
    const [isMounted, setIsMounted] = useState(false)
    const [isPending, startTransition] = useTransition()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Genel")
    const [tags, setTags] = useState("")

    useEffect(() => {
        setIsMounted(true)
    }, [])
    useEffect(() => {
        const handleEvent = () => {
            handlePreview()
        }
        window.addEventListener('preview-flag', handleEvent)
        return () => window.removeEventListener('preview-flag', handleEvent)
    }, [title, description, content, category, tags])

    const handlePreview = () => {
        localStorage.setItem("preview_post", JSON.stringify({
            title,
            description,
            content,
            category,
            tags
        }))
    }
    const handleFormAction = async (formData: FormData) => {
        startTransition(async () => {
            // Because Tiptap is a rich text editor and doesn't output to a native form input by default if not bound
            formData.set("content", content)
            const res = await action(formData)
            if (res && !res.success) {
                toast.error(res.error || "Bir hata oluştu.")
            }
        })
    }

    return (
        <form action={handleFormAction} className="grid gap-8 lg:grid-cols-[1fr_340px] animate-fade-in-up pb-10">
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.04)] relative overflow-hidden">
                <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-[#d6c2a0]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-serif font-bold text-slate-900">İçerik Editörü</h2>
                        <p className="text-sm text-slate-500 mt-1">Yazı başlığını, özetini ve gövdesini oluşturun.</p>
                    </div>
                </div>

                <div className="mb-8 group">
                    <Label className="mb-3 block text-sm font-semibold text-slate-700 group-focus-within:text-[#8d6e45] transition-colors">
                        Başlık
                    </Label>
                    <Input
                        type="text"
                        name="title"
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Örn: Boşanma Davalarında Mal Paylaşımı"
                        className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 text-lg font-semibold text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#8d6e45] focus-visible:bg-white focus-visible:border-transparent transition-all outline-none"
                    />
                </div>

                <div className="mb-8 group">
                    <Label className="mb-3 block text-sm font-semibold text-slate-700 group-focus-within:text-[#8d6e45] transition-colors">
                        Kısa Açıklama
                    </Label>
                    <textarea
                        name="description"
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Blog listelemesinde görünecek 1-2 cümlelik özet..."
                        className="min-h-[100px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#8d6e45] focus:bg-white focus:border-transparent transition-all leading-relaxed"
                    />
                </div>

                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <Label className="block text-sm font-semibold text-slate-700">
                            İçerik (Zengin Metin)
                        </Label>
                    </div>
                    <div className="rounded-2xl border border-slate-200 shadow-sm min-h-[500px] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#8d6e45] focus-within:border-transparent transition-all">
                        {isMounted && (
                            <TiptapEditor
                                content={content}
                                onChange={(val) => setContent(val || "")}
                            />
                        )}
                    </div>
                </div>
            </div>

            <aside className="space-y-6">
                <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.04)] animate-fade-in-up delay-100">
                    <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2 mb-6">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8d6e45]"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                        Yayın Ayarları
                    </h2>

                    <div className="space-y-5">
                        <div className="group">
                            <Label className="mb-2 block text-sm font-semibold text-slate-700 group-focus-within:text-[#8d6e45] transition-colors">
                                Kategori
                            </Label>
                            <Input
                                name="category"
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Örn: Aile Hukuku"
                                className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 shadow-none focus-visible:ring-2 focus-visible:ring-[#8d6e45] focus-visible:bg-white focus-visible:border-transparent transition-all outline-none text-slate-800"
                            />
                        </div>

                        <div className="group">
                            <Label className="mb-2 block text-sm font-semibold text-slate-700 group-focus-within:text-[#8d6e45] transition-colors">
                                Etiketler
                            </Label>
                            <Input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="boşanma, nafaka"
                                className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 shadow-none focus-visible:ring-2 focus-visible:ring-[#8d6e45] focus-visible:bg-white focus-visible:border-transparent transition-all outline-none text-slate-800"
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-white shadow-xl shadow-slate-900/10 animate-fade-in-up delay-200 border border-slate-800 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8a977]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="relative z-10">
                        <h2 className="text-xl font-serif font-bold text-[#d6c2a0]">Yayınla</h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                            İçeriğiniz hazırsa yayınlayabilir veya daha sonra devam etmek için taslak olarak kaydedebilirsiniz.
                        </p>

                        <div className="mt-8 space-y-4">
                            <button
                                disabled={isPending}
                                className={`w-full flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-sm 
                                    font-bold text-white transition-all hover:bg-white/10 hover:-translate-y-0.5
                                    ${isPending ? 'animate-pulse cursor-not-allowed opacity-60' : ''}`}
                                name="published" value="0" type="submit"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                                Taslak Olarak Kaydet
                            </button>

                            <button
                                disabled={isPending}
                                className={`w-full flex items-center justify-center gap-2 rounded-2xl bg-[#8d6e45] px-5 py-4 text-sm 
                                    font-bold text-white transition-all hover:bg-[#725633] shadow-lg shadow-[#8d6e45]/20 hover:shadow-xl hover:-translate-y-0.5
                                    ${isPending ? 'animate-pulse cursor-not-allowed opacity-60' : ''}`}
                                name="published" value="1" type="submit"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                                Hemen Yayınla
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </form>
    )
}