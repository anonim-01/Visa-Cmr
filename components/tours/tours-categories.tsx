"use client"

import { Palmtree, Mountain, Building2, Ship, Plane, Camera } from "lucide-react"

const categories = [
  { icon: Palmtree, name: "Plaj Tatilleri", count: 45 },
  { icon: Mountain, name: "Dogla Turlari", count: 32 },
  { icon: Building2, name: "Sehir Turlari", count: 58 },
  { icon: Ship, name: "Kruvaziyer", count: 12 },
  { icon: Plane, name: "Uzak Dogu", count: 24 },
  { icon: Camera, name: "Kultur Turlari", count: 38 },
]

export function ToursCategories() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Kategoriler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tur Kategorileri</h2>
          <p className="text-muted-foreground">Ilgi alaniniza gore tur secin.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="group bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                <category.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">{category.count} Tur</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
