"use client"

import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { COMPANY_INFO } from "@/lib/constants"

export function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 lg:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Vize Basvurunuzu Hemen Baslatin
              </h2>
              <p className="text-primary-foreground/90 text-lg">
                Uzman ekibimiz sizinle iletisime gecsin ve ucretsiz on degerlendirme yapsin. Basari oraninizi ogrenin!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/visa/apply">
                  Hemen Basvur
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/30 text-primary-foreground hover:bg-white/10 bg-transparent"
              >
                <a href={`tel:${COMPANY_INFO.contact.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Bizi Arayin
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
