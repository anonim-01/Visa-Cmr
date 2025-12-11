import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutMission } from "@/components/about/about-mission"
import { AboutServices } from "@/components/about/about-services"
import { AboutTeam } from "@/components/about/about-team"
import { AboutValues } from "@/components/about/about-values"
import { CTASection } from "@/components/landing/cta-section"

export const metadata = {
  title: "Hakkimizda - Diamond Visa",
  description: "Diamond Visa hakkinda detayli bilgi. Misyonumuz, vizyonumuz ve ekibimiz.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutHero />
      <AboutMission />
      <AboutServices />
      <AboutValues />
      <AboutTeam />
      <CTASection />
      <Footer />
    </main>
  )
}
