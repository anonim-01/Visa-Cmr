import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { ToursHero } from "@/components/tours/tours-hero"
import { ToursPackages } from "@/components/tours/tours-packages"
import { ToursCategories } from "@/components/tours/tours-categories"
import { CTASection } from "@/components/landing/cta-section"

export const metadata = {
  title: "Tur ve Tatil - Diamond Visa",
  description: "Ozel tasarlanmis tur paketleri ve tatil planlari. Hayalinizdeki tatili planliyoruz.",
}

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ToursHero />
      <ToursCategories />
      <ToursPackages />
      <CTASection />
      <Footer />
    </main>
  )
}
