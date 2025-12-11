import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { VisaHero } from "@/components/visa/visa-hero"
import { VisaCountries } from "@/components/visa/visa-countries"
import { VisaTypes } from "@/components/visa/visa-types"
import { VisaProcess } from "@/components/visa/visa-process"
import { CTASection } from "@/components/landing/cta-section"

export const metadata = {
  title: "Vize Hizmetleri - Diamond Visa",
  description: "50'den fazla ulkeye vize basvurusu. AI destekli akilli vize yonetim sistemi ile hizli ve guvenli.",
}

export default function VisaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <VisaHero />
      <VisaTypes />
      <VisaCountries />
      <VisaProcess />
      <CTASection />
      <Footer />
    </main>
  )
}
