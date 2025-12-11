"use client"

import Link from "next/link"
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ToursHero() {
  return (
    <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Tur ve Tatil
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Hayalinizdeki <span className="text-primary">Tatili</span> Planliyoruz
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Ozel tasarlanmis tur paketleri, otel rezervasyonlari ve transfer hizmetleriyle eksiksiz seyahat deneyimi.
            </p>

            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>100+ Destinasyon</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Esnek Tarihler</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5 text-primary" />
                <span>Grup & Ozel Turlar</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="btn-shine">
                <Link href="#packages">
                  Turlari Incele
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent">
                <Link href="/contact">Ozel Tur Talebi</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/luxury-travel-destination-beach-resort-vacation.jpg"
                alt="Tatil Destinasyonu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-4 border border-border">
              <p className="text-3xl font-bold text-primary mb-1">500+</p>
              <p className="text-sm text-muted-foreground">Mutlu Gezgin</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
