"use client"

import { useState } from "react"
import { createUser, deleteUser } from "./actions"
import { toast } from "sonner"
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  Plus, 
  Trash2, 
  Shield, 
  Calendar, 
  AlertCircle, 
  Check, 
  UserPlus
} from "lucide-react"

interface User {
  id: string
  name: string | null
  email: string
  createdAt: Date
}

interface UserListProps {
  users: User[]
  currentUserEmail: string
}

export default function UserList({ users: initialUsers, currentUserEmail }: UserListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get initials for user avatar
  const getInitials = (name: string | null) => {
    if (!name) return "A"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Handle create user
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Lütfen tüm alanları doldurun.")
      return
    }

    if (password.length < 6) {
      toast.error("Şifre en az 6 karakter olmalıdır.")
      return
    }

    setIsSubmitting(true)
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)

    const res = await createUser(formData)
    if (res.success) {
      toast.success("Kullanıcı başarıyla oluşturuldu!")
      // Clear form
      setName("")
      setEmail("")
      setPassword("")
      // Optimistic list update (reload or manual append)
      // Since it revalidates, we can append it or rely on next refresh,
      // but let's append it optimistically so it shows up immediately:
      const newUser: User = {
        id: Math.random().toString(), // temp ID
        name,
        email,
        createdAt: new Date()
      }
      setUsers([newUser, ...users])
      // Trigger a page refresh to sync IDs and dates from the server
      window.location.reload()
    } else {
      toast.error(res.error || "Bir hata oluştu.")
    }
    setIsSubmitting(false)
  }

  // Handle delete user
  const handleDeleteUser = async (id: string, userEmail: string) => {
    if (userEmail === currentUserEmail) {
      toast.error("Kendi hesabınızı silemezsiniz!")
      return
    }

    if (users.length <= 1) {
      toast.error("Sistemde en az bir yönetici bulunmalıdır.")
      return
    }

    if (!confirm(`"${userEmail}" kullanıcısını silmek istediğinize emin misiniz?`)) {
      return
    }

    // Optimistic delete
    const previousUsers = [...users]
    setUsers(users.filter((u) => u.id !== id))

    const res = await deleteUser(id)
    if (res.success) {
      toast.success("Kullanıcı başarıyla silindi.")
    } else {
      setUsers(previousUsers)
      toast.error(res.error || "Silme işlemi başarısız oldu.")
    }
  }

  return (
    <div className="w-full text-slate-800 font-sans relative antialiased pb-10">
      
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#d6c2a0_1px,transparent_1.5px)] bg-[size:32px_32px] opacity-35" />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 border-b border-[#d6c2a0]/60 mb-10">
        <div>
          <h1 className="text-3xl font-serif font-extrabold tracking-tight text-slate-900">Kullanıcı Yönetimi</h1>
          <p className="text-sm text-slate-500 mt-1">Admin paneline erişimi olan yöneticileri görüntüleyin ve yetkilendirin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Users List Column */}
        <div className="lg:col-span-2 space-y-4 animate-fade-in-up">
          <h2 className="text-lg font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#8d6e45]" />
            <span>Aktif Yöneticiler ({users.length})</span>
          </h2>

          <div className="space-y-4">
            {users.map((user) => {
              const isSelf = user.email === currentUserEmail
              
              return (
                <div 
                  key={user.id} 
                  className={`bg-white p-5 rounded-3xl border border-slate-100 hover:border-[#d6c2a0]/60 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_12px_40px_rgba(141,110,69,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group`}
                >
                  <div className="flex items-center gap-4">
                    {/* User Initials Avatar */}
                    <div className="w-12 h-12 rounded-2xl bg-[#fbf8f1] border border-[#d6c2a0]/60 flex items-center justify-center text-[#8d6e45] text-sm font-bold flex-shrink-0">
                      {getInitials(user.name)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-slate-800">
                          {user.name || "İsimsiz Kullanıcı"}
                        </h3>
                        {isSelf && (
                          <span className="inline-flex items-center text-[9px] font-bold text-[#8d6e45] bg-[#8d6e45]/5 border border-[#d6c2a0]/40 px-2 py-0.5 rounded-full font-mono">
                            AKTİF OTURUM
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3.5 h-3.5" />
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-300" />
                      {new Date(user.createdAt).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>

                    <button
                      onClick={() => handleDeleteUser(user.id, user.email)}
                      disabled={isSelf}
                      className={`p-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer
                        ${isSelf 
                          ? 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100' 
                          : 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-100 hover:border-transparent'}`}
                      title={isSelf ? "Kendi hesabınızı silemezsiniz" : "Kullanıcıyı Sil"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Create User Form Column */}
        <div className="lg:col-span-1 animate-fade-in-up delay-100">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.03)] sticky top-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-[#fbf8f1] border border-[#d6c2a0] flex items-center justify-center text-[#8d6e45]">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-md font-serif font-bold text-slate-900">Yeni Kullanıcı Ekle</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Sisteme yeni bir yönetici ekleyin.</p>
              </div>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-6">
              
              <div className="group">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 group-focus-within:text-[#8d6e45] transition-colors">Ad Soyad</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-4.5 top-3.5" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none text-slate-800 text-sm" 
                    placeholder="Eren Lacin" 
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 group-focus-within:text-[#8d6e45] transition-colors">E-Posta Adresi</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4.5 top-3.5" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none text-slate-800 text-sm" 
                    placeholder="örnek@mail.com" 
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 group-focus-within:text-[#8d6e45] transition-colors">Şifre</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4.5 top-3.5" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-[#8d6e45] focus:border-transparent transition-all outline-none text-slate-800 text-sm" 
                    placeholder="••••••••" 
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">Şifre en az 6 karakterden oluşmalıdır.</p>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-[#8d6e45] transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Kullanıcıyı Kaydet</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
