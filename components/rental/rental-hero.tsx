"use client"

import Link from "next/link"
import { ArrowRight, Car, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RentalHero() {
  return (
    <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Arac Kiralama
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Her Yerde <span className="text-primary">Ozgurluk</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Gideceginiz ulkede guvenli ve konforlu ulasim. Ekonomikten lukse genis arac secenekleri.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Car className="h-5 w-5 text-primary" />
              <span>Genis Filo</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-5 w-5 text-primary" />
              <span>Sigorta Dahil</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <span>7/24 Destek</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="btn-shine">
              <Link href="#vehicles">
                Araclari Incele
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent">
              <Link href="/contact">Teklif Al</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
