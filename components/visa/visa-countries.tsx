"use client"

import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { POPULAR_COUNTRIES } from "@/lib/constants"

export function VisaCountries() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Ulkeler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Populer Destinasyonlar</h2>
          <p className="text-muted-foreground">En cok tercih edilen ulkelere vize basvurusu yapin.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {POPULAR_COUNTRIES.map((country) => (
            <Link
              key={country.code}
              href={`/visa/apply?country=${country.code}`}
              className="group bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-lg transition-all text-center"
            >
              <span className="text-4xl mb-3 block">{country.flag}</span>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                {country.name}
              </h3>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{country.processingTime}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" asChild className="bg-transparent">
            <Link href="/visa/countries">
              Tum Ulkeleri Gor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
