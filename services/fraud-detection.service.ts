import { PassportData, VisaData, ApplicationData, ValidationResult } from './document-ai.service';
import { TimaticClient, TravelRequirements } from '../lib/timatic/timatic-client';
import { config } from '../config/env';

export interface FraudRisk {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  score: number;
  factors: FraudFactor[];
  recommendations: string[];
}

export interface FraudFactor {
  type: string;
  description: string;
  weight: number;
  evidence: string;
}

export interface RiskProfile {
  applicantId: string;
  overallRisk: FraudRisk;
  documentRisk: FraudRisk;
  behavioralRisk: FraudRisk;
  networkRisk: FraudRisk;
  lastUpdated: Date;
  riskHistory: RiskHistoryEntry[];
}

export interface RiskHistoryEntry {
  timestamp: Date;
  riskLevel: string;
  factors: string[];
  action: string;
}

export class FraudDetectionService {
  private timaticClient: TimaticClient;
  private riskThresholds = {
    LOW: 0.3,
    MEDIUM: 0.6,
    HIGH: 0.8,
    CRITICAL: 0.95
  };

  constructor() {
    this.timaticClient = new TimaticClient();
  }

  async assessApplicationRisk(
    passportData: PassportData,
    visaData?: VisaData,
    applicationData?: ApplicationData,
    travelRequirements?: TravelRequirements
  ): Promise<RiskProfile> {

    const documentRisk = await this.assessDocumentRisk(passportData, visaData);
    const behavioralRisk = await this.assessBehavioralRisk(applicationData);
    const networkRisk = await this.assessNetworkRisk(applicationData);

    const overallScore = this.calculateOverallRiskScore(documentRisk, behavioralRisk, networkRisk);
    const overallLevel = this.determineRiskLevel(overallScore);

    const riskProfile: RiskProfile = {
      applicantId: passportData.passportNumber,
      overallRisk: {
        level: overallLevel,
        score: overallScore,
        factors: [...documentRisk.factors, ...behavioralRisk.factors, ...networkRisk.factors],
        recommendations: this.generateRecommendations(overallLevel, documentRisk, behavioralRisk, networkRisk)
      },
      documentRisk,
      behavioralRisk,
      networkRisk,
      lastUpdated: new Date(),
      riskHistory: []
    };

    return riskProfile;
  }

  private async assessDocumentRisk(passportData: PassportData, visaData?: VisaData): Promise<FraudRisk> {
    const factors: FraudFactor[] = [];

    // 1. Document tampering detection
    if (passportData.tamperingIndicators && passportData.tamperingIndicators.length > 0) {
      factors.push({
        type: 'DOCUMENT_TAMPERING',
        description: 'Belgede tahrifat izleri tespit edildi',
        weight: 0.9,
        evidence: passportData.tamperingIndicators.join(', ')
      });
    }

    // 2. Confidence score analysis
    if (passportData.confidenceScore && passportData.confidenceScore < 0.8) {
      factors.push({
        type: 'LOW_CONFIDENCE_SCORE',
        description: 'OCR güvenilirlik skoru düşük',
        weight: 0.3,
        evidence: `Güvenilirlik: ${(passportData.confidenceScore * 100).toFixed(1)}%`
      });
    }

    // 3. Document age analysis
    const documentAge = this.calculateDocumentAge(passportData.dateOfIssue);
    if (documentAge > 365 * 5) { // 5 years
      factors.push({
        type: 'OLD_DOCUMENT',
        description: 'Belge yaşı yüksek',
        weight: 0.2,
        evidence: `${documentAge} gün önce düzenlenmiş`
      });
    }

    // 4. Visa consistency check
    if (visaData) {
      if (visaData.passportNumber !== passportData.passportNumber) {
        factors.push({
          type: 'PASSPORT_VISA_MISMATCH',
          description: 'Pasaport ve vize bilgileri uyuşmuyor',
          weight: 0.8,
          evidence: 'Pasaport numaraları farklı'
        });
      }

      const visaValidityPeriod = this.calculateDaysBetween(visaData.dateOfIssue, visaData.dateOfExpiry);
      if (visaValidityPeriod > 365 * 2) { // 2 years
        factors.push({
          type: 'UNUSUALLY_LONG_VISA',
          description: 'Vize süresi alışılmadık derecede uzun',
          weight: 0.4,
          evidence: `${visaValidityPeriod} günlük vize`
        });
      }
    }

    // 5. Blacklist check (simplified)
    const isBlacklisted = await this.checkBlacklist(passportData.passportNumber);
    if (isBlacklisted) {
      factors.push({
        type: 'BLACKLISTED_DOCUMENT',
        description: 'Belge kara listede',
        weight: 1.0,
        evidence: 'Güvenlik veritabanında kayıtlı'
      });
    }

    const score = Math.min(factors.reduce((sum, factor) => sum + factor.weight, 0), 1.0);
    const level = this.determineRiskLevel(score);

    return {
      level,
      score,
      factors,
      recommendations: this.generateDocumentRecommendations(factors)
    };
  }

