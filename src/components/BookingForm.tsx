import { useState, useEffect, FormEvent } from 'react';
import { 
  X, 
  ChevronRight, 
  Map, 
  Compass, 
  Calculator, 
  CheckCircle2, 
  Sparkles,
  User,
  Phone,
  MessageSquare
} from 'lucide-react';
import { SERVICES } from '../data';

interface BookingFormProps {
  initialServiceId?: string;
  onClose: () => void;
}

export default function BookingForm({ initialServiceId, onClose }: BookingFormProps) {
  const [selectedService, setSelectedService] = useState<string>(initialServiceId || 'exterior');
  const [areaSize, setAreaSize] = useState<number>(120); // standard sqm size
  const [clientName, setClientName] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [clientTelegram, setClientTelegram] = useState<string>('');
  const [clientMessage, setClientMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // Custom structural metrics
  const [estimatedPrice, setEstimatedPrice] = useState<number>(120000); // in Rubles or USD equivalent

  // Rates in Roubles per square meter (approximate luxury rate)
  const ratesPerSqm: Record<string, number> = {
    exterior: 1500, // per sqm of facade or plot
    interior: 1200, // per interior sqm
    animation: 2500, // rate component
    tours: 1000,
    models: 1800,
    concept: 2000
  };

  // Recalculate estimates when parameters modify
  useEffect(() => {
    const rate = ratesPerSqm[selectedService] || 1200;
    const basePrices: Record<string, number> = {
      exterior: 95000,
      interior: 75000,
      animation: 190000,
      tours: 120000,
      models: 140000,
      concept: 110000
    };
    
    // Total = Base pricing + Area * rate (scaled elegantly)
    const base = basePrices[selectedService] || 80000;
    const areaScaledCost = Math.round(areaSize * rate);
    setEstimatedPrice(base + areaScaledCost);
  }, [selectedService, areaSize]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientContact) return;
    setIsSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 min-h-screen"
      id="booking-form-overlay"
    >
      <div className="bg-[#0c0c0c] border border-[#DFB15B]/35 w-full max-w-2xl rounded-none relative overflow-hidden shadow-[0_0_80px_rgba(223,177,91,0.2)] p-6 md:p-10 select-none animate-fade-in">
        
        {/* Subtle glowing mesh outline */}
        <div className="absolute top-0 left-0 w-2 h-full bg-[#DFB15B]" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 bg-neutral-900 border border-neutral-800"
          id="btn-close-booking"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6" id="consultation-form">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl lg:text-3xl font-serif text-white tracking-wide uppercase">
                Запрос на визуализацию
              </h2>
              <p className="text-xs text-amber-500/80 tracking-widest uppercase font-mono">
                РАСЧЕТ СМЕТЫ И ПОДГОТОВКА СМЕТНЫХ УСЛОВИЙ
              </p>
              <div className="w-12 h-[1px] bg-[#DFB15B]/50 mx-auto mt-4" />
            </div>

            {/* Step 1: Directions Select */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#DFB15B]/80 block">
                1. Выберите категорию проекта:
              </label>
              <select 
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-[#060606] border border-neutral-800 text-gray-200 text-xs px-4 py-3 focus:outline-none focus:border-[#DFB15B] rounded-none appearance-none"
                id="select-booking-service"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.titleRu} ({s.title})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Interactive metrics calculator */}
            <div className="space-y-3 bg-[#060606] p-4 border border-neutral-900 rounded-none">
              <div className="flex justify-between text-xs font-mono tracking-wider">
                <span className="text-gray-400 uppercase">2. Общая площадь объекта:</span>
                <span className="text-[#DFB15B] font-bold">{areaSize} м²</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="1000" 
                step="5"
                value={areaSize}
                onChange={(e) => setAreaSize(Number(e.target.value))}
                className="w-full touch-none accent-[#DFB15B] bg-neutral-800"
                id="range-area-calculator"
              />
              <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                <span>20 м²</span>
                <span>500 м² (Оптимально)</span>
                <span>1000 м²</span>
              </div>

              {/* ESTIMATE FEE PORTAL */}
              <div className="pt-4 mt-3 border-t border-neutral-900 flex justify-between items-center">
                <div className="flex items-center gap-1 text-[10px] uppercase font-mono text-[#DFB15B]/80">
                  <Calculator className="w-3.5 h-3.5" /> Ориентировочная стоимость:
                </div>
                <div className="text-right">
                  <span className="text-lg font-mono text-white font-semibold tracking-wide">
                    ~ {estimatedPrice.toLocaleString('ru-RU')} ₽
                  </span>
                  <p className="text-[7.5px] text-gray-500 uppercase tracking-widest mt-0.5">
                    *Включает 8K рендеры + 3 круга правок
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Coordinates metadata */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#DFB15B]/80 block">
                3. Ваши контактные данные:
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Client Name */}
                <div className="relative">
                  <User className="absolute left-3 top-[15px] w-4 h-4 text-gray-600" />
                  <input 
                    type="text" 
                    required
                    placeholder="Ваше имя *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#060606] border border-neutral-800 focus:border-[#DFB15B] text-gray-100 text-xs pl-10 pr-4 py-3.5 focus:outline-none rounded-none placeholder-gray-600"
                    id="input-client-name"
                  />
                </div>

                {/* Client Contact Details */}
                <div className="relative">
                  <Phone className="absolute left-3 top-[15px] w-4 h-4 text-gray-600" />
                  <input 
                    type="text" 
                    required
                    placeholder="Телефон / Email / WhatsApp *"
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    className="w-full bg-[#060606] border border-neutral-800 focus:border-[#DFB15B] text-gray-100 text-xs pl-10 pr-4 py-3.5 focus:outline-none rounded-none placeholder-gray-600"
                    id="input-client-contact"
                  />
                </div>
              </div>

              {/* Optional Telegram contact */}
              <div className="relative">
                <span className="absolute left-3.5 top-[14px] font-mono text-xs font-semibold text-gray-600">@</span>
                <input 
                  type="text" 
                  placeholder="Ваш Telegram (необязательно)"
                  value={clientTelegram}
                  onChange={(e) => setClientTelegram(e.target.value)}
                  className="w-full bg-[#060606] border border-neutral-800 focus:border-[#DFB15B] text-gray-100 text-xs pl-10 pr-4 py-3.5 focus:outline-none rounded-none placeholder-gray-600"
                  id="input-client-telegram"
                />
              </div>

              {/* Message Comment */}
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-[15px] w-4 h-4 text-gray-600" />
                <textarea 
                  placeholder="Опишите ваши пожелания к визуализации (стиль, количество ракурсов) или вставьте ссылку на облако с ТЗ..."
                  value={clientMessage}
                  onChange={(e) => setClientMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-[#060606] border border-neutral-800 focus:border-[#DFB15B] text-gray-100 text-xs pl-10 pr-4 py-3 focus:outline-none rounded-none placeholder-gray-600 resize-none font-sans"
                  id="textarea-client-message"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3">
              <button 
                type="submit"
                className="w-full bg-[#DFB15B] hover:bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase py-4 flex items-center justify-center gap-2 transition-all duration-500 shadow-[0_4px_20px_rgba(223,177,91,0.2)] rounded-none cursor-pointer"
                id="btn-submit-booking"
              >
                Отправить заявку <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* THANK YOU RECEIPT STAGE */
          <div className="text-center py-10 space-y-6 animate-fade-in" id="booking-success-container">
            <div className="inline-flex p-4 rounded-full bg-[#DFB15B]/10 border border-[#DFB15B]/30 text-[#DFB15B] animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-white uppercase tracking-wide">
                Заявка принята!
              </h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Спасибо, <span className="text-[#DFB15B] font-semibold">{clientName}</span>. Наш главный архитектор-визуализатор свяжется с вами в течение 15 минут для уточнения технических деталей.
              </p>
            </div>

            {/* Receipt Summary detail */}
            <div className="bg-[#060606] p-4 border border-neutral-900 rounded-none text-left space-y-2 max-w-sm mx-auto font-mono text-[10px] text-gray-400">
              <p className="text-[#DFB15B] border-b border-neutral-900 pb-1.5 uppercase tracking-widest text-center">ОБЗОР ТЗ ЗАЯВКИ</p>
              <p>Направление: <span className="text-white float-right uppercase">{SERVICES.find(s => s.id === selectedService)?.titleRu}</span></p>
              <p>Общая площадь: <span className="text-white float-right">{areaSize} м²</span></p>
              <p>Ориент. бюджет: <span className="text-white float-right text-[#DFB15B]">{estimatedPrice.toLocaleString('ru-RU')} ₽</span></p>
              <p>Канал связи: <span className="text-white float-right truncate max-w-[180px]">{clientContact}</span></p>
              {clientTelegram && <p>Telegram: <span className="text-white float-right">@{clientTelegram}</span></p>}
              <p className="text-[8px] text-gray-500 pt-1 text-center font-sans tracking-wide">Идентификатор тикета: AP-v07sot-{Math.floor(1000 + Math.random() * 9000)}</p>
            </div>

            <button 
              onClick={onClose}
              className="px-8 py-3 border border-[#DFB15B] text-[#DFB15B] hover:bg-[#DFB15B] hover:text-black hover:shadow-[0_0_15px_rgba(223,177,91,0.25)] text-[10px] uppercase font-mono tracking-widest transition-all duration-300 rounded-none cursor-pointer"
              id="btn-success-close"
            >
              Закрыть окно
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
