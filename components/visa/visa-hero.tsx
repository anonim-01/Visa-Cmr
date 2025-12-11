"use client"

import Link from "next/link"
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  { icon: Shield, text: "%94 Onay Orani" },
  { icon: Clock, text: "Hizli Islem" },
  { icon: CheckCircle, text: "AI Destekli" },
]

export function VisaHero() {
  return (
    <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Vize Hizmetleri
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Dunyanin Her Yerine <span className="text-primary">Vize</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            50'den fazla ulke icin profesyonel vize danismanligi. AI destekli sistemimiz ile basvurunuzu en yuksek
            basari sansiyla tamamlayin.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <feature.icon className="h-5 w-5 text-primary" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="btn-shine">
              <Link href="/visa/apply">
                Hemen Basvur
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent">
              <Link href="/contact">Ucretsiz Danismanlik</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
