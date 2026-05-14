import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Star, 
  ChevronRight, 
  CheckCircle2, 
  MessageCircle, 
  Calendar, 
  User, 
  Sparkles, 
  Eye, 
  Baby, 
  Menu, 
  X, 
  Clock, 
  ArrowRight,
  ChevronDown,
  Send,
  Loader2
} from 'lucide-react';
import { CLINIC_INFO, SERVICES, REVIEWS, FAQS, DOCTOR_PLACEHOLDER } from './constants';
import { Service, Review, FAQItem } from './types';
import { db } from './lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Types for Chat
interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-medical-blue rounded-lg flex items-center justify-center">
              <div className="w-4 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-4 bg-white rounded-full absolute"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">SINGLA CLINIC</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-medical-blue transition-colors">Services</a>
            <a href="#doctor" className="text-sm font-medium text-slate-600 hover:text-medical-blue transition-colors">Doctor</a>
            <a href="#reviews" className="text-sm font-medium text-slate-600 hover:text-medical-blue transition-colors">Reviews</a>
            <a href="tel:08307203664" className="inline-flex items-center gap-2 bg-medical-blue text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-medical-blue-dark transition-all shadow-lg shadow-blue-500/20">
              <Phone size={16} />
              Call Now
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-slate-100 px-4 py-6 flex flex-col gap-4 shadow-xl"
          >
            <a href="#services" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-800">Services</a>
            <a href="#doctor" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-800">Doctor</a>
            <a href="#reviews" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-800">Reviews</a>
            <a href="tel:08307203664" className="flex items-center justify-center gap-2 bg-medical-blue text-white py-4 rounded-xl font-bold shadow-lg">
              <Phone size={20} />
              Call 083072 03664
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden medical-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-slate-200 mb-6 shadow-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < 4.7 ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">4.7 Rating (51+ Reviews)</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Trusted Healthcare <br />
              <span className="text-medical-blue">For Your Family</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              Serving our community with expert medical care and personalized consultations. Your health is our top priority.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#appointment" className="inline-flex items-center justify-center gap-2 bg-medical-blue text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl shadow-blue-500/25">
                <Calendar size={20} />
                Book Appointment
              </a>
              <div className="flex gap-3">
                <a href="tel:08307203664" className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white text-medical-blue border-2 border-medical-blue/10 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-colors">
                  <Phone size={20} />
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
              <div className="aspect-[4/5] bg-slate-100 flex items-center justify-center relative">
                 <img 
                    src="https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=800" 
                    alt="Clinic Interior" 
                    className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-medical-blue/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-soft-green/5 rounded-full blur-3xl"></div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce-slow">
               <div className="w-12 h-12 bg-soft-green/10 text-soft-green rounded-full flex items-center justify-center">
                 <CheckCircle2 size={24} />
               </div>
               <div>
                 <p className="text-sm font-bold text-slate-800">Clinic Verified</p>
                 <p className="text-xs text-slate-500">Government Registered</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustSection = () => {
  const trustFeatures = [
    { title: "Trusted by Patients", icon: <User className="text-blue-500" /> },
    { title: "Easy Booking", icon: <Calendar className="text-green-500" /> },
    { title: "Personalized Care", icon: <Sparkles className="text-purple-500" /> },
    { title: "Family Friendly", icon: <Baby className="text-orange-500" /> }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {trustFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <p className="text-sm font-bold text-slate-800">{feature.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, i }: { service: Service; i: number }) => {
  const icons = {
    Sparkles: <Sparkles size={28} />,
    Eye: <Eye size={28} />,
    Baby: <Baby size={28} />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-medical-blue transition-all hover:shadow-2xl hover:shadow-medical-blue/5 flex flex-col h-full"
    >
      <div className="w-16 h-16 rounded-2xl bg-medical-blue/5 text-medical-blue flex items-center justify-center mb-6 group-hover:bg-medical-blue group-hover:text-white transition-colors">
        {icons[service.icon as keyof typeof icons]}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
      <p className="text-slate-600 mb-8 flex-grow">{service.description}</p>
      <button className="inline-flex items-center gap-2 text-medical-blue font-bold group/btn">
        Learn More
        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};

const Services = () => (
  <section id="services" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Our Specialized Services</h2>
        <p className="text-slate-600 max-w-2xl mx-auto italic font-serif text-lg">
          Comprehensive healthcare solutions tailored for your specific needs.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {SERVICES.map((s, index) => (
          <div key={s.id}>
            <ServiceCard service={s} i={index} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DoctorProfile = () => {
  return (
    <section id="doctor" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative aspect-square max-w-md mx-auto lg:mx-0"
          >
            <div className="absolute inset-0 bg-medical-blue rounded-[3rem] rotate-3"></div>
            <div className="absolute inset-0 bg-slate-100 rounded-[3rem] overflow-hidden">
              <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center text-slate-400">
                <User size={120} className="mb-4 opacity-20" />
                <p className="font-bold text-slate-500 uppercase tracking-widest text-sm">[ Doctor Photo Placeholder ]</p>
                <img 
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80" 
                  alt="Doctor"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-medical-blue font-bold tracking-widest text-sm mb-4 block uppercase">Meet Our Expert</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">{DOCTOR_PLACEHOLDER.name}</h2>
            <p className="text-xl text-slate-600 mb-8">
              {DOCTOR_PLACEHOLDER.qualification} <span className="mx-2 text-slate-300">|</span> {DOCTOR_PLACEHOLDER.experience}
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-medical-blue">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900">Expertise in Specialties</h4>
                   <p className="text-slate-600">Dedicated to quality healthcare and patient comfort in every consultation.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-medical-blue">
                  <Clock size={24} />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900">Timings & Fee</h4>
                   <p className="text-slate-600">{DOCTOR_PLACEHOLDER.timings} <br/> Consultation Fee: {DOCTOR_PLACEHOLDER.fee}</p>
                </div>
              </div>
            </div>

            <p className="border-l-4 border-medical-blue pl-6 italic font-serif text-slate-500 text-xl py-2">
              "We believe in healing through compassion and advanced medical practice."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    department: 'Skin Care',
    preferredDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      setIsSuccess(true);
      setFormData({
        patientName: '',
        phoneNumber: '',
        department: 'Skin Care',
        preferredDate: '',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      console.error("Booking Error:", err);
      setError("Failed to book appointment. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="py-24 bg-clinic-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-[3rem] p-8 md:p-16 max-w-4xl mx-auto border border-blue-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Request An Appointment</h2>
            <p className="text-slate-600">Quick and easy booking. Our team will contact you for confirmation.</p>
          </div>
          
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">Patient Name</label>
              <input 
                required
                type="text" 
                placeholder="John Doe" 
                value={formData.patientName}
                onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">Phone Number</label>
              <input 
                required
                type="tel" 
                placeholder="083072 03664" 
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">Department</label>
              <select 
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all appearance-none"
              >
                <option>Skin Care</option>
                <option>Eye Care</option>
                <option>Obstetrics & Gynaecology</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">Preferred Date</label>
              <input 
                required
                type="date" 
                value={formData.preferredDate}
                onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all" 
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">Message (Optional)</label>
              <textarea 
                placeholder="Tell us about your concerns..." 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all resize-none"
              ></textarea>
            </div>
            
            {error && (
              <div className="md:col-span-2 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            {isSuccess && (
              <div className="md:col-span-2 p-4 bg-green-50 text-green-700 rounded-2xl text-sm font-bold border border-green-100 flex items-center gap-2">
                <CheckCircle2 size={18} />
                Appointment requested successfully! We'll call you shortly.
              </div>
            )}

            <div className="md:col-span-2 pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-medical-blue text-white py-5 rounded-2xl font-bold text-lg hover:bg-medical-blue-dark transition-all shadow-xl shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Calendar size={20} />}
                {isSubmitting ? "Processing..." : "Book My Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          history: messages 
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'model', parts: [{ text: data.text }] }]);
      }
    } catch (err) {
      console.error("Chat Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-medical-blue p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Clinic Assistant</h3>
                  <p className="text-xs text-blue-100">AI Powered Helper</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 text-medical-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} />
                  </div>
                  <p className="text-slate-800 font-bold mb-1">Hello! I'm your AI assistant.</p>
                  <p className="text-slate-500 text-sm">Ask me anything about Singla Clinic services or timings.</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-medical-blue text-white rounded-tr-none shadow-lg shadow-blue-500/10' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.parts[0].text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-medical-blue" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-grow px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-medical-blue transition-all text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-3 bg-medical-blue text-white rounded-xl hover:bg-medical-blue-dark transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-medical-blue text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform relative"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-soft-green rounded-full border-2 border-white"></div>
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Patient Experiences</h2>
            <p className="text-slate-600 max-w-lg italic font-serif">What our patients say about the care they receive at Singla Clinic.</p>
          </div>
          <div className="bg-clinic-bg px-6 py-4 rounded-3xl border border-slate-100 flex items-center gap-6">
            <div className="text-center border-r border-slate-200 pr-6">
              <p className="text-3xl font-bold text-slate-900">4.7</p>
              <div className="flex gap-0.5 justify-center">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
              </div>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-xl">51+</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-none">Google Reviews</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100"
            >
              <div className="flex gap-0.5 mb-4 text-amber-400">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-700 font-medium mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-medical-blue shadow-sm border border-slate-100">
                  {review.name.charAt(review.name.length - 1)}
                </div>
                <span className="font-bold text-slate-900 text-sm tracking-wide">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-600 italic font-serif">Quick answers to common inquiries about our clinic.</p>
        </div>
        
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className="font-bold text-slate-900 text-lg group-hover:text-medical-blue transition-colors">{faq.question}</span>
                <ChevronDown size={24} className={`text-slate-400 transition-transform ${active === i ? "rotate-180 text-medical-blue" : ""}`} />
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Visit Us In Ambala</h2>
            <div className="space-y-8 bg-clinic-bg p-8 rounded-[2.5rem] border border-slate-100">
               <div className="flex gap-4">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-medical-blue shadow-sm shrink-0">
                    <MapPin size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 mb-1">Clinic Address</h4>
                   <p className="text-slate-600">{CLINIC_INFO.address}</p>
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-medical-blue shadow-sm shrink-0">
                    <Phone size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 mb-1">Contact Details</h4>
                   <p className="text-slate-600">Phone: {CLINIC_INFO.phone}</p>
                 </div>
               </div>
            </div>
            
            <div className="flex gap-4 mt-8">
               <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CLINIC_INFO.name + ", " + CLINIC_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-5 rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:scale-[1.02] transition-all"
               >
                 <MapPin size={20} />
                 Get Directions
               </a>
            </div>
          </motion.div>

          <div className="rounded-[3rem] overflow-hidden h-96 shadow-2xl relative border-8 border-white">
             {/* Map Placeholder */}
             <div className="absolute inset-0 bg-slate-200 flex items-center justify-center flex-col p-8 text-center text-slate-500">
               <MapPin size={64} className="mb-4 opacity-10" />
               <p className="font-bold tracking-widest text-sm uppercase">[ Interactive Map Component ]</p>
               <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale" 
                alt="Map Background"
               />
               <div className="absolute inset-0 bg-medical-blue/10"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-medical-blue/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-medical-blue rounded-xl flex items-center justify-center">
                <div className="w-5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-5 bg-white rounded-full absolute"></div>
              </div>
              <span className="font-bold text-2xl tracking-tight uppercase">SINGLA CLINIC</span>
            </div>
            <p className="text-slate-400 text-lg max-w-sm mb-8 leading-relaxed">
              Providing premium healthcare services with a focus on trust, technology, and patient-centric care in Ambala.
            </p>
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all cursor-pointer">
                  {i === 0 ? <Phone size={16} /> : i === 1 ? <MessageCircle size={16} /> : i === 2 ? <MapPin size={16} /> : <Calendar size={16} />}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-slate-500">Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Skin Care</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Eye Care</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Obstetrics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gynaecology</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-slate-500">Contact</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-medical-blue" />
                <span>{CLINIC_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-medical-blue" />
                <span>{CLINIC_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="shrink-0 text-medical-blue" />
                <span>Open: Mon - Sat</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} SINGLA CLINIC. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-medical-blue selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <Services />
        <DoctorProfile />
        <AppointmentForm />
        <ReviewsSection />
        <FAQSection />
        <LocationSection />
      </main>
      <Footer />
      
      <AIChatbot />
      
      {/* Floating Call CTA for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-40 flex flex-col gap-3">
        <a 
          href="https://wa.me/918307203664" 
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl animate-pulse"
        >
          <MessageCircle size={28} />
        </a>
        <a 
          href="tel:08307203664" 
          className="w-14 h-14 bg-medical-blue text-white rounded-full flex items-center justify-center shadow-2xl"
        >
          <Phone size={28} />
        </a>
      </div>
    </div>
  );
}
