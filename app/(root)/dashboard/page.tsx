'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { ProjectTable } from "@/components/shared/table"
import UserCard from "@/components/shared/user-card"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useProject } from "@/hooks/use-project"




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

export default function Page() {
  const {isLoading, projects } = useProject()
  return (
     <>
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {userCardData.map((item) => (
                  <UserCard key={item.title} {...item} description={item.description} />
                ))}
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                {
                        isLoading &&  <div className="flex flex-col items-center justify-center h-screen">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
                      <p className="mt-4 text-gray-600">Loading...</p>
                    </div>
                       }
                       {
                        projects && !isLoading && <ProjectTable projects={projects}/>
                       }
              </div>
     </>
            
   
  )
}
