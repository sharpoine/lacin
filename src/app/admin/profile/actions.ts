"use server"

import { prisma } from "@/lib/prisma"
import { getSession, login } from "@/lib/session"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function updateProfile(formData: FormData) {
  try {
    const session = await getSession()
    if (!session) {
      return { success: false, error: "Yetkisiz işlem." }
    }

    const currentEmail = session.user?.email
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    if (!name || !email) {
      return { success: false, error: "Lütfen isim ve e-posta alanlarını doldurun." }
    }

    // Find current user
    const user = await prisma.user.findUnique({
      where: { email: currentEmail }
    })

    if (!user) {
      return { success: false, error: "Kullanıcı bulunamadı." }
    }

    // Check if new email is taken by another user
    if (email !== currentEmail) {
      const emailTaken = await prisma.user.findUnique({
        where: { email }
      })
      if (emailTaken) {
        return { success: false, error: "Bu e-posta adresi başka bir yönetici tarafından kullanılıyor." }
      }
    }

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: { name, email }
    })

    // If email changed, refresh the session cookie
    if (email !== currentEmail) {
      await login(email)
    }

    revalidatePath("/admin/profile")
    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Failed to update profile:", error)
    return { success: false, error: "Profil güncellenirken bir hata oluştu." }
  }
}

export async function changePassword(formData: FormData) {
  try {
    const session = await getSession()
    if (!session) {
      return { success: false, error: "Yetkisiz işlem." }
    }

    const currentEmail = session.user?.email
    const oldPassword = formData.get("oldPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!oldPassword || !newPassword || !confirmPassword) {
      return { success: false, error: "Lütfen tüm şifre alanlarını doldurun." }
    }

    if (newPassword.length < 6) {
      return { success: false, error: "Yeni şifre en az 6 karakter olmalıdır." }
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "Yeni şifre ve onay şifresi eşleşmiyor." }
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: currentEmail }
    })

    if (!user) {
      return { success: false, error: "Kullanıcı bulunamadı." }
    }

    // Verify old password
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
    if (!isOldPasswordCorrect) {
      return { success: false, error: "Mevcut şifreniz yanlış." }
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword }
    })

    revalidatePath("/admin/profile")
    return { success: true }
  } catch (error) {
    console.error("Failed to change password:", error)
    return { success: false, error: "Şifre güncellenirken bir hata oluştu." }
  }
}
