"use client"
import { useEffect, useState } from "react"
import { createPost } from "@/app/admin/posts/actions"
import PostForm from "./PostForm";
import { X } from "lucide-react"

export default function NewPost() {
    const [isPreview, setIsPreview] = useState(false)
    const handlePreviewClick = () => {

        window.dispatchEvent(new Event('preview-flag'))
        setIsPreview(true)
    }
    return (
        <div className="min-h-screen bg-[#f7f4ee] px-8 py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b7b4d]">
                            Admin Panel
                        </span>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#111827]">
                            Yeni Post
                        </h1>
                    </div>

                    <button onClick={handlePreviewClick}
                        className="rounded-full bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-[#1f2937] cursor-pointer">
                        Önizle
                    </button>
                </div>

                <PostForm action={createPost} />

                {isPreview && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 md:p-10">
                        <div className="relative w-full h-full max-w-5xl bg-[#f7f4ee] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-black/5 animate-[zoomIn_0.2s_ease-out]">
                            <style>{`
                                @keyframes zoomIn {
                                    from { opacity: 0; transform: scale(0.95); }
                                    to { opacity: 1; transform: scale(1); }
                                }
                            `}</style>
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/5">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-sm font-bold text-slate-700 font-mono uppercase tracking-wider">Canlı Önizleme</span>
                                </div>
                                <button 
                                    onClick={() => setIsPreview(false)}
                                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Iframe Content */}
                            <iframe src="/posts/preview" className="w-full flex-grow border-0 bg-[#f7f4ee]" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
