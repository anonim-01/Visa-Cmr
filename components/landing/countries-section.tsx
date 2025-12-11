"use client"

import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { POPULAR_COUNTRIES } from "@/lib/constants"

export function CountriesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Populer Destinasyonlar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">50+ Ulkeye Vize Hizmeti</h2>
          <p className="text-muted-foreground">
            Dunyanin dort bir yanina seyahat etmek icin ihtiyaciniz olan vize islemlerini sizin icin halledelim.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {POPULAR_COUNTRIES.map((country) => (
            <Link
              key={country.code}
              href={`/visa/${country.code.toLowerCase()}`}
              className="group bg-card rounded-xl p-4 border border-border hover:border-primary/30 hover:shadow-lg transition-all text-center card-hover"
            >
              <span className="text-4xl mb-3 block">{country.flag}</span>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {country.name}
              </h3>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{country.processingTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/visa">
              Tum Ulkeleri Gor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
