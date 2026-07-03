"use client"
import { usePathname } from "next/navigation"
import Sidebar from "./Sidebar"

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isLogin = pathname === "/admin/login"

    if (isLogin) {
        return <main className="flex-1 min-w-0">{children}</main>
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-w-0 p-8">
                {children}
            </main>
        </div>
    )
}
