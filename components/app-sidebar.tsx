"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  BookOpenIcon,
  CommandIcon,
  User,
  LogOut,
  Home,
  Building
  
} from "lucide-react"


import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "task manager ",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
      ],
    },
    {
      title: "Projeccts",
      url: "/projects",
      icon: Building,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
      ],
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: CommandIcon,
      items: [
        {
          title: "Overview",
          url: "/tasks",
        },
        {
          title: "Analytics",
          url: "#",
        },
        
      ],
    },
    {
      title: "Notes",
      url: "/notes",
      icon: BookOpenIcon,
      items: [
        {
          title: "overview",
          url: "/notes",
        },
        {
          title: "analytics",
          url: "#",
        },
        
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "settings",
      url: "/setting",
      icon: Settings2,
    },
    {
      name: "profile",
      url: "/profile",
      icon: User,
    },
    {
      name: "logout",
      url: "/logout",
      icon: LogOut,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <NavUser/>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        
      </SidebarContent>
    </Sidebar>
  )
}
