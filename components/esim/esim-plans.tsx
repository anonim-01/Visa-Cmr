"use client"

import { useState } from "react"
import { Wifi, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const regions = [
  { id: "europe", name: "Avrupa", flag: "🇪🇺" },
  { id: "america", name: "Amerika", flag: "🌎" },
  { id: "asia", name: "Asya", flag: "🌏" },
  { id: "global", name: "Global", flag: "🌍" },
]

const plans = {
  europe: [
    { id: 1, name: "Avrupa 1GB", data: "1GB", duration: "7 gun", price: 99, popular: false },
    { id: 2, name: "Avrupa 3GB", data: "3GB", duration: "15 gun", price: 199, popular: true },
    { id: 3, name: "Avrupa 5GB", data: "5GB", duration: "30 gun", price: 299, popular: false },
    { id: 4, name: "Avrupa 10GB", data: "10GB", duration: "30 gun", price: 449, popular: false },
  ],
  america: [
    { id: 5, name: "Amerika 1GB", data: "1GB", duration: "7 gun", price: 149, popular: false },
    { id: 6, name: "Amerika 3GB", data: "3GB", duration: "15 gun", price: 299, popular: true },
    { id: 7, name: "Amerika 5GB", data: "5GB", duration: "30 gun", price: 399, popular: false },
    { id: 8, name: "Amerika 10GB", data: "10GB", duration: "30 gun", price: 599, popular: false },
  ],
  asia: [
    { id: 9, name: "Asya 1GB", data: "1GB", duration: "7 gun", price: 129, popular: false },
    { id: 10, name: "Asya 3GB", data: "3GB", duration: "15 gun", price: 249, popular: true },
    { id: 11, name: "Asya 5GB", data: "5GB", duration: "30 gun", price: 349, popular: false },
    { id: 12, name: "Asya 10GB", data: "10GB", duration: "30 gun", price: 499, popular: false },
  ],
  global: [
    { id: 13, name: "Global 1GB", data: "1GB", duration: "7 gun", price: 199, popular: false },
    { id: 14, name: "Global 3GB", data: "3GB", duration: "15 gun", price: 399, popular: true },
    { id: 15, name: "Global 5GB", data: "5GB", duration: "30 gun", price: 549, popular: false },
    { id: 16, name: "Global 10GB", data: "10GB", duration: "30 gun", price: 799, popular: false },
  ],
}

export function EsimPlans() {
  const [activeRegion, setActiveRegion] = useState("europe")

  return (
    <section id="plans" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            eSIM Paketleri
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ihtiyaciniza Uygun Paket Secin</h2>
          <p className="text-muted-foreground">Tum paketler aninda aktivasyon ve 7/24 destek ile gelir.</p>
        </div>

        {/* Region Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all",
                activeRegion === region.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              <span className="mr-2">{region.flag}</span>
              {region.name}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans[activeRegion as keyof typeof plans].map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative bg-card rounded-2xl p-6 border transition-all",
                plan.popular ? "border-primary shadow-lg scale-105" : "border-border hover:border-primary/30",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  En Populer
                </span>
              )}

              <h3 className="text-xl font-semibold text-foreground mb-4">{plan.name}</h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Wifi className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{plan.data} Data</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{plan.duration} Gecerlilik</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">
                    {activeRegion === "global" ? "190+ Ulke" : `${regions.find((r) => r.id === activeRegion)?.name}`}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground ml-1">TL</span>
              </div>

              <Button
                className={cn("w-full", plan.popular ? "" : "bg-transparent")}
                variant={plan.popular ? "default" : "outline"}
              >
                Satin Al
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
