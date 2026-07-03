"use server"
import { prisma } from "@/lib/prisma"
import { login } from "@/lib/session"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Lütfen e-posta ve şifrenizi girin." }
  }

  // Create a default admin if it doesn't exist (just for initial setup)
  const existingUsersCount = await prisma.user.count()
  if (existingUsersCount === 0) {
    const hashedPassword = await bcrypt.hash("123456", 10)
    await prisma.user.create({
      data: {
        email: "admin@admin.com",
        password: hashedPassword,
        name: "Admin"
      }
    })
  }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return { error: "Geçersiz e-posta veya şifre." }
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return { error: "Geçersiz e-posta veya şifre." }
  }

  await login(email)
  redirect("/admin/posts")
}
