"use client"

import { Users, Fuel, Settings, Snowflake } from "lucide-react"
import { Button } from "@/components/ui/button"

const vehicles = [
  {
    id: 1,
    name: "Ekonomik",
    model: "Fiat Egea veya benzeri",
    image: "/economy-sedan-car-rental-white-background.jpg",
    seats: 5,
    transmission: "Manuel",
    fuel: "Benzin",
    ac: true,
    pricePerDay: 450,
  },
  {
    id: 2,
    name: "Orta Sinif",
    model: "VW Passat veya benzeri",
    image: "/midsize-sedan-car-rental-professional.jpg",
    seats: 5,
    transmission: "Otomatik",
    fuel: "Dizel",
    ac: true,
    pricePerDay: 750,
  },
  {
    id: 3,
    name: "SUV",
    model: "Nissan Qashqai veya benzeri",
    image: "/suv-crossover-car-rental-outdoor.jpg",
    seats: 5,
    transmission: "Otomatik",
    fuel: "Dizel",
    ac: true,
    pricePerDay: 950,
  },
  {
    id: 4,
    name: "Luks",
    model: "Mercedes E-Class veya benzeri",
    image: "/luxury-sedan-mercedes-car-rental-premium.jpg",
    seats: 5,
    transmission: "Otomatik",
    fuel: "Benzin",
    ac: true,
    pricePerDay: 1500,
  },
]

export function RentalVehicles() {
  return (
    <section id="vehicles" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Arac Filomuz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ihtiyaciniza Uygun Arac</h2>
          <p className="text-muted-foreground">Ekonomikten lukse her butceye uygun araclar.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all"
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-1">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{vehicle.model}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{vehicle.seats} Kisi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Settings className="h-4 w-4" />
                    <span>{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Fuel className="h-4 w-4" />
                    <span>{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Snowflake className="h-4 w-4" />
                    <span>{vehicle.ac ? "Klima" : "Klimasiz"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-foreground">{vehicle.pricePerDay}</span>
                    <span className="text-muted-foreground text-sm ml-1">TL/gun</span>
                  </div>
                  <Button size="sm">Kirala</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
