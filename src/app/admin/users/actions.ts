"use server"

import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function createUser(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password || !name) {
      return { success: false, error: "Lütfen tüm alanları doldurun." }
    }

    if (password.length < 6) {
      return { success: false, error: "Şifre en az 6 karakter olmalıdır." }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { success: false, error: "Bu e-posta adresiyle kayıtlı bir kullanıcı zaten var." }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Failed to create user:", error)
    return { success: false, error: "Kullanıcı oluşturulurken bir hata oluştu." }
  }
}

export async function deleteUser(id: string) {
  try {
    const session = await getSession()
    if (!session) {
      return { success: false, error: "Yetkisiz işlem." }
    }

    const currentUserEmail = session.user?.email

    // Find the user to delete
    const userToDelete = await prisma.user.findUnique({
      where: { id }
    })

    if (!userToDelete) {
      return { success: false, error: "Kullanıcı bulunamadı." }
    }

    if (userToDelete.email === currentUserEmail) {
      return { success: false, error: "Kendi hesabınızı silemezsiniz." }
    }

    // Prevent deleting the last remaining admin user
    const usersCount = await prisma.user.count()
    if (usersCount <= 1) {
      return { success: false, error: "Sistemde en az bir kullanıcı kalmalıdır." }
    }

    await prisma.user.delete({
      where: { id }
    })

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete user:", error)
    return { success: false, error: "Kullanıcı silinirken bir hata oluştu." }
  }
}
