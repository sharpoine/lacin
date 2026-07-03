import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import UserList from "./UserList"

export default async function UsersAdminPage() {
  const session = await getSession()
  const currentUserEmail = session?.user?.email || ""

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  })

  return (
    <div className="w-full max-w-7xl mx-auto">
      <UserList users={users} currentUserEmail={currentUserEmail} />
    </div>
  )
}
