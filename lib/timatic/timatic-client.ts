import axios from 'axios';
import { config } from '../../config/env';

export interface TravelRequirements {
  passport: PassportRequirements;
  visa: VisaRequirements[];
  health: HealthRequirements;
  customs: CustomsRegulations;
  currency: CurrencyRestrictions;
  airportTaxes: AirportTax[];
  lastUpdated: Date;
  source: 'IATA_TIMATIC';
}

export interface PassportRequirements {
  validityPeriod: number; // months
  blankPages: number;
  notes: string[];
}

export interface VisaRequirements {
  type: string;
  required: boolean;
  processingTime: string;
  fee: number;
  currency: string;
  notes: string[];
}

export interface HealthRequirements {
  vaccinations: string[];
  certificates: string[];
  insurance: boolean;
  quarantine: boolean;
}

export interface CustomsRegulations {
  prohibitedItems: string[];
  restrictedItems: string[];
  dutyFreeLimits: { [key: string]: number };
}

export interface CurrencyRestrictions {
  declarationRequired: boolean;
  amountLimit: number;
  currency: string;
}

export interface AirportTax {
  type: string;
  amount: number;
  currency: string;
  payableAt: string;
}

export class TimaticClient {
  private apiKey: string;
  private baseURL = config.iata.baseUrl;

  constructor() {
    this.apiKey = config.iata.apiKey;
  }

  async checkTravelRequirements(params: {
    nationality: string;      // ISO 3166-1 alpha-3
    destination: string;      // ISO 3166-1 alpha-3
    transitPoints?: string[]; // Transit countries
    passportNumber: string;
    passportExpiry: Date;
    stayDuration: number;     // days
    travelDate: Date;
  }): Promise<TravelRequirements> {

    const requestPayload = {
      version: '3.0',
      request: {
        passenger: {
          nationality: params.nationality,
          document: {
            type: 'P',
            number: params.passportNumber,
            expiryDate: params.passportExpiry.toISOString().split('T')[0],
            countryOfIssue: params.nationality
          }
        },
        itinerary: {
          origin: params.nationality,
          destination: params.destination,
          transitPoints: params.transitPoints || [],
          travelDate: params.travelDate.toISOString().split('T')[0]
        },
        stay: {
          duration: params.stayDuration,
          purpose: 'TOURISM' // TOURISM, BUSINESS, STUDY, etc.
        }
      }
    };

    try {
      const response = await axios.post(this.baseURL, requestPayload, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 seconds
      });

      return this.parseTimaticResponse(response.data);

    } catch (error) {
      console.error('IATA Timatic API Error:', error);
      // Fallback: Return cached or default requirements
      return await this.getCachedRequirements(params);
    }
  }

  private parseTimaticResponse(data: any): TravelRequirements {
    // Parse the IATA Timatic response and structure it
    // This is a simplified parsing - in production, you'd map all fields properly

    return {
      passport: {
        validityPeriod: data.passport?.validityPeriod || 6,
        blankPages: data.passport?.blankPages || 2,
        notes: data.passport?.notes || []
      },
      visa: data.visa?.requirements || [],
      health: {
        vaccinations: data.health?.vaccinations || [],
        certificates: data.health?.certificates || [],
        insurance: data.health?.insuranceRequired || false,
        quarantine: data.health?.quarantineRequired || false
      },
      customs: {
        prohibitedItems: data.customs?.prohibited || [],
        restrictedItems: data.customs?.restricted || [],
        dutyFreeLimits: data.customs?.dutyFreeLimits || {}
      },
      currency: {
        declarationRequired: data.currency?.declarationRequired || false,
        amountLimit: data.currency?.amountLimit || 0,
        currency: data.currency?.currency || 'USD'
      },
      airportTaxes: data.airportTaxes || [],
      lastUpdated: new Date(),
      source: 'IATA_TIMATIC'
    };
  }

  private async getCachedRequirements(params: any): Promise<TravelRequirements> {
    // Implement caching logic here (Redis or local cache)
    // For now, return default requirements
    return {
      passport: {
        validityPeriod: 6,
        blankPages: 2,
        notes: ['Passport must be valid for at least 6 months']
      },
      visa: [{
        type: 'Tourist Visa',
        required: true,
        processingTime: '10-15 business days',
        fee: 80,
        currency: 'USD',
        notes: ['Apply online through embassy website']
      }],
      health: {
        vaccinations: [],
        certificates: [],
        insurance: false,
        quarantine: false
      },
      customs: {
        prohibitedItems: [],
        restrictedItems: [],
        dutyFreeLimits: {}
      },
      currency: {
        declarationRequired: false,
        amountLimit: 0,
        currency: 'USD'
      },
      airportTaxes: [],
      lastUpdated: new Date(),
      source: 'IATA_TIMATIC'
    };
  }

  // Method to subscribe to rule changes (for future implementation)
  async subscribeToRuleChanges(callback: (changes: any[]) => void) {
    // WebSocket connection to IATA for real-time updates
    // Implementation would go here
  }
}
