import { AppSidebar } from "@/components/app-sidebar"
import { ProjectTable } from "@/components/shared/table"
import UserCard from "@/components/shared/user-card"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const userCardData = [
  {
    title: "Your Projects",
    description: "you have no tasks",
    count: 0,
  },
  {
    title: "Your Tasks",
    
    count: 23,
  },
  {
    title: "Your Notes",
    description: "you have no tasks",
    count: 0,
  },
]

export default function Page({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
             {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
