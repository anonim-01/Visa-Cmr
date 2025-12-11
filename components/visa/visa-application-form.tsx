"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  User,
  Plane,
  FileText,
  CreditCard,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Upload,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { POPULAR_COUNTRIES, VISA_TYPES } from "@/lib/constants"

const steps = [
  { id: 1, title: "Kisisel Bilgiler", icon: User },
  { id: 2, title: "Seyahat Detaylari", icon: Plane },
  { id: 3, title: "Belgeler", icon: FileText },
  { id: 4, title: "Odeme", icon: CreditCard },
  { id: 5, title: "Onay", icon: CheckCircle },
]

export function VisaApplicationForm() {
  const searchParams = useSearchParams()
  const initialCountry = searchParams.get("country") || ""
  const initialType = searchParams.get("type") || ""

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    birthPlace: "",
    nationality: "TR",
    passportNumber: "",
    passportExpiry: "",
    address: "",
    // Travel Details
    destinationCountry: initialCountry,
    visaType: initialType,
    travelDate: "",
    returnDate: "",
    purpose: "",
    accommodation: "",
    previousVisa: "",
    // Documents
    passportCopy: null as File | null,
    photo: null as File | null,
    bankStatement: null as File | null,
    employmentLetter: null as File | null,
    // Payment
    paymentMethod: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })

  const updateFormData = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    updateFormData(field, file)
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setCurrentStep(5)
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Progress Steps */}
      <div className="bg-muted/50 p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  currentStep >= step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <span
                className={cn(
                  "hidden md:block ml-2 text-sm font-medium",
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <ChevronRight className="h-5 w-5 mx-2 md:mx-4 text-muted-foreground hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 md:p-8">
        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Kisisel Bilgiler</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ad *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  placeholder="Adiniz"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Soyad *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  placeholder="Soyadiniz"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="ornek@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+90 5XX XXX XX XX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Dogum Tarihi *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateFormData("birthDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthPlace">Dogum Yeri *</Label>
                <Input
                  id="birthPlace"
                  value={formData.birthPlace}
                  onChange={(e) => updateFormData("birthPlace", e.target.value)}
                  placeholder="Sehir, Ulke"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Pasaport Numarasi *</Label>
                <Input
                  id="passportNumber"
                  value={formData.passportNumber}
                  onChange={(e) => updateFormData("passportNumber", e.target.value)}
                  placeholder="U12345678"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportExpiry">Pasaport Gecerlilik Tarihi *</Label>
                <Input
                  id="passportExpiry"
                  type="date"
                  value={formData.passportExpiry}
                  onChange={(e) => updateFormData("passportExpiry", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Adres *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  placeholder="Tam adresiniz"
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Travel Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Seyahat Detaylari</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="destinationCountry">Hedef Ulke *</Label>
                <Select
                  value={formData.destinationCountry}
                  onValueChange={(value) => updateFormData("destinationCountry", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ulke Secin" />
                  </SelectTrigger>
                  <SelectContent>
                    {POPULAR_COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="visaType">Vize Turu *</Label>
                <Select value={formData.visaType} onValueChange={(value) => updateFormData("visaType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Vize Turu Secin" />
                  </SelectTrigger>
                  <SelectContent>
                    {VISA_TYPES.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="travelDate">Gidis Tarihi *</Label>
                <Input
                  id="travelDate"
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => updateFormData("travelDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnDate">Donus Tarihi *</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => updateFormData("returnDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="purpose">Seyahat Amaci *</Label>
                <Textarea
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => updateFormData("purpose", e.target.value)}
                  placeholder="Seyahat amacınizi detayli aciklayin"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="accommodation">Konaklama Bilgileri</Label>
                <Input
                  id="accommodation"
                  value={formData.accommodation}
                  onChange={(e) => updateFormData("accommodation", e.target.value)}
                  placeholder="Otel adi veya adres"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="previousVisa">Onceki Vize Bilgileri</Label>
                <Textarea
                  id="previousVisa"
                  value={formData.previousVisa}
                  onChange={(e) => updateFormData("previousVisa", e.target.value)}
                  placeholder="Daha once aldiginiz vizeleri belirtin (varsa)"
                  rows={2}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Documents */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Belge Yukleme</h2>

            {/* AI Warning */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">AI Belge Kontrolu</p>
                <p className="text-sm text-muted-foreground">
                  Yukleyeceginiz belgeler yapay zeka tarafindan kontrol edilecek ve eksikler size bildirilecektir.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Passport Copy */}
              <div className="space-y-2">
                <Label>Pasaport Kopyasi *</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("passportCopy", e)}
                    className="hidden"
                    id="passportCopy"
                  />
                  <label htmlFor="passportCopy" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {formData.passportCopy ? formData.passportCopy.name : "PDF, JPG veya PNG yukleyin"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Photo */}
              <div className="space-y-2">
                <Label>Biyometrik Fotograf *</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("photo", e)}
                    className="hidden"
                    id="photo"
                  />
                  <label htmlFor="photo" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {formData.photo ? formData.photo.name : "5x5cm beyaz arkaplan"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Bank Statement */}
              <div className="space-y-2">
                <Label>Banka Hesap Ozeti *</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange("bankStatement", e)}
                    className="hidden"
                    id="bankStatement"
                  />
                  <label htmlFor="bankStatement" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {formData.bankStatement ? formData.bankStatement.name : "Son 3 aylik hesap ozeti"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Employment Letter */}
              <div className="space-y-2">
                <Label>Is Belgesi</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange("employmentLetter", e)}
                    className="hidden"
                    id="employmentLetter"
                  />
                  <label htmlFor="employmentLetter" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {formData.employmentLetter ? formData.employmentLetter.name : "Opsiyonel"}
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Odeme Bilgileri</h2>

            {/* Price Summary */}
            <div className="bg-muted/50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4">Odeme Ozeti</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vize Danismanlik Ucreti</span>
                  <span className="text-foreground">2,500 TL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Belge Islem Ucreti</span>
                  <span className="text-foreground">500 TL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Konsolosluk Ucreti</span>
                  <span className="text-foreground">80 EUR</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Toplam</span>
                    <span className="text-primary">3,000 TL + 80 EUR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <Label>Odeme Yontemi *</Label>
              <div className="grid md:grid-cols-3 gap-4">
                {["credit_card", "bank_transfer", "crypto"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => updateFormData("paymentMethod", method)}
                    className={cn(
                      "p-4 rounded-xl border-2 text-center transition-all",
                      formData.paymentMethod === method
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <CreditCard className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <span className="text-sm font-medium">
                      {method === "credit_card" && "Kredi Karti"}
                      {method === "bank_transfer" && "Havale/EFT"}
                      {method === "crypto" && "Kripto Para"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Card Details */}
            {formData.paymentMethod === "credit_card" && (
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cardNumber">Kart Numarasi</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => updateFormData("cardNumber", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardExpiry">Son Kullanma Tarihi</Label>
                  <Input
                    id="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={(e) => updateFormData("cardExpiry", e.target.value)}
                    placeholder="AA/YY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardCvc">CVC</Label>
                  <Input
                    id="cardCvc"
                    value={formData.cardCvc}
                    onChange={(e) => updateFormData("cardCvc", e.target.value)}
                    placeholder="123"
                  />
                </div>
              </div>
            )}

            {/* Terms */}
            <label className="flex items-start gap-3 mt-6">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm text-muted-foreground">
                <a href="/terms" className="text-primary hover:underline">
                  Hizmet Sozlesmesi
                </a>{" "}
                ve{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Gizlilik Politikasi
                </a>
                'ni okudum ve kabul ediyorum.
              </span>
            </label>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {currentStep === 5 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Basvurunuz Alindi!</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Basvuru numaraniz: <span className="font-mono font-semibold text-primary">DV-2024-{Date.now()}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Belgeleriniz AI sistemimiz tarafindan inceleniyor. Sonuclar e-posta ile bildirilecektir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/dashboard">Basvurularimi Gor</a>
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <a href="/">Ana Sayfaya Don</a>
              </Button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-transparent"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Geri
            </Button>
            {currentStep < 4 ? (
              <Button type="button" onClick={nextStep}>
                Devam Et
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Isleniyor...
                  </>
                ) : (
                  <>
                    Odemeyi Tamamla
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
