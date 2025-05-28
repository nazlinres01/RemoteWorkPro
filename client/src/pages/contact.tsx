import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Users,
  Building2,
  HelpCircle
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Mesajınız gönderildi!",
      description: "En kısa sürede size geri dönüş yapacağız.",
    });
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "E-posta",
      details: "hello@remoteworkpro.com",
      description: "7/24 destek için"
    },
    {
      icon: Phone,
      title: "Telefon",
      details: "+90 212 xxx xx xx",
      description: "Hafta içi 09:00-18:00"
    },
    {
      icon: MapPin,
      title: "Adres",
      details: "Maslak, İstanbul",
      description: "Türkiye"
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      details: "Pazartesi - Cuma",
      description: "09:00 - 18:00"
    }
  ];

  const faqItems = [
    {
      icon: Users,
      question: "Nasıl hesap oluşturabilirim?",
      answer: "Ana sayfadaki 'Üye Ol' butonuna tıklayarak kolayca hesap oluşturabilirsiniz."
    },
    {
      icon: Building2,
      question: "Şirket hesabı nasıl açılır?",
      answer: "Şirketler için özel kayıt sayfamızdan işletme bilgilerinizi girerek hesap açabilirsiniz."
    },
    {
      icon: MessageCircle,
      question: "Başvuru süreci nasıl işliyor?",
      answer: "İş ilanına başvurduktan sonra CV'niz direkt şirkete iletilir ve onlar sizinle iletişime geçer."
    },
    {
      icon: HelpCircle,
      question: "Ücretsiz mi kullanabilirim?",
      answer: "Evet! İş arayanlar için platform tamamen ücretsizdir. Sadece premium özellikler ücretlidir."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bizimle İletişime Geçin
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Sorularınız, önerileriniz veya yardıma ihtiyacınız mı var? 
            Ekibimiz size yardımcı olmak için burada!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Mesaj Gönderin</CardTitle>
                <p className="text-slate-600">
                  Formu doldurun, size en kısa sürede geri dönelim
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Ad Soyad *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Adınızı girin"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-posta *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="E-posta adresinizi girin"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Kategori</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Konu seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Genel Sorular</SelectItem>
                          <SelectItem value="technical">Teknik Destek</SelectItem>
                          <SelectItem value="billing">Faturalama</SelectItem>
                          <SelectItem value="partnership">İş Ortaklığı</SelectItem>
                          <SelectItem value="feedback">Geri Bildirim</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Konu *</Label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Mesaj konusu"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Mesajınız *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Mesajınızı detaylı bir şekilde yazın..."
                      rows={6}
                      required
                      className="mt-1"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-gradient font-semibold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>İletişim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{info.title}</h3>
                      <p className="text-slate-900 font-medium">{info.details}</p>
                      <p className="text-sm text-slate-600">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Sık Sorulan Sorular</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div key={index} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <faq.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-slate-800 mb-1">{faq.question}</h4>
                        <p className="text-sm text-slate-600">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  Tüm SSS'leri Gör
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Destek Talebi Oluştur
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Canlı Sohbet Başlat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Yardım Merkezi
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Ofisimizi Ziyaret Edin</CardTitle>
              <p className="text-slate-600">
                İstanbul Maslak ofisimizde sizleri ağırlamaktan mutluluk duyarız
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600">Harita Yükleniyor...</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Maslak Mahallesi, Sarıyer/İstanbul
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}