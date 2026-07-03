"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
    const pathName=usePathname()
    const isHome=pathName==="/"
    
    const navLinks = [
        { name: "Hakkında", href: isHome ? "#hakkinda" : "/hakkinda" },
        { name: "Çalışma Alanları", href: "/calisma-alanlari" },
        { name: "Yazılar", href: "/yazilar" },
        { name: "İletişim", href: "/iletisim" },
    ]

    return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f4ee]/80 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
            <Link href="/" className="group block">
                <div className="font-serif text-2xl tracking-wide text-slate-900 group-hover:text-[#8d6e45] transition-colors">Av. Emre Laçin</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 group-hover:text-slate-700 transition-colors">
                    Hukuk Bürosu
                </div>
            </Link>
            <nav className="hidden items-center gap-8 text-sm md:flex">
                {navLinks.map((link) => (
                    <Link 
                        key={link.name} 
                        href={link.href} 
                        className="relative group py-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
                    >
                        {link.name}
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#8d6e45] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}
            </nav>
            <Link
                href="/iletisim"
                className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#8d6e45] hover:shadow-md hover:-translate-y-0.5"
            >
                İletişime Geç
            </Link>
        </div>
    </header>)
}