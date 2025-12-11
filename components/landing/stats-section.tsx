"use client"

import type React from "react"

import { Users, CheckCircle, Globe, TrendingUp } from "lucide-react"
import { STATS } from "@/lib/constants"

const iconMap: { [key: string]: React.ElementType } = {
  Users,
  CheckCircle,
  Globe,
  TrendingUp,
}

export function StatsSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, index) => {
            const Icon = iconMap[stat.icon] || CheckCircle
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 mb-4">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-primary-foreground/80 text-sm">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
