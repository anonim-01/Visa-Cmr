import { io, Socket } from 'socket.io-client';
import { config } from '../config/env';

export interface AppointmentSlot {
  id: string;
  date: Date;
  time: string;
  embassy: string;
  serviceType: 'VISA' | 'PASSPORT' | 'RESIDENCE_PERMIT';
  available: boolean;
  capacity: number;
  bookedCount: number;
}

export interface AppointmentRequest {
  applicantId: string;
  serviceType: 'VISA' | 'PASSPORT' | 'RESIDENCE_PERMIT';
  preferredDates: Date[];
  nationality: string;
  urgency: 'NORMAL' | 'URGENT' | 'EMERGENCY';
  contactInfo: {
    email: string;
    phone: string;
    whatsapp?: string;
  };
}

export interface BotResponse {
  type: 'GREETING' | 'QUESTION' | 'CONFIRMATION' | 'APPOINTMENT_BOOKED' | 'NO_AVAILABILITY' | 'ERROR';
  message: string;
  options?: string[];
  appointment?: AppointmentSlot;
  nextAction?: string;
}

export interface ChatSession {
  sessionId: string;
  applicantId: string;
  currentStep: string;
  collectedData: Partial<AppointmentRequest>;
  lastActivity: Date;
  isActive: boolean;
}

export class AppointmentBotService {
  private socket: Socket;
  private sessions: Map<string, ChatSession> = new Map();
  private embassySchedules: Map<string, AppointmentSlot[]> = new Map();

  constructor() {
    this.socket = io(config.app.apiBaseUrl, {
      transports: ['websocket', 'polling']
    });

    this.initializeSocketListeners();
    this.loadEmbassySchedules();
  }

  // Initialize real-time communication
  private initializeSocketListeners() {
    this.socket.on('connect', () => {
      console.log('Appointment Bot connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Appointment Bot disconnected');
    });

    this.socket.on('appointment_update', (data: any) => {
      this.handleAppointmentUpdate(data);
    });

    this.socket.on('schedule_update', (data: any) => {
      this.handleScheduleUpdate(data);
    });
  }

  // Process user message and return bot response
  async processMessage(sessionId: string, userMessage: string): Promise<BotResponse> {
    let session = this.sessions.get(sessionId);

    if (!session) {
      session = this.createNewSession(sessionId);
    }

    session.lastActivity = new Date();

    // Analyze user intent and extract information
    const intent = this.analyzeIntent(userMessage);
    const extractedData = this.extractAppointmentData(userMessage);

    // Update session data
    this.updateSessionData(session, extractedData);

    // Generate appropriate response based on current step and intent
    return this.generateResponse(session, intent, userMessage);
  }

  private analyzeIntent(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('randevu') || lowerMessage.includes('appointment')) {
      return 'BOOK_APPOINTMENT';
    }
    if (lowerMessage.includes('iptal') || lowerMessage.includes('cancel')) {
      return 'CANCEL_APPOINTMENT';
    }
    if (lowerMessage.includes('değiştir') || lowerMessage.includes('change')) {
      return 'CHANGE_APPOINTMENT';
    }
    if (lowerMessage.includes('kontrol') || lowerMessage.includes('check')) {
      return 'CHECK_STATUS';
    }
    if (lowerMessage.includes('yardım') || lowerMessage.includes('help')) {
      return 'HELP';
    }

