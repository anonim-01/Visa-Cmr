import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { Storage } from '@google-cloud/storage';
import { config } from '../config/env';

export interface PassportData {
  passportNumber: string;
  surname: string;
  givenNames: string;
  nationality: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  dateOfIssue: Date;
  dateOfExpiry: Date;
  issuingAuthority: string;
  confidenceScore?: number;
  tamperingIndicators?: string[];
}

export interface VisaData {
  visaNumber: string;
  type: string;
  issuingCountry: string;
  dateOfIssue: Date;
  dateOfExpiry: Date;
  entries: string;
  passportNumber: string;
  confidenceScore?: number;
}

export interface ApplicationData {
  nationality: string;
  dateOfBirth: Date;
  passportNumber: string;
  destination: string;
  travelDate: Date;
  stayDuration: number;
}

export interface ValidationResult {
  isValid: boolean;
  inconsistencies: Inconsistency[];
  overallRiskScore: number;
}

export interface Inconsistency {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
}

export class DocumentAIService {
  private client: DocumentProcessorServiceClient;
  private storage: Storage;
  private projectId: string;
  private location = config.googleCloud.documentAiLocation;

  // Pre-trained processors for different document types
  private processors = {
    PASSPORT: `projects/${config.googleCloud.projectId}/locations/${this.location}/processors/passport-processor`,
    VISA: `projects/${config.googleCloud.projectId}/locations/${this.location}/processors/visa-processor`,
    DRIVER_LICENSE: `projects/${config.googleCloud.projectId}/locations/${this.location}/processors/driver-license-processor`
  };

  constructor() {
    this.client = new DocumentProcessorServiceClient({
      projectId: config.googleCloud.projectId,
      keyFilename: config.googleCloud.credentials,
    });
    this.storage = new Storage({
      projectId: config.googleCloud.projectId,
      keyFilename: config.googleCloud.credentials,
    });
    this.projectId = config.googleCloud.projectId;
  }

  async extractPassportData(imageBuffer: Buffer): Promise<PassportData> {
    try {
      const request = {
        name: this.processors.PASSPORT,
        rawDocument: {
          content: imageBuffer.toString('base64'),
          mimeType: 'image/jpeg'
        }
      };

      const [result] = await this.client.processDocument(request);
      const { document } = result;

      // Extract entities using Document AI's entity extraction
      const entities = this.extractEntities(document);

      return {
        passportNumber: entities.passportNumber || '',
        surname: entities.surname || '',
        givenNames: entities.givenNames || '',
        nationality: entities.nationality || '',
        dateOfBirth: new Date(entities.dateOfBirth || ''),
        placeOfBirth: entities.placeOfBirth || '',
        dateOfIssue: new Date(entities.dateOfIssue || ''),
        dateOfExpiry: new Date(entities.dateOfExpiry || ''),
        issuingAuthority: entities.issuingAuthority || '',
        confidenceScore: document.confidence || 0,
        tamperingIndicators: this.checkTampering(document)
      };
    } catch (error) {
      console.error('Document AI Passport Processing Error:', error);
      throw new Error('Pasaport işlenirken hata oluştu');
    }
  }

  async extractVisaData(imageBuffer: Buffer): Promise<VisaData> {
    try {
      const request = {
        name: this.processors.VISA,
        rawDocument: {
          content: imageBuffer.toString('base64'),
          mimeType: 'image/jpeg'
        }
      };

      const [result] = await this.client.processDocument(request);
      const { document } = result;

      const entities = this.extractEntities(document);

      return {
        visaNumber: entities.visaNumber || '',
        type: entities.visaType || '',
        issuingCountry: entities.issuingCountry || '',
        dateOfIssue: new Date(entities.dateOfIssue || ''),
        dateOfExpiry: new Date(entities.dateOfExpiry || ''),
        entries: entities.entries || 'SINGLE',
        passportNumber: entities.passportNumber || '',
        confidenceScore: document.confidence || 0
      };
    } catch (error) {
      console.error('Document AI Visa Processing Error:', error);
      throw new Error('Vize belgesi işlenirken hata oluştu');
    }
  }

