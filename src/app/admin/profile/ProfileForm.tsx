"use client"

import { useState } from "react"
import { updateProfile, changePassword } from "./actions"
import { toast } from "sonner"
import { 
  User, 
  Mail, 
  Lock, 
  Key, 
  Shield, 
  Check, 
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react"

interface ProfileFormProps {
  user: {
    name: string
    email: string
  }
}

export default function ProfileForm({ user }: ProfileFormProps) {
  // Profile Form States
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  // Password Form States
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Password Visibility States
  const [showOldPass, setShowOldPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  // Handle Profile Update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      toast.error("Lütfen isim ve e-posta alanlarını doldurun.")
      return
    }

    setIsUpdatingProfile(true)
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)

    const res = await updateProfile(formData)
    if (res.success) {
      toast.success("Profil bilgileriniz başarıyla güncellendi.")
      // If email changed, tell the user that the session is refreshed
      if (email !== user.email) {
        toast.info("E-posta adresiniz değiştiği için oturumunuz güncellendi.")
      }
    } else {
      toast.error(res.error || "Güncelleme başarısız oldu.")
    }
    setIsUpdatingProfile(false)
  }

  // Handle Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Lütfen tüm şifre alanlarını doldurun.")
      return
    }

    if (newPassword.length < 6) {
      toast.error("Yeni şifre en az 6 karakter olmalıdır.")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifreler uyuşmuyor.")
      return
    }

    setIsChangingPassword(true)
    const formData = new FormData()
    formData.append("oldPassword", oldPassword)
    formData.append("newPassword", newPassword)
    formData.append("confirmPassword", confirmPassword)

    const res = await changePassword(formData)
    if (res.success) {
      toast.success("Şifreniz başarıyla güncellendi.")
      // Clear password form
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } else {
      toast.error(res.error || "Şifre güncellenirken hata oluştu.")
    }
    setIsChangingPassword(false)
  }

  return (
    <div className="w-full text-slate-800 font-sans relative antialiased px-2 pb-10">
      
      {/* Background Accent */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#d6c2a0_1px,transparent_1.5px)] bg-[size:32px_32px] opacity-35" />

      {/* Page Header */}
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-3xl font-serif font-extrabold tracking-tight text-slate-900">Profilim</h1>
        <p className="text-sm text-slate-500 mt-2">Hesap bilgilerinizi ve giriş şifrenizi güncelleyin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Profile Card */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_16px_40px_rgba(15,23,42,0.025)] border border-slate-100 animate-fade-in-up delay-100 flex flex-col justify-between">
          <form onSubmit={handleUpdateProfile} className="space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-[#fbf8f1] border border-[#d6c2a0] flex items-center justify-center text-[#8d6e45]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-serif font-bold text-slate-900">Profil Bilgileri</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Adınız ve e-posta adresiniz.</p>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-semibold text-slate-600 mb-2 group-focus-within:text-[#8d6e45] transition-colors">Ad Soyad</label>
                <div className="relative">
                  <User className="w-4.5 h-4.5 text-slate-400 absolute left-4.5 top-3.5" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none text-slate-800 text-sm" 
                    placeholder="Adınız Soyadınız" 
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-semibold text-slate-600 mb-2 group-focus-within:text-[#8d6e45] transition-colors">E-Posta Adresi</label>
                <div className="relative">
                  <Mail className="w-4.5 h-4.5 text-slate-400 absolute left-4.5 top-3.5" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none text-slate-800 text-sm" 
                    placeholder="ornek@lacin.av.tr" 
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-8 flex justify-end">
              <button 
                type="submit" 
                disabled={isUpdatingProfile}
                className="px-8 py-3.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-[#8d6e45] transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                {isUpdatingProfile ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Değişiklikleri Kaydet</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Password Change Card */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_16px_40px_rgba(15,23,42,0.025)] border border-slate-100 animate-fade-in-up delay-200">
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-[#fbf8f1] border border-[#d6c2a0] flex items-center justify-center text-[#8d6e45]">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-slate-900">Şifre Değiştir</h2>
                <p className="text-xs text-slate-400 mt-0.5">Giriş şifrenizi güncelleyin.</p>
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-semibold text-slate-600 mb-2 group-focus-within:text-[#8d6e45] transition-colors">Mevcut Şifre</label>
              <div className="relative">
                <Lock className="w-4.5 h-4.5 text-slate-400 absolute left-4.5 top-3.5" />
                <input 
                  type={showOldPass ? "text" : "password"} 
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-12 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none text-slate-800 text-sm" 
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowOldPass(!showOldPass)}
                  className="p-1 absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-semibold text-slate-600 mb-2 group-focus-within:text-[#8d6e45] transition-colors">Yeni Şifre</label>
              <div className="relative">
                <Lock className="w-4.5 h-4.5 text-slate-400 absolute left-4.5 top-3.5" />
                <input 
                  type={showNewPass ? "text" : "password"} 
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-12 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none text-slate-800 text-sm" 
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="p-1 absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">Yeni şifreniz en az 6 karakter olmalıdır.</p>
            </div>

            <div className="group">
              <label className="block text-xs font-semibold text-slate-600 mb-2 group-focus-within:text-[#8d6e45] transition-colors">Yeni Şifre (Tekrar)</label>
              <div className="relative">
                <Lock className="w-4.5 h-4.5 text-slate-400 absolute left-4.5 top-3.5" />
                <input 
                  type={showConfirmPass ? "text" : "password"} 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-12 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none text-slate-800 text-sm" 
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="p-1 absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit" 
                disabled={isChangingPassword}
                className="px-8 py-3.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-[#8d6e45] transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                {isChangingPassword ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Şifreyi Güncelle</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
