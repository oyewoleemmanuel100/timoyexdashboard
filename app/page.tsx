"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { OverviewSection } from "@/components/sections/overview-section"
import { TeamSection } from "@/components/sections/team-section"
import { EarningsSection } from "@/components/sections/earnings-section"
import { AnnouncementsSection } from "@/components/sections/announcements-section"
import { ProfileSection } from "@/components/sections/profile-section"
import { SettingsSection } from "@/components/sections/settings-section"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />
      case "team":
        return <TeamSection />
      case "earnings":
        return <EarningsSection />
      case "announcements":
        return <AnnouncementsSection />
      case "profile":
        return <ProfileSection />
      case "settings":
        return <SettingsSection />
      default:
        return <OverviewSection />
    }
  }

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </DashboardLayout>
  )
}
