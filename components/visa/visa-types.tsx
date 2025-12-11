"use client"

import type React from "react"

import Link from "next/link"
import { Camera, Briefcase, GraduationCap, Building, ArrowRightLeft, Heart } from "lucide-react"
import { VISA_TYPES } from "@/lib/constants"

const iconMap: Record<string, React.ElementType> = {
  Camera,
  Briefcase,
  GraduationCap,
  Building,
  ArrowRightLeft,
  Heart,
}

export function VisaTypes() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Vize Turleri
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Her Ihtiyaca Uygun Vize Hizmeti</h2>
          <p className="text-muted-foreground">
            Seyahat amacınıza gore en uygun vize turunu secin. Uzman ekibimiz her adimda yanınizda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VISA_TYPES.map((type) => {
            const Icon = iconMap[type.icon] || Camera
            return (
              <Link
                key={type.id}
                href={`/visa/apply?type=${type.id}`}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                  <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {type.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {type.id === "tourist" && "Tatil ve gezi amacli kisa sureli ziyaretler icin."}
                  {type.id === "business" && "Is toplantilari ve ticari faaliyetler icin."}
                  {type.id === "student" && "Yurtdisinda egitim almak isteyenler icin."}
                  {type.id === "work" && "Yurtdisinda calisma izni almak isteyenler icin."}
                  {type.id === "transit" && "Baska bir ulkeye gecis icin kisa sureli vizeler."}
                  {type.id === "medical" && "Yurtdisinda tedavi gormek isteyenler icin."}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
