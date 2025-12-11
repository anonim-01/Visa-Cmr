'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { AppointmentBotService, BotResponse, AppointmentSlot } from '@/services/appointment-bot.service';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  options?: string[];
  appointment?: AppointmentSlot;
}

interface AppointmentBotProps {
  onAppointmentBooked?: (appointment: AppointmentSlot) => void;
  sessionId?: string;
}

export function AppointmentBot({ onAppointmentBooked, sessionId }: AppointmentBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [botService] = useState(() => new AppointmentBotService());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentSessionId = sessionId || `session_${Date.now()}`;

  useEffect(() => {
    // Initialize with greeting message
    const greetingMessage: Message = {
      id: 'greeting',
      type: 'bot',
      content: 'Merhaba! Diamond Visa randevu asistanına hoş geldiniz. Size nasıl yardımcı olabilirim?',
      timestamp: new Date(),
      options: ['Vize Başvurusu', 'Pasaport İşlemleri', 'İkamet İzni', 'Yardım']
    };
    setMessages([greetingMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText: string = inputValue.trim()) => {
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Get bot response
      const botResponse: BotResponse = await botService.processMessage(currentSessionId, messageText);

      // Add bot message
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        type: 'bot',
        content: botResponse.message,
        timestamp: new Date(),
        options: botResponse.options,
        appointment: botResponse.appointment
      };

      setMessages(prev => [...prev, botMessage]);

      // Handle appointment booking
      if (botResponse.type === 'APPOINTMENT_BOOKED' && botResponse.appointment && onAppointmentBooked) {
        onAppointmentBooked(botResponse.appointment);
      }

    } catch (error) {
      console.error('Bot error:', error);
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        type: 'bot',
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderAppointmentCard = (appointment: AppointmentSlot) => (
    <Card className="mt-2 bg-blue-50 border-blue-200">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span className="font-medium">
            {appointment.date.toLocaleDateString('tr-TR')}
          </span>
          <Clock className="h-4 w-4 text-blue-600 ml-2" />
          <span>{appointment.time}</span>
          <MapPin className="h-4 w-4 text-blue-600 ml-2" />
          <span>{appointment.embassy}</span>
        </div>
        <div className="mt-2">
          <Badge variant="secondary" className="text-xs">
            {appointment.serviceType === 'VISA' ? 'Vize Başvurusu' :
             appointment.serviceType === 'PASSPORT' ? 'Pasaport' : 'İkamet İzni'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5 text-blue-600" />
          Randevu Asistanı
          <Badge variant="outline" className="ml-auto">
            Diamond Visa
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === 'bot' ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>

                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                  {/* Appointment Card */}
                  {message.appointment && renderAppointmentCard(message.appointment)}

                  {/* Options */}
                  {message.options && message.options.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 px-2"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Mesajınızı yazın..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-1 mt-2 text-xs text-gray-500">
            <span>💡 Örnek: "Vize randevusu almak istiyorum"</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
