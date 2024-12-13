"use client";

import * as React from "react";
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
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Professor Daniel",
    email: "daniel@cursinhodaeach.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Simulados",
      url: "/dashboard/simulados",
      icon: BookOpen,
      items: [
        {
          title: "Meus simulados",
          url: "/dashboard/simulados/meus-simulados",
        },
      ],
    },
    {
      title: "Questões",
      url: "/dashboard/questoes",
      icon: Bot,
      items: [
        {
          title: "Criar questão",
          url: "/dashboard/questoes/criar",
        },
      ],
    },
    {
      title: "Ajustes",
      url: "/dashboard/ajustes",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
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
      name: "Fuvest",
      url: "#",
      icon: Frame,
    },
    {
      name: "Comvest",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Vunesp",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Cursinho da EACH
                  </span>
                  <span className="truncate text-xs">Entidade</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
