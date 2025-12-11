import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { VisaHero } from "@/components/visa/visa-hero"
import { VisaTypes } from "@/components/visa/visa-types"
import { VisaProcess } from "@/components/visa/visa-process"
import { CTASection } from "@/components/landing/cta-section"
import { POPULAR_COUNTRIES } from "@/lib/constants"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface PageProps {
  params: {
    country: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const country = POPULAR_COUNTRIES.find(c => c.code.toLowerCase() === params.country.toLowerCase())
  if (!country) return {}

  return {
    title: `${country.name} Vizesi - Diamond Visa`,
    description: `${country.name} vize başvurusu için profesyonel danışmanlık. ${country.processingTime} işlem süresi.`,
  }
}

export default function CountryVisaPage({ params }: PageProps) {
  const country = POPULAR_COUNTRIES.find(c => c.code.toLowerCase() === params.country.toLowerCase())

  if (!country) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <span className="text-6xl mb-6 block">{country.flag}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {country.name} Vizesi
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {country.name} vize başvurunuz için uzman danışmanlık ve hızlı işlem süreci.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="bg-card rounded-lg p-4 border">
                <div className="text-sm text-muted-foreground">İşlem Süresi</div>
                <div className="text-lg font-semibold">{country.processingTime}</div>
              </div>
            </div>
            <Button size="lg" asChild>
              <Link href={`/visa/apply?country=${country.code}`}>
                Başvuru Yap
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <VisaTypes />
      <VisaProcess />
      <CTASection />
      <Footer />
    </main>
  )
}
