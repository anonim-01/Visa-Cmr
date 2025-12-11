import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { EsimHero } from "@/components/esim/esim-hero"
import { EsimPlans } from "@/components/esim/esim-plans"
import { EsimFeatures } from "@/components/esim/esim-features"
import { EsimHowItWorks } from "@/components/esim/esim-how-it-works"
import { EsimFAQ } from "@/components/esim/esim-faq"
import { CTASection } from "@/components/landing/cta-section"

export const metadata = {
  title: "eSIM - Diamond Visa",
  description: "190+ ulkede kesintisiz internet. Aninda aktivasyon, uygun fiyat.",
}

export default function EsimPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <EsimHero />
      <EsimPlans />
      <EsimFeatures />
      <EsimHowItWorks />
      <EsimFAQ />
      <CTASection />
      <Footer />
    </main>
  )
}
