"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, Globe, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { POPULAR_COUNTRIES } from "@/lib/constants"

const slides = [
  {
    title: "Dunyanin Kapilarini Aciyoruz",
    subtitle: "AI Destekli Akilli Vize Yonetimi",
    description:
      "50'den fazla ulke icin profesyonel vize danismanligi. Belge hazirlamadan randevu takibine kadar tum sureclerinizi yonetiyoruz.",
    cta: "Hemen Basvur",
    ctaLink: "/visa/apply",
    image: "/passport-visa-travel-world-map.jpg",
  },
  {
    title: "Global eSIM Cozumleri",
    subtitle: "190+ Ulkede Kesintisiz Internet",
    description:
      "Seyahatiniz oncesinde eSIM'inizi satin alin, ulkenize indiginiz anda internete baglanin. Roaming derdi yok!",
    cta: "eSIM Satin Al",
    ctaLink: "/esim",
    image: "/esim-smartphone-global-connectivity.jpg",
  },
  {
    title: "Tur ve Tatil Paketleri",
    subtitle: "Hayalinizdeki Tatili Planliyoruz",
    description:
      "Ozel tasarlanmis tur paketleri, otel rezervasyonlari ve transfer hizmetleriyle eksiksiz seyahat deneyimi.",
    cta: "Turlari Incele",
    ctaLink: "/tours",
    image: "/travel-vacation-beach-resort-tourism.jpg",
  },
]

const features = [
  { icon: Zap, text: "AI Destekli Hizli Islem" },
  { icon: Shield, text: "%94 Onay Orani" },
  { icon: Globe, text: "50+ Ulke Destegi" },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[currentSlide]

  return (
    <section className="relative min-h-screen flex items-center pt-32 lg:pt-40 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {slide.subtitle}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {slide.title.split(" ").map((word, i) => (
                <span key={i}>
                  {i === slide.title.split(" ").length - 1 ? <span className="text-primary">{word}</span> : word + " "}
                </span>
              ))}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">{slide.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="btn-shine text-base">
                <Link href={slide.ctaLink}>
                  {slide.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Ucretsiz Danismanlik</Link>
              </Button>
            </div>

            {/* Popular Countries */}
            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Populer Ulkeler:</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_COUNTRIES.slice(0, 6).map((country) => (
                  <Link
                    key={country.code}
                    href={`/visa/${country.code.toLowerCase()}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 transition-colors text-sm"
                  >
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-4 border border-border">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">45,000+</p>
                    <p className="text-sm text-muted-foreground">Onaylanan Vize</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-2xl shadow-xl px-4 py-3">
                <p className="text-sm font-medium">%94 Basari</p>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentSlide === i ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30",
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
