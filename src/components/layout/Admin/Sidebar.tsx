"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
    const pathname = usePathname()

    const navItems = [
        { name: "Dashboard", href: "/admin" },
        { name: "Postlar", href: "/admin/posts" },
        { name: "Yeni Post", href: "/admin/posts/new" },
        { name: "Hizmetler", href: "/admin/services" },
        { name: "Kullanıcılar", href: "/admin/users" },
        { name: "Ayarlar", href: "/admin/settings" },
        { name: "Profilim", href: "/admin/profile" },
    ]

    return (
        <aside className="m-4 min-h-[calc(100vh-2rem)] w-72 bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl shadow-2xl relative overflow-hidden animate-fade-in flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8a977]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
            
            <h1 className="mb-10 mt-2 text-2xl font-serif font-bold text-[#d6c2a0] animate-fade-in-up text-center tracking-wide">
                Admin Panel
            </h1>
            
            <nav className="flex flex-col gap-3 flex-1 overflow-y-auto no-scrollbar relative z-10">
                {navItems.map((item, index) => {
                    const isActive = item.href === "/admin" 
                        ? pathname === "/admin" 
                        : pathname.startsWith(item.href)
                    
                    return (
                        <Link href={item.href} key={item.name} className={`animate-fade-in-up`} style={{ animationDelay: `${(index + 1) * 70}ms` }}>
                            <span className={`flex justify-center items-center rounded-2xl px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                                isActive 
                                ? "bg-[#8d6e45] text-white shadow-lg shadow-[#8d6e45]/20 scale-[1.02]" 
                                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:scale-[1.02] border border-white/5"
                            }`}>
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <Link href="/" target="_blank" className="group">
                   <span className="flex justify-center items-center rounded-2xl border border-slate-700 bg-slate-800/50 px-4 py-3.5 transition-all duration-300 group-hover:bg-slate-800 group-hover:border-slate-600 group-hover:shadow-lg group-hover:-translate-y-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-white">
                        Siteye Dön <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </Link>
            </div>
        </aside>
    )
}