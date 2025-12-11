'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DocumentAIService, PassportData, VisaData } from '@/services/document-ai.service';
import { FraudDetectionService, RiskProfile } from '@/services/fraud-detection.service';

interface DocumentUploadProps {
  onDocumentProcessed: (data: any, riskProfile?: RiskProfile) => void;
  documentType: 'passport' | 'visa' | 'driver-license';
  maxFileSize?: number; // in MB
  acceptedFormats?: string[];
  enableFraudDetection?: boolean;
}

interface UploadState {
  file: File | null;
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'analyzing' | 'completed' | 'error';
  error: string | null;
  extractedData: PassportData | VisaData | null;
  riskProfile: RiskProfile | null;
}

export function DocumentUpload({
  onDocumentProcessed,
  documentType,
  maxFileSize = 10,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
}: DocumentUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    progress: 0,
    status: 'idle',
    error: null,
    extractedData: null
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxFileSize * 1024 * 1024) {
      setUploadState(prev => ({
        ...prev,
        status: 'error',
        error: `Dosya boyutu ${maxFileSize}MB'dan büyük olamaz`
      }));
      return;
    }

    // Validate file type
    if (!acceptedFormats.includes(file.type)) {
      setUploadState(prev => ({
        ...prev,
        status: 'error',
        error: 'Geçersiz dosya formatı. JPEG, PNG veya PDF yükleyin.'
      }));
      return;
    }

    setUploadState({
      file,
      progress: 0,
      status: 'idle',
      error: null,
      extractedData: null
    });
  };

  const handleUpload = async () => {
    if (!uploadState.file) return;

    setUploadState(prev => ({ ...prev, status: 'uploading', progress: 0 }));

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90)
        }));
      }, 200);

      // Convert file to buffer for processing
      const arrayBuffer = await uploadState.file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      setUploadState(prev => ({ ...prev, status: 'processing', progress: 90 }));

      // Initialize services
      const documentAIService = new DocumentAIService();
      const fraudDetectionService = new FraudDetectionService();

      let extractedData: PassportData | VisaData;

      // Process document based on type
      if (documentType === 'passport') {
        extractedData = await documentAIService.extractPassportData(buffer);
      } else if (documentType === 'visa') {
        extractedData = await documentAIService.extractVisaData(buffer);
      } else {
        throw new Error('Unsupported document type');
      }

      setUploadState(prev => ({ ...prev, status: 'analyzing', progress: 95 }));

      // Perform fraud detection if enabled
      let riskProfile: RiskProfile | undefined;
      if (enableFraudDetection) {
        riskProfile = await fraudDetectionService.assessApplicationRisk(
          documentType === 'passport' ? extractedData as PassportData : undefined,
          documentType === 'visa' ? extractedData as VisaData : undefined
        );
      }

      clearInterval(progressInterval);

      setUploadState(prev => ({
        ...prev,
        status: 'completed',
        progress: 100,
        extractedData,
        riskProfile
      }));

      onDocumentProcessed(extractedData, riskProfile);

    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        status: 'error',
        error: 'Belge işlenirken hata oluştu. Lütfen tekrar deneyin.',
        progress: 0
      }));
    }
  };

  const removeFile = () => {
    setUploadState({
      file: null,
      progress: 0,
      status: 'idle',
      error: null,
      extractedData: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getMockExtractedData = (type: string) => {
    switch (type) {
      case 'passport':
        return {
          passportNumber: 'T12345678',
          surname: 'YILMAZ',
          givenNames: 'AHMET',
          nationality: 'TUR',
          dateOfBirth: '1990-01-01',
          placeOfBirth: 'ISTANBUL',
          dateOfIssue: '2020-01-01',
          dateOfExpiry: '2030-01-01',
          issuingAuthority: 'TURKIYE CUMHURIYETI'
        };
      case 'visa':
        return {
          visaNumber: 'V123456789',
          type: 'TOURIST',
          issuingCountry: 'USA',
          dateOfIssue: '2024-01-01',
          dateOfExpiry: '2024-12-31',
          entries: 'MULTIPLE',
          passportNumber: 'T12345678'
        };
      default:
        return {};
    }
  };

  const getDocumentTypeLabel = () => {
    switch (documentType) {
      case 'passport': return 'Pasaport';
      case 'visa': return 'Vize';
      case 'driver-license': return 'Ehliyet';
      default: return 'Belge';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {getDocumentTypeLabel()} Yükleme
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Input */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            id="document-upload"
          />

          {!uploadState.file ? (
            <div>
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <label
                htmlFor="document-upload"
                className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
              >
                <span className="font-medium">Dosya seçin</span> veya sürükleyip bırakın
              </label>
              <p className="text-xs text-gray-500 mt-2">
                JPEG, PNG, PDF (max {maxFileSize}MB)
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-8 w-8 text-blue-500" />
                <div className="text-left">
                  <p className="text-sm font-medium truncate max-w-32">
                    {uploadState.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(uploadState.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                disabled={uploadState.status === 'uploading' || uploadState.status === 'processing'}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Progress */}
        {(uploadState.status === 'uploading' || uploadState.status === 'processing') && (
          <div className="space-y-2">
            <Progress value={uploadState.progress} className="w-full" />
            <p className="text-sm text-center text-gray-600">
              {uploadState.status === 'uploading' ? 'Yükleniyor...' : 'İşleniyor...'}
            </p>
          </div>
        )}

        {/* Error Alert */}
        {uploadState.status === 'error' && uploadState.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{uploadState.error}</AlertDescription>
          </Alert>
        )}

        {/* Success */}
        {uploadState.status === 'completed' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Belge başarıyla işlendi ve bilgiler çıkarıldı.
            </AlertDescription>
          </Alert>
        )}

        {/* Upload Button */}
        {uploadState.file && uploadState.status === 'idle' && (
          <Button
            onClick={handleUpload}
            className="w-full"
            disabled={!uploadState.file}
          >
            <Upload className="h-4 w-4 mr-2" />
            Belgeyi İşle
          </Button>
        )}

        {/* Extracted Data Preview */}
        {uploadState.status === 'completed' && uploadState.extractedData && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Çıkarılan Bilgiler:</h4>
            <div className="text-sm space-y-1">
              {Object.entries(uploadState.extractedData).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
