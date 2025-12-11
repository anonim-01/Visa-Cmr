import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { VisaApplicationForm } from "@/components/visa/visa-application-form"

export const metadata = {
  title: "Vize Basvurusu - Diamond Visa",
  description: "Online vize basvuru formu. Hizli ve kolay basvuru.",
}

export default function VisaApplyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 lg:pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Vize Basvurusu
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Yeni Basvuru Olustur</h1>
              <p className="text-muted-foreground">
                Asagidaki formu doldurarak vize basvurunuzu baslatin. Tum alanlar dikkatli doldurulmalidir.
              </p>
            </div>
            <VisaApplicationForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
