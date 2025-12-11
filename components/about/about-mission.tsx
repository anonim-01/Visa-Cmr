"use client"

import { Target, Eye, Lightbulb } from "lucide-react"

export function AboutMission() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="/modern-office-team-working-global-travel-technolog.jpg" alt="Diamond Visa Ekibi" className="w-full h-full object-cover" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl max-w-xs">
              <p className="text-3xl font-bold mb-1">7/24</p>
              <p className="text-sm opacity-90">Kesintisiz Destek Hizmeti</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Biz Kimiz
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Global Seyahat ve Vize Yonetiminde Devrim
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Diamond Visa, global seyahat ve vize yonetimi alaninda devrim niteliğinde bir yaklaşım sunan, teknoloji
              odakli bir vize danismanlik sirketidir. Temel misyonumuz, vize basvuru sureclerini tamamen
              dijitallestirerek, karmasik ve zaman alici prosedürleri hizli, seffaf ve kullanici dostu bir deneyime
              donusturmektir.
            </p>

            {/* Mission Points */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Misyonumuz</h3>
                  <p className="text-muted-foreground text-sm">
                    Vize basvuru sureclerini dijitallestirerek herkes icin erisilebilir, hizli ve guvenilir hale
                    getirmek.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Vizyonumuz</h3>
                  <p className="text-muted-foreground text-sm">
                    Dunyanin en guvenilir ve yenilikci vize danismanlik platformu olmak ve global seyahati herkes icin
                    kolaylastirmak.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Yaklasimimiz</h3>
                  <p className="text-muted-foreground text-sm">
                    Yapay zeka ve makine ogrenimi ile desteklenen sistemlerimiz, her basvuruyu en yuksek basari sansiyla
                    sonuclandirmak icin calisir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
