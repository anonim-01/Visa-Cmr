import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { RentalHero } from "@/components/rental/rental-hero"
import { RentalVehicles } from "@/components/rental/rental-vehicles"
import { RentalFeatures } from "@/components/rental/rental-features"
import { CTASection } from "@/components/landing/cta-section"

export const metadata = {
  title: "Arac Kiralama - Diamond Visa",
  description: "Gideceginiz ulkede guvenli ve konforlu ulasim. Genis arac secenekleri.",
}

export default function RentalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <RentalHero />
      <RentalVehicles />
      <RentalFeatures />
      <CTASection />
      <Footer />
    </main>
  )
}
