
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  Users, 
  Settings,
  ChevronRight,
  LogOut,
  Bell
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const navItems = [
  { title: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Training Calendar", icon: Calendar, href: "/dashboard/sessions" },
  { title: "Content / LMS", icon: BookOpen, href: "/dashboard/content" },
  { title: "Assessments", icon: FileText, href: "/dashboard/assessments" },
  { title: "Identity Verification", icon: ShieldCheck, href: "/dashboard/verify" },
  { title: "Organization & Users", icon: Users, href: "/dashboard/users" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar className="border-r shadow-sm">
          <SidebarHeader className="p-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center group-hover:bg-accent transition-colors">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight font-headline text-primary group-hover:text-accent transition-colors">
                AcumenFlow
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className="h-full px-4">
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={pathname === item.href}
                      className={cn(
                        "w-full justify-start gap-3 py-6 px-4 rounded-xl transition-all",
                        pathname === item.href 
                          ? "bg-primary text-white hover:bg-primary/90 shadow-md" 
                          : "hover:bg-secondary text-muted-foreground hover:text-primary"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                        {pathname === item.href && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <Separator className="my-6 opacity-50" />
              <div className="px-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">System</p>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full gap-3 py-6 px-4 rounded-xl text-muted-foreground hover:bg-secondary hover:text-primary transition-all">
                      <Settings className="h-5 w-5" />
                      <span className="font-medium">Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            </ScrollArea>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t bg-secondary/30">
            <div className="flex items-center gap-3 px-2 py-3 rounded-lg">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src="https://picsum.photos/seed/admin1/100/100" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">Global Administrator</p>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 bg-[#F0F2F4]">
          <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-10">
            <h2 className="text-lg font-semibold text-primary">
              {navItems.find(i => i.href === pathname)?.title || "Dashboard"}
            </h2>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-accent rounded-full border-2 border-white"></span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium">Tuesday, May 23</p>
                <p className="text-xs text-muted-foreground">Regional: South Campus</p>
              </div>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