  private async assessBehavioralRisk(applicationData?: ApplicationData): Promise<FraudRisk> {
    const factors: FraudFactor[] = [];

    if (!applicationData) {
      return { level: 'LOW', score: 0, factors: [], recommendations: [] };
    }

    // 1. Travel pattern analysis
    const travelFrequency = await this.analyzeTravelFrequency(applicationData);
    if (travelFrequency > 12) { // More than 12 trips per year
      factors.push({
        type: 'FREQUENT_TRAVELER',
        description: 'Çok sık seyahat eden kişi',
        weight: 0.3,
        evidence: `Yıllık ${travelFrequency} seyahat`
      });
    }

    // 2. Stay duration vs purpose analysis
    if (applicationData.stayDuration > 90) { // More than 90 days
      factors.push({
        type: 'LONG_STAY_DURATION',
        description: 'Uzun süreli kalış',
        weight: 0.4,
        evidence: `${applicationData.stayDuration} günlük kalış`
      });
    }

    // 3. Last minute applications
    const daysToTravel = this.calculateDaysToTravel(applicationData.travelDate);
    if (daysToTravel < 7) { // Less than 1 week
      factors.push({
        type: 'LAST_MINUTE_APPLICATION',
        description: 'Son dakika başvurusu',
        weight: 0.5,
        evidence: `Seyahate ${daysToTravel} gün kaldı`
      });
    }

    // 4. Unusual destination patterns
    const destinationRisk = await this.analyzeDestinationRisk(applicationData.destination);
    if (destinationRisk > 0.7) {
      factors.push({
        type: 'HIGH_RISK_DESTINATION',
        description: 'Yüksek riskli destinasyon',
        weight: 0.6,
        evidence: `${applicationData.destination} yüksek risk puanı`
      });
    }

    const score = Math.min(factors.reduce((sum, factor) => sum + factor.weight, 0), 1.0);
    const level = this.determineRiskLevel(score);

    return {
      level,
      score,
      factors,
      recommendations: this.generateBehavioralRecommendations(factors)
    };
  }

  private async assessNetworkRisk(applicationData?: ApplicationData): Promise<FraudRisk> {
    const factors: FraudFactor[] = [];

    if (!applicationData) {
      return { level: 'LOW', score: 0, factors: [], recommendations: [] };
    }

    // 1. IP address analysis (simplified)
    const ipRisk = await this.analyzeIPRisk();
    if (ipRisk > 0.8) {
      factors.push({
        type: 'HIGH_RISK_IP',
        description: 'Yüksek riskli IP adresi',
        weight: 0.7,
        evidence: 'VPN veya proxy kullanımı şüpheli'
      });
    }

    // 2. Device fingerprinting
    const deviceRisk = await this.analyzeDeviceFingerprint();
    if (deviceRisk > 0.6) {
      factors.push({
        type: 'DEVICE_FINGERPRINT_RISK',
        description: 'Cihaz parmak izi riski',
        weight: 0.4,
        evidence: 'Yeni cihaz veya şüpheli aktivite'
      });
    }

    // 3. Network analysis
    const networkRisk = await this.analyzeNetworkPatterns(applicationData);
    if (networkRisk > 0.5) {
      factors.push({
        type: 'NETWORK_PATTERN_RISK',
        description: 'Ağ kullanım paterninde risk',
        weight: 0.5,
        evidence: 'Şüpheli ağ aktivitesi'
      });
    }

    const score = Math.min(factors.reduce((sum, factor) => sum + factor.weight, 0), 1.0);
    const level = this.determineRiskLevel(score);

    return {
      level,
      score,
      factors,
      recommendations: this.generateNetworkRecommendations(factors)
    };
  }

