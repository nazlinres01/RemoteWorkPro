import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Globe, 
  Target, 
  Heart, 
  Laptop, 
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function About() {
  const stats = [
    { icon: Users, label: "Aktif Kullanıcı", value: "50,000+" },
    { icon: Globe, label: "Desteklenen Ülke", value: "50+" },
    { icon: TrendingUp, label: "Başarılı Eşleşme", value: "15,000+" },
    { icon: Star, label: "Memnuniyet Oranı", value: "%98" },
  ];

  const features = [
    {
      icon: Target,
      title: "Hedefli İş Arama",
      description: "Gelişmiş filtreleme sistemiyle size uygun işleri kolayca bulun"
    },
    {
      icon: Shield,
      title: "Güvenli Platform",
      description: "Verileriniz güvende, doğrulanmış şirketlerle çalışıyoruz"
    },
    {
      icon: Zap,
      title: "Hızlı Başvuru",
      description: "Tek tıkla başvuru yapın, sürecinizi takip edin"
    },
    {
      icon: Heart,
      title: "Kişiselleştirilmiş",
      description: "Size özel iş önerileri ve kariyer tavsiyeleri alın"
    }
  ];

  const team = [
    {
      name: "Ahmet Yılmaz",
      role: "Kurucu & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      bio: "10+ yıl teknoloji sektörü deneyimi"
    },
    {
      name: "Elif Kaya",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      bio: "Uzaktan çalışma teknolojileri uzmanı"
    },
    {
      name: "Mehmet Demir",
      role: "Ürün Müdürü",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      bio: "Kullanıcı deneyimi ve ürün geliştirme"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Uzaktan Çalışmanın
            <span className="block text-accent">Geleceğini Şekillendiriyoruz</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            RemoteWork Pro olarak, yetenekli profesyonelleri dünyanın dört bir yanındaki 
            fırsatlarla buluşturarak çalışma hayatını dönüştürüyoruz.
          </p>
          <div className="flex items-center justify-center space-x-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Misyonumuz</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Uzaktan çalışmanın sunduğu özgürlüğü herkesin yaşayabileceği bir dünya hayal ediyoruz. 
                Coğrafi sınırları aşarak, yetenekli insanları hayallerindeki işlerle buluşturuyoruz.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Platformumuz sadece bir iş arama sitesi değil; uzaktan çalışma kültürünü destekleyen, 
                gelişmiş teknolojilerle donatılmış bir ekosistemdir.
              </p>
              <div className="space-y-3">
                {[
                  "Coğrafi sınırları aşan kariyer fırsatları",
                  "İş-yaşam dengesi odaklı pozisyonlar",
                  "Doğrulanmış ve güvenilir şirketler",
                  "Kişiselleştirilmiş kariyer rehberliği"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Takım çalışması"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Laptop className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-semibold text-slate-800">100% Uzaktan</div>
                    <div className="text-sm text-slate-600">Özgürce çalışın</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Neden RemoteWork Pro?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Uzaktan çalışma deneyiminizi en üst seviyeye çıkaracak özelliklerimiz
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center card-hover">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Takımımızla Tanışın</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Uzaktan çalışma tutkunu, deneyimli profesyonellerden oluşan ekibimiz
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center card-hover">
                <CardContent className="p-8">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-slate-800 mb-1">{member.name}</h3>
                  <Badge variant="outline" className="mb-3">{member.role}</Badge>
                  <p className="text-slate-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Değerlerimiz</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Her kararımızda bizi yönlendiren temel ilkelerimiz
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Özgürlük",
                description: "Herkesin kendi şartlarında çalışma özgürlüğüne sahip olması gerektiğine inanıyoruz."
              },
              {
                title: "Şeffaflık",
                description: "Tüm süreçlerimizde açık ve dürüst iletişimi önceliğimiz olarak görüyoruz."
              },
              {
                title: "İnovasyon",
                description: "Teknolojinin gücüyle çalışma hayatını sürekli iyileştirmeye odaklanıyoruz."
              },
              {
                title: "Çeşitlilik",
                description: "Farklı geçmişlerden insanların bir araya gelmesinin gücüne inanıyoruz."
              }
            ].map((value, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Hayalinizdeki İşe Başlayın</h2>
          <p className="text-xl text-white/90 mb-8">
            Binlerce uzaktan iş fırsatı arasından size en uygun olanını bulun
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-slate-50 text-primary font-semibold">
              İş Aramaya Başla
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Şirket Kaydı
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}