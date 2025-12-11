'use client';

import { useState } from 'react';
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { VisaApplicationForm } from "@/components/visa/visa-application-form"
import { DocumentUpload } from "@/components/visa/document-upload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, CheckCircle, AlertTriangle } from "lucide-react"
import { TimaticClient, TravelRequirements } from "@/lib/timatic/timatic-client"

export default function VisaApplyPage() {
  const [travelRequirements, setTravelRequirements] = useState<TravelRequirements | null>(null);
  const [documentData, setDocumentData] = useState<any>(null);
  const [isLoadingRequirements, setIsLoadingRequirements] = useState(false);

  const handleDestinationChange = async (destination: string, nationality: string = 'TUR') => {
    if (!destination) return;

    setIsLoadingRequirements(true);
    try {
      const timaticClient = new TimaticClient();
      const requirements = await timaticClient.checkTravelRequirements({
        nationality,
        destination,
        passportNumber: 'TEMP123456', // Will be replaced with actual passport data
        passportExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        stayDuration: 30, // 30 days
        travelDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      });
      setTravelRequirements(requirements);
    } catch (error) {
      console.error('Failed to fetch travel requirements:', error);
    } finally {
      setIsLoadingRequirements(false);
    }
  };

  const handleDocumentProcessed = (data: any) => {
    setDocumentData(data);
    // Here you could validate document data against travel requirements
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 lg:pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                AI Destekli Vize Başvurusu
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Yeni Başvuru Oluştur</h1>
              <p className="text-muted-foreground">
                Aşağıdaki formu doldurarak vize başvurunuzu başlatın. AI sistemimiz belgelerinizi otomatik olarak kontrol eder.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Application Form */}
              <div className="lg:col-span-2">
                <VisaApplicationForm onDestinationChange={handleDestinationChange} />
              </div>

              {/* Sidebar with Document Upload and Requirements */}
              <div className="space-y-6">
                {/* Document Upload */}
                <DocumentUpload
                  onDocumentProcessed={handleDocumentProcessed}
                  documentType="passport"
                />

                {/* Travel Requirements */}
                {isLoadingRequirements && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {travelRequirements && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        Seyahat Gereksinimleri
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Visa Requirements */}
                      {travelRequirements.visa.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Vize Gereksinimleri:</h4>
                          {travelRequirements.visa.map((visa, index) => (
                            <div key={index} className="mb-2 p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{visa.type}</span>
                                <Badge variant={visa.required ? "destructive" : "secondary"}>
                                  {visa.required ? "Zorunlu" : "İsteğe Bağlı"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">İşlem Süresi: {visa.processingTime}</p>
                              <p className="text-sm text-gray-600">Ücret: {visa.fee} {visa.currency}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Passport Requirements */}
                      <div>
                        <h4 className="font-medium mb-2">Pasaport Gereksinimleri:</h4>
                        <div className="space-y-1 text-sm">
                          <p>Geçerlilik Süresi: {travelRequirements.passport.validityPeriod} ay</p>
                          <p>Boş Sayfa: {travelRequirements.passport.blankPages} adet</p>
                        </div>
                      </div>

                      {/* Health Requirements */}
                      {travelRequirements.health.vaccinations.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Sağlık Gereksinimleri:</h4>
                          <div className="flex flex-wrap gap-1">
                            {travelRequirements.health.vaccinations.map((vaccination, index) => (
                              <Badge key={index} variant="outline">{vaccination}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Important Notes */}
                      {(travelRequirements.passport.notes.length > 0 ||
                        travelRequirements.visa.some(v => v.notes.length > 0)) && (
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Önemli Notlar:</strong>
                            <ul className="mt-2 space-y-1">
                              {travelRequirements.passport.notes.map((note, index) => (
                                <li key={index} className="text-sm">• {note}</li>
                              ))}
                              {travelRequirements.visa.flatMap(v => v.notes).map((note, index) => (
                                <li key={index} className="text-sm">• {note}</li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Document Validation Status */}
                {documentData && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Belge Doğrulama
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Pasaport Numarası:</span>
                          <span className="font-medium">{documentData.passportNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Son Geçerlilik:</span>
                          <span className="font-medium">{documentData.dateOfExpiry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Uyumluluk:</span>
                          <Badge variant="default" className="bg-green-500">Doğrulandı</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
