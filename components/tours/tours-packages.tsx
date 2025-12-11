"use client"

import { MapPin, Calendar, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const packages = [
  {
    id: 1,
    title: "Bali Ruyasi",
    location: "Endonezya",
    duration: "7 Gece",
    groupSize: "2-12 Kisi",
    rating: 4.9,
    reviews: 128,
    price: 24999,
    image: "/bali-tropical-beach-resort-vacation-indonesia.jpg",
    features: ["Otel", "Kahvalti", "Transfer", "Rehber"],
  },
  {
    id: 2,
    title: "Avrupa Klasikleri",
    location: "Paris, Roma, Barselona",
    duration: "10 Gece",
    groupSize: "15-25 Kisi",
    rating: 4.8,
    reviews: 256,
    price: 34999,
    image: "/europe-tour-paris-eiffel-tower-travel.jpg",
    features: ["4* Otel", "Yarim Pansiyon", "Ucak", "Rehber"],
  },
  {
    id: 3,
    title: "Dubai Luksü",
    location: "BAE",
    duration: "5 Gece",
    groupSize: "2-6 Kisi",
    rating: 4.9,
    reviews: 89,
    price: 19999,
    image: "/dubai-luxury-skyline-burj-khalifa-travel.jpg",
    features: ["5* Otel", "Kahvalti", "Safari", "Transfer"],
  },
  {
    id: 4,
    title: "Maldivler",
    location: "Maldiv Adalari",
    duration: "6 Gece",
    groupSize: "2 Kisi",
    rating: 5.0,
    reviews: 64,
    price: 44999,
    image: "/maldives-overwater-villa-tropical-paradise.jpg",
    features: ["Su Ustu Villa", "Tam Pansiyon", "Spa", "Transfer"],
  },
]

export function ToursPackages() {
  return (
    <section id="packages" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Populer Paketler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">One Cikan Tur Paketleri</h2>
          <p className="text-muted-foreground">En cok tercih edilen tur paketlerimiz.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{pkg.rating}</span>
                  <span className="text-muted-foreground">({pkg.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {pkg.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{pkg.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{pkg.groupSize}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.features.map((feature, i) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-foreground">{pkg.price.toLocaleString()}</span>
                    <span className="text-muted-foreground text-sm ml-1">TL</span>
                  </div>
                  <Button size="sm">Detay</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
