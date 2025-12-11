import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { VisaTracker } from "@/components/visa/visa-tracker"

export const metadata = {
  title: "Basvuru Takip - Diamond Visa",
  description: "Vize basvurunuzun durumunu takip edin.",
}

export default function VisaTrackPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 lg:pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Basvuru Takip
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Basvurunuzu Takip Edin</h1>
              <p className="text-muted-foreground">
                Basvuru numaraniz veya e-posta adresiniz ile basvurunuzun durumunu ogrenin.
              </p>
            </div>
            <VisaTracker />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
