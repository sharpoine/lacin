import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import ProfileForm from "./ProfileForm"

export default async function ProfileAdminPage() {
  const session = await getSession()
  if (!session) {
    redirect("/admin/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email }
  })

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ProfileForm user={{ name: user.name || "", email: user.email }} />
    </div>
  )
}
