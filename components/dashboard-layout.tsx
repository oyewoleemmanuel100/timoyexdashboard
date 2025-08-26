"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Users, DollarSign, Bell, User, Settings, Menu, X, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
}

const sidebarItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: User },
  { id: "team", label: "My Team", icon: Users },
  { id: "earnings", label: "Earnings", icon: DollarSign },
  { id: "announcements", label: "Announcements", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
]

const notifications = [
  { id: 1, message: "John Doe joined your team", time: "2 hours ago", unread: true },
  { id: 2, message: "Commission payout processed", time: "1 day ago", unread: true },
  { id: 3, message: "New announcement posted", time: "2 days ago", unread: false },
  { id: 4, message: "Level 3 achievement unlocked", time: "3 days ago", unread: false },
]

export function DashboardLayout({ children, activeSection, onSectionChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">Marketer Dashboard</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 text-xs"
                  >
                    {notifications.filter((n) => n.unread).length}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 sm:w-80 max-w-[calc(100vw-2rem)]">
                <div className="p-3 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                      <div className="flex items-center gap-2 w-full">
                        {notification.unread && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                        <span className={`text-sm ${notification.unread ? "font-medium" : "text-muted-foreground"}`}>
                          {notification.message}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2 h-8 sm:h-10">
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                    <AvatarImage src="/professional-headshot.png" />
                    <AvatarFallback className="text-xs sm:text-sm">JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline-block text-sm">John Doe</span>
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 sm:w-56">
                <DropdownMenuItem onClick={() => onSectionChange("profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSectionChange("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-60 lg:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-14 lg:pt-16">
          <div className="flex flex-col flex-1 min-h-0 bg-sidebar border-r border-sidebar-border">
            <div className="p-3 lg:p-4 border-b border-sidebar-border">
              <div className="flex flex-col items-center text-center space-y-2">
                <Avatar className="h-12 w-12 lg:h-16 lg:w-16">
                  <AvatarImage src="/professional-headshot.png" />
                  <AvatarFallback className="text-sm lg:text-lg">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sidebar-foreground text-sm lg:text-base">John Doe</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">Level 2</p>
                </div>
                <div className="flex gap-1 flex-wrap justify-center">
                  <Badge variant="secondary" className="text-xs">
                    ⭐ Top Recruiter
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    🔥 Active Marketer
                  </Badge>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-3 lg:px-4 py-4 lg:py-6 space-y-1 lg:space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border md:hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                  <h2 className="text-lg font-semibold text-sidebar-foreground">Menu</h2>
                  <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="p-4 border-b border-sidebar-border">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/professional-headshot.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-sidebar-foreground text-sm">John Doe</h3>
                      <p className="text-xs text-muted-foreground">Level 2</p>
                    </div>
                    <div className="flex gap-1 flex-wrap justify-center">
                      <Badge variant="secondary" className="text-xs">
                        ⭐ Top Recruiter
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        🔥 Active Marketer
                      </Badge>
                    </div>
                  </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.id

                    return (
                      <Button
                        key={item.id}
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start gap-3 ${
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                        onClick={() => {
                          onSectionChange(item.id)
                          setSidebarOpen(false)
                        }}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Button>
                    )
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 md:ml-60 lg:ml-64">
          <div className="p-3 sm:p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
