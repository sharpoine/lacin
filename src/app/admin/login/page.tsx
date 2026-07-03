"use client"
import { useState } from "react"
import { loginAction } from "./actions"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const formData = new FormData(e.currentTarget)
    const res = await loginAction(formData)
    
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-[#d6c2a0]/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-extrabold text-[#8d6e45]">Admin Girişi</h1>
          <p className="text-sm text-slate-500 mt-2">Yönetim paneline erişmek için giriş yapın.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">E-Posta</label>
            <input 
              type="email" 
              name="email" 
              required 
              defaultValue="admin@admin.com"
              className="w-full h-12 bg-[#f7f4ee] border-0 rounded-xl px-4 focus:ring-2 focus:ring-[#8d6e45]" 
              placeholder="E-posta adresiniz" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Şifre</label>
            <input 
              type="password" 
              name="password" 
              required 
              defaultValue="123456"
              className="w-full h-12 bg-[#f7f4ee] border-0 rounded-xl px-4 focus:ring-2 focus:ring-[#8d6e45]" 
              placeholder="Şifreniz" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-[#8d6e45] text-white rounded-xl text-sm font-bold mt-4 hover:bg-[#725633] transition disabled:opacity-50"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  )
}