    return 'GENERAL';
  }

  private extractAppointmentData(message: string): Partial<AppointmentRequest> {
    const data: Partial<AppointmentRequest> = {};
    const lowerMessage = message.toLowerCase();

    // Extract service type
    if (lowerMessage.includes('vize') || lowerMessage.includes('visa')) {
      data.serviceType = 'VISA';
    } else if (lowerMessage.includes('pasaport') || lowerMessage.includes('passport')) {
      data.serviceType = 'PASSPORT';
    } else if (lowerMessage.includes('ikamet') || lowerMessage.includes('residence')) {
      data.serviceType = 'RESIDENCE_PERMIT';
    }

    // Extract urgency
    if (lowerMessage.includes('acil') || lowerMessage.includes('urgent') || lowerMessage.includes('emergency')) {
      data.urgency = 'URGENT';
    }

    // Extract dates (simplified - in production use NLP)
    const datePatterns = [
      /\d{1,2}[-\/]\d{1,2}[-\/]\d{4}/g, // DD/MM/YYYY or DD-MM-YYYY
      /\d{4}[-\/]\d{1,2}[-\/]\d{1,2}/g  // YYYY/MM/DD or YYYY-MM-DD
    ];

    for (const pattern of datePatterns) {
      const matches = message.match(pattern);
      if (matches) {
        data.preferredDates = matches.map(dateStr => new Date(dateStr));
        break;
      }
    }

    return data;
  }

  private createNewSession(sessionId: string): ChatSession {
    const session: ChatSession = {
      sessionId,
      applicantId: `temp_${Date.now()}`,
      currentStep: 'GREETING',
      collectedData: {},
      lastActivity: new Date(),
      isActive: true
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  private updateSessionData(session: ChatSession, newData: Partial<AppointmentRequest>) {
    session.collectedData = { ...session.collectedData, ...newData };
  }

  private generateResponse(session: ChatSession, intent: string, userMessage: string): BotResponse {
    switch (session.currentStep) {
      case 'GREETING':
        return this.handleGreeting(session);

      case 'SERVICE_SELECTION':
        return this.handleServiceSelection(session, userMessage);

      case 'DATE_SELECTION':
        return this.handleDateSelection(session, userMessage);

      case 'CONFIRMATION':
        return this.handleConfirmation(session, userMessage);

      default:
        return this.handleGeneralQuery(session, intent, userMessage);
    }
  }

  private handleGreeting(session: ChatSession): BotResponse {
    session.currentStep = 'SERVICE_SELECTION';

    return {
      type: 'GREETING',
      message: 'Merhaba! Diamond Visa randevu asistanına hoş geldiniz. Size nasıl yardımcı olabilirim?\n\nHangi hizmet için randevu almak istiyorsunuz?',
      options: ['Vize Başvurusu', 'Pasaport İşlemleri', 'İkamet İzni', 'Yardım'],
      nextAction: 'SERVICE_SELECTION'
    };
  }

  private handleServiceSelection(session: ChatSession, message: string): BotResponse {
    const serviceType = this.determineServiceType(message);

    if (serviceType) {
      session.collectedData.serviceType = serviceType;
      session.currentStep = 'DATE_SELECTION';

      return {
        type: 'QUESTION',
        message: `${this.getServiceName(serviceType)} için randevu almak istiyorsunuz. Hangi tarihleri tercih edersiniz?\n\nLütfen tarihleri belirtin (örnek: 15/12/2024 veya 2024-12-15)`,
        options: ['Bugün', 'Yarın', 'Bu Hafta', 'Geri Dön'],
        nextAction: 'DATE_SELECTION'
      };
    }

    return {
      type: 'QUESTION',
      message: 'Üzgünüm, hangi hizmet için randevu istediğinizi anlayamadım. Lütfen tekrar belirtin:',
      options: ['Vize Başvurusu', 'Pasaport İşlemleri', 'İkamet İzni'],
      nextAction: 'SERVICE_SELECTION'
    };
  }

  private handleDateSelection(session: ChatSession, message: string): BotResponse {
    const availableSlots = this.findAvailableSlots(session.collectedData.serviceType!, session.collectedData.preferredDates);

    if (availableSlots.length > 0) {
      session.currentStep = 'CONFIRMATION';

      const slot = availableSlots[0]; // Take first available
      session.collectedData.preferredDates = [slot.date];

      return {
        type: 'CONFIRMATION',
        message: `Mükemmel! ${slot.date.toLocaleDateString('tr-TR')} tarihinde saat ${slot.time}'da ${slot.embassy} için randevu bulunabilir.\n\nOnaylıyor musunuz?`,
        appointment: slot,
        options: ['Evet, Onayla', 'Farklı Tarih Seç', 'İptal'],
        nextAction: 'CONFIRMATION'
      };
    }

    return {
      type: 'NO_AVAILABILITY',
      message: 'Üzgünüm, seçtiğiniz tarihlerde uygun randevu bulunamıyor. Alternatif tarihler önerelim mi?',
      options: ['Alternatif Tarihler', 'Farklı Hizmet', 'İptal'],
      nextAction: 'DATE_SELECTION'
    };
  }

  private handleConfirmation(session: ChatSession, message: string): BotResponse {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('evet') || lowerMessage.includes('onayla') || lowerMessage.includes('yes')) {
      const appointment = this.bookAppointment(session);
      if (appointment) {
        session.currentStep = 'COMPLETED';

        return {
          type: 'APPOINTMENT_BOOKED',
          message: `🎉 Randevunuz başarıyla oluşturuldu!\n\n📅 Tarih: ${appointment.date.toLocaleDateString('tr-TR')}\n🕐 Saat: ${appointment.time}\n🏛️ Yer: ${appointment.embassy}\n\nRandevu numaranız: ${appointment.id}\n\nSize SMS ve e-posta ile hatırlatma gönderilecektir.`,
          appointment,
          nextAction: 'COMPLETED'
        };
      }
    }

    if (lowerMessage.includes('farklı') || lowerMessage.includes('başka')) {
      session.currentStep = 'DATE_SELECTION';
      return {
        type: 'QUESTION',
        message: 'Hangi tarihleri tercih edersiniz?',
        options: ['Bugün', 'Yarın', 'Bu Hafta'],
        nextAction: 'DATE_SELECTION'
      };
    }

    return {
      type: 'QUESTION',
      message: 'Randevuyu onaylıyor musunuz?',
      options: ['Evet, Onayla', 'Hayır, İptal'],
      nextAction: 'CONFIRMATION'
    };
  }

  private handleGeneralQuery(session: ChatSession, intent: string, message: string): BotResponse {
    switch (intent) {
      case 'HELP':
        return {
          type: 'QUESTION',
          message: 'Size nasıl yardımcı olabilirim?\n\n• Randevu almak için "randevu al" yazın\n• Mevcut randevunuzu kontrol etmek için "randevum" yazın\n• Randevu iptali için "iptal et" yazın\n• Ana menü için "menü" yazın',
          options: ['Randevu Al', 'Randevumu Kontrol Et', 'Yardım'],
          nextAction: 'GENERAL'
        };

      case 'CHECK_STATUS':
        return {
          type: 'QUESTION',
          message: 'Randevu durumunuzu kontrol etmek için lütfen randevu numaranızı girin:',
          nextAction: 'CHECK_STATUS'
        };

      default:
        return {
          type: 'QUESTION',
          message: 'Üzgünüm, mesajınızı anlayamadım. Lütfen daha açık belirtir misiniz?',
          options: ['Randevu Al', 'Durum Sorgula', 'Yardım'],
          nextAction: 'GENERAL'
        };
    }
  }

  // Helper methods
  private determineServiceType(message: string): 'VISA' | 'PASSPORT' | 'RESIDENCE_PERMIT' | null {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('vize') || lowerMessage.includes('visa')) {
      return 'VISA';
    }
    if (lowerMessage.includes('pasaport') || lowerMessage.includes('passport')) {
      return 'PASSPORT';
    }
    if (lowerMessage.includes('ikamet') || lowerMessage.includes('residence')) {
      return 'RESIDENCE_PERMIT';
    }

    return null;
  }

  private getServiceName(serviceType: string): string {
    switch (serviceType) {
      case 'VISA': return 'Vize Başvurusu';
      case 'PASSPORT': return 'Pasaport İşlemleri';
      case 'RESIDENCE_PERMIT': return 'İkamet İzni';
      default: return 'Hizmet';
    }
  }

  private findAvailableSlots(serviceType: string, preferredDates?: Date[]): AppointmentSlot[] {
    // Simplified slot finding - in production, query database
    const allSlots = this.embassySchedules.get(serviceType) || [];

    if (preferredDates && preferredDates.length > 0) {
      return allSlots.filter(slot =>
        preferredDates.some(date =>
          slot.date.toDateString() === date.toDateString() && slot.available
        )
      );
    }

    return allSlots.filter(slot => slot.available).slice(0, 5);
  }

  private bookAppointment(session: ChatSession): AppointmentSlot | null {
    const slots = this.findAvailableSlots(session.collectedData.serviceType!);
    if (slots.length === 0) return null;

    const slot = slots[0];
    slot.available = false;
    slot.bookedCount++;

    // Emit booking event
    this.socket.emit('appointment_booked', {
      sessionId: session.sessionId,
      appointment: slot,
      applicantData: session.collectedData
    });

    return slot;
  }

  private loadEmbassySchedules() {
    // Load initial embassy schedules - in production, fetch from API
    const mockSlots: AppointmentSlot[] = [
      {
        id: 'slot_001',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        time: '10:00',
        embassy: 'İstanbul Başkonsolosluğu',
        serviceType: 'VISA',
        available: true,
        capacity: 20,
        bookedCount: 15
      },
      {
        id: 'slot_002',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        time: '14:30',
        embassy: 'Ankara Büyükelçiliği',
        serviceType: 'VISA',
        available: true,
        capacity: 15,
        bookedCount: 8
      }
    ];

    this.embassySchedules.set('VISA', mockSlots);
  }

  private handleAppointmentUpdate(data: any) {
    // Handle real-time appointment updates
    console.log('Appointment update received:', data);
  }

  private handleScheduleUpdate(data: any) {
    // Handle real-time schedule updates
    console.log('Schedule update received:', data);
    this.loadEmbassySchedules(); // Reload schedules
  }

  // Public methods for external use
  getSession(sessionId: string): ChatSession | undefined {
    return this.sessions.get(sessionId);
  }

  endSession(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isActive = false;
    }
  }

  getAvailableSlots(serviceType: string, date?: Date): AppointmentSlot[] {
    const slots = this.embassySchedules.get(serviceType) || [];
    if (date) {
      return slots.filter(slot =>
        slot.date.toDateString() === date.toDateString() && slot.available
      );
    }
    return slots.filter(slot => slot.available);
  }
}