  async validateDocumentConsistency(
    passportData: PassportData,
    visaData?: VisaData,
    applicationData?: ApplicationData
  ): Promise<ValidationResult> {

    const inconsistencies: Inconsistency[] = [];

    // 1. Date of birth consistency
    if (applicationData && passportData.dateOfBirth.getTime() !== applicationData.dateOfBirth.getTime()) {
      inconsistencies.push({
        type: 'DATE_OF_BIRTH_MISMATCH',
        severity: 'HIGH',
        message: 'Pasaport doğum tarihi ile başvuru doğum tarihi uyuşmuyor'
      });
    }

    // 2. Passport expiry check
    const monthsToExpiry = this.calculateMonthsToExpiry(passportData.dateOfExpiry);
    if (monthsToExpiry < 6) {
      inconsistencies.push({
        type: 'PASSPORT_EXPIRING_SOON',
        severity: 'MEDIUM',
        message: `Pasaport ${monthsToExpiry} ay içinde süresi doluyor`
      });
    }

    // 3. Passport number consistency
    if (visaData && visaData.passportNumber !== passportData.passportNumber) {
      inconsistencies.push({
        type: 'PASSPORT_NUMBER_MISMATCH',
        severity: 'CRITICAL',
        message: 'Vizedeki pasaport numarası ile uyuşmuyor'
      });
    }

    // 4. Visa validity for travel date
    if (visaData && applicationData) {
      const travelDate = applicationData.travelDate;
      if (travelDate < visaData.dateOfIssue || travelDate > visaData.dateOfExpiry) {
        inconsistencies.push({
          type: 'VISA_INVALID_FOR_TRAVEL_DATE',
          severity: 'CRITICAL',
          message: 'Vize seyahat tarihi için geçerli değil'
        });
      }
    }

    // 5. Confidence score check
    if (passportData.confidenceScore && passportData.confidenceScore < 0.8) {
      inconsistencies.push({
        type: 'LOW_CONFIDENCE_PASSPORT',
        severity: 'MEDIUM',
        message: 'Pasaport verilerinin doğruluğu düşük'
      });
    }

    // 6. Tampering detection
    if (passportData.tamperingIndicators && passportData.tamperingIndicators.length > 0) {
      inconsistencies.push({
        type: 'DOCUMENT_TAMPERING_DETECTED',
        severity: 'CRITICAL',
        message: 'Belgede tahrifat izleri tespit edildi'
      });
    }

    return {
      isValid: inconsistencies.length === 0,
      inconsistencies,
      overallRiskScore: this.calculateRiskScore(inconsistencies)
    };
  }

  private extractEntities(document: any): Record<string, string> {
    const entities: Record<string, string> = {};

    if (document.entities) {
      document.entities.forEach((entity: any) => {
        const key = entity.type.toLowerCase().replace(/\s+/g, '');
        entities[key] = entity.mentionText;
      });
    }

    return entities;
  }

  private checkTampering(document: any): string[] {
    const indicators: string[] = [];

    // Basic tampering detection based on document analysis
    // This would be enhanced with ML models in production

    if (document.confidence < 0.7) {
      indicators.push('Düşük güvenilirlik skoru');
    }

    // Check for text inconsistencies
    if (document.entities) {
      const textBlocks = document.pages?.[0]?.blocks || [];
      // Add more sophisticated tampering checks here
    }

    return indicators;
  }

  private calculateMonthsToExpiry(expiryDate: Date): number {
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 30);
  }

  private calculateRiskScore(inconsistencies: Inconsistency[]): number {
    const severityWeights = {
      LOW: 0.2,
      MEDIUM: 0.5,
      HIGH: 0.8,
      CRITICAL: 1.0
    };

    let totalScore = 0;
    inconsistencies.forEach(inconsistency => {
      totalScore += severityWeights[inconsistency.severity];
    });

    return Math.min(totalScore, 1.0); // Cap at 1.0
  }

  // Upload document to Google Cloud Storage for processing
  async uploadToStorage(buffer: Buffer, filename: string, mimeType: string): Promise<string> {
    const bucketName = `${this.projectId}-documents`;
    const bucket = this.storage.bucket(bucketName);

    // Create bucket if it doesn't exist
    try {
      await bucket.create();
    } catch (error) {
      // Bucket might already exist
    }

    const file = bucket.file(filename);
    await file.save(buffer, {
      metadata: {
        contentType: mimeType,
      },
    });

    return `gs://${bucketName}/${filename}`;
  }
}
