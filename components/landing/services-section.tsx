"use client"

import type React from "react"

import Link from "next/link"
import { ArrowRight, Stamp, Smartphone, Car, Plane, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SERVICES } from "@/lib/constants"

const iconMap: { [key: string]: React.ElementType } = {
  Stamp,
  Smartphone,
  Car,
  Plane,
}

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Hizmetlerimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Seyahatiniz Icin Ihtiyaciniz Olan Her Sey
          </h2>
          <p className="text-muted-foreground">
            Vize islemlerinden eSIM'e, arac kiralamadan tur paketlerine kadar tum seyahat ihtiyaclariniz icin tek adres.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Stamp
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                  <span>Detayli Bilgi</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">
              Tum Hizmetleri Gor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