  private calculateOverallRiskScore(documentRisk: FraudRisk, behavioralRisk: FraudRisk, networkRisk: FraudRisk): number {
    // Weighted combination of different risk types
    const weights = {
      document: 0.5,    // Document risk is most important
      behavioral: 0.3,  // Behavioral patterns
      network: 0.2      // Network analysis
    };

    return Math.min(
      (documentRisk.score * weights.document) +
      (behavioralRisk.score * weights.behavioral) +
      (networkRisk.score * weights.network),
      1.0
    );
  }

  private determineRiskLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    if (score >= this.riskThresholds.CRITICAL) return 'CRITICAL';
    if (score >= this.riskThresholds.HIGH) return 'HIGH';
    if (score >= this.riskThresholds.MEDIUM) return 'MEDIUM';
    return 'LOW';
  }

  private generateRecommendations(
    overallLevel: string,
    documentRisk: FraudRisk,
    behavioralRisk: FraudRisk,
    networkRisk: FraudRisk
  ): string[] {
    const recommendations: string[] = [];

    if (overallLevel === 'CRITICAL') {
      recommendations.push('Başvuruyu derhal reddedin');
      recommendations.push('Güvenlik birimine bildirin');
      recommendations.push('Belgeyi fiziksel incelemeye gönderin');
    } else if (overallLevel === 'HIGH') {
      recommendations.push('Ek belge talep edin');
      recommendations.push('Görüşme planlayın');
      recommendations.push('Referans kontrolü yapın');
    } else if (overallLevel === 'MEDIUM') {
      recommendations.push('Dikkatli inceleme yapın');
      recommendations.push('Ek doğrulama isteyin');
    }

    return recommendations;
  }

  private generateDocumentRecommendations(factors: FraudFactor[]): string[] {
    const recommendations: string[] = [];

    if (factors.some(f => f.type === 'DOCUMENT_TAMPERING')) {
      recommendations.push('Belgeyi uzman incelemesine gönderin');
    }

    if (factors.some(f => f.type === 'LOW_CONFIDENCE_SCORE')) {
      recommendations.push('Belgeyi yeniden tarayın');
    }

    return recommendations;
  }

  private generateBehavioralRecommendations(factors: FraudFactor[]): string[] {
    const recommendations: string[] = [];

    if (factors.some(f => f.type === 'LAST_MINUTE_APPLICATION')) {
      recommendations.push('Aceleci başvuruyu şüpheli olarak değerlendirin');
    }

    return recommendations;
  }

  private generateNetworkRecommendations(factors: FraudFactor[]): string[] {
    const recommendations: string[] = [];

    if (factors.some(f => f.type === 'HIGH_RISK_IP')) {
      recommendations.push('Kimlik doğrulama seviyesini artırın');
    }

    return recommendations;
  }

  // Helper methods (simplified implementations)
  private calculateDocumentAge(issueDate: Date): number {
    return Math.floor((Date.now() - issueDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  private calculateDaysBetween(start: Date, end: Date): number {
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  private calculateDaysToTravel(travelDate: Date): number {
    return Math.floor((travelDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  }

  private async checkBlacklist(passportNumber: string): Promise<boolean> {
    // Simplified blacklist check - in production, this would query a database
    const blacklistedNumbers = ['BLACKLISTED123', 'SUSPICIOUS456'];
    return blacklistedNumbers.includes(passportNumber);
  }

  private async analyzeTravelFrequency(applicationData: ApplicationData): Promise<number> {
    // Simplified - in production, this would query travel history database
    return Math.floor(Math.random() * 20); // Mock data
  }

  private async analyzeDestinationRisk(destination: string): Promise<number> {
    // Simplified risk scoring for destinations
    const highRiskCountries = ['SY', 'IR', 'KP', 'CU'];
    return highRiskCountries.includes(destination) ? 0.9 : 0.1;
  }

  private async analyzeIPRisk(): Promise<number> {
    // Simplified IP risk analysis
    return Math.random() * 0.5; // Mock data
  }

  private async analyzeDeviceFingerprint(): Promise<number> {
    // Simplified device fingerprinting
    return Math.random() * 0.4; // Mock data
  }

  private async analyzeNetworkPatterns(applicationData: ApplicationData): Promise<number> {
    // Simplified network pattern analysis
    return Math.random() * 0.3; // Mock data
  }
}
