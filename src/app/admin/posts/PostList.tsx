"use client"

import { useState, useEffect } from "react"
import { updatePostStatus, updatePost, deletePost, createPost } from "./actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { 
    Search, Plus, Pencil, Trash2, Eye, EyeOff, 
    Calendar, BookOpen, Check, X, FileText, ArrowRight
} from "lucide-react"
import TiptapEditor from "@/components/admin/TiptapEditor"

interface Post {
    id: string;
    title: string;
    description: string | null;
    published: boolean;
    content: string | null;
    slug: string;
    createdAt: Date;
}

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts: initialPosts }: PostListProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL")
    const [activePost, setActivePost] = useState<Post | null>(null)
    
    // Drawer states
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [drawerMode, setDrawerMode] = useState<"view" | "edit" | "new">("view")
    
    // Form states
    const [formTitle, setFormTitle] = useState("")
    const [formDescription, setFormDescription] = useState("")
    const [formContent, setFormContent] = useState("")
    const [formPublished, setFormPublished] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const router = useRouter()

    // Sync from props
    useEffect(() => {
        setPosts(initialPosts)
        setIsSaving(false)
        setDrawerOpen(false)
        if (activePost) {
            const updated = initialPosts.find(p => p.id === activePost.id)
            if (updated) {
                setActivePost(updated)
            } else {
                setActivePost(null)
            }
        }
    }, [initialPosts])

    // Calculate reading time helper
    const getReadingTime = (content: string | null) => {
        if (!content) return "1 dk"
        const words = content.trim().split(/\s+/).length
        const minutes = Math.ceil(words / 200)
        return `${minutes} dk okuma`
    }

    const openDrawer = (mode: "view" | "edit" | "new", post?: Post) => {
        setDrawerMode(mode)
        if (post) {
            setActivePost(post)
            setFormTitle(post.title)
            setFormDescription(post.description || "")
            setFormContent(post.content || "")
            setFormPublished(post.published)
        } else {
            setActivePost(null)
            setFormTitle("")
            setFormDescription("")
            setFormContent("")
            setFormPublished(false)
        }
        setDrawerOpen(true)
    }

    // Toggle publish status handler
    const handleToggleStatus = async (e: React.MouseEvent, post: Post) => {
        e.stopPropagation()
        const targetState = !post.published
        
        // Optimistic UI update
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, published: targetState } : p))
        if (activePost?.id === post.id) {
            setActivePost(prev => prev ? { ...prev, published: targetState } : null)
        }

        const res = await updatePostStatus(post.id, targetState)
        if (!res.success) {
            // Revert state on error
            setPosts(prev => prev.map(p => p.id === post.id ? { ...p, published: post.published } : p))
            if (activePost?.id === post.id) {
                setActivePost(prev => prev ? { ...prev, published: post.published } : null)
            }
            toast.error("Durum güncellenirken hata oluştu: " + res.error)
        } else {
            toast.success(targetState ? "Yazı yayına alındı." : "Yazı taslağa çekildi.")
        }
    }

    // Delete handler
    const handleDelete = async (e: React.MouseEvent, post: Post) => {
        e.stopPropagation()
        if (confirm(`"${post.title}" başlıklı yazıyı kalıcı olarak silmek istediğinizden emin misiniz?`)) {
            // Optimistic UI update
            setPosts(prev => prev.filter(p => p.id !== post.id))
            if (activePost?.id === post.id) {
                setDrawerOpen(false)
                setActivePost(null)
            }

            const res = await deletePost(post.id)
            if (!res.success) {
                setPosts(initialPosts)
                toast.error("Silme işlemi başarısız: " + res.error)
            } else {
                toast.success("Yazı başarıyla silindi.")
            }
        }
    }

    // Form submit handler
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formTitle.trim()) {
            toast.error("Lütfen bir başlık girin.")
            return
        }

        setIsSaving(true)

        if (drawerMode === "new") {
            const formData = new FormData()
            formData.append("title", formTitle)
            formData.append("description", formDescription)
            formData.append("content", formContent)
            formData.append("published", formPublished ? "1" : "0")
            formData.append("category", "Genel")

            const res = await createPost(formData)
            if (res && !res.success) {
                setIsSaving(false)
                toast.error("Oluşturma başarısız: " + res.error)
            } else {
                setIsSaving(false)
                setDrawerOpen(false)
                toast.success("Yazı başarıyla oluşturuldu!")
            }
        } else if (drawerMode === "edit" && activePost) {
            const res = await updatePost(activePost.id, formTitle, formDescription, formContent, formPublished)
            if (res.success) {
                setIsSaving(false)
                setPosts(prev => prev.map(p => p.id === activePost.id ? {
                    ...p,
                    title: formTitle,
                    description: formDescription,
                    content: formContent,
                    published: formPublished
                } : p))
                setActivePost(prev => prev && prev.id === activePost.id ? {
                    ...prev,
                    title: formTitle,
                    description: formDescription,
                    content: formContent,
                    published: formPublished
                } : prev)
                setDrawerMode("view")
                toast.success("Değişiklikler başarıyla kaydedildi.")
            } else {
                setIsSaving(false)
                toast.error("Güncelleme başarısız: " + res.error)
            }
        }
    }

    // Filters
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (post.description && post.description.toLowerCase().includes(searchQuery.toLowerCase()))
        
        const matchesStatus = statusFilter === "ALL" || 
                              (statusFilter === "PUBLISHED" && post.published) || 
                              (statusFilter === "DRAFT" && !post.published)

        return matchesSearch && matchesStatus
    })

    return (
        <div className="w-full min-h-[calc(100vh-80px)] text-slate-800 flex flex-col font-sans relative antialiased px-2">
            
            {/* Background design accents (organic warmth) */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#d6c2a0_1px,transparent_1.5px)] bg-[size:32px_32px] opacity-35" />

            {/* Top Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 border-b border-[#d6c2a0]/60 mb-8 relative">
                <div>
                    <h1 className="text-3xl font-serif font-extrabold tracking-tight text-[#8d6e45]">Yazılar</h1>
                    <p className="text-sm text-slate-600 mt-1">İçeriklerinizi yönetin, yayınlayın ve yeni yazılar ekleyin.</p>
                </div>
                
                <button
                    onClick={() => openDrawer("new")}
                    className="flex items-center justify-center gap-2 bg-[#fbf8f1] hover:bg-[#8d6e45] text-[#8d6e45] hover:text-white border border-[#d6c2a0] rounded-full shadow-sm hover:shadow-md transition-all duration-300 font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>Yeni Yazı Ekle</span>
                </button>
            </div>

            {/* Filter Dashboard Section */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                {/* Search Bar */}
                <div className="relative w-full md:max-w-md">
                    <Search className="w-4 h-4 text-[#8d6e45]/70 absolute left-3.5 top-3" />
                    <input 
                        type="text"
                        placeholder="Yazı başlığı veya açıklama ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 bg-[#fbf8f1] border border-[#d6c2a0]/70 rounded-full pl-10 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#8d6e45] focus:bg-[#fbf8f1] transition duration-200 shadow-xs"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-[#fbf8f1] border border-[#d6c2a0]/70 p-1 rounded-full shadow-xs">
                    <button
                        onClick={() => setStatusFilter("ALL")}
                        className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition cursor-pointer
                            ${statusFilter === "ALL" 
                                ? "bg-[#8d6e45] text-white shadow-sm font-bold" 
                                : "text-[#8d6e45]/80 hover:text-[#8d6e45] hover:bg-[#8d6e45]/5"}`}
                    >
                        TÜMÜ ({posts.length})
                    </button>
                    <button
                        onClick={() => setStatusFilter("PUBLISHED")}
                        className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition cursor-pointer
                            ${statusFilter === "PUBLISHED" 
                                ? "bg-emerald-700 text-white shadow-sm font-bold" 
                                : "text-emerald-800 hover:bg-emerald-50"}`}
                    >
                        YAYINDA ({posts.filter(p => p.published).length})
                    </button>
                    <button
                        onClick={() => setStatusFilter("DRAFT")}
                        className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition cursor-pointer
                            ${statusFilter === "DRAFT" 
                                ? "bg-amber-700 text-white shadow-sm font-bold" 
                                : "text-amber-800 hover:bg-amber-50"}`}
                    >
                        TASLAK ({posts.filter(p => !p.published).length})
                    </button>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {filteredPosts.map((post) => {
                    const readingTime = getReadingTime(post.content)

                    return (
                            <div
                                key={post.id}
                                onClick={() => openDrawer("view", post)}
                                className="group bg-white border border-slate-100 hover:border-[#d6c2a0] rounded-3xl p-6 cursor-pointer transition-all duration-500 flex flex-col justify-between min-h-[240px] relative hover:shadow-[0_24px_60px_-15px_rgba(141,110,69,0.15)] hover:-translate-y-2 overflow-hidden animate-fade-in-up"
                                style={{ animationDelay: `${200}ms` }}
                            >
                                {/* Decorative top gradient line */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8d6e45] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

                                {/* Card Content Top */}
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-5">
                                        {/* Status Badge */}
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors
                                            ${post.published 
                                                ? "bg-emerald-50/80 text-emerald-700 border border-emerald-100 group-hover:bg-emerald-100/50" 
                                                : "bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-slate-100"}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${post.published ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}></span>
                                            {post.published ? "Yayında" : "Taslak"}
                                        </span>

                                        {/* Reading time */}
                                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 px-2 py-1 rounded-full group-hover:text-[#8d6e45] transition-colors">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            {readingTime}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#8d6e45] transition-colors duration-300 line-clamp-2 mb-3 leading-snug">
                                        {post.title}
                                    </h2>
                                    
                                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4 group-hover:text-slate-600 transition-colors">
                                        {post.description || "Yazıya ait bir açıklama veya özet girilmemiş."}
                                    </p>
                                </div>

                                {/* Card Content Bottom */}
                                <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-slate-300 group-hover:text-[#8d6e45]/50 transition-colors" />
                                        {new Date(post.createdAt).toLocaleDateString("tr-TR", { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>

                                    {/* Quick actions */}
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <button
                                            onClick={(e) => handleToggleStatus(e, post)}
                                            title={post.published ? "Taslağa Al" : "Yayınla"}
                                            className={`p-2 rounded-xl transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 
                                                ${post.published 
                                                    ? 'bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white' 
                                                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white'}`}
                                        >
                                            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); openDrawer("edit", post); }}
                                            title="Düzenle"
                                            className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-[#8d6e45] hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, post)}
                                            title="Sil"
                                            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                    )
                })}

                {filteredPosts.length === 0 && (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center border border-dashed border-[#d6c2a0]/70 rounded-2xl bg-[#fbf8f1]/50">
                        <FileText className="w-12 h-12 text-[#8d6e45]/40 mb-4" />
                        <span className="text-slate-700 text-sm font-serif font-bold">Yazı Bulunamadı</span>
                        <span className="text-slate-500 text-xs mt-1">Arama kriterlerinizi değiştirmeyi veya yeni bir yazı eklemeyi deneyin.</span>
                    </div>
                )}
            </div>

            {/* SIDE SLIDE-OUT DRAWER PANEL */}
            {drawerOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div 
                        onClick={() => setDrawerOpen(false)}
                        className="absolute inset-0 bg-slate-900/25 backdrop-blur-xs transition-opacity duration-300"
                    />

                    {/* Drawer Content */}
                    <div className="relative w-full max-w-xl bg-[#fbf8f1] border-l border-[#d6c2a0]/80 h-full flex flex-col shadow-2xl z-10 animate-[slideOver_0.3s_ease-out]">
                        <style>{`
                            @keyframes slideOver {
                                from { transform: translateX(100%); }
                                to { transform: translateX(0); }
                            }
                        `}</style>

                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#d6c2a0]/40">
                            <div>
                                <h3 className="text-lg font-serif font-bold text-[#8d6e45]">
                                    {drawerMode === "view" && "Yazı Detayı"}
                                    {drawerMode === "edit" && "Yazıyı Düzenle"}
                                    {drawerMode === "new" && "Yeni Yazı Oluştur"}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    {drawerMode === "view" && "Yazının tüm detaylarını inceleyin."}
                                    {drawerMode === "edit" && "Seçili yazının ayarlarını güncelleyin."}
                                    {drawerMode === "new" && "Yazı içeriğini ve yayın durumunu girin."}
                                </p>
                            </div>
                            
                            <button 
                                onClick={() => setDrawerOpen(false)}
                                className="p-2 text-slate-400 hover:text-[#8d6e45] rounded-full hover:bg-[#8d6e45]/5 transition cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Drawer Body */}
                        <div className="flex-grow overflow-y-auto p-6 min-h-0">
                            
                            {/* VIEW MODE */}
                            {drawerMode === "view" && activePost && (
                                <div className="space-y-6">
                                    {/* Badges Info */}
                                    <div className="flex flex-wrap items-center gap-3 border-b border-[#d6c2a0]/40 pb-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border
                                            ${activePost.published 
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                                : "bg-slate-100 text-slate-600 border-slate-200"}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${activePost.published ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                                            {activePost.published ? "YAYINDA" : "TASLAK"}
                                        </span>
                                        
                                        <span className="text-xs text-slate-600 flex items-center gap-1.5 bg-[#8d6e45]/5 px-3 py-1 rounded-full border border-[#d6c2a0]/30 font-mono">
                                            <BookOpen className="w-4 h-4 text-[#8d6e45]" />
                                            {getReadingTime(activePost.content)}
                                        </span>

                                        <span className="text-xs text-slate-600 flex items-center gap-1.5 bg-[#8d6e45]/5 px-3 py-1 rounded-full border border-[#d6c2a0]/30 font-mono">
                                            <Calendar className="w-4 h-4 text-[#8d6e45]" />
                                            {new Date(activePost.createdAt).toLocaleString("tr-TR")}
                                        </span>
                                    </div>

                                    {/* Title & Slug */}
                                    <div className="space-y-2">
                                        <span className="text-[9px] font-mono font-bold text-[#8d6e45] uppercase tracking-widest block">YAZI BAŞLIĞI</span>
                                        <h2 className="text-2xl font-serif font-extrabold text-slate-900 leading-tight">{activePost.title}</h2>
                                        
                                        <div className="pt-2 flex items-center gap-1.5 text-xs">
                                            <span className="text-slate-500">Slug / Bağlantı:</span>
                                            <span className="font-mono text-[#8d6e45] bg-[#8d6e45]/5 px-2.5 py-0.5 rounded border border-[#d6c2a0] select-all">{activePost.slug}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="border-t border-[#d6c2a0]/40 pt-5">
                                        <span className="text-[9px] font-mono font-bold text-[#8d6e45] uppercase tracking-widest block mb-2">KISA AÇIKLAMA</span>
                                        <div className="bg-[#f7f4ee]/70 border border-[#d6c2a0]/50 p-4 rounded-xl text-slate-700 text-sm leading-relaxed">
                                            {activePost.description || "Açıklama girilmemiş."}
                                        </div>
                                    </div>

                                    {/* Content preview */}
                                    <div className="border-t border-[#d6c2a0]/40 pt-5">
                                        <span className="text-[9px] font-mono font-bold text-[#8d6e45] uppercase tracking-widest block mb-2">İÇERİK (HTML)</span>
                                        <div 
                                            className="bg-[#f7f4ee]/70 border border-[#d6c2a0]/50 p-4 rounded-xl text-slate-700 text-sm font-sans leading-relaxed max-h-72 overflow-y-auto prose prose-sm"
                                            dangerouslySetInnerHTML={{ __html: activePost.content || "İçerik girilmemiş." }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* EDIT & NEW MODE FORM */}
                            {(drawerMode === "edit" || drawerMode === "new") && (
                                <form onSubmit={handleSave} className="space-y-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-mono font-semibold text-slate-500">Yazı Başlığı</label>
                                        <input 
                                            type="text"
                                            required
                                            value={formTitle}
                                            onChange={(e) => setFormTitle(e.target.value)}
                                            placeholder="Başlık girin..."
                                            className="h-10 bg-[#f7f4ee]/50 border border-[#d6c2a0] text-slate-900 px-4 rounded-xl text-sm focus:outline-none focus:border-[#8d6e45] focus:bg-[#fbf8f1] transition duration-150"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-mono font-semibold text-slate-500">Kısa Açıklama (Özet)</label>
                                        <textarea 
                                            value={formDescription}
                                            onChange={(e) => setFormDescription(e.target.value)}
                                            placeholder="Sosyal medyada ve listelemede görünecek kısa açıklama..."
                                            className="h-20 bg-[#f7f4ee]/50 border border-[#d6c2a0] text-slate-900 p-4 rounded-xl text-sm focus:outline-none focus:border-[#8d6e45] focus:bg-[#fbf8f1] transition duration-150 resize-none"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-mono font-semibold text-slate-500">İçerik (Zengin Metin)</label>
                                        <TiptapEditor 
                                            content={formContent}
                                            onChange={(val) => setFormContent(val)}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 border border-[#d6c2a0]/80 p-4 rounded-xl bg-[#8d6e45]/5">
                                        <input 
                                            type="checkbox"
                                            id="form-published"
                                            checked={formPublished}
                                            onChange={(e) => setFormPublished(e.target.checked)}
                                            className="w-4.5 h-4.5 accent-[#8d6e45] rounded cursor-pointer"
                                        />
                                        <label htmlFor="form-published" className="text-sm text-slate-700 font-semibold cursor-pointer select-none">
                                            Doğrudan Yayına Al (Yayında olarak kaydet)
                                        </label>
                                    </div>
                                </form>
                            )}

                        </div>

                        {/* Drawer Footer Actions */}
                        <div className="p-6 border-t border-[#d6c2a0]/40 flex justify-end gap-3 flex-shrink-0 bg-[#f7f4ee]/50">
                            
                            {/* Actions for view mode */}
                            {drawerMode === "view" && activePost && (
                                <>
                                    <button
                                        onClick={() => openDrawer("edit", activePost)}
                                        className="h-10 px-4 bg-[#fbf8f1] hover:bg-[#8d6e45] border border-[#d6c2a0] text-[#8d6e45] hover:text-white font-mono text-xs uppercase tracking-wider rounded-xl transition duration-150 flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                        <span>Düzenle</span>
                                    </button>
                                    <button
                                        onClick={(e) => handleToggleStatus(e, activePost)}
                                        className={`h-10 px-4 border font-mono text-xs uppercase tracking-wider rounded-xl transition duration-150 flex items-center gap-1.5 cursor-pointer
                                            ${activePost.published 
                                                ? "bg-[#fbf8f1] border-[#d6c2a0] text-[#8d6e45] hover:bg-[#8d6e45]/10" 
                                                : "bg-[#8d6e45] border-transparent text-white hover:bg-[#725633]"}`}
                                    >
                                        {activePost.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        <span>{activePost.published ? "Taslağa Al" : "Yayınla"}</span>
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(e, activePost)}
                                        className="h-10 px-4 bg-red-50 hover:bg-red-700 border border-red-200 hover:border-transparent text-red-700 hover:text-white font-mono text-xs uppercase tracking-wider rounded-xl transition duration-150 flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Sil</span>
                                    </button>
                                </>
                            )}

                            {/* Actions for form mode */}
                            {(drawerMode === "edit" || drawerMode === "new") && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => drawerMode === "edit" ? setDrawerMode("view") : setDrawerOpen(false)}
                                        className="h-10 px-5 border border-[#d6c2a0] text-slate-600 hover:text-slate-800 font-mono text-xs uppercase rounded-xl transition duration-150 bg-[#fbf8f1] cursor-pointer"
                                    >
                                        İptal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        onClick={handleSave}
                                        className={`h-10 px-6 bg-[#8d6e45] hover:bg-[#725633] text-white font-mono text-xs uppercase tracking-wider rounded-xl transition duration-150 flex items-center gap-2 cursor-pointer shadow-sm ${isSaving ? 'animate-pulse cursor-not-allowed opacity-60' : ''}`}
                                    >
                                        <Check className="w-4 h-4" />
                                        <span>{drawerMode === "new" ? "Oluştur" : "Değişiklikleri Kaydet"}</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}